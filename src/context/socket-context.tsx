/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import React, { FC, useState, useEffect } from 'react';

import SocketService from '../services/socket-service';
import { useEmail } from '../components/hooks/use-email';
import { EmailData } from '../types/email';
import { Navigate } from 'react-router-dom';
import { SocketContext } from '../components/hooks/use-socket';
import { EventPayload } from '../types/socket';

interface SocketProviderProps {
  children: React.ReactNode;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const [socketClient, setSocketClient] = useState<SocketService | null>(null);

  const {senderEmail, emails, setEmails} =useEmail()



  const emit = (data: EventPayload) => {
    socketClient?.send(data);
  };

  const disconnect = () => {
    socketClient?.disconnect();
  };

  useEffect(() => {
    if (senderEmail) {
      const socketService = new SocketService({ url: baseUrl, sessionId:senderEmail });

      socketService.on('new-email', (data: EmailData) => {
        const newEmails =[...emails??[],data];
        setEmails(newEmails);
      });

      socketService.on('read-email', (data: EmailData) => {
        const email = emails.find( email => email._id === data._id);
        if(email){
            email.read = data.read
        }
    
      });

      socketService.startPing();

      setSocketClient(socketService);
    } else {
      <Navigate to={"/"} />
    }

    return () => {
      if (socketClient) {
        socketClient.disconnect();
        setSocketClient(null);
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socketClient, emit, disconnect, ws: socketClient?.ws! }}>
      {children}
    </SocketContext.Provider>
  );
};