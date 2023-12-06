import { Events, Responses, RoomType, Message } from "./types";
import { Server } from 'socket.io'

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  // initial room
  const rooms: RoomType[] = [{ name: 'General Room', id: 'testID' }];
  const messages: Map<string, Message[]> = new Map();

  socket.on(Events.JOIN_ROOM, (data: { roomID: string }) => {
    socket.join(data.roomID);
    socket.emit(Responses.JOINED_ROOM, { roomID: data.roomID });
    console.log(`User with ID: ${socket.id} joined room: ${data.roomID}`);
  });

  socket.on(Events.SEND_MESSAGE, (data: Message) => {
    if (!data.message) {
      socket.emit(Responses.ERROR, {
        error: {
          type: Events.SEND_MESSAGE,
          message: 'Message cannot be empty'
        }
      })
      return;
    }

    if (!messages.has(data.roomID)) {
      messages.set(data.roomID, [data])
    } else {
      messages.set(data.roomID, [data, ...messages.get(data.roomID)!]);
    }

    socket.to(data.roomID).emit(Responses.RECEIVE_MESSAGE, data)
    socket.emit(Responses.RECEIVE_MESSAGE, data)
  });

  socket.on(Events.ADD_ROOM, (data: RoomType) => {
    rooms.push(data)
    socket.emit(Responses.ADDED_ROOM, data);
  });

  socket.on(Events.GET_ROOM_MESSAGE, (room: RoomType) => {
    socket.emit(Responses.RECEIVE_ROOM_MESSAGE, messages.get(room.id));
  });

  socket.on(Events.GET_ALL_ROOMS, () => {
    socket.emit(Responses.ALL_ROOMS, rooms);
  });

  socket.on(Events.DISCONNECT, (data) => {
    console.log(data);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
