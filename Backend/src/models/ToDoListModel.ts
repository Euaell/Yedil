import { Schema, Document, model } from "mongoose"

export interface ITodoList extends Document {
    Name: string
    tasks: string[]
    user: Schema.Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const TodoListSchema: Schema<ITodoList> = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        tasks: {
            type: [String],
            required: true,
            default: []
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        }
    })

export default model<ITodoList>("TodoList", TodoListSchema)