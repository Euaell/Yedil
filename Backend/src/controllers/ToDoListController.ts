import { Response, Request, NextFunction } from "express"
import ToDoList, {ITodoList} from "../models/ToDoListModel"

export default class ToDoListController {
	public static async getToDoLists( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const toDoLists: ITodoList[] = await ToDoList.find()
			return res.status(200).json({toDoLists})
		} catch (error) {
			next(error)
		}
	}

	public static async getToDoList( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const toDoList: ITodoList | null = await ToDoList.findById(req.params.id)
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
			const toDoList: ITodoList = await ToDoList.create(req.body)
			return res.status(201).json({toDoList})
		} catch (error) {
			next(error)
		}
	}

	public static async updateToDoList( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
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