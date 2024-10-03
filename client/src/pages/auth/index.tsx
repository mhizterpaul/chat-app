import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

export default function Auth() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </TabList>
          <TabPanel value={String(value)}><Login/></TabPanel>
          <TabPanel value={String(value)}><Sign/></TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
