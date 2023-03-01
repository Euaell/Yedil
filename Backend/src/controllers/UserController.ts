import { Response, Request, NextFunction } from "express"
import User, { IUser } from "../models/UserModel"

export default class UserController {
    public static async getUsers( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const users: IUser[] = await User.find()
            return res.status(200).json({users})
        } catch (error) {
            next(error)
        }
    }

    public static async getUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const user: IUser | null = await User.findById(req.params.id)
            if (user) {
                return res.status(200).json({user})
            } else {
                return res.status(404).json({message: "User not found"})
            }
        } catch (error) {
            next(error)
        }
    }
}