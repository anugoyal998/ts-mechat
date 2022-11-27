import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        contentType: "application/json;"
    }
})

/****Register***/

export type IRegisterBody = {
    provider: string;
    username: string;
    name: string;
    profilePhotoURL: string;
    password?: string;
    repeat_password?: string;
}

type IRegisterResponse = {
    accessToken: string;
    refreshToken: string;
}

export const register = (data: IRegisterBody) => api.post<IRegisterResponse>("/api/register",data)

/****Register***/

/***Login**/

export type ILoginBody = {
    provider: string;
    username: string;
    password?: string;
}

type ILoginResponse = {
    accessToken: string;
    refreshToken: string;
}

export const login = (data: ILoginBody) => api.post<ILoginResponse>("/api/login",data)

/***Login**/