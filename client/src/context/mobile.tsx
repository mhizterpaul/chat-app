import * as React from "react";
import { Outlet } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};
interface IMobileContext {
  mobileOpen: boolean;
  setIsClosing: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
  isClosing: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
}

export const MobileContext = React.createContext<IMobileContext>({
  mobileOpen: false,
  setMobileOpen: () => {},
  isClosing: false,
  setIsClosing: () => {},
});

// Create the provider component
export const MobileProvider = ({ children }: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  return (
    <MobileContext.Provider
      value={{ mobileOpen, setMobileOpen, isClosing, setIsClosing }}
    >
      {children || <Outlet />}
    </MobileContext.Provider>
  );
};

export default MobileProvider;
