import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Container from "@mui/material/Container";
import Login from "@components/login";
import Signup from "@components/signUp";

export default function Auth() {
  const [value, setValue] = React.useState("0");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" className="my-14 shadow-lg ">
      <h1 className="font-extrabold ">Welcome ✌️</h1>
      <p className="font-semibold ">
        fill in the details to get started with the best chat app!
      </p>
      <TabContext value={value}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList centered onChange={handleChange}>
              <Tab label="Signup" aria-label="Signup" value={"0"} />
              <Tab label="Login" aria-label="Login" value={"1"} />
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
