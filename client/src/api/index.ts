import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        contentType: "application/json;"
    }
})

type IToken = {
    accessToken: string;
    refreshToken: string;
}

/****Register***/

export type IRegisterBody = {
    provider: string;
    username: string;
    name: string;
    profilePhotoURL: string;
    password?: string;
    repeat_password?: string;
}

export const register = (data: IRegisterBody) => api.post<IToken>("/api/register",data)

/****Register***/

/***Login**/

export type ILoginBody = {
    provider: string;
    username: string;
    password?: string;
}

export const login = (data: ILoginBody) => api.post<IToken>("/api/login",data)

/***Login**/

/***Refresh***/

export type IRefreshBody = {
    refreshToken: string;
}

export const refresh = (data: IRefreshBody) => api.post<IToken>("/api/refresh",data)

/***Refresh***/