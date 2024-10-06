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
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" className="mx-10 my-14 shadow-lg ">
      <h1 className="font-extrabold ">Welcome ✌️</h1>
      <p className="font-semibold ">
        fill in the details to get started with the best chat app!
      </p>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Login" />
              <Tab label="Signup" />
            </TabList>
            <TabPanel value={String(value)}>
              <Login />
            </TabPanel>
            <TabPanel value={String(value)}>
              <Signup />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Container>
  );
}
