import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import useActiveUsers from "../../states/useActiveUsers";
import useAuth from "../../states/useAuth";
import useCurrentChat from "../../states/useCurrentChat";

const Upper: React.FC = () => {
  const currentChat = useCurrentChat((state) => state.currentChat);
  const auth = useAuth((state) => state.auth)
  const activeUsers = useActiveUsers((state) => state.activeUsers);
  const [isOnline, setIsOnline] = useState<Boolean>(false)

  useEffect(() => {
    const find = activeUsers?.find((e) => e?.user?.username === currentChat?.username);
    if (find) setIsOnline(true);
    else setIsOnline(false);
  },[activeUsers,currentChat,auth])

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
            { isOnline ? "Online" : "Offline" }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upper;
