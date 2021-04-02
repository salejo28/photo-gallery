import jwt from 'jsonwebtoken'
import config from '../config/config'

export const CheckAuth = async (req, res, next) => {

    try {
        
        const token = req.header('Authorization').replace('Bearer ', '')

        const decode = jwt.verify(token, config.TOKEN.SECRET_KEY)

        req.user = decode

        next()

    } catch (error) {
        res.status(401).send({error: 'Authentication problem!!'})
    }

}