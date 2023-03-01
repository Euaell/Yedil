import { Response, Request, NextFunction } from "express"
import UnverifiedUserModel, { IUnverifiedUser } from "../models/UnverifiedUserModel"
import UserModel, {IUser} from "../models/UserModel";

export default class UnverifiedUserController {
	public static async getUnverifiedUsers( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const unverifiedUsers = await UnverifiedUserModel.find()
			return res.status(200).json({unverifiedUsers})
		} catch (error) {
			next(error)
		}
	}

	public static async getUnverifiedUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const unverifiedUser = await UnverifiedUserModel.findById(req.params.id)
			if (unverifiedUser) {
				return res.status(200).json({unverifiedUser})
			} else {
				return res.status(404).json({message: "User not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async createUnverifiedUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const {email} = req.body

			const user: IUser | null = await UserModel.findOne({ email })
			if (user) {
				return res.status(400).json({message: "User already exists"})
			}

			const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
			const unverifiedUser = await UnverifiedUserModel.create({email, verificationCode})

			return res.status(201).json({unverifiedUser})
		} catch (error) {
			next(error)
		}
	}

	public static async verifyUnverifiedUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { email, verificationCode } = req.body

			const unverifiedUser: IUnverifiedUser | null = await UnverifiedUserModel.findOne({ email })
			if (unverifiedUser) {
				const authMessage: string = await unverifiedUser.verifyCode(verificationCode)
                if (authMessage !== "Success") {
                    return res.status(400).json({message: authMessage})
                }
				return res.status(200).json({message: "User verified"})

			} else {
				return res.status(404).json({message: "User not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async deleteUnverifiedUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const unverifiedUser = await UnverifiedUserModel.findByIdAndDelete(req.params.id)
			if (unverifiedUser) {
				return res.status(200).json({message: "User deleted"})
			} else {
				return res.status(404).json({message: "User not found"})
			}
		} catch (error) {
			next(error)
		}
	}
}