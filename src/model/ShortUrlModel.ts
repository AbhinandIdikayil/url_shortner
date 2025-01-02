import mongoose, { Document, Schema, Types } from "mongoose"
import { ShortUrlTopicENUM } from "../constants/enum/topic"
import { DB_enum } from "../constants/db"

export interface ShortUrlDoc extends Document {
    longUrl: string
    alias: string,
    userId: Types.ObjectId,
    topic: ShortUrlTopicENUM,
    createdAt: string,
    totalClicks: number
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
    },
    totalClicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const ShortUrlModel = mongoose.model<ShortUrlDoc>(DB_enum.SHORT_URL, ShortUrlSchema);