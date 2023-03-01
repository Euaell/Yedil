import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'
const MONGO_DB = process.env.MONGO_DB || "yedil"


export default {
    PORT,
    HOST,
    MONGO_URI,
    MONGO_DB
}