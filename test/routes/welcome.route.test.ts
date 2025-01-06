import request from 'supertest';
import { expect, it } from '@jest/globals';
import { describe } from 'node:test';

describe('GET /', () => {
    it('should return a 200 status and the correct message', async () => {
        const response = await request((global as any).server).get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Url shortner!');
        expect(response.body.links).toHaveProperty('api_doc');
        expect(response.body.links).toHaveProperty('logout');
        expect(response.body.links).toHaveProperty('login');
    });
});
