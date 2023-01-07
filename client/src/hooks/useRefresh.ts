import Cookies from "js-cookie";
import { useEffect } from "react";
import useAuth from "../states/useAuth";
import decodeJwt from "../utils/decodeJwt";
import { refresh as refreshApi } from "../api";
import myAlert from "../utils/myAlert";
import { IJwtPayload, TAuthState } from "../types";
import { useNavigate } from "react-router-dom";

export const refreshTokenFunction = async (
  token: string,
  setAuth: (auth: TAuthState) => void
) => {
  try {
    const { data } = await refreshApi({ refreshToken: token });
    const payload = decodeJwt(data.accessToken) as IJwtPayload;
    setAuth({
      name: payload.name,
      username: payload.username,
      profilePhotoURL: payload.profilePhotoURL,
      isAuth: true,
    });
    Cookies.set("accessToken", data.accessToken);
    Cookies.set("refreshToken", data.refreshToken);
  } catch (err) {
    myAlert(err);
  }
};

const useRefresh = () => {
  const setAuth = useAuth((state) => state.setAuth);
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  // console.log(accessToken)

  useEffect(() => {
    const redirect_to = new URLSearchParams(window.location.search).get(
      "redirect_to"
    );
    if (redirect_to) navigate(`/${redirect_to}`);
    (async () => {
      if (accessToken && refreshToken) {
        const payload = decodeJwt(accessToken);
        if (payload && typeof payload === "object") {
          setAuth({
            name: payload.name,
            username: payload.username,
            profilePhotoURL: payload.profilePhotoURL,
            isAuth: true,
          });
        } else if (payload && typeof payload === "string") {
          await refreshTokenFunction(refreshToken, setAuth);
        }
      } else if (!accessToken && refreshToken) {
        await refreshTokenFunction(refreshToken, setAuth);
      }
    })();
  }, []);
};

export default useRefresh;
