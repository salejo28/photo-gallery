package controllers

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ExistEmail(email string) bool {

	var decodeUser primitive.M
	err := user_collection.FindOne(context.TODO(), bson.D{{"email", email}}).Decode(&decodeUser)
	if err != nil {
		return false
	}

	return true

}

func ExistUsername(username string) bool {

	var decodeUsername primitive.M
	err := user_collection.FindOne(context.TODO(), bson.D{{"username", username}}).Decode(&decodeUsername)
	if err != nil {
		return false
	}

	return true

}
