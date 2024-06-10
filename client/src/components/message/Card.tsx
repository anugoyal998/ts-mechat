import { TMSG } from "@/types";
import { useCurrentChat } from "@/zustand";
import React from "react";

import TimeAgo from "react-timeago";

interface Props {
  msg: TMSG;
  dummy?: boolean;
}

export default function Card({ msg, dummy }: Props) {
  const { currentChat } = useCurrentChat();
  if (dummy) {
    return (
      <div
        className={`py-2 flex ${
          Math.floor(Math.random() * 10) % 2 === 1
            ? "justify-start"
            : "justify-end"
        }`}
      >
        <div className="w-[60%] p-3 chat-bubble rounded-sm bg-primary">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="flex justify-end">
            <div className="w-[10%] skeleton skeleton-text"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`flex py-2 ${
        currentChat?.id === msg.reciever ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`w-[60%] ${
          currentChat?.id === msg.reciever ? "bg-purpl" : "bg-primary"
        } p-3 rounded-sm chat-bubble`}
      >
        <p className="text-white">{msg.msg}</p>
        <div className="flex justify-end w-full">
          <TimeAgo
            date={msg.createdat}
            className="text-xs font-semibold text-white"
          />
        </div>
      </div>
    </div>
  );
}
