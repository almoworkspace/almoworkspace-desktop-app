import React from 'react';
import { io } from 'socket.io-client';

export const socket = io('https://almoworkspace.com:3010', { transports: ["websocket"] });
// export const socket = io('http://localhost:3010', { transports: ["websocket"] });
export const SocketContext = React.createContext();