import React, { ReactNode } from "react";
import useAuth from "../states/useAuth";

import Cookies from "js-cookie";
import myToast from "../utils/myToast";
import myAlert from "../utils/myAlert";

import { FiChevronDown, FiLogOut, FiSettings } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { BsChatQuote } from "react-icons/bs";

import { IRefreshTokenBody, logout } from "../api";
import { IUserDetailsState } from "../types";
import useIsSettingsModalOpen from "../states/useIsSettingsModalOpen";
import { useNavigate } from "react-router-dom";

interface IProps {
  userDetails: IUserDetailsState | undefined;
}

const NavUser: React.FC<IProps> = ({ userDetails }) => {
  const auth = useAuth((state) => state.auth);
  const setIsSettingsModalOpen = useIsSettingsModalOpen(
    (state) => state.setIsSettingsModalOpen
  );
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken") as string;
      const accessToken = Cookies.get("accessToken") as string;
      const body: IRefreshTokenBody = {
        refreshToken: refreshToken,
      };
      await logout(body, accessToken);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      myToast("logout success");
      window.location.reload();
    } catch (err) {
      myAlert(err);
    }
  };
  return (
    <div className="dropdown dropdown-end w-48">
      <div
        className="flex items-center justify-between border px-3 py-2 rounded-md border-gray-400 cursor-pointer"
        tabIndex={0}
      >
        <div className="fcc space-x-2">
          <img
            src={auth?.profilePhotoURL}
            alt="avatar"
            className="rounded-full w-8"
          />
          <div>
            <p className="text-sm capitalize w-24 truncate">{auth.name}</p>
            <p className="truncate w-24 text-xs opacity-70">
              {auth.username.split("@")[0]}
            </p>
          </div>
        </div>
        <div>
          <FiChevronDown />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu mt-5 bg-mBlack-100 w-48 rounded-md shadow-2xl"
      >
        <li className="w-full">
          <Card name={auth.name} icon={<BsChatQuote className="text-3xl" />} />
        </li>
        <li className="w-full">
          <Card
            name={auth.username.split("@")[0]}
            icon={<BiUserCircle className="text-3xl" />}
          />
        </li>
        <hr className="opacity-60 my-2" />
        <li className="w-full">
          {userDetails?.providers.map((provider, index) => (
            <Card
              key={index.toString()}
              name={provider.name}
              profilePhotoURL={provider.profilePhotoURL}
              provider={provider.provider}
            />
          ))}
        </li>
        <hr className="opacity-60 my-2" />
        <li>
          <Card
            name="Settings"
            icon={<FiSettings className="text-3xl" />}
            handleClick={() => navigate("/settings")}
          />
        </li>
        <li>
          <Card
            name="Logout"
            icon={<FiLogOut className="text-3xl" />}
            handleClick={handleLogout}
          />
        </li>
      </ul>
    </div>
  );
};

interface ICardProps {
  name: string;
  profilePhotoURL?: string;
  provider?: string;
  icon?: ReactNode;
  handleClick?: () => Promise<void> | void;
}

const Card: React.FC<ICardProps> = ({
  name,
  profilePhotoURL,
  provider,
  icon,
  handleClick,
}) => {
  return (
    <div
      className="flex items-center space-x-2 w-full"
      onClick={() => {
        if (typeof handleClick === "function") {
          handleClick();
        }
      }}
    >
      {profilePhotoURL && (
        <img src={profilePhotoURL} className="rounded-full w-8" />
      )}
      {icon && icon}
      <div className="w-full">
        <p className="truncate w-full">{name}</p>
        {provider && (
          <p className="capitalize text-xs text-gray-400">{provider}</p>
        )}
      </div>
    </div>
  );
};

export default NavUser;
