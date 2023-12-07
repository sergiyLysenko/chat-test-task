import { Box } from '@chakra-ui/react'
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { ChatListProps, Events, RoomItem } from '../../modules/chat/types';

export const ChatListItem = ({ room, socket, selectRoom }: { room: RoomItem, socket: Socket<DefaultEventsMap, DefaultEventsMap>, selectRoom: ChatListProps['selectRoom'] }) => {
  const joinRoom = (roomID: string) => {
    if (socket) {
      socket.emit(Events.JOIN_ROOM, { roomID })
    }
  }

  return <Box
    onClick={() => {
      selectRoom(room)
      joinRoom(room.id)
    }}
    cursor='pointer'
    mb='5px'
    border='1px solid black'
    p='5px 10px'
    key={room.id}
  >
    {room.name}
  </Box>;
}