import { Response, Request, NextFunction } from "express"
import TagModel, {ITag} from "../models/TagModel";

export default class TagController {
	public static async createTag(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { Name } = req.body
			// check if the tag already exists
			if (await TagModel.findOne({Name})) {
				return res.status(400).json({message: "Tag already exists"})
			}
			const tag: ITag = await TagModel.create({Name, Blogs: []})
			return res.status(201).json({tag})
		} catch (error) {
			next(error)
		}
	}

	public static async getTags(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			// TODO: sort by most used tags
			const tags: ITag[] = await TagModel.find()
			return res.status(200).json({tags})
		} catch (error) {
			next(error)
		}
	}

	public static async getTag(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const {Name} = req.params
			// populate the blogs array with the blogs that have that tag
			const tag: ITag = await TagModel.findOne({Name}).populate("Blogs", "Title Content picture author")

			if (!tag) {
				return res.status(404).json({message: "Tag not found"})
			}

			return res.status(200).json({tag})
		} catch (error) {
			next(error)
		}
	}

	public static async updateTag(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { Name } = req.params
			const { newName } = req.body

			const newTag: ITag = await TagModel.findOneAndUpdate({ Name }, {Name: newName}, {new: true})

			if (!newTag) {
				return res.status(404).json({message: "Tag not found"})
			}

			return res.status(200).json({newTag})
		} catch (error) {
			next(error)
		}
	}

	public static async deleteTag(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { Name } = req.params
			// TODO: delete the tag from all the blogs that have it
			const tag: ITag = await TagModel.findOneAndDelete({ Name })

			if (!tag) {
				return res.status(404).json({message: "Tag not found"})
			}

			return res.status(200).json({message: "Tag deleted"})
		} catch (error) {
			next(error)
		}
	}

}