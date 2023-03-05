import { Response, Request, NextFunction } from "express"
import ToDoList, {ITodoList} from "../models/ToDoListModel"

import { Configuration, OpenAIApi } from 'openai'
import configs from "../config/configs";

const config = new Configuration({
	apiKey: configs.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export default class ToDoListController {
	public static async getToDoLists( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { user } = req.body
			const toDoLists: ITodoList[] = await ToDoList.find({user: user._id}).sort({ Deadline: 1 })
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
			const { Name, Tasks, Deadline } = req.body

			// map the tasks to the correct format
			const tasks = await Promise.all(Tasks.map(async ( task: string ) => {
				return {
					Description: task,
					isCompleted: false
				}
			}))
			const toDoList: ITodoList = await ToDoList.create({Name, Tasks, Deadline: Deadline ? Deadline : null, user: user._id })
			return res.status(201).json({toDoList})
		} catch (error) {
			next(error)
		}
	}

	public static async updateToDoListTasks( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { user, Tasks } = req.body
			const { id } = req.params
			const toDoList: ITodoList | null = await ToDoList.findById(id)
			if (toDoList) {
				// Check ownership
				if (toDoList.user.toString() !== user._id.toString()) {
					return res.status(403).json({message: "Not authorized"})
				}
				toDoList.Tasks = Tasks
				await toDoList.save()
				return res.status(200).json({ message: "ToDoList Updated!", toDoList})
			} else {
				return res.status(404).json({message: "ToDoList not found"})
			}
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

	public static async giveHelpForToDoList( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		try {
			const { id } = req.params
			const toDoList: ITodoList | null = await ToDoList.findById(id)
			if (!toDoList) {
				return res.status(404).json({message: "ToDoList not found"})
			}
			// const response: any = await openai.createCompletion({
			// 	model: 'text-davinci-003',
			// 	prompt: `This is a list of tasks that need to be done: ${toDoList.Tasks.map((task: any) => task.Description).join(", ")}. I need help with:`,
			// 	temperature: 0.9,
    		// 	stop: '\n'
			// })
			console.log(toDoList.Tasks.map((task: any) => task.Description).join(", "))
			console.log(`This is a list of tasks that need to be done: ${toDoList.Tasks.map((task: any) => task.Description).join(", ")}. I need help with:`)
			const response: any = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: `This is a list of tasks that need to be done: ${toDoList.Tasks.map((task: any) => task.Description).join(", ")}. I need help with:`,
				max_tokens: 200
			})
			return res.status(200).json({Suggestion: response.data.choices[0].text})

		} catch (error) {
			next(error)
		}
	}
}