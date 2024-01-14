import React from "react";
import socket from "../socket";
const value = { connect: socket.connect, listen: socket.listen, sendMessage: socket.sendMessage }
export const globalContext = React.createContext<
    {
        connect: (url: string, username: string) => void,
        listen: (callback: (data: { message: string, to: string, from: string }) => void) => void,
        sendMessage: (text: { to: string, message: string, from: string }) => void
    }
>(value)

export default function GlobalProvider({ children }) {
    return (
        <globalContext.Provider value={value}>
            {children}
        </globalContext.Provider>
    )
}