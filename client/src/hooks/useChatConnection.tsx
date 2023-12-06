import { useCallback } from "react";
import { io } from "socket.io-client";

export const useChatConnection = () => {
  const socket = io('http://localhost:3001', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  const reconnectConnection = useCallback(() => {
    if (!socket.active) {
      socket.connect();
    }
  }, [socket])

  const disconnectConnection = useCallback(() => {
    socket.disconnect();
  }, [socket])

  return { socket, reconnectConnection, disconnectConnection }
}