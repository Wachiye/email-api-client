import { createContext, useContext } from "react";
import { SocketState } from "../../types/socket";

export const SocketContext = createContext<SocketState | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
