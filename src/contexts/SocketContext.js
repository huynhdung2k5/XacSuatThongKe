import { createContext } from "react";
import { io } from "socket.io-client";
import { HOST_API } from "src/config";

export const socket = io(HOST_API, { reconnectionDelayMax: 1000 });

export const SocketContext = createContext(socket);
