import { useActiveUsers, useCurrentChat } from "@/zustand";
import React, { useEffect, useRef } from "react";
import { BsChatQuote } from "react-icons/bs";
import { User } from "supertokens-node";
import Upper from "./Upper";
import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/socket/socket.types";
import { initSocket } from "@/socket/socket";
import SOCKET_EVENTS from "@/socket/enum.socket";
import Editor from "./Editor";
import Middle from "./Middle";

export default function Message({ user }: { user: User | undefined }) {
  const { currentChat } = useCurrentChat();
  const { setActiveUsers } = useActiveUsers();
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
    if (!socketRef.current || !user) return;
    /* @ts-ignore */
    socketRef.current.emit(SOCKET_EVENTS.user_online, user.id);
  }, [socketRef.current]);

  useEffect(() => {
    if (!socketRef.current) return;
    /*@ts-ignore*/
    socketRef.current.on(SOCKET_EVENTS.activeUsers, (data: string[]) => {
      setActiveUsers(data);
    });
  }, [socketRef.current]);

  if (!currentChat) {
    return (
      <div className="w-full bg-secondary rounded-md shadow-xl flex justify-center items-center">
        <div className="flex space-x-2 items-center">
          <BsChatQuote className="text-7xl text-white" />
          <p className="text-white font-semibold text-5xl">MeChat</p>
        </div>
      </div>
    );
  }
  if (!user) return null;
  return (
    <div className="bg-secondary w-full rounded-md shadow-xl px-5 py-3">
      <Upper user={user} />
      <Middle socketRef={socketRef} user={user} />
      <Editor socketRef={socketRef} user={user} />
    </div>
  );
}
