import { Schema, model, Document } from 'mongoose'

export interface ITag extends Document {
	Name: string
	Blogs: Schema.Types.ObjectId[]
}

const TagSchema: Schema<ITag> = new Schema(
	{
		Name: {
			type: String,
			required: true,
			unique: true
		},
		Blogs: {
			type: [Schema.Types.ObjectId],
			ref: 'Blog',
			required: true,
			default: []
		}
	},
	{
		timestamps: true
	}
)

export default model<ITag>('Tag', TagSchema)