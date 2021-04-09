# Server with go

## Init project
Create dir root for your project
```
mkdir name_dir
```
Navigate into your dir
```
cd name_dir
```
Initilize a go project
```
go mod init your name-project or github
```

## Packages
### Mongo DB
This package allows you to use the mongo db database that you should already have on your computer.
The installation is:
```
go get go.mongodb.org/mongo-driver
```
### Mux
This package allows you to do a simple rest api.
The installation is:
```
go get github.com/gorilla/mux
```
And other package that allows you to use cors is:
```
go get github.com/gorilla/handlers
```
### JWT
This package allows you to use the jsonwebtokens.
The installation is:
```
go get github.com/dgrijalva/jwt-go
```
### Godotenv
This package allows you to use the enviorment variables.
The installation is:
```
go get github.com/joho/godotenv
```
### Crypto
This package allows you to encrypt the password user to save it in the database.
The installation is:
```
go get golang.org/x/crypto
```

## Folder Structure
```
├── go.mod
├── go.sum
└── src
    ├── app                                    
    │   ├── auth
    │   │   └── token.go
    │   ├── controllers
    │   │   ├── exist_user.go
    │   │   ├── size_user.go
    │   │   ├── update_user.go
    │   │   └── user_controllers.go
    │   ├── db
    │   │   └── database.go
    │   ├── lib
    │   │   └── Size.go
    │   ├── middlewares
    │   │   └── middlewares.go
    │   ├── models
    │   │   └── User.go
    │   ├── responses
    │   │   └── json.go
    │   ├── router
    │   │   ├── cors.go
    │   │   ├── router.go
    │   │   └── routes
    │   │       ├── routes.go
    │   │       └── user_routes.go
    │   ├── security
    │   │   └── password.go
    │   ├── server.go
    │   └── utils
    │       └── Validation.go
    ├── auto
    │   └── auto.go
    ├── config
    │   └── config.go
    └── main
        └── main.go   

```
## Start your project
```
go build src/main/main.go
```
Execute the application
```
./main
```
