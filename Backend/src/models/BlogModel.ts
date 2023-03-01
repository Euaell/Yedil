import { Schema, Document, model } from "mongoose"

export interface IBlog extends Document {
	Title: string
	picture: string
	Content: string
	author: Schema.Types.ObjectId
}

const TodoListSchema: Schema<IBlog> = new Schema(
	{
		Title: {
			type: String,
			required: true
		},
		picture: {
			type: String,
			required: false
		},
		Content: {
			type: String,
			required: true
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		}
	}, {
		timestamps: true
	})

export default model<IBlog>("Blog", TodoListSchema)