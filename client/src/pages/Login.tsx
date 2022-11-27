import React, { useState } from 'react'
import Input from '../atoms/Input'
import { ILoginBody, login as loginApi } from '../api'
import { ILoginState } from '../types'
import myAlert from '../utils/myAlert'
import myToast from '../utils/myToast'
import Cookies from 'js-cookie'

const Login: React.FC = () => {

    const [state, setState] = useState<ILoginState>({
        username: "",
        password: "",
    })

    const handleLoginClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const body: ILoginBody = {
            ...state,
            provider: "emailPassword",
        };
        try {
            const { data } = await loginApi(body);
            Cookies.set("accessToken", data.accessToken);
            Cookies.set("refreshToken", data.refreshToken);
            myToast("Login Success");
            window.location.reload();
        } catch (err) {
            myAlert(err);
        }
    }

  return (
    <div className="bg-mBlack-300  w-screen h-screen fcc">
      <div className="w-[500px] bg-mBlack-100 p-4 rounded-md shadow-xl">
        <p className="text-xl font-semibold text-center text-white">MeChat</p>
        <p className="mb-4 text-center text-white">Login to continue...</p>
        <form className="w-full flex flex-col space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={state.username}
            name="username"
            setState={setState}
          />
          <Input
            type="password"
            placeholder="Password"
            value={state.password}
            name="password"
            setState={setState}
          />
          <button
            className="w-full bg-mOrange text-white py-3 rounded-3xl mt-8 shadow-xl hover:text-white hover:bg-mBlack-300 animation font-semibold"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
