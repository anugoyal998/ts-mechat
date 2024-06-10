import SOCKET_EVENTS from "@/socket/enum.socket";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/socket/socket.types";
import { TMSG } from "@/types";
import { useCurrentChat, useMsgs } from "@/zustand";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { User } from "supertokens-node";
import Card from "./Card";

const DummyData: TMSG[] = Array.from({ length: 10 }).map(() => ({
  sender: "",
  reciever: "",
  msg: "",
  msgType: "",
  createdat: "",
  id: "",
}));

interface Props {
  socketRef: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
  user: User | undefined;
}

async function getMsgs(reciever: string) {
  const { data } = await axios.post<TMSG[]>("/api/get-msgs", { reciever });
  return data;
}

export default function Middle({ socketRef, user }: Props) {
  const { currentChat } = useCurrentChat();
  const { msgs, setMsgs } = useMsgs();
  const ref = useRef();
  const [temp, setTemp] = useState<TMSG>();

  useEffect(() => {
    if (!socketRef) return;
    /** @ts-ignore */
    socketRef.current.on(SOCKET_EVENTS.rec_msg, (data: any) => {
      setTemp(data);
    });
  }, [socketRef.current]);

  useEffect(() => {
    if (ref) {
      /**@ts-ignore */
      ref.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [ref]);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getMsgs(currentChat?.id as string),
    queryKey: [currentChat, user, temp],
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    setMsgs(data);
  }, [data]);

  return (
    <div
      className="overflow-y-scroll"
      style={{ height: "calc(100vh - 290px)" }}
      /* @ts-ignore */
      ref={ref}
    >
      {msgs && msgs.length > 0
        ? msgs.map((msg, index) => <Card msg={msg} key={`card-${index}`} />)
        : DummyData.map((msg, index) => (
            <Card msg={msg} dummy key={`index-${index}`} />
          ))}
    </div>
  );
}
