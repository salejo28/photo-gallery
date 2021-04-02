import mongoose from 'mongoose'
import config from './config/config'

const connect = mongoose.connect(config.DB.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(db => console.log("\tDB is connected"))
.catch(err => console.log(err))


export default connect