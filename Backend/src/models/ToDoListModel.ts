import { Schema, Document, model } from "mongoose"

export interface ITodoList extends Document {
    Name: string
    Tasks: {
        Description: string
        isCompleted: boolean
    }[]
    Deadline: Date
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
        Tasks: {
            type: [
                {
                    Description: {
                        type: String,
                        required: true
                    },
                    isCompleted: {
                        type: Boolean,
                        required: true,
                        default: false
                    }
                }
            ],
            required: true,
            default: []
        },
        Deadline: {
            type: Date,
            required: false
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