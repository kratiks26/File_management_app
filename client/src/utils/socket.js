import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "https://file-management-app-rccj.onrender.com";

let socket; 

export const connectSocket = () => {
    if(!socket){
        socket = io(SOCKET_SERVER_URL,{
            autoConnect: false,
        })
        socket.connect()
    }
}

export const disconnectSocket = () =>{

    if(socket){
        socket.disconnect();
        socket = null;
    }

}

export const getSocket = ()=> {
    if(!socket){
        throw new Error("socket is disconnected, call connectSocket() to Connect.")
    }
    return socket;
};

