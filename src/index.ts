import express from 'express'
import { CONFIG } from './constants/env'
import { connectDB } from './config/connection'
import { errorHandler } from './middlewares/ErrorMiddleware'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './config/swagger.config';
import { allRoute } from './routes'
const app = express()


app.use(express.json())

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', allRoute)


app.use(errorHandler)

app.listen(CONFIG.PORT, async () => {
    await connectDB();
    console.log(`Server is running on ${CONFIG.PORT}`)
})