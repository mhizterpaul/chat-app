import * as React from "react";
import { RiSearch2Line } from "react-icons/ri";
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
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getContacts } from "../store/slices/chats/actions";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RootState } from "../store";
import { searchUsers } from "../store/slices/api/actions";
import { User } from "../store/slices/user/types";
import { ChannelData } from "../pages/newChat";

type Props = {
  type: string;
  selectContacts?: (state: boolean) => unknown;
  setChannel?: (
    key: keyof ChannelData,
    value: ChannelData[keyof ChannelData] | number[]
  ) => unknown;
};

function SelectMembers({ type, setChannel, selectContacts }: Props) {
  const [personName, setPersonName] = React.useState<number[]>([]);
  const selector = (state: RootState) => state.chats.contacts;
  const contacts = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  dispatch(getContacts());
  const [search, setSearch] = React.useState<User[]>([]);
  const handleChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLElement;
    const valueElement =
      target.parentElement?.parentElement?.getAttribute("value");
    const value = Number(valueElement);
    if (!valueElement) return;
    if (type === "private" && contacts.length > 0) {
      const id = contacts.filter((contact) => contact.id === value)[0].id;
      navigate("/messages/private/" + id);
    }
    const idx = personName.indexOf(value);
    setPersonName((curr) =>
      idx != -1 ? curr.filter((el, id) => id != idx) : [...curr, value]
    );
  };
  return (
    <>
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
          onChange={async ({ target: { value } }) => {
            let processing;
            if (value.length > 4 && !processing) {
              processing = true;
              setTimeout(() => (processing = false), 3000);
              try {
                const { data } = await searchUsers(value);
                setSearch(data.contacts);
              } catch (e) {
                console.log(e);
              }
            }
          }}
        />
        {type === "private" ? (
          <Box onClick={() => navigate("/new-chat/" + type)}>
            <Typography>Create New Channel</Typography>
          </Box>
        ) : null}
        <MenuList
          onClick={handleChange}
          className=" mt-6 overflow-y-scroll overflow-x-hidden"
        >
          {search
            ? search.map(({ firstName, lastName, image, id }) => (
                <MenuItem
                  key={id}
                  value={`${firstName} ${lastName}`}
                  sx={{ mb: "1rem" }}
                  className=" rounded-lg shadow-lg p-4 "
                >
                  <Avatar
                    alt={`${firstName} ${lastName}`}
                    src={image}
                    sx={{
                      marginRight: "1.25rem",
                    }}
                    className={`${
                      personName.includes(Number(id)) ? "ring-1 ring-[#4ab6f7]" : ""
                    }`}
                  />
                  <ListItemText primary={`${firstName} ${lastName}`} />
                  {type === "channel" ? (
                    <Checkbox checked={personName.includes(Number(id))} />
                  ) : null}
                </MenuItem>
              ))
            : contacts.map(({ label, avatar, id }) => (
                <MenuItem
                  key={id}
                  value={id}
                  sx={{ mb: "1rem" }}
                  className=" rounded-lg shadow-lg p-4 "
                >
                  <Avatar
                    alt={label}
                    src={avatar}
                    sx={{
                      marginRight: "1.25rem",
                    }}
                    className={`${
                      personName.includes(id) ? "ring-1 ring-[#4ab6f7]" : ""
                    }`}
                  />
                  <ListItemText primary={label} />
                  {type === "channel" ? (
                    <Checkbox checked={personName.includes(id)} />
                  ) : null}
                </MenuItem>
              ))}
        </MenuList>
        <Button
          size="large"
          onClick={() => {
            if (setChannel) setChannel("members", personName);
            if (selectContacts) selectContacts(false);
          }}
        >
          Add {personName.length} Members
        </Button>
      </Container>
    </>
  );
}

export default SelectMembers;
