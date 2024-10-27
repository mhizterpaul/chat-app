import * as React from "react";
import { Box, Tab, Container, Typography, SvgIcon } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Login from "../components/login";
import Signup from "../components/signup";
import { useNavigate } from "react-router-dom";
import victoryIcon from "../assets/victory.svg";

export default function SignOn() {
  const selector = (state: RootState) => state.account.user;
  const user = useSelector(selector);
  const navigate = useNavigate();

  //Conditional Redirect
  if (user) navigate("/chats");

  const [value, setValue] = React.useState("0");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="lg" className="my-14 ">
      <Typography variant="h6" className="font-extrabold text-center">
        Welcome
        <SvgIcon>{victoryIcon}</SvgIcon>
      </Typography>
      <Typography variant="body2" className="font-semibold text-center mb-8">
        fill in the details to get started with the best chat app!
      </Typography>
      <TabContext value={value}>
        <Box sx={{ width: "100%" }}>
          <Box className="mb-6">
            <TabList centered onChange={handleChange}>
              <Tab
                label="Signup"
                aria-label="Signup"
                value={"0"}
                sx={{ width: 150 }}
              />
              <Tab
                label="Login"
                aria-label="Login"
                value={"1"}
                sx={{ width: 150 }}
              />
            </TabList>
          </Box>
          <TabPanel value={"0"}>
            <Signup />
          </TabPanel>
          <TabPanel value={"1"}>
            <Login />
          </TabPanel>
        </Box>
      </TabContext>
    </Container>
  );
}
