/***Auth**/
export type IRegisterState = {
    name: string;
    username: string;
    password: string;
    repeat_password: string;
}

export type ILoginState = {
    username: string;
    password: string;
}
/***Auth**/

/***WhoAmI**/

export { IWhoAmIResponse as IUserDetailsState } from "../api"

/***WhoAmI**/

/***JwtDecode**/
export type IJwtPayload = {
    name: string;
    username: string;
    profilePhotoURL: string;
    createdAt: number;
    iat?: number;
    exp?: number;
}
/***JwtDecode**/

/***Zustand***/
export type TAuthState = {
    name: string;
    username: string;
    profilePhotoURL: string;
    isAuth: boolean;
}

export type TAuthStore = {
    auth: TAuthState;
    setName: (name: string) => void;
    setUsername: (username: string) => void;
    setProfilePhotoURL: (profilePhotoURL: string) => void;
    setIsAuth: (isAuth: boolean) => void;
    setAuth: (auth: TAuthState) => void;
}
/***Zustand***/