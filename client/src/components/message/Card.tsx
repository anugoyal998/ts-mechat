import React from "react";
import { IMsg } from "../../types";

import useCurrentChat from "../../states/useCurrentChat";

import TimeAgo from "react-timeago";

interface IProps {
  msg: IMsg;
  dummy?: boolean;
}

const Card: React.FC<IProps> = ({ msg, dummy }) => {
  const currentChat = useCurrentChat((state) => state.currentChat);
  if (dummy)
    return (
      <div
        className={`py-2 chat ${
          Math.floor(Math.random() * 10) % 2 === 1 ? "chat-start" : "chat-end"
        }`}
      >
        <div className="w-[60%] p-3 chat-bubble bg-mBlack-300">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="flex justify-end">
            <div className="w-[10%] skeleton skeleton-text"></div>
          </div>
        </div>
      </div>
    );
  return (
    <div
      className={`${
        currentChat?.username === msg.reciever ? "chat-end" : "chat-start"
      } py-2 chat`}
    >
      <div
        className={`w-[60%] ${
          currentChat?.username === msg.reciever
            ? "bg-mPurple"
            : "bg-mBlack-300"
        } p-3 chat-bubble`}
      >
        <p className="text-white">{msg.msg}</p>
        <div className="flex justify-end w-full">
          <TimeAgo date={msg.createdAt} className="text-xs font-semibold" />
        </div>
      </div>
    </div>
  );
};

export default Card;
