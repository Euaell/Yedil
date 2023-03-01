import { Schema, Document, model} from "mongoose"
import nodemailer from "nodemailer"
import configs from "../config/configs";
import bcrypt from "bcrypt";

export interface IUnverifiedUser extends Document {
	email: string
	verificationCode: string
	verifyCode: (code: string) => Promise<string>
}

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: configs.EMAIL,
		pass: configs.PASS
	},
})

export function getMailOptions(email: string, verificationCode: string): object {
	return {
		from: configs.EMAIL,
		to: email,
		subject: "Verify your email",
		html: `
			<h3>Dear user,</h3>
			<p>Thank you for signing up for our service! To complete your registration, please enter the following verification code on our website:</p>
			<p><strong>Verification code:</strong> ${ verificationCode }</p>
			<p>Please note that this code is only valid for 24 hours.</p>
			<p>If you did not sign up for our service, please ignore this email.</p>
			<p>Thank you,</p>
			<p>The YEDIL Team</p>
		`,
	}
}

const UnverifiedUserSchema: Schema<IUnverifiedUser> = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true
		},
		verificationCode: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	})

UnverifiedUserSchema.methods.verifyCode = async function(code: string): Promise<string> {
	try {
		const authCode = await bcrypt.compare(code, this.verificationCode)
		// check if the code has expired
		if (Date.now() - this.createdAt.getTime() > 86400000) {
			return "Code Expired"
		}
		if (!authCode) {
			return "Invalid Code!"
		}
		return "Success"
	} catch (error) {
		throw new Error(error)
	}
}

UnverifiedUserSchema.pre("save", async function(next) {
	try {
		const mailOptions = getMailOptions(this.email, this.verificationCode)
		await transporter.sendMail(mailOptions)

		// Hashing the verification code
		const salt = await bcrypt.genSalt();
		this.verificationCode = await bcrypt.hash(this.verificationCode, salt);

		next()
	} catch (error) {
		next(error)
	}
})

export default model<IUnverifiedUser>("UnverifiedUser", UnverifiedUserSchema)