import mongoose, { Schema, Types } from "mongoose"
import { ShortUrlTopicENUM } from "../constants/enum/topic"
import { DB_enum } from "../constants/db"

export interface ShortUrlDoc extends Document {
    longUrl: string
    alias: string,
    userId: Types.ObjectId,
    topic: ShortUrlTopicENUM,
    createdAt: string
}

const ShortUrlSchema = new Schema<ShortUrlDoc>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DB_enum.USER_MODEL,
        required: true
    },
    alias: {
        type: String,
        required: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        enum: Object.values(ShortUrlTopicENUM)
    }
}, { timestamps: true });

export const ShortUrlModel = mongoose.model<ShortUrlDoc>(DB_enum.SHORT_URL, ShortUrlSchema);