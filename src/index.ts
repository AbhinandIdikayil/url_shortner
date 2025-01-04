import express, { Request, Response } from 'express'
import { CONFIG } from './constants/env'
import { connectDB } from './config/connection'
import { errorHandler } from './middlewares/ErrorMiddleware'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './config/swagger.config';
import { allRoute } from './routes'
import { connectRedis, disconnectRedis } from './config/redis';
const app = express()


const startServer = () => {
    app.use(express.json())
    const swaggerSpec = swaggerJsdoc(swaggerOptions);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api', allRoute);

    app.get("/", (req: Request, res: Response) => {

        const responsePayload = {
            message: `Url shortner!`,
            links: {
                api_doc:`${CONFIG.URL}/api-docs`,
                logout: `${CONFIG.URL}/logout`,
                login: `${CONFIG.URL}/google/signup`
            },
        }

        res.status(200).json(responsePayload);
    });

    app.use(errorHandler);

    const server = app.listen(CONFIG.PORT, async () => {
        await connectDB();
        await connectRedis()
        console.log(`Server is running on ${CONFIG.PORT}`)
    })

    const shutdown = async () => {
        console.log('Shutting down gracefully...');
        await disconnectRedis();
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

startServer()