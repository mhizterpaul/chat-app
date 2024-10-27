import * as React from "react";
import { RiSearch2Line } from "react-icons/ri";
import NavBar from "../components/navbar";
import {
  TextField,
  InputAdornment,
  MenuItem,
  MenuList,
  ListItemText,
  Avatar,
  Button,
  Checkbox,
  Container,
} from "@mui/material";
import avatar from "../assets/avatar.png";
import { names } from "../utils/constants";

function SelectMembers() {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLElement;
    const value = target.parentElement?.parentElement?.getAttribute("value");
    if (!value) return;
    const idx = personName.indexOf(value);
    setPersonName((curr) =>
      idx != -1 ? curr.filter((el, id) => id != idx) : [...curr, value]
    );
  };
  return (
    <>
      <NavBar name="select members" />
      <Container className=" px-8 mt-8 ">
        <TextField
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
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
        <MenuList
          onClick={handleChange}
          className=" mt-6 overflow-y-scroll overflow-x-hidden"
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              sx={{ mb: "1rem" }}
              className=" rounded-lg shadow-lg p-4 "
            >
              <Avatar
                alt="Remy Sharp"
                src={avatar}
                sx={{
                  marginRight: "1.25rem",
                }}
                className={`${
                  personName.includes(name) ? "ring-1 ring-[#4ab6f7]" : ""
                }`}
              />
              <ListItemText
                primary={name}
                secondary="some really descriptive text"
              />
              <Checkbox checked={personName.includes(name)} />
            </MenuItem>
          ))}
        </MenuList>
        <Button size="large">Add {personName.length} Members</Button>
      </Container>
    </>
  );
}

export default SelectMembers;
