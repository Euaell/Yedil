import { Schema, Document, model } from "mongoose"

export interface IBlog extends Document {
	Title: string
	Picture: string
	Description: string
	Content: string
	author: Schema.Types.ObjectId
	Tags: Schema.Types.ObjectId[]
}

const TodoListSchema: Schema<IBlog> = new Schema(
	{
		Title: {
			type: String,
			required: true
		},
		Picture: {
			type: String,
			required: true
		},
		Description: {
			type: String,
			required: true
		},
		Content: {
			type: String,
			required: true
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		Tags: {
			type: [Schema.Types.ObjectId],
			ref: "Tag",
			required: true,
			default: []
		}
	}, {
		timestamps: true
	})

export default model<IBlog>("Blog", TodoListSchema)