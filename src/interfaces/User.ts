

export interface IRegister {
    name: string,
    email: string,
    googleId: string
}

export interface CreateUrlRepo {
    longUrl: string,
    alias: string,
    topic: string,
    userId: string
}

export interface CreateUrl {
    longUrl: string,
    userId: string
    alias?: string,
    topic?: string,
}