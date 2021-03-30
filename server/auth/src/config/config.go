package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

var (
	PORT             = 0
	SECRET_KEY_TOKEN = ""
	ROOT_PATH        = ""
	PATH_STORAGE     = ""
)

func Load() {

	var err error

	err = godotenv.Load()
	if err != nil {
		log.Println(err)
	}

	PORT, err = strconv.Atoi(os.Getenv("API_PORT"))
	if err != nil {
		log.Println(err)
		PORT = 8080
	}

	SECRET_KEY_TOKEN = os.Getenv("ACCESS_SECRET_TOKEN")
	ROOT_PATH = os.Getenv("ROOT_PATH")
	PATH_STORAGE = os.Getenv("STORAGE_PATH")

}
