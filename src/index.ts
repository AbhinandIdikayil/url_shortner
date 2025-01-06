import { CONFIG } from './constants/env';
import { connectDB, disconnectDB } from './config/connection';
import { connectRedis, disconnectRedis } from './config/redis';
import express, { Request, Response } from 'express'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger.config';
import { allRoute } from './routes';
import { errorHandler } from './middlewares/ErrorMiddleware';
import swaggerUi from 'swagger-ui-express';

export const startServer = async () => {

    const app = express();
    app.use(express.json());

    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api', allRoute);

    app.get("/", (req: Request, res: Response) => {
        const responsePayload = {
            message: `Url shortner!`,
            links: {
                api_doc: `${CONFIG.URL}/api-docs`,
                logout: `${CONFIG.URL}/logout`,
                login: `${CONFIG.URL}/google/signup`
            },
        };
        return res.status(200).json(responsePayload);
    });

    app.use(errorHandler);

    await connectDB();
    await connectRedis();

    const server = app.listen(CONFIG.PORT, () => {
        console.log(`Server is running on ${CONFIG.PORT}`);
    });

    const shutdown = async () => {
        console.log('Shutting down gracefully...');
        server.close(async () => {
            await disconnectDB();
            await disconnectRedis();
            console.log('Server closed');
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    return server;
};

if (require.main === module) {
    startServer();
}