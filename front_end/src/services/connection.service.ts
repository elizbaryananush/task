import { axiosWithAuth } from "@/api/interceptors";
import { Act } from "@/types/act.types";
import { Connection } from "@/types/connection.types";

class ConnectionService {
    
    private BASE_URL = '/connection'

    async getAllFollowers() {
        const response = await axiosWithAuth.get<Connection[]>(
            `${this.BASE_URL}/followers`
        )
        return response.data
    }

    async getAllFollowings() {
        const response = await axiosWithAuth.get<Connection[]>(
            `${this.BASE_URL}/followings`
        )
        return response.data
    }

    async create(following_id: string) {
        const response = await axiosWithAuth.post<Connection>(
            `${this.BASE_URL}/${following_id}`
        )
        return response.data
    }

    async delete(following_id: string) {
        const response = await axiosWithAuth.delete<any>(
            `${this.BASE_URL}/${following_id}`
        )
        return response.data
    }
}

export const connectionService = new ConnectionService()