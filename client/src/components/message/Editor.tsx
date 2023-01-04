import React, { useState } from "react";
import { TbSend } from "react-icons/tb";
import useAuth from "../../states/useAuth";
import useCurrentChat from "../../states/useCurrentChat";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../../socket.types";
import myAlert from "../../utils/myAlert";
import { sendMsg as sendMsgApi } from "../../api";
import Cookies from "js-cookie";
import SOCKET_EVENTS from "../../enum.socket";
import { IMsg } from "../../types";
import useMsgs from "../../states/useMsgs";

interface IProps {
  socketRef: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const Editor: React.FC<IProps> = ({ socketRef }) => {
  const [msg, setMsg] = useState<
    string | number | readonly string[] | undefined
  >("");
  const currentChat = useCurrentChat((state) => state.currentChat);
  const auth = useAuth((state) => state.auth);
  const token = Cookies.get("accessToken");
  const setMsgsUsingCallbackFn = useMsgs((state) => state.setMsgsUsingCallbackFn);


  const helpFn = async () => {
    try {
      /*@ts-ignore */
      socketRef.current?.emit(SOCKET_EVENTS.send_msg, {
        sender: auth.username,
        reciever: currentChat?.username,
        msgType: "text",
        msg,
      });
      await sendMsgApi(
        { reciever: currentChat?.username as string, msg, msgType: "text" },
        token as string
      );
      setMsg("");
      setMsgsUsingCallbackFn((prev: IMsg[]) => [
        ...prev,
        {
          sender: auth.username,
          reciever: currentChat?.username as string,
          msgType: "text",
          msg,
          createdAt: Date.now(),
        },
      ]);
    } catch (err) {
      myAlert(err);
    }
  };

  const sendMsg = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (!msg || !socketRef) return;
    if (e.type === "keydown") {
      const keyboardEvent = e as React.KeyboardEvent<HTMLTextAreaElement>;
      if (keyboardEvent.code === "Enter" && keyboardEvent.ctrlKey) {
        helpFn();
      }
    } else if (e.type === "click") {
      helpFn();
    }
  };

  return (
    <div className="bg-mBlack-300 w-full rounded-xl py-2 px-5 h-[65px] fcc">
      <textarea
        className="w-full h-[45px] bg-transparent outline-none border border-gray-400 rounded-3xl px-5 text-white"
        placeholder="Write your message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={sendMsg}
      />
      <button
        className="bg-mOrange py-2 px-3 rounded-lg ml-3"
        onClick={sendMsg}
      >
        <TbSend className="text-white text-3xl" />
      </button>
    </div>
  );
};

export default Editor;
