import { useEffect, useRef } from "react";
import { getSocket } from "../socket/socket";

export const useSocket = (event, handler) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!event || !handler) return;
    const socket = getSocket();

    const listener = (...args) => {
      if (handlerRef.current) {
        handlerRef.current(...args);
      }
    };

    socket.on(event, listener);
    return () => {
      socket.off(event, listener);
    };
  }, [event]);

  return getSocket();
};

export default useSocket;
