import { Response, Request, NextFunction } from "express";
import cloudinary, { UploadApiResponse } from 'cloudinary';
import configs from "../config/configs";

cloudinary.v2.config({
  cloud_name: configs.CLOUDINARY_NAME,
  api_key: configs.CLOUDINARY_API_KEY,
  api_secret: configs.CLOUDINARY_API_SECRET
});

export default class ImageController {
	public static async uploadImage( req: Request, res: Response, next: NextFunction) : Promise<Response> {
		try {
			const file = req.file
			if (!file) {
				return res.status(400).json({ message: 'Please upload a file' })
			}

			// // upload using disk storage
			// await cloudinary.v2.uploader.upload(file.path, (error: any, result: UploadApiResponse) => {
			// 	if (error) {
			// 		return res.status(400).json({ message: error.message })
			// 	}
			// 	return res.status(200).json({ message: 'File uploaded successfully', data: result })
			// })

			// 	upload from file.buffer using memory storage
			await cloudinary.v2.uploader.upload_stream((error: any, result: UploadApiResponse) => {
				if (error) {
					return res.status(400).json({ message: error.message })
				}
				return res.status(200).json({ message: 'File uploaded successfully', data: result })
			}).end(file.buffer)

		} catch (error) {
			next(error)
		}
	}
}