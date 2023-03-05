import { Response, Request, NextFunction } from "express";
import cloudinary, { UploadApiResponse } from 'cloudinary';

cloudinary.v2.config({
  cloud_name: "dc1nwdl5w",
  api_key: "913979689188428",
  api_secret: "j2v1lyj57OIYhC19nEE16ux_PD4"
});

export default class ImageController {
	public static async uploadImage( req: Request, res: Response, next: NextFunction) : Promise<Response> {
		try {
			const file = req.file
			if (!file) {
				return res.status(400).json({ message: 'Please upload a file' })
			}
			await cloudinary.v2.uploader.upload(file.path, (error: any, result: UploadApiResponse) => {
				if (error) {
					return res.status(400).json({ message: error.message })
				}
				return res.status(200).json({ message: 'File uploaded successfully', data: result })
			})

		} catch (error) {
			next(error)
		}
	}
}