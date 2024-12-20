import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import { IoIosMenu, IoIosArrowRoundBack } from "react-icons/io";
import { PiDotsThreeBold } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";
//import { drawerWidth } from "./drawer";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useMobile } from "../utils/constants";
type Props = {
  children?: React.ReactNode;
};

const titleMap: { [key: string]: string } = {
  profile: "edit profile",
  settings: "profile and settings",
  "new-chat": "create a new conversation",
  channelContacts: "select Members",
  privateContacts: "select Contact",
};

export default function Navbar({ children }: Props) {
  const selector = (state: RootState) => state.account.activePage;
  const { name, description, icon } = useAppSelector(selector);
  const navigate = useNavigate();
  const { isClosing, setMobileOpen, mobileOpen } = useMobile();
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        className="shadow-lg"
        component="nav"
        sx={
          {
            //width: { sm: `calc(100% - ${drawerWidth})` },
            //ml: { sm: `${drawerWidth}` },
          }
        }
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton onClick={() => navigate(-1)}>
            <IoIosArrowRoundBack />
          </IconButton>
          <Box className="flex place-items-center ">
            {icon}
            <Typography className=" capitalize text-nowrap " variant="h4">
              {titleMap[name] || name}
              {"\n"}
              {description ? (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {description}
                </Typography>
              ) : null}
            </Typography>
          </Box>
          {[1].map(() => {
            let icon: React.ReactNode | null = null;
            switch (name) {
              case "settings":
                icon = <PiDotsThreeBold />;
                break;
              case "new-chat":
                icon = <LiaTimesSolid />;
            }
            if (description) {
              return (
                <IconButton
                  size="large"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{
                    mr: 2,
                    color: "text.secondary",
                    display: { sm: "none" },
                  }}
                >
                  <IoIosMenu />
                </IconButton>
              );
            }
            return icon ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2, color: "text.secondary" }}
              >
                {icon}
              </IconButton>
            ) : (
              <Box sx={{ maxWidth: "5vw", flexGrow: 1 }} />
            );
          })}
        </Toolbar>
      </AppBar>
      {children || <Outlet />}
    </>
  );
}
