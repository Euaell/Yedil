import { Request, Response, NextFunction } from 'express'
import Blog, { IBlog } from "../models/BlogModel"
import {Schema} from "mongoose";
import TagModel, {ITag} from "../models/TagModel";

export default class BlogController {
	public static async getBlogs( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const blogs: IBlog[] = await Blog.find()
			return res.status(200).json({blogs})
		} catch (error) {
			next(error)
		}
	}

	public static async getBlogsByUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { user } = req.body
			const blogs: IBlog[] = await Blog.find({author: user._id})
			return res.status(200).json({blogs})
		} catch (error) {
			next(error)
		}
	}

	public static async getBlog( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { user } = req.body
			const { id } = req.params
			const blog: IBlog | null = await Blog.findOne({_id: id, author: user._id})
			if (blog) {
				return res.status(200).json({blog})
			} else {
				return res.status(404).json({message: "Blog not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async createBlog( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { user } = req.body
			const { Title, Content, Tags } : { Title: string, Content: string, Tags: string[] } = req.body

			const tags: Schema.Types.ObjectId[] = await Promise.all(Tags.map( async (tag: string) : Promise<Schema.Types.ObjectId> => {
				const DbTag: ITag = await TagModel.findOne({ Name: tag })

				if (DbTag) {
					return DbTag._id
				} else {
					const newTag: ITag = await TagModel.create({ Name: tag, Blogs: [] })
					return newTag._id
				}
			}))

			const blog: IBlog = await Blog.create({ Title, Content, author: user._id, Tags: tags })

			for (const tag of tags) {
				await TagModel.findByIdAndUpdate(tag, { $push: { Blogs: blog._id } })
			}

			return res.status(201).json({blog})
		} catch (error) {
			next(error)
		}
	}

	public static async updateBlog( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { id } = req.params
			const blog: IBlog | null = await Blog.findByIdAndUpdate(id, req.body, {new: true})
			if (blog) {
				return res.status(200).json({blog})
			} else {
				return res.status(404).json({message: "Blog not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async deleteBlog( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const blog: IBlog | null = await Blog.findByIdAndDelete(req.params.id)
			if (blog) {
				return res.status(200).json({blog})
			} else {
				return res.status(404).json({message: "Blog not found"})
			}
		} catch (error) {
			next(error)
		}
	}
}