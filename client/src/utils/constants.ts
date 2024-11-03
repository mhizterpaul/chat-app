import * as React from "react";
import { MobileContext } from "../context/mobile";
import { SocketContext } from "../context/socket";

export const customStyle = {
  width: "21rem",
};

export const useMobile = () => React.useContext(MobileContext);
export const drawerBleeding = 56;
export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const API = import.meta.env.VITE_API;
export const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST;
export function useSocket() {
  return React.useContext(SocketContext);
}
