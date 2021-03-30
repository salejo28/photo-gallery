package routes

import (
	"auth-photo-gallery/src/app/controllers"
	"net/http"
)

var user_routes = []Route{
	Route{
		Uri:          "/user",
		Method:       http.MethodGet,
		Handler:      controllers.GetUser,
		AuthRequired: true,
	},
	Route{
		Uri:          "/user/login",
		Method:       http.MethodPost,
		Handler:      controllers.Login,
		AuthRequired: false,
	},
	Route{
		Uri:          "/user/register",
		Method:       http.MethodPost,
		Handler:      controllers.Register,
		AuthRequired: false,
	},
	Route{
		Uri:          "/user/{fields}",
		Method:       http.MethodPut,
		Handler:      controllers.UpdateUser,
		AuthRequired: true,
	},
	Route{
		Uri:          "/user",
		Method:       http.MethodDelete,
		Handler:      controllers.DeleteUser,
		AuthRequired: true,
	},
}
