package utils

import (
	"errors"
	"regexp"
)

func ValidateEmail(email string) bool {
	var regexEmail = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	return regexEmail.MatchString(email)
}

func MatchPasswords(password, confirmPassword string) bool {
	if password != confirmPassword {
		return false
	}

	return true
}

func Password(password string) error {

	if len(password) < 4 {
		return errors.New("Password must be at least 5 characters")
	}

	return nil

}
