import { useMemo } from "react";
import React from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext(null);

export const useSocket = () =>{
    return React.useContext(SocketContext);
};
export const SocketProvider=(props)=>{
    const socket=useMemo(()=>io('http://127.0.0.1:2000'),[]);
    
    return(
        <SocketContext.Provider value={{socket}}>
            {props.children}
        </SocketContext.Provider>
    )
}