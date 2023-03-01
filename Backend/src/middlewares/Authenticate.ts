import {Request, Response, NextFunction} from "express"
import UserModel, {IUser} from "../models/UserModel"

export default class Authenticate {

	public static async authenticate( req: Request, res: Response, next: NextFunction ): Promise<void> {
		try {
			const token = req.cookies.token || req.headers.token
			if (!token) {
				res.status(401).json({ message: 'Unauthorized' })
			}

			const user: IUser | null = await UserModel.findByToken(token)
			if (!user) {
				throw new Error("Invalid token")
			}

			const userObj = user.toObject()
			delete userObj.Password

			req.body.user = userObj
			next()
		} catch (error) {
			next(error)
		}
	}
}