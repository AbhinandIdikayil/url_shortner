import { createClient } from 'redis'
import { CONFIG } from '../constants/env'

export const redisClient = createClient({
    username: 'default',
    password: CONFIG.REDIS_PASSWORD,
    socket: {
        host: CONFIG.REDIS_URL,
        port: CONFIG.REDIS_PORT
    }
})

redisClient.on('connect', () => console.log('Redis client connected'));
redisClient.on('error', (err) => console.error('Redis error:', err));

export const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
            console.log('Connected to Redis');
        }
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
};

export const disconnectRedis = async () => {
    try {
        if (redisClient.isOpen) {
            await redisClient.quit();
            console.log("Disconnected from Redis");
        }
    } catch (error) {
        console.error('Failed to disconnect Redis:', error);
    }
};

