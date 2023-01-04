import React, { useEffect, useRef, useState } from "react";
import { getMsgs as getMsgsApi } from "../../api";
import useAuth from "../../states/useAuth";
import useCurrentChat from "../../states/useCurrentChat";
import myAlert from "../../utils/myAlert";
import Cookies from "js-cookie";
import { IMsg } from "../../types";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../../socket.types";
import SOCKET_EVENTS from "../../enum.socket";
import { ISetMsgs } from "./Message";
import Card from "./Card";
import useMsgs from "../../states/useMsgs";

const DummyData: IMsg[] = [
  {
    sender: "",
    reciever: "",
    msg: "",
    msgType: "",
    createdAt: 1,
  },
  {
    sender: "",
    reciever: "",
    msg: "",
    msgType: "",
    createdAt: 1,
  },
  {
    sender: "",
    reciever: "",
    msg: "",
    msgType: "",
    createdAt: 1,
  },
  {
    sender: "",
    reciever: "",
    msg: "",
    msgType: "",
    createdAt: 1,
  },
  {
    sender: "",
    reciever: "",
    msg: "",
    msgType: "",
    createdAt: 1,
  },
]

interface IProps {
  socketRef: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const Middle: React.FC<IProps> = ({ socketRef }) => {
  const auth = useAuth((state) => state.auth);
  const currentChat = useCurrentChat((state) => state.currentChat);
  const [msgs, setMsgs] = useMsgs((state) => [state.msgs, state.setMsgs]);
  const ref = useRef();
  const [temp, setTemp] = useState<IMsg>();
  const token = Cookies.get("accessToken");
  useEffect(() => {
    (async () => {
      try {
        const rsp = await getMsgsApi(
          currentChat?.username as string,
          token as string
        );
        let allMsgs = rsp.data;
        allMsgs.sort((a: IMsg, b: IMsg) => {
          let x = a.createdAt;
          let y = b.createdAt;
          if (x < y) return -1;
          if (x > y) return 1;
          return 0;
        });
        setMsgs(allMsgs);
      } catch (err) {
        myAlert(err);
      }
    })();
  }, [currentChat, auth, temp]);

  useEffect(() => {
    if (!socketRef) return;
    /**@ts-ignore */
    socketRef.current.on(SOCKET_EVENTS.rec_msg, (data) => {
      setTemp(data);
    });
  }, [socketRef?.current]);

  useEffect(() => {
    if (ref) {
      /**@ts-ignore */
      ref.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [ref]);

  return (
    <div
      style={{ height: "calc(100vh - 290px)" }}
      className="overflow-y-scroll"
      /**@ts-ignore */
      ref={ref}
    >
      { msgs && msgs.length ? msgs?.map((msg: IMsg, index: number) => <Card msg={msg} key={index.toString()} />) : DummyData.map((msg: IMsg, index: number) => <Card key={index.toString()} msg={msg} dummy />) }
    </div>
  );
};

export default Middle;
