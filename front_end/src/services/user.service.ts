import { axiosWithAuth } from "@/api/interceptors";
import { User } from "@/types/user.types";

export interface ProfileResponse {
    user: User
    total_acts: number
}

export interface Username {
    username : string
}

class UserService {
    private BASE_URL = '/user/profile'

    async getProfile() {
        const response = await axiosWithAuth.get<ProfileResponse>(
            `${this.BASE_URL}/`
        )
        return response.data
    }

    async getByUsername(data: Username) {
        const response = await axiosWithAuth.post<User>(
            `${this.BASE_URL}/`,
            data
        )
        return response.data
    }

    async update(data: User) {
        const response = await axiosWithAuth.put<User>(
            `${this.BASE_URL}/`,
            data
        )
        return response.data
    }

    async delete() {
        const response = await axiosWithAuth.delete<any>(
            `${this.BASE_URL}/`
        )
        return response.data
    }
}

export const userService = new UserService()