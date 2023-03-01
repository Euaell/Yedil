import { Response, Request, NextFunction } from "express"
import ToDoList, {ITodoList} from "../models/ToDoListModel"

export default class ToDoListController {
	public static async getToDoLists( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { user } = req.body
			const toDoLists: ITodoList[] = await ToDoList.find({user: user._id})
			return res.status(200).json({toDoLists})
		} catch (error) {
			next(error)
		}
	}

	public static async getToDoList( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { user } = req.body
			const { id } = req.params
			const toDoList: ITodoList | null = await ToDoList.findOne({_id: id, user: user._id})
			if (toDoList) {
				return res.status(200).json({toDoList})
			} else {
				return res.status(404).json({message: "ToDoList not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async createToDoList( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { user } = req.body
			const { Name, tasks } = req.body
			const toDoList: ITodoList = await ToDoList.create({ Name, tasks, user: user._id })
			return res.status(201).json({toDoList})
		} catch (error) {
			next(error)
		}
	}

	public static async updateToDoList( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { user } = req.body
			const { id } = req.params
			const toDoList: ITodoList | null = await ToDoList.findByIdAndUpdate(id, req.body, {new: true})
			if (toDoList) {
				return res.status(200).json({toDoList})
			} else {
				return res.status(404).json({message: "ToDoList not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async deleteToDoList( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const toDoList: ITodoList | null = await ToDoList.findByIdAndDelete(req.params.id)
			if (toDoList) {
				return res.status(200).json({toDoList})
			} else {
				return res.status(404).json({message: "ToDoList not found"})
			}
		} catch (error) {
			next(error)
		}
	}
}