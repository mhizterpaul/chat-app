import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const AppGuard = () => {
  const navigate = useNavigate();
  const selector = (state: RootState) => state.account;
  const account = useAppSelector(selector);

  if (!account.user?.profileSetup) {
    navigate("/profile");
    return;
  }

  return <Outlet />;
};

export default AppGuard;
