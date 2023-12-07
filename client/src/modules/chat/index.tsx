import { memo, useEffect, useState } from "react";
import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useChatConnection } from "../../hooks/useChatConnection";
import { Events, Responses, RoomItem } from "./types";
import { ChatList } from "./components/ChatList";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { RoomSection } from "./components/RoomSection";

const ChatLayout = memo(() => {
  const { socket, reconnectConnection, disconnectConnection } =
    useChatConnection();

  return (
    <Chat
      disconnectConnection={disconnectConnection}
      reconnectConnection={reconnectConnection}
      socket={socket}
    />
  );
});

const Chat = ({
  socket,
  reconnectConnection,
  disconnectConnection,
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  reconnectConnection: VoidFunction;
  disconnectConnection: VoidFunction;
}) => {
  const [rooms, setRooms] = useState<RoomItem[] | null>(null);
  const [selectedRoom, setSelectedRooms] = useState<RoomItem | null>(null);

  const handleSelectRoom = (room: RoomItem) => {
    setSelectedRooms(room);
  };

  useEffect(() => {
    if (!rooms) {
      socket.emit(Events.GET_ALL_ROOMS);
    }
  }, [rooms, socket]);

  useEffect(() => {
    socket.on(Responses.ALL_ROOMS, (data: RoomItem[] | null) => {
      setRooms(data);
    });

    socket.on("connect", () => {
      socket.emit(Events.GET_ALL_ROOMS);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  return (
    <Box as="section">
      <Text mb="20px" textAlign="center" as="h1">
        Simple Chat
      </Text>
      <Center gap="2px" backgroundColor="thistle" w="100%" h="500px">
        <ChatList selectRoom={handleSelectRoom} socket={socket} rooms={rooms} />

        {selectedRoom && <RoomSection room={selectedRoom} socket={socket} />}
        {!selectedRoom && (
          <Center w="70%" h="100%" backgroundColor="tomato">
            Select room
          </Center>
        )}
      </Center>
      <Box>
        <Button onClick={reconnectConnection}>Reconnect</Button>
        <Button onClick={disconnectConnection}>Disconnect</Button>
      </Box>
    </Box>
  );
};

export default ChatLayout;
