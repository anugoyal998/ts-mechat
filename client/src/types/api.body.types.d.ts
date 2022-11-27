export type IRegisterBody = {
    provider: string;
    name: string;
    username: string;
    profilePhotoURL: string;
    password?: string;
    repeat_password?: string;
}

export type ILoginBody = {
    username: string;
    password: string;
    provider: string;
}