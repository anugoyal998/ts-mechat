import React, { useRef, useEffect } from "react";
import { IMsg } from "../../types";
import { ClientToServerEvents, ServerToClientEvents } from "../../socket.types";
import SOCKET_EVENTS from "../../enum.socket";
import { initSocket } from "../../socket";

import useCurrentChat from "../../states/useCurrentChat";
import useAuth from "../../states/useAuth";
import useActiveUsers from "../../states/useActiveUsers";

import Upper from "./Upper";
import Middle from "./Middle";
import Editor from "./Editor";
import { Socket } from "socket.io-client";

import { BsChatQuote } from "react-icons/bs";

export type ISetMsgs = (msgs: IMsg[]) => void;
export type ISetMsgsUsingCallbackFn = (fn: (msgs: IMsg[]) => IMsg[]) => void;

const Message: React.FC = () => {
  const currentChat = useCurrentChat((state) => state.currentChat);
  const auth = useAuth((state) => state.auth);
  const setActiveUsers = useActiveUsers((state) => state.setActiveUsers);
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
    };
    init();
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    /*@ts-ignore*/
    socketRef.current.emit(SOCKET_EVENTS.user_online, auth);
  }, [socketRef.current]);

  useEffect(() => {
    if (!socketRef.current) return;
    /*@ts-ignore*/
    socketRef.current.on(SOCKET_EVENTS.activeUsers, (data) => {
      setActiveUsers(data);
    });
  }, [socketRef.current]);

  if (!currentChat) {
    return (
      <div className="w-full bg-mBlack-100 rounded-md shadow-xl fcc">
        <div className="flex space-x-2 items-center">
          <BsChatQuote className="text-7xl text-white" />
          <p className="text-white font-semibold text-5xl">MeChat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mBlack-100 w-full rounded-md shadow-xl px-5 py-3">
      <Upper />
      <Middle socketRef={socketRef} />
      <Editor socketRef={socketRef} />
    </div>
  );
};

export default Message;
