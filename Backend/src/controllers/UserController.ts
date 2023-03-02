import { Response, Request, NextFunction } from "express"
import User, {GenderEnum, IUser} from "../models/UserModel"
import UnverifiedUserModel, {IUnverifiedUser} from "../models/UnverifiedUserModel";
import UserModel from "../models/UserModel";

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

    public static async createUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { Email, verificationCode, FirstName, LastName, Password } = req.body
            const Gender: GenderEnum = req.body.Gender
            const unverifiedUser: IUnverifiedUser | null = await UnverifiedUserModel.findOne({ email: Email })
			if (unverifiedUser) {
                const authMessage: string = await unverifiedUser.verifyCode(verificationCode)
                if (authMessage !== "Success") {
                    return res.status(400).json({message: authMessage})
                }
                await UnverifiedUserModel.findByIdAndDelete(unverifiedUser._id)
			} else {
				return res.status(404).json({message: "User not found"})
			}

            const user: IUser = await User.create({ Email, FirstName, LastName, Password, Gender })
            return res.status(201).json({user})
        } catch (error) {
            next(error)
        }
    }

    public static async loginUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const {Email, Password} = req.body
            const user: IUser | null = await UserModel.findOne({Email})
            if (!user) {
                return res.status(400).json({message: "Incorrect Credentials"})
            }
            const authMessage: boolean = await user.ComparePassword(Password)
            if (!authMessage) {
                return res.status(400).json({message: "Incorrect Password"})
            }
            const userObj = user.toObject()
			delete userObj.Password

            const token = user.GenerateToken()

            res.cookie("token", token, {httpOnly: true})
            return res.status(200).json({
                user: userObj,
                message: "Logged in"
            })
        } catch (error) {
            next(error)
        }
    }

    public static async logoutUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        res.clearCookie("token")
        return res.status(200).json({message: "Logged out"})
    }

    public static async verifyUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { user } = req.body
			return res.status(200).json({ message: "User verified", user })
        } catch (error) {
            next(error)
        }
    }

    public static async updateUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { id } = req.params
            const user: IUser | null = await User.findByIdAndUpdate(id, req.body, {new: true})
            if (user) {
                return res.status(200).json({user})
            } else {
                return res.status(404).json({message: "User not found"})
            }
        } catch (error) {
            next(error)
        }
    }

    public static async deleteUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { id } = req.params
            const user: IUser | null = await User.findByIdAndDelete(id)
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