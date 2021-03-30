package routes

import (
	"auth-photo-gallery/src/app/middlewares"
	"net/http"

	"github.com/gorilla/mux"
)

type Route struct {
	Uri          string
	Method       string
	Handler      func(http.ResponseWriter, *http.Request)
	AuthRequired bool
}

func Load() []Route {
	routes := user_routes
	return routes
}

func SetupRoutesWithMiddlewares(r *mux.Router) *mux.Router {
	for _, route := range Load() {
		if route.AuthRequired {

			r.HandleFunc(route.Uri, middlewares.SetMiddlewaresLogger(
				middlewares.SetMiddlewareJSON(
					middlewares.SetMiddlwareAuth(route.Handler))),
			).Methods(route.Method)

		} else {

			r.HandleFunc(route.Uri, middlewares.SetMiddlewaresLogger(
				middlewares.SetMiddlewareJSON(route.Handler)),
			).Methods(route.Method)

		}
	}
	return r
}
