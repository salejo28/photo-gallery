import { Schema, model } from 'mongoose'

const FileSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    uriFile: {
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

const File = model('File', FileSchema)

export default File