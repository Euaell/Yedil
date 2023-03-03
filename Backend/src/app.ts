import express, { Request, Response, NextFunction } from "express"
import { ErrorHandler } from "./middlewares/ErrorHandler"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import routes from "./routes"

const app = express()

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())
app.use(cookieParser())
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"))
app.use(cors({
	origin: true,
	credentials: true,
	exposedHeaders: ["token"]
}))

app.use("/api/v1/users", routes.UserRoute)
app.use("/api/v1/unverified-users", routes.UnverifiedUserRoute)
app.use("/api/v1/todolist", routes.TodoListRoute)
app.use("/api/v1/blogs", routes.BlogRoute)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Hello World!" })
})

app.use(ErrorHandler)

export default app
