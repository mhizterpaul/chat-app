import * as React from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import ProfileIcon from "../components/ui/profileIcon";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setActivePage } from "../store/slices/user";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../store";

export default function SimpleBottomNavigation() {

  const selector = (state: RootState) => state.account.activePage;
  const activePage = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = React.useState(activePage.name);
  const [_navigate, setNavigate] = React.useState(false);

  React.useEffect(() => {
    if (page === "new-chat") {
      navigate("/new-chat/private");
      return;
    }
    if (location.pathname !== "/" + page && _navigate) navigate("/" + page);
    setNavigate(false);
  }, [page, navigate]);

  return (
    <Box sx={{ marginTop: "2.5rem" }}>
      <BottomNavigation
        showLabels
        value={page}
        onChange={(_, newValue) => {
          setNavigate(true);
          setPage(newValue);
          dispatch(setActivePage({ name: newValue }));
        }}
        className=" relative flex content-between "
      >
        <BottomNavigationAction
          label="Conversations"
          value="chats"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m13.629 20.472l-.542.916c-.483.816-1.69.816-2.174 0l-.542-.916c-.42-.71-.63-1.066-.968-1.262c-.338-.197-.763-.204-1.613-.219c-1.256-.021-2.043-.098-2.703-.372a5 5 0 0 1-2.706-2.706C2 14.995 2 13.83 2 11.5v-1c0-3.273 0-4.91.737-6.112a5 5 0 0 1 1.65-1.651C5.59 2 7.228 2 10.5 2h3c3.273 0 4.91 0 6.113.737a5 5 0 0 1 1.65 1.65C22 5.59 22 7.228 22 10.5v1c0 2.33 0 3.495-.38 4.413a5 5 0 0 1-2.707 2.706c-.66.274-1.447.35-2.703.372c-.85.015-1.275.022-1.613.219c-.338.196-.548.551-.968 1.262"
                opacity=".5"
              />
              <path
                fill="currentColor"
                d="M7.25 9A.75.75 0 0 1 8 8.25h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9m0 3.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75"
              />
            </svg>
          }
        />
        <Box sx={{ flexGrow: 1 }} />
        <BottomNavigationAction
          className=" rounded-full shadow-lg w-[4.75rem] h-[4.75rem] "
          sx={{
            shapeOutside: "circle()",
            position: "absolute",
            zIndex: 1,
            top: -45,
            left: 0,
            right: 0,
            margin: "0 auto",
            color: "background.paper",
            backgroundColor: "secondary.main",
          }}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2zm-9 4v3H8v2h3v3h2v-3h3V9h-3V6z"
              />
            </svg>
          }
          value="new-chat"
        />
        <BottomNavigationAction
          value="settings"
          label="Profile"
          icon={<ProfileIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
