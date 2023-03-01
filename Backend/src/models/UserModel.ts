import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export enum UserRole {
    ADMIN = "admin",
    NORMAL = "normal"
}

export enum GenderEnum {
    Male = "male",
    Female = "female"
}

export interface IUser extends Document{
    FirstName: string
    LastName: string
    Gender: GenderEnum
    Email: string
    Password: string
    Role: UserRole
    CreatedAt: Date
    UpdatedAt: Date
}

const UserSchema: Schema<IUser> = new Schema(
    {
        FirstName: {
            type: String,
            required: true
        },
        LastName: {
            type: String,
            required: true
        },
        Gender: {
            type: String,
            enum: Object.values(GenderEnum),
            required: true
        },
        Email: {
            type: String,
            required: true,
            unique: true
        },
        Password: {
            type: String,
            required: true
        },
        Role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.NORMAL
        }
    },
    {
        timestamps: true
    }
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) {
        next()
    }
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
})


export default model<IUser>("User", UserSchema)