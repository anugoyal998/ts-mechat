import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ILoginBody, login as loginApi } from "../api";
import { ILoginState } from "../types";

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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [state, setState] = useState<ILoginState>({
    username: "",
    password: "",
  });

  const loginHelper = async (body: ILoginBody) => {
    try {
      const { data } = await loginApi(body);
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);
      myToast("Login Success");
      window.location.reload();
    } catch (err) {
      myAlert(err);
    }
  };

  const handleLoginClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const body: ILoginBody = {
      ...state,
      provider: "emailPassword",
    };
    await loginHelper(body);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(googleAuth, googleProvider)
      .then(async (response) => {
        const body: ILoginBody = {
          username: response.user.email as string,
          provider: "google",
        };
        await loginHelper(body);
      })
      .catch((err) => {
        myAlert(err);
      });
  };

  const handleGithubLogin = () => {
    signInWithPopup(googleAuth, githubProvider)
      .then(async (response) => {
        const body: ILoginBody = {
          username: response.user.email as string,
          provider: "github",
        };
        await loginHelper(body);
      })
      .catch((err) => {
        myAlert(err);
      });
  };

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
            className="w-full mt-8 btn-mechat-orange"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </form>
        <p className="text-white text-center my-4"> -- or continue with -- </p>
        <div className="fcc space-x-10">
          <button
            className="fcc bg-mBlack-300 space-x-2 p-3 rounded-lg"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="text-white" />
            <p className="text-white font-semibold">Google</p>
          </button>
          <button
            className="fcc bg-mBlack-300 space-x-2 p-3 rounded-lg"
            onClick={handleGithubLogin}
          >
            <FaGithub className="text-white text-xl" />
            <p className="text-white font-semibold">Github</p>
          </button>
        </div>
        <p className="text-white text-center my-3">
          Don't have an account?{" "}
          <span
            className="cursor-pointer font-semibold"
            onClick={() => navigate("/register")}
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
