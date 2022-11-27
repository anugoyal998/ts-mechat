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