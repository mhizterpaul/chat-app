import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import * as React from "react";

const AppGuard = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const selector = (state: RootState) => state.account.user;
  const user = useAppSelector(selector);
  React.useEffect(() => {

    if (!user && import.meta.env.VITE_ENV === "production") {
      navigate("/sign-on");
      return;
    }
  }, [user, navigate]);

  if (import.meta.env.VITE_ENV !== "production") {
    return children || <Outlet />;
  }
  if (!user) return null;
  return children || <Outlet />;
};

export default AppGuard;
