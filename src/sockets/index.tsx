import React from 'react';
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_API_URL}`, { autoConnect: false });

const SocketContext = React.createContext({ socket });
export default SocketContext;
