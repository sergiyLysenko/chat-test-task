import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { htmlEncode } from "../../../../utility";
import { Events, Responses, RoomItem } from "../../types";
import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useInputValue } from "../../../../hooks/useInputValue";
import { useUserInfo } from "../../../../hooks/useUserInfo";
import { MessageType } from "../../../../components/Message/types";
import { Message } from "../../../../components/Message";

export const RoomSection = ({
  socket,
  room,
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  room: RoomItem;
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { nickname } = useUserInfo();
  const [value, onChange, forceSetValue] = useInputValue<HTMLInputElement>("");
  const [disconnected, setDisconnected] = useState<boolean>(
    socket.disconnected,
  );

  const memoizedMessages = useMemo(
    () =>
      messages.map((message, index) => (
        <Message
          key={message.message + index}
          text={message.message}
          date={message.date}
          author={message.author}
        />
      )),
    [messages],
  );

  useEffect(() => {
    if (disconnected) {
      setError("You are disconnected");
    } else {
      setError(null);
    }
  }, [disconnected]);

  useEffect(() => {
    socket.emit(Events.GET_ROOM_MESSAGE, room);

    socket.on(Responses.RECEIVE_MESSAGE, (data: MessageType) => {
      if (room.id === data.roomID) {
        setMessages((prev) => [...prev, data]);
        setError(null);
      }
    });
    setMessages([]);

    socket.on(
      Responses.ERROR,
      (data: { error: { type: Events; message: string } }) => {
        setError(data.error.message);
      },
    );

    socket.on(Responses.RECEIVE_ROOM_MESSAGE, (data: MessageType[]) => {
      setMessages(data.filter((value) => value.roomID == room.id));
    });

    const updateConnectionStatus = () => setDisconnected(socket.disconnected);

    socket.on("connect", updateConnectionStatus);
    socket.on("disconnect", updateConnectionStatus);

    return () => {
      socket.removeAllListeners();
    };
  }, [socket, room, setError]);

  const handleOnSendMessage = async () => {
    const messageData = {
      roomID: room.id,
      author: nickname,
      message: htmlEncode(value || ""),
      date: new Date(Date.now()),
    };

    socket.emit(Events.SEND_MESSAGE, messageData);
    forceSetValue("");
  };

  const handleOnChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (!disconnected) setError(null);
  };

  return (
    <Box w="70%" h="100%" backgroundColor="#2979FF">
      <Text textAlign="center">{room.name}</Text>
      <Box p="5px" h="85%">
        <Center
          overflowY="auto"
          justifyContent="flex-start"
          flexDir="column"
          gap="2px"
          h="90%"
        >
          {memoizedMessages}
        </Center>
        <Center gap="5px" alignItems="flex-end">
          <Box>
            <Text h="24px">{error}</Text>
            <Input
              _invalid={{ borderColor: "red" }}
              isInvalid={!!error || disconnected}
              h="40px"
              onChange={handleOnChangeWrapper}
              value={value}
              disabled={disconnected}
            />
          </Box>
          <Button onClick={handleOnSendMessage} h="25px" w="25px">
            Send
          </Button>
        </Center>
      </Box>
    </Box>
  );
};
