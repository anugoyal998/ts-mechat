import React, { useState } from "react";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/socket/socket.types";
import { TbSend } from "react-icons/tb";
import { Socket } from "socket.io-client";
import { useCurrentChat, useMsgs } from "@/zustand";
import { User } from "supertokens-node";
import { Button } from "../ui/button";
import SOCKET_EVENTS from "@/socket/enum.socket";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface Props {
  socketRef: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
  user: User | undefined;
}

export default function Editor({ socketRef, user }: Props) {
  const [msg, setMsg] = useState<
    string | number | readonly string[] | undefined
  >("");
  const { currentChat } = useCurrentChat();
  const { setMsgsUsingCallbackFn } = useMsgs();
  const [isLoading, setIsLoading] = useState(false);
  async function helpFn(user: User) {
    try {
      setIsLoading(true);
      const payload = {
        sender: user.id,
        reciever: currentChat?.id as string,
        msgType: "text",
        msg,
        id: uuidv4(),
        createdat: new Date(Date.now()).toUTCString(),
      };
      /* @ts-ignore */
      socketRef.current?.emit(SOCKET_EVENTS.send_msg, payload);
      await axios.post("/api/send-msg", { ...payload, sender: undefined });
      setMsg("");
      setMsgsUsingCallbackFn((prev) => [...prev, payload]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  async function sendMsg(
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (!msg || !socketRef || !user) return;
    if (e.type === "keydown") {
      const keyboardEvent = e as React.KeyboardEvent<HTMLTextAreaElement>;
      if (keyboardEvent.code === "Enter" && keyboardEvent.ctrlKey) {
        helpFn(user);
      }
    } else if (e.type === "click") {
      helpFn(user);
    }
  }
  return (
    <div className="bg-primary w-full rounded-xl py-2 px-5 h-[65px] flex justify-center items-center">
      <textarea
        className="w-full h-[45px] bg-transparent outline-none border border-gray-400 rounded-3xl px-5 text-white"
        placeholder="Write you message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={sendMsg}
        disabled={isLoading}
      />
      <Button
        className="bg-orng py-2 px-3 rounded-lg ml-3"
        onClick={sendMsg}
        disabled={isLoading}
      >
        <TbSend className="text-white text-3xl" />
      </Button>
    </div>
  );
}
