import React, { useEffect, useState } from "react";
import { getProfilePhoto } from "@/lib/getProfilePhoto";
import { useActiveUsers, useCurrentChat } from "@/zustand";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import { User } from "supertokens-node";

export default function Upper({ user }: { user: User }) {
  const { currentChat } = useCurrentChat();
  const { activeUsers } = useActiveUsers();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const find = activeUsers?.find((e) => e === currentChat?.id);
    if (find) setIsOnline(true);
    else setIsOnline(false);
  }, [activeUsers, currentChat, user]);

  return (
    <div className="bg-primary w-full rounded-xl py-2 px-5 flex items-center space-x-3 h-[65px]">
      <div className="sm:hidden cursor-pointer">
        <BiArrowBack className="text-white" />
      </div>
      <div className="flex items-center space-x-2">
        <Image
          src={getProfilePhoto(user)}
          alt="user-photo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="capitalize text-white text-lg">
            {currentChat?.emails?.[0]?.split("@")[0]}
          </p>
          <p className="text-sm text-gray-400">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
}
