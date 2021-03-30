package controllers

import (
	"auth-photo-gallery/src/app/security"
	"context"
	"errors"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func UpdateEmail(email string, _id primitive.ObjectID) (string, error) {
	if ExistEmail(email) {
		return "", errors.New("Email is already exist!")
	}

	after := options.After

	returnOpr := options.FindOneAndUpdateOptions{
		ReturnDocument: &after,
	}

	update := bson.D{{"$set", bson.D{{"email", email}}}}

	var result primitive.M
	err := user_collection.FindOneAndUpdate(context.TODO(), bson.D{{"_id", _id}}, update, &returnOpr).Decode(&result)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	return "Email updated successfully", nil
}

func UpdateUsername(username string, _id primitive.ObjectID) (string, error) {

	if ExistUsername(username) {
		return "", errors.New("Username is already exists!")
	}

	after := options.After

	returnOpr := options.FindOneAndUpdateOptions{
		ReturnDocument: &after,
	}

	update := bson.D{{"$set", bson.D{{"username", username}}}}

	var result primitive.M
	err := user_collection.FindOneAndUpdate(context.TODO(), bson.D{{"_id", _id}}, update, &returnOpr).Decode(&result)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	return "Username updated successfully", nil

}

func UpdatePassword(password string, _id primitive.ObjectID) (string, error) {

	hashedPassword, err := security.Hash(password)
	if err != nil {
		return "", err
	}

	password = string(hashedPassword)

	after := options.After

	returnOpr := options.FindOneAndUpdateOptions{
		ReturnDocument: &after,
	}

	update := bson.D{{"$set", bson.D{{"password", password}}}}

	var result primitive.M
	err = user_collection.FindOneAndUpdate(context.TODO(), bson.D{{"_id", _id}}, update, &returnOpr).Decode(&result)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	return "Password updated successfully", nil

}
