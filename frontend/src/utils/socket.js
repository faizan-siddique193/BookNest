import { io } from "socket.io-client";

let socketInstance = null;

const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(import.meta.env.VITE_BASE_URL, {
      withCredentials: true,
      autoConnect: false,
    });
  }

  return socketInstance;
};

export { getSocket };
