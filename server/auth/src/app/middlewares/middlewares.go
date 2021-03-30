package middlewares

import (
	"auth-photo-gallery/src/app/auth"
	"auth-photo-gallery/src/app/responses"
	"log"
	"net/http"
)

func SetMiddlewaresLogger(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("\n%s %s%s %s", r.Method, r.Host, r.RequestURI, r.Proto)
		next(w, r)
	}
}

func SetMiddlewareJSON(next http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		rw.Header().Set("Content-Type", "application/json")
		next(rw, r)
	}
}

func SetMiddlwareAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {

		err := auth.TokenValid(r)
		if err != nil {
			responses.ERROR(rw, http.StatusUnauthorized, err)
			return
		}

		next(rw, r)
	}
}
