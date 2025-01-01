import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Url shortner',
            version: '1.0.0',
            description: 'API documentation for the Url shortner',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.{ts,js}'], // Adjust the path to your controllers
};

export default swaggerOptions;
