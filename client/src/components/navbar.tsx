import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import { IoIosMenu, IoIosArrowRoundBack } from "react-icons/io";
import { PiDotsThreeBold } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";
type props = {
  name: string;
};

export default function navbar({ name }: props) {
  return (
    <AppBar position="static" className="shadow-lg">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton>
          <IoIosArrowRoundBack />
        </IconButton>
        <Typography className=" capitalize text-nowrap " variant="h4">
          {name}
        </Typography>
        {[1].map(() => {
          let icon: React.ReactNode | null = null;
          switch (name) {
            case "chat":
              icon = <IoIosMenu />;
              break;
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
              aria-label="menu"
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
  );
}
