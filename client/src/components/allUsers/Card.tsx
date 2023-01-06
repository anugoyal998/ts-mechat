import React from "react";
import { IWhoAmIResponse } from "../../api";

import useCurrentChat from "../../states/useCurrentChat";
import useMsgs from "../../states/useMsgs";

interface IProps {
  user: IWhoAmIResponse;
  dummy?: boolean;
}

const Card: React.FC<IProps> = ({ user, dummy }) => {
  const [currentChat, setCurrentChat] = useCurrentChat((state) => [
    state.currentChat,
    state.setCurrentChat,
  ]);
  const setMsgs = useMsgs((state) => state.setMsgs);

  return (
    <div
      className={`my-4 ${
        user.username === currentChat?.username
          ? "bg-[#25262b]"
          : "bg-mBlack-300"
      } flex items-center justify-between p-3 rounded-md w-full ${
        !dummy && "hover:bg-[#25262b] cursor-pointer"
      }`}
      onClick={() => {
        setMsgs([]);
        setCurrentChat({
          name: user.providers[0].name,
          username: user.username,
          profilePhotoURL: user.providers[0].profilePhotoURL,
        });
      }}
    >
      <div className="flex items-center space-x-2 w-full">
        {user.providers[0].profilePhotoURL ? (
          <img
            src={user.providers[0].profilePhotoURL}
            className="rounded-full w-12"
          />
        ) : (
          <div className="skeleton w-16 h-12 rounded-full"></div>
        )}
        <div className="w-full">
          {user.providers[0].name ? (
            <p className="capitalize w-full truncate text-white">
              {user.providers[0].name}
            </p>
          ) : (
            <div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
