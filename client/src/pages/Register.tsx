import React, { useState } from "react"
import { IForm, IFormData } from "../types/form.types"
import Form from "../components/form/Form"
import { registerFn } from "../functions/auth/registerFn"


const data: IFormData[] = [
    { type: "text", placeholder: "Enter Name", name: "name"},
    { type: "email", placeholder: "Enter Email", name: "username"},
    { type: "password", placeholder: "Enter Password", name: "password"},
    { type: "text", placeholder: "Confirm Password", name: "repeat_password"},
]

const Register: React.FC = () => {

    const [state, setState] = useState<IForm>({
        username: '',
        password: '',
        name: '',
        repeat_password: ''
      })
    
    return (
        <div className="bg-mBlack-300  w-screen h-screen fcc">
            <div className="w-[500px] bg-mBlack-100 p-4 rounded-md shadow-xl">
                <p className="text-xl font-semibold text-center text-white">MeChat</p>
                <p className="text-center text-white">Register to continue...</p>
                <Form setState={setState} data={data} submitText="Register" submitHandler={registerFn} state={state} />
            </div>
        </div>
    )
}

export default Register