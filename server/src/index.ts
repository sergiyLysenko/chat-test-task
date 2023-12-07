import "reflect-metadata";
import { container } from "tsyringe";
import { App } from "./core/app";
import { JoinRoomEvent } from "./events/join-room.event";
import { SendMessageEvent } from "./events/send-message.event";
import { AddRoomEvent } from "./events/add-room.event";
import { GetRoomMessagesEvent } from "./events/get-room-messages.event";
import { GetAllRoomEvent } from "./events/get-all-room.event";
import { DisconnectEvent } from "./events/disconnect.event";

const bootstrap = () => {
  const app = container.resolve(App);

  app.registerConnectionListener([
    JoinRoomEvent,
    SendMessageEvent,
    AddRoomEvent,
    GetRoomMessagesEvent,
    GetAllRoomEvent,
    DisconnectEvent,
  ]);

  app.startListener();
};

void bootstrap();
