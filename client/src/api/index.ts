import axios from "axios"
import { ILoginBody, IRegisterBody } from "../types/api.body.types"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        contentType: "application/json"
    }
})

interface IRegisterResponse {
    accessToken: string;
    refreshToken: string;
}

export const register = (data: IRegisterBody) => api.post<IRegisterResponse>("/api/register",data)

interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

export const login = (data: ILoginBody) => api.post<ILoginResponse>("api/login",data)