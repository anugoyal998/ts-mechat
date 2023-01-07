import axios from "axios";
import { IMsg } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    contentType: "application/json;",
  },
});

type IToken = {
  accessToken: string;
  refreshToken: string;
};

export type IRefreshTokenBody = {
  refreshToken: string;
};

export type IProvider = {
  provider: string;
  name: string;
  profilePhotoURL: string;
  isEmailPassword: boolean;
};

/****Register***/

export type IRegisterBody = {
  provider: string;
  username: string;
  name: string;
  profilePhotoURL: string;
  password?: string;
  repeat_password?: string;
};

export const register = (data: IRegisterBody) =>
  api.post<IToken>("/api/register", data);

/****Register***/

/***Login**/

export type ILoginBody = {
  provider: string;
  username: string;
  password?: string;
};

export const login = (data: ILoginBody) => api.post<IToken>("/api/login", data);

/***Login**/

/***Refresh***/

export const refresh = (data: IRefreshTokenBody) =>
  api.post<IToken>("/api/refresh", data);

/***Refresh***/

/***me***/

export type IWhoAmIResponse = {
  _id: string;
  username: string;
  providers: IProvider[];
};

export const whoAmI = (token: string) =>
  api.get<IWhoAmIResponse>("/api/whoAmI", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

/***me***/

/***Logout**/

export const logout = (data: IRefreshTokenBody, token: string) =>
  api.post("/api/logout", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

/***Logout**/

/***All Users**/

export const allUsers = (token: string) =>
  api.get<IWhoAmIResponse[]>("/api/allUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

/***All Users**/

/*** Send Msg ***/

export type ISendMsgBody = {
  reciever: string;
  msg: string | number | readonly string[] | undefined;
  msgType: string;
};

export const sendMsg = (data: ISendMsgBody, token: string) =>
  api.post("/api/send-msg", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

/*** Send Msg ***/

/*** Get Msgs */

export const getMsgs = (reciever: string, token: string) =>
  api.post<IMsg[]>(
    "/api/get-msgs",
    { reciever },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

/*** Get Msgs */

/*** Update Profile ***/

export type IUpdateProfileProvider = {
  provider: string;
  profilePhotoURL: string;
};

export type IUpdateProfileBody = {
  name: string;
  providers: IUpdateProfileProvider[];
};

export type IUpdateProfileResponse = {
  message: string;
};

export const updateProfile = (data: IUpdateProfileBody, token: string) =>
  api.post<IToken>("/api/update-profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

/*** Update Profile ***/
