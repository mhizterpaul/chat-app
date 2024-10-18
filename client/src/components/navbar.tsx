import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { IoIosMenu, IoIosArrowRoundBack } from "react-icons/io";

type props = {
  name: string;
};
export default function navbar({ name }: props) {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton>
          <IoIosArrowRoundBack />
        </IconButton>
        <Typography variant="h3">{name}</Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <IoIosMenu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
