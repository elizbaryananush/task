import { axiosWithAuth } from "@/api/interceptors";
import { Act } from "@/types/act.types";

class ActService {
    private BASE_URL = '/acts'

    async getProfile() {
        const response = await axiosWithAuth.get<Act[]>(
            `${this.BASE_URL}/`
        )
        return response.data
    }

    async getActById(taskId: string) {
        const response = await axiosWithAuth.get<Act>(
            `${this.BASE_URL}/${taskId}`
        )
        return response.data
    }

    async getByUserId(userId: string) {
        const response = await axiosWithAuth.get<Act>(
            `${this.BASE_URL}/useracts/${userId}`
        )
        return response.data
    }

    async create(data: Act) {
        const response = await axiosWithAuth.post<Act>(
            `${this.BASE_URL}/`,
            data
        )
        return response.data
    }

    async update(taskId: string, data: Act) {
        const response = await axiosWithAuth.put<Act>(
            `${this.BASE_URL}/${taskId}`,
            data
        )
        return response.data
    }

    async delete(taskId: string) {
        const response = await axiosWithAuth.delete<any>(
            `${this.BASE_URL}/${taskId}`
        )
        return response.data
    }
}

export const actService = new ActService()
