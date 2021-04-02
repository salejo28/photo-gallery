import { config } from 'dotenv'

config()

export default {

    DB: {
        DB_URI: process.env.DB_URI
    },
    PORT: process.env.PORT || 4000,
    CLOUDINARY: {
        CLOUD_NAME: process.env.CLOUD_NAME,
        API_KEY: process.env.API_KEY,
        API_SECRET: process.env.API_SECRET
    },
    TOKEN: {
        SECRET_KEY: process.env.JWT_TOKEN_KEY
    },
    STORAGE: {
        PATH: process.env.STORAGE_PATH
    },
    API: {
        URL: process.env.URL_API_AUTH
    }

}