import request from 'supertest';
import { expect, it } from '@jest/globals';
import { describe } from 'node:test';

describe('POST /api/shorten', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzRlOTM0MGY0OWFjNmIzNzA1ODI0MCIsImlhdCI6MTczNTg4NzU1MiwiZXhwIjoxNzM1OTczOTUyfQ.k_jdYL_jzDrwhBog08Qxa8WAwCnZ-GS-DmoSwlvrJcI';

    it('should return Token is not provided', async () => {
        const response = await request((global as any).server)
            .post('/api/shorten')
            .send({
                longUrl: 'https://example.com',
                customAlias: 'abhi',
                topic: 'activation'
            })

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Token is not provided');
    });


    it('should return Token  expired', async () => {
        const response = await request((global as any).server)
            .post('/api/shorten')
            .set('Authorization', `Bearer ${token}`)
            .send({
                longUrl: 'https://example.com',
                customAlias: 'abhi',
                topic: 'activation'
            })

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', expect.stringContaining('Token expired at'));
    });
});
