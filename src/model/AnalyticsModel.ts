import mongoose, { Document, Types } from "mongoose";
import { DB_enum } from "../constants/db";

export interface IAnalyticsDoc extends Document {
    shortUrl_Id: Types.ObjectId,
    device: string,
    os: string,
    userAgent: string,
    ipAddress: string,
}

const AnalyticsSchema = new mongoose.Schema<IAnalyticsDoc>({
    shortUrl_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DB_enum.SHORT_URL,
        required: true,
    },
    device: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    }
})

export const AnalyticsModel = mongoose.model<IAnalyticsDoc>(DB_enum.ANALYTICS, AnalyticsSchema);