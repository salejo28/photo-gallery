import { Schema, model } from 'mongoose'

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    uriAlbum: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now   
    }
})

const Album = model('Album', AlbumSchema)

export default Album