import mongoose, { Document, Schema, Types } from 'mongoose'
import { DB_enum } from '../constants/db';

export interface User extends Document {
    _id: Types.ObjectId | string,
    name: string
    email: string,
    googleId: string,
}


const userSchema = new Schema<User>({
    email: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    googleId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const UserModel = mongoose.model<User>(DB_enum.USER_MODEL, userSchema);