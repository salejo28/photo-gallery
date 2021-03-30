package models

import (
	"auth-photo-gallery/src/app/utils"
	"errors"
	"html"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID              primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Username        string             `json:"username" bson:"username"`
	Email           string             `json:"email" bson:"email"`
	Password        string             `json:"password" bson:"password"`
	ConfirmPassword string             `json:"confirmPassword" bson:"confirmPassword"`
	Img_Uri         string             `json:"img_uri" bson:"img_uri"`
	Current_Plan    string             `json:"current_plan" bson:"current_plan"`
	Created_At      time.Time          `json:"created_at" bson:"created_at"`
}

func (u *User) Prepare() {

	u.Username = html.EscapeString(strings.TrimSpace(u.Username))
	u.Email = html.EscapeString(strings.TrimSpace(u.Email))
	u.Password = html.EscapeString(strings.TrimSpace(u.Password))
	u.ConfirmPassword = html.EscapeString(strings.TrimSpace(u.ConfirmPassword))
	u.Img_Uri = html.EscapeString(strings.TrimSpace(u.Img_Uri))
	u.Current_Plan = html.EscapeString(strings.TrimSpace(u.Current_Plan))
	u.Created_At = time.Now()

}

func (u *User) Validate(action string) error {

	switch strings.ToLower(action) {
	case "update":
		if u.Username == "" {
			return errors.New("The username field is required!")
		}

		if u.Email == "" {
			return errors.New("The email field is required!")
		}

		if !utils.ValidateEmail(u.Email) {
			return errors.New("Invalid email address!")
		}
	case "register":
		if u.Username == "" {
			return errors.New("The username field is required!")
		}

		if u.Email == "" {
			return errors.New("The email field is required!")
		}

		if !utils.ValidateEmail(u.Email) {
			return errors.New("Ivalid email address!")
		}

		if u.Password == "" {
			return errors.New("Password field is required!")
		}

		if err := utils.Password(u.Password); err != nil {
			return err
		}

		if !utils.MatchPasswords(u.Password, u.ConfirmPassword) {
			return errors.New("Passwords don't match!")
		}
	case "login":
		if u.Email == "" {
			return errors.New("The email field is required!")
		}

		if !utils.ValidateEmail(u.Email) {
			return errors.New("Ivalid email address!")
		}

		if u.Password == "" {
			return errors.New("Password field is required!")
		}
	}

	return nil

}
