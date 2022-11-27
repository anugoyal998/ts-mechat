import React, { useState } from 'react'
import { IForm, IFormData } from "../types/form.types"
import Form from "../components/form/Form"
import { loginFn } from '../functions/auth/loginFn'



const data: IFormData[] = [
  { type: "email", placeholder: "Enter Email", name: "username"},
  { type: "password", placeholder: "Enter Password", name: "password"}
]


const Login: React.FC = () => {

  const [state, setState] = useState<IForm>({
    username: '',
    password: '',
  })

  return (
    <div className="bg-mBlack-300  w-screen h-screen fcc">
        <div className="w-[500px] bg-mBlack-100 p-4 rounded-md shadow-xl">
            <p className="text-xl font-semibold text-center text-white">MeChat</p>
            <p className="text-center text-white">Login to continue...</p>
            <Form setState={setState} data={data} submitText="Login" state={state} submitHandler={loginFn} />
        </div>
    </div>
  )
}

export default Login