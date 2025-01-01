import mongoose from "mongoose"
import { CONFIG } from "../constants/env"


export const connectDB = async () => {
    try {
        await mongoose.connect(CONFIG.MONGO_URL)
        console.log('Connected to database')
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}