import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'
const MONGO_DB = process.env.MONGO_DB || "yedil"
const EMAIL = process.env.EMAIL
const PASS = process.env.PASSWORD
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'


export default {
    PORT,
    HOST,
    MONGO_URI,
    MONGO_DB,
    EMAIL,
    PASS,
    JWT_SECRET,
    JWT_EXPIRES_IN
}