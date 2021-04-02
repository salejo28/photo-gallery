import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'

import config from './config/config'
import routes from './router/router'

export async function App() {
    
    const app = express()

    // Config
    app.set('port', config.PORT)

    // Middlewares
    app.use(cors("http://localhost:5000", "http://localhost:3000"))
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(fileUpload())

    // Routes
    app.use('/api', routes.RouteImgUser)
    app.use('/api', routes.RouteFile)

    // Serve
    app.listen(app.get('port'), () => {
        console.log("\n\tListening [::]:", app.get('port'))
    })

}