import React from 'react';
import { register } from '../../api';
import { IRegisterBody } from '../../types/api.body.types';
import { IForm } from "../../types/form.types";
import Cookies from 'js-cookie'


export const registerFn = async (state: IForm,setState: React.Dispatch<React.SetStateAction<IForm>>) => {
    if(!state.name || !state.password || !state.repeat_password || !state.username){
        alert("All fields are required")
        return
    }
    const reqBody: IRegisterBody = {
        name: state.name,
        username: state.username,
        password: state.password,
        repeat_password: state.repeat_password,
        profilePhotoURL: `https://ui-avatars.com/api/?name=${state.name}&background=random`,
        provider: "emailPassword"
    }
    try {
        const { data } = await register(reqBody)
        Cookies.set("accessToken",data.accessToken)
        Cookies.set("refreshToken",data.refreshToken)
        window.location.reload()
    } catch (err) {
        alert(err);
    }
}

