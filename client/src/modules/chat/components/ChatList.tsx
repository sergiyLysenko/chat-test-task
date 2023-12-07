import { FC, useEffect } from "react"
import { ChatListProps, Events, Responses } from "../types"
import { Box, Button } from '@chakra-ui/react'
import { ChatListItem } from "../../../components/ChatRoomItem"

export const ChatList: FC<ChatListProps> = ({ rooms, socket, selectRoom }) => {

  useEffect(() => {
    socket.on(Responses.ADDED_ROOM, () => {
      socket.emit(Events.GET_ALL_ROOMS)
    });
  }, [socket])

  return (
    <Box px='5px' backgroundColor='red' h='100%' w='30%' maxW='30%'>
      {!rooms || !rooms.length && <Box textAlign='center'>No rooms yet</Box>}
      {rooms && !!rooms.length && (
        <Box textAlign='center'>
          Rooms
          <Button
            h='15px'
            minW='5px'
            maxW='5px'
            ml='2px'
            lineHeight='100%'
            onClick={() => {
              socket.emit(Events.ADD_ROOM, { name: 'Manual created', id: 'test' });
            }}
          >
            +
          </Button>
        </Box>
      )}
      {rooms?.map(room => <ChatListItem selectRoom={selectRoom} key={room.id} socket={socket} room={room} />)}
    </Box>
  )
}