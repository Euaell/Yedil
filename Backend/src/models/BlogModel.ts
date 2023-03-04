import { Schema, Document, model } from "mongoose"

export interface IBlog extends Document {
	Title: string
	picture: string
	Content: string
	author: Schema.Types.ObjectId
	Tags: Schema.Types.ObjectId[]
}
// TODO: create a schema for TAGS, that has a name and a list of blogs that have that tag(used for search and filtering)

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