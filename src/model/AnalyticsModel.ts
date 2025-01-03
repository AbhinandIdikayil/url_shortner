import mongoose, { Document, Types } from "mongoose";
import { DB_enum } from "../constants/db";


export interface IAnalytics {
    userAgent: string,
    ipAddress: string,
    shortUrl_id: Types.ObjectId,
    timestamp: Date,
    userId: Types.ObjectId
}

export interface IAnalytic {
    shortUrl_Id: Types.ObjectId,
    device: string,
    os: string,
    userAgent: string,
    ipAddress: string,
    userId: Types.ObjectId
}
export interface IAnalyticsDoc extends Document {
    shortUrl_Id: Types.ObjectId,
    device: string,
    os: string,
    userAgent: string,
    ipAddress: string,
    timestamp: Date,
    userId: Types.ObjectId
}

const AnalyticsSchema = new mongoose.Schema<IAnalyticsDoc>({
    shortUrl_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DB_enum.SHORT_URL,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DB_enum.USER_MODEL,
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
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const AnalyticsModel = mongoose.model<IAnalyticsDoc>(DB_enum.ANALYTICS, AnalyticsSchema);