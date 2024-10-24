import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import { IoIosMenu, IoIosArrowRoundBack } from "react-icons/io";
import { PiDotsThreeBold } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";
import { drawerWidth } from "./drawer";
import Drawer from "./drawer";
type props = {
  name: string;
  icon?: React.ReactNode;
  secondary?: string;
};

export default function Navbar({ name, icon, secondary }: props) {
  const [isClosing, setIsClosing] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navbarRef = React.useRef<HTMLDivElement>(null);
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  return (
    <>
      <AppBar
        position="static"
        className="shadow-lg"
        ref={navbarRef}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton>
            <IoIosArrowRoundBack />
          </IconButton>
          <Box className="flex place-items-center ">
            {icon}{" "}
            <Typography className=" capitalize text-nowrap " variant="h4">
              {name}\n
              {secondary ? (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {secondary}
                </Typography>
              ) : null}
            </Typography>
          </Box>
          {[1].map(() => {
            let icon: React.ReactNode | null = null;
            switch (name) {
              case "chat":
                icon = <IoIosMenu />;
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
                    {icon}
                  </IconButton>
                );
              case "settings":
                icon = <PiDotsThreeBold />;
                break;
              case "create a new conversation":
                icon = <LiaTimesSolid />;
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
      <Drawer
        mobileOpen={mobileOpen}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        handleDrawerClose={handleDrawerClose}
        container={navbarRef.current ? navbarRef.current.parentElement : null}
      />
    </>
  );
}
