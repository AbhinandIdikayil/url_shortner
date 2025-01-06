process.env.NODE_ENV = 'test';

import request from 'supertest';
import { beforeAll, afterAll, expect, it } from '@jest/globals';
import { startServer } from '../src/index'; // Path to your server file
import { describe } from 'node:test';
import { disconnectDB } from '../src/config/connection';
import { disconnectRedis } from '../src/config/redis';

let server: any;

beforeAll(async () => {
    server = await startServer();
    (global as any).server = server; // Explicitly cast `global`
});

afterAll(async () => {
    await disconnectDB();
    await disconnectRedis();
    if ((global as any).server) {
        await new Promise<void>((resolve) => {
            (global as any).server.close(() => {
                console.log('Global server closed');
                resolve();
            });
        });
    }
});


// describe('GET /', () => {
//     it('should return a 200 status and the correct message', async () => {
//         const response = await request(server).get('/');
//         expect(response.status).toBe(200);
//         expect(response.body.message).toBe('Url shortner!');
//         expect(response.body.links).toHaveProperty('api_doc');
//         expect(response.body.links).toHaveProperty('logout');
//         expect(response.body.links).toHaveProperty('login');
//     });
// });