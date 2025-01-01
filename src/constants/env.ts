import { config } from 'dotenv'
config()
export const CONFIG = {
    PORT:process.env.PORT as string,
    MONGO_URL: process.env.MONGO_URI as string,
    CLIENT_ID: process.env.CLIENT_ID as string,
    CLIENT_SECRET: process.env.CLIENT_SECRET as string,
    REDIRECT_URI: process.env.REDIRECT_URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string
}