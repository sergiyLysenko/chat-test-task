import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export enum Events {
  SEND_MESSAGE = 'SEND_MESSAGE',
  JOIN_ROOM = 'JOIN_ROOM',
  GET_ALL_ROOMS = 'GET_ALL_ROOMS',
  DISCONNECT = 'DISCONNECT',
  ADD_ROOM = 'ADD_ROOM',
  GET_ROOM_MESSAGE = 'GET_ROOM_MESSAGE'
}

export enum Responses {
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
  ALL_ROOMS = 'ALL_ROOMS',
  JOINED_ROOM = 'JOINED_ROOM',
  ADDED_ROOM = 'ADDED_ROOM',
  RECEIVE_ROOM_MESSAGE = 'RECEIVE_ROOM_MESSAGE',
  ERROR = 'ERROR'
}


export type RoomItem = {
  name: string;
  id: string;
}

export type ChatListProps = {
  rooms?: RoomItem[] | null;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  selectRoom: (room: RoomItem) => void;
}