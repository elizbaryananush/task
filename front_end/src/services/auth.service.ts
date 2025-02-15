import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import { AuthForm, AuthResponse } from "@/types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";

export const authService = {
    async main(type: 'login' | 'register', data: AuthForm) {
        const response = await axiosClassic.post<AuthResponse>(
            `/auth/${type}`,
            data
        )

        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response
    },

    async getNewTokens() {
        const response = await axiosClassic.post<AuthResponse>(
            `/auth/login/access-token`
        )

        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response
    },

    async logout() {
        const response = await axiosClassic.post<any>(
            '/auth/logout'
        )

        if (response.data.accessToken) removeFromStorage()

        return response
    },
}