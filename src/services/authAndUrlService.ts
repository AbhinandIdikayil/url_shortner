import { CONFIG } from "../constants/env"
import { AuthAndUrlIService } from "../interfaces/IService"
import { OAuth2Client } from 'google-auth-library'
import ErrorResponse from "../utils/ErrorResponse"
import { generateToken } from "../utils/genereteToken"
import { CreateUrl } from "../interfaces/User"
import { generateAlias } from "../utils/generateAlias"
import { ShortUrlTopicENUM } from "../constants/enum/topic"
import { ShortUrlDoc } from "../model/ShortUrlModel"
import { redisClient } from "../config/redis"
import { AuthAndUrlIRepo } from "../interfaces/IRepo"

const client = new OAuth2Client(CONFIG.CLIENT_ID, CONFIG.CLIENT_SECRET, CONFIG.REDIRECT_URI)

export class AuthAndUrlService implements AuthAndUrlIService {
    private repository: AuthAndUrlIRepo
    constructor(repository: AuthAndUrlIRepo) {
        this.repository = repository
    }
    async signin(id_token: string): Promise<{ email: string, token: string, name: string }> {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: CONFIG.CLIENT_ID,
        });
        const payload = ticket.getPayload()
        console.log(payload)
        if (!payload) {
            throw ErrorResponse.badRequest('Invaild token')
        }
        const { sub: googleId, email, name } = payload;
        if (!email || !name) {
            throw ErrorResponse.badRequest('Invaild token')

        }
        let user = await this.repository.findByGoogleId(googleId)
        let token
        if (!user) {
            user = (await this.repository.create({ name, email, googleId }))
            token = generateToken(user._id)
        }
        token = generateToken(user?._id);

        return { email: user.email, name: user.name, token }
    }


    async createShortUrl(data: CreateUrl): Promise<{ shortUrl: string; createdAt: string }> {
        let { longUrl, userId, alias, topic } = data
        if (!alias) {
            alias = generateAlias()
        }
        if (!topic) {
            topic = ShortUrlTopicENUM.OTHER
        }
        const existing = await this.repository.findByAlias(alias);
        if (existing) {
            throw ErrorResponse.badRequest('Alias already exist')
        }
        const createdUrl = await this.repository.createShortUrl({ longUrl, alias, topic, userId })
        return {
            shortUrl: `${CONFIG.URL}/api/shorten/${createdUrl.alias}`,
            createdAt: createdUrl.createdAt
        }
    }

    async redirectShortUrl(alias: string): Promise<ShortUrlDoc> {
        const cachedUrl = await redisClient.get(alias);
        if (cachedUrl) {
            console.log('getting data from cache');
            return JSON.parse(cachedUrl) as ShortUrlDoc;
        }

        const url = await this.repository.findByAlias(alias);

        await redisClient.set(alias, JSON.stringify(url), {
            EX: 3600,
        });

        if (!url) {
            throw ErrorResponse.badRequest('ShortUrl not found');
        }
        url.totalClicks += 1
        await url.save();
        return url
    }
}