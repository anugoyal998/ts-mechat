import React from 'react';
import { login } from '../../api';
import { ILoginBody } from '../../types/api.body.types';
import { IForm } from "../../types/form.types";
import Cookies from 'js-cookie'

export const loginFn = async (state: IForm,setState: React.Dispatch<React.SetStateAction<IForm>>) => {
    if(!state.username || !state.password){
        alert("All fields are required")
        return
    }
    const reqBody: ILoginBody = {
        username: state.username,
        password: state.password,
        provider: "emailPassword"
    }
    try {
        const { data } = await login(reqBody)
        Cookies.set("accessToken",data.accessToken)
        Cookies.set("refreshToken",data.refreshToken)
        window.location.reload()
    } catch (err) {
        alert(err)
    }
}