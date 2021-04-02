import { Router } from 'express'
import axios from 'axios'

import { CheckAuth } from '../../auth/Auth'
import { UploadToCloudinary } from '../../middlewares/Coudinary'
import config from '../../config/config'

const router = Router()

function RouteImgUser() {


    router.post('/user/image', CheckAuth, async (req, res) => {

        const token = req.header('Authorization')
        if (!req.files) {
            return res.json({
                error: "File not selected"
            })
        }

        const { file } = req.files

        const urlImg = await UploadToCloudinary(file, res)

        const data = {
            "img_uri": urlImg
        }

        const response = await axios.put(config.API.URL, data, { headers: { 'Authorization': token } })

        return res.json({
            message: response.data.message
        })
        
    })

}

RouteImgUser()

export default router