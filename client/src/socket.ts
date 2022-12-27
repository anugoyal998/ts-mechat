import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./socket.types";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    import.meta.env.VITE_API_URL,
    options
  );
  return socket;
};
