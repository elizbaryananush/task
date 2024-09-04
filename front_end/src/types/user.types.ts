import { Act } from "./act.types"

export interface User {
    id: string
    name: string
    username: string
    password: string
    acts: Act[]
}