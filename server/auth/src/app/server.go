package app

import (
	"auth-photo-gallery/src/app/router"
	"auth-photo-gallery/src/auto"
	"auth-photo-gallery/src/config"
	"fmt"
	"log"
	"net/http"
)

func Run() {
	config.Load()
	auto.Load()
	fmt.Printf("\n\tListening [::]:%d\n", config.PORT)
	listen(config.PORT)
}

func listen(port int) {
	r := router.New()
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), router.LoadCORS(r)))
}
