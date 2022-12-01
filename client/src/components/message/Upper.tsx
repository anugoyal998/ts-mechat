import React from "react";
import { BiArrowBack } from "react-icons/bi";
import useCurrentChat from "../../states/useCurrentChat";

const Upper: React.FC = () => {
  const currentChat = useCurrentChat((state) => state.currentChat);
  return (
    <div className="bg-mBlack-300 w-full rounded-xl py-2 px-5 flex items-center space-x-3 h-[65px]">
      <div className="sm:hidden cursor-pointer">
        <BiArrowBack />
      </div>
      <div className="flex items-center space-x-2">
        <img src={currentChat?.profilePhotoURL} className="rounded-full w-12" />
        <div>
          <p className="capitalize text-white text-lg">{currentChat?.name}</p>
          <p className="text-sm">
            {currentChat?.isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upper;
