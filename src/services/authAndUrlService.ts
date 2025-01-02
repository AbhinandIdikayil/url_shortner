import { CONFIG } from "../constants/env"
import { AuthAndUrlIService } from "../interfaces/IService"
import { OAuth2Client } from 'google-auth-library'
import ErrorResponse from "../utils/ErrorResponse"
import { generateToken } from "../utils/genereteToken"
import { AuthAndUrlRepo } from "../repository/authAndUrlRepo"
import { CreateUrl } from "../interfaces/User"
import { generateAlias } from "../utils/generateAlias"
import { ShortUrlTopicENUM } from "../constants/enum/topic"

const client = new OAuth2Client(CONFIG.CLIENT_ID, CONFIG.CLIENT_SECRET, CONFIG.REDIRECT_URI)

export class AuthAndUrlService implements AuthAndUrlIService {
    private repository: AuthAndUrlRepo
    constructor(repository: AuthAndUrlRepo) {
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

    async redirectShortUrl(alias: string): Promise<{ longUrl: string }> {
        const url = await this.repository.findByAlias(alias);
        if (!url) {
            throw ErrorResponse.badRequest('ShortUrl not found');
        }
        url.totalClicks += 1
        await url.save();
        return { longUrl: url.longUrl }
    }
}