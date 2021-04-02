import { Router } from 'express'

import { CheckAuth } from '../../auth/Auth'
import { DeleteFile, DownloadFile, UploadFile } from './../../controllers/file.controllers'

const router = Router()

function FileRoutes() {
    
    router.get('/#/:path?', CheckAuth, DownloadFile)
    router.post('/#/:path?', CheckAuth, UploadFile)
    router.delete('/#/:path', CheckAuth, DeleteFile)

}

FileRoutes()

export default router