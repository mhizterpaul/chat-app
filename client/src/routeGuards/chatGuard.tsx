import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import * as React from "react";

const ChatGuard = () => {
  const navigate = useNavigate();
  const selector = (state: RootState) => state.account.user;
  const user = useAppSelector(selector);

  React.useEffect(() => {
    if (!user?.profileSetup) {
      navigate("/profile");
    }
  }, [user, navigate]);

  if (!user?.profileSetup) return null;
  return <Outlet />;
};

export default ChatGuard;
