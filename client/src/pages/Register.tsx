import React, { useState } from "react";
import Input from "../atoms/Input";
import { IRegisterState } from "../types";
import { register as registerApi, IRegisterBody } from "../api";
import myAlert from "../utils/myAlert";
import myToast from "../utils/myToast";
import Cookies from "js-cookie";

const Register: React.FC = () => {
  const [state, setState] = useState<IRegisterState>({
    name: "",
    username: "",
    password: "",
    repeat_password: "",
  });

  const handleRegisterClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const body: IRegisterBody = {
      ...state,
      provider: "emailPassword",
      profilePhotoURL: `https://ui-avatars.com/api?background=random&name=${state.name}`,
    };
    try {
      const { data } = await registerApi(body);
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);
      myToast("Register Success");
      window.location.reload();
    } catch (err) {
      myAlert(err);
    }
  };

  return (
    <div className="bg-mBlack-300  w-screen h-screen fcc">
      <div className="w-[500px] bg-mBlack-100 p-4 rounded-md shadow-xl">
        <p className="text-xl font-semibold text-center text-white">MeChat</p>
        <p className="mb-4 text-center text-white">Register to continue...</p>
        <form className="w-full flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Name"
            value={state.name}
            name="name"
            setState={setState}
          />
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
          <Input
            type="text"
            placeholder="Confirm Password"
            value={state.repeat_password}
            name="repeat_password"
            setState={setState}
          />
          <button
            className="w-full bg-mOrange text-white py-3 rounded-3xl mt-8 shadow-xl hover:text-white hover:bg-mBlack-300 animation font-semibold"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
