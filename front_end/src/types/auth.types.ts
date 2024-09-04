import { User } from "./user.types"

export interface AuthForm {
    name?: string
    username?: string
    password?: string
}

export interface AuthResponse {
    accessToken: string
    user: User
}