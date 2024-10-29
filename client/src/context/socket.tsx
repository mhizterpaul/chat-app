import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RootState } from "../store";
import * as React from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Message } from "../store/slices/chats/types";
import { addMessage } from "../store/slices/chats/actions";

const SocketContext = React.createContext<null | Socket<
  DefaultEventsMap,
  DefaultEventsMap
>>(null);

export function useSocket() {
  return React.useContext(SocketContext);
}
export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socket = React.useRef<null | Socket<
    DefaultEventsMap,
    DefaultEventsMap
  >>(null);
  const selector = (state: RootState) => state.account.user;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selector);
  React.useEffect(() => {
    if (user) {
      socket.current = io(process.env.API || "", {
        withCredentials: true,
        query: { userid: user.id },
      });
      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });
      const handleRecievedMessage = (message: Message) => {
        dispatch(addMessage(message));
      };
      socket.current.on("recieveMessage", handleRecievedMessage);
      return () => {
        socket.current?.disconnect();
      };
    }
  }, [user]);
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
}
