import cloudinary from 'cloudinary'
import path from 'path'
import fs from 'fs'

import config from '../config/config'


cloudinary.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET
})

function moveFileRelativeStorage(file, dir, res) {
    const filePath = path.join(dir, file.name)

    return new Promise((resolve, reject) => {
        fs.promises.access(filePath)
        .then(() => {
            res.json({
                message: "File name already exists"
            })
        })
        .catch(() => {
            file.mv(filePath, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }) 
        })
    })
}

async function deleteFromRelativeStorage(file, dir) {
    const filePath = path.join(dir, file.name)

    await fs.unlinkSync(filePath)
}

export async function UploadToCloudinary(file, res) {
    
    try {
        
        const relativeStorage = path.join(__dirname, '../uploads')

        file.name = Date.now() + "-" + file.name
        
        await moveFileRelativeStorage(file, relativeStorage, res)

        const locationImg = path.join(relativeStorage, file.name)

        const update = await cloudinary.v2.uploader.upload(locationImg)

        await deleteFromRelativeStorage(file, relativeStorage)

        return update.url

    } catch (error) {
        console.log(error)
    }

}