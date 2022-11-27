import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IRegisterState } from "../types";
import { register as registerApi, IRegisterBody } from "../api";

import myAlert from "../utils/myAlert";
import myToast from "../utils/myToast";
import Cookies from "js-cookie";

import Input from "../atoms/Input";
import { FaGoogle, FaGithub } from "react-icons/fa";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth as googleAuth } from "../firebase";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [state, setState] = useState<IRegisterState>({
    name: "",
    username: "",
    password: "",
    repeat_password: "",
  });

  const registerHelper = async (body: IRegisterBody) => {
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

  const handleRegisterClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const body: IRegisterBody = {
      ...state,
      provider: "emailPassword",
      profilePhotoURL: `https://ui-avatars.com/api?background=random&name=${state.name}`,
    };
    await registerHelper(body);
  };

  const handleGoogleRegister = () => {
    signInWithPopup(googleAuth, googleProvider)
      .then(async (response) => {
        const body: IRegisterBody = {
          name: response.user.displayName as string,
          username: response.user.email as string,
          profilePhotoURL: response.user.photoURL as string,
          provider: "google",
        };
        await registerHelper(body);
      })
      .catch((err) => {
        myAlert(err);
      });
  };

  const handleGithubRegister = () => {
    signInWithPopup(googleAuth, githubProvider)
      .then(async (response) => {
        const body: IRegisterBody = {
          name: response.user.displayName as string,
          username: response.user.email as string,
          profilePhotoURL: response.user.photoURL as string,
          provider: "github",
        };
        await registerHelper(body);
      })
      .catch((err) => {
        myAlert(err);
      });
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
        <p className="text-white text-center my-4"> -- or continue with -- </p>
        <div className="fcc space-x-10">
          <button
            className="fcc bg-mBlack-300 space-x-2 p-3 rounded-lg"
            onClick={handleGoogleRegister}
          >
            <FaGoogle className="text-white" />
            <p className="text-white font-semibold">Google</p>
          </button>
          <button
            className="fcc bg-mBlack-300 space-x-2 p-3 rounded-lg"
            onClick={handleGithubRegister}
          >
            <FaGithub className="text-white text-xl" />
            <p className="text-white font-semibold">Github</p>
          </button>
        </div>
        <p className="text-white text-center my-3">
          Already have an account?{" "}
          <span
            className="cursor-pointer font-semibold"
            onClick={() => navigate("/login")}
          >
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
