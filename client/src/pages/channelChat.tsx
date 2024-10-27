import React from "react";
import { HiRocketLaunch } from "react-icons/hi2";
import NavBar from "../components/navbar";
import {
  Container,
  Box,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { drawerWidth } from "../components/drawer";
import { RiSearch2Line } from "react-icons/ri";

function Chat() {
  return (
    <>
      <NavBar
        icon={<HiRocketLaunch />}
        name="development"
        secondary={"12 members"}
      />
      <Container sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Box>
          <IconButton></IconButton>
          <TextField
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="end">
                    <RiSearch2Line />
                  </InputAdornment>
                ),
              },
            }}
            placeholder="find members"
            type="name"
            name="name"
            variant="outlined"
            aria-label="name"
            value={"some value"}
            onChange={() => {}}
          />
          <IconButton></IconButton>
        </Box>
      </Container>
    </>
  );
}

export default Chat;
