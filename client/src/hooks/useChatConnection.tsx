import { io } from "socket.io-client";

export const useChatConnection = () => {
  const socket = io('http://localhost:3001', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  const reconnectConnection = () => {
    if (!socket.active) {
      socket.connect();
    }
  }

  const disconnectConnection = () => {
    socket.disconnect();
  }

  return { socket, reconnectConnection, disconnectConnection }
}