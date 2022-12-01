import React from "react";
import { IWhoAmIResponse } from "../../api";
import useCurrentChat from "../../states/useCurrentChat";

interface IProps {
  user: IWhoAmIResponse;
}

const Card: React.FC<IProps> = ({ user }) => {
  const [currentChat, setCurrentChat] = useCurrentChat((state) => [
    state.currentChat,
    state.setCurrentChat,
  ]);
  return (
    <div
      className={`my-4 ${
        user.username === currentChat?.username
          ? "bg-[#25262b]"
          : "bg-mBlack-300"
      } flex items-center justify-between p-3 rounded-md w-full cursor-pointer hover:bg-[#25262b]`}
      onClick={() =>
        setCurrentChat({
          name: user.providers[0].name,
          username: user.username,
          profilePhotoURL: user.providers[0].profilePhotoURL,
        })
      }
    >
      <div className="flex items-center space-x-2 w-full">
        <img
          src={user.providers[0].profilePhotoURL}
          className="rounded-full w-12"
        />
        <div className="w-full">
          <p className="capitalize w-full truncate">{user.providers[0].name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
