package controllers

import (
	"auth-photo-gallery/src/app/auth"
	"auth-photo-gallery/src/app/db"
	"auth-photo-gallery/src/app/models"
	"auth-photo-gallery/src/app/responses"
	"auth-photo-gallery/src/app/security"
	"auth-photo-gallery/src/config"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var user_collection = db.Connect().Database("photo_gallery").Collection("users")

func GetUser(w http.ResponseWriter, r *http.Request) {
	uid, err := auth.ExtractTokenID(r)
	if err != nil {
		responses.ERROR(w, http.StatusUnauthorized, err)
		return
	}

	_id, err := primitive.ObjectIDFromHex(uid)
	if err != nil {
		fmt.Println(err)
		return
	}

	type ResponseUser struct {
		ID           primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
		Username     string             `json:"username"`
		Email        string             `json:"email"`
		Img_Uri      string             `json:"img_uri" bson:"img_uri"`
		Current_Plan string             `json:"current_plan" bson:"current_plan"`
	}
	user := ResponseUser{}
	err = user_collection.FindOne(context.TODO(), bson.D{{"_id", _id}}).Decode(&user)
	if err != nil {
		fmt.Println(err)
		return
	}

	responses.JSON(w, http.StatusFound, user)

}

func Register(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	user := models.User{}
	err = json.Unmarshal(body, &user)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	// Validate fields
	user.Prepare()
	err = user.Validate("register")
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	// Exist user => username or email
	// Exist Username
	if ExistUsername(user.Username) {
		responses.JSON(w, http.StatusConflict, struct {
			Exist string `json:"exist"`
		}{
			Exist: "The username is already exist!",
		})
		return
	}

	// Exist Email
	if ExistEmail(user.Email) {
		responses.JSON(w, http.StatusConflict, struct {
			Exist string `json:"exist"`
		}{
			Exist: "The email is already exist!",
		})
		return
	}

	// Hash Passwords
	hashedPassword, err := security.Hash(user.Password)
	if err != nil {
		fmt.Println(err)
	}

	user.Password = string(hashedPassword)

	hashedConfirmPassword, err := security.Hash(user.ConfirmPassword)
	if err != nil {
		fmt.Println(err)
	}

	user.ConfirmPassword = string(hashedConfirmPassword)

	// Insert to database
	type UserToSave struct {
		Username     string    `json:"username" bson:"username"`
		Email        string    `json:"email" bson:"email"`
		Password     string    `json:"password" bson:"password"`
		Img_Uri      string    `json:"img_uri" bson:"img_uri"`
		Current_Plan string    `json:"current_plan" bson:"current_plan"`
		Created_At   time.Time `json:"created_at" bson:"created_at"`
	}

	var userToSave UserToSave

	userToSave.Username = user.Username
	userToSave.Email = user.Email
	userToSave.Password = user.Password
	userToSave.Img_Uri = user.Img_Uri
	userToSave.Current_Plan = user.Current_Plan
	userToSave.Created_At = user.Created_At

	result, err := user_collection.InsertOne(context.TODO(), userToSave)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	// Create dir user
	var _id string
	oid, ok := result.InsertedID.(primitive.ObjectID)
	if ok {
		_id = oid.Hex()
	}

	storagePath := path.Join(config.PATH_STORAGE)
	err = os.Mkdir(storagePath+"/"+_id, 0755)
	if err != nil {
		fmt.Printf("\n\t%d", err)
	}

	// Create token
	token, err := auth.CreateToken(_id)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Authorization", "Bearer "+token)
	responses.JSON(w, http.StatusCreated, struct {
		Token string `json:"token"`
	}{
		Token: token,
	})

}

func Login(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	user := models.User{}
	err = json.Unmarshal(body, &user)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	user.Prepare()
	err = user.Validate("login")
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	// Exist User with email
	existUser := models.User{}
	err = user_collection.FindOne(context.TODO(), bson.D{{"email", user.Email}}).Decode(&existUser)
	if err != nil {
		errorExist := errors.New("The user with this email don't exist")
		responses.ERROR(w, http.StatusNotFound, errorExist)
		return
	}

	err = security.VerifyPassword(existUser.Password, user.Password)
	if err != nil {
		errorPass := errors.New("Incorrect Password")
		responses.ERROR(w, http.StatusConflict, errorPass)
		return
	}

	token, err := auth.CreateToken(string(existUser.ID.Hex()))
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Authorization", "Bearer "+token)
	responses.JSON(w, http.StatusOK, struct {
		Token string `json:"token"`
	}{
		Token: token,
	})

}

func UpdateUser(w http.ResponseWriter, r *http.Request) {

	uid, err := auth.ExtractTokenID(r)
	if err != nil {
		responses.ERROR(w, http.StatusUnauthorized, err)
		return
	}

	_id, err := primitive.ObjectIDFromHex(uid)
	if err != nil {
		fmt.Println(err)
		return
	}

	params := mux.Vars(r)["fields"]
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	switch params {
	case "email":

		type Email struct {
			Email string `json:"email" bson:"email"`
		}

		var email Email
		err := json.Unmarshal(body, &email)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		message, err := UpdateEmail(email.Email, _id)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		responses.JSON(w, http.StatusOK, struct {
			Message string `json:"message"`
		}{
			Message: message,
		})

	case "username":
		type Username struct {
			Username string `json:"username" bson:"username"`
		}

		var username Username
		err := json.Unmarshal(body, &username)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		message, err := UpdateUsername(username.Username, _id)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		responses.JSON(w, http.StatusOK, struct {
			Message string `json:"message"`
		}{
			Message: message,
		})

	case "password":
		type Pass struct {
			Pass string `json:"password" bson:"password"`
		}

		var password Pass
		err := json.Unmarshal(body, &password)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		message, err := UpdatePassword(password.Pass, _id)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		responses.JSON(w, http.StatusOK, struct {
			Message string `json:"message"`
		}{
			Message: message,
		})

	}

}

func DeleteUser(w http.ResponseWriter, r *http.Request) {

	uid, err := auth.ExtractTokenID(r)
	if err != nil {
		responses.ERROR(w, http.StatusUnauthorized, err)
		return
	}

	_id, err := primitive.ObjectIDFromHex(uid)
	if err != nil {
		fmt.Println(err)
		return
	}

	res, err := user_collection.DeleteOne(context.TODO(), bson.D{{"_id", _id}})
	if err != nil {
		responses.ERROR(w, http.StatusConflict, err)
		return
	}

	pathStorage := path.Join(config.PATH_STORAGE + "/" + uid)
	err = os.Remove(pathStorage)
	if err != nil {
		fmt.Println(err)
		return
	}

	responses.JSON(w, http.StatusOK, struct {
		Count   int    `json:"deleted_count"`
		Message string `json:"message"`
	}{
		Count:   int(res.DeletedCount),
		Message: "Deleted successfully",
	})

}
