import express, { Request, Response } from "express";
import { FRONTEND_URL, PORT } from "./config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import router from "./router";
import SOCKET_EVENTS from "./socket.enum";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(
  cors({
    origin: [FRONTEND_URL],
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1> Hello World!! </h1>");
});
app.use("/api", router);


/** Socket.io  ***/

type ArrType = {
  userId: string;
  id: string;
}

let arr: ArrType[] = [];

const addUserToArray = ({ userId, id} : ArrType) => {
  const findUser = arr.find((e) => e.userId === userId)
  if(findUser)return;
  arr.push({ userId, id });
}

const removeUserFromArray = (id: string) => {
  arr = arr.filter((e) => e.id !== id)
}

const getSocketIdFromUserID = (id: string) => {
  return arr.find((e) => e.userId === id)?.id;
};

io.on(SOCKET_EVENTS.connection, (socket) => {
    const id = socket.id;
    
    socket.on(SOCKET_EVENTS.user_online, (userId: string) => {
      addUserToArray({ userId, id });
      io.emit(SOCKET_EVENTS.activeUsers, arr.map((e) => e.userId));
    })

    socket.on(SOCKET_EVENTS.send_msg, (data) => {
      const recSocketId = getSocketIdFromUserID(data.reciever);
      recSocketId && io.to(recSocketId).emit(SOCKET_EVENTS.rec_msg, data);
    })

    socket.on(SOCKET_EVENTS.disconnect, () => {
      removeUserFromArray(id);
      io.emit(SOCKET_EVENTS.activeUsers, arr.map((e) => e.userId));
    })
})
/** Socket.io  ***/

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
