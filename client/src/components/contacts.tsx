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
    value: ChannelData[keyof ChannelData] | string[]
  ) => unknown;
};

function SelectMembers({ type, setChannel, selectContacts }: Props) {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const selector = (state: RootState) => state.chats.contacts;
  const contacts = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState<User[]>([]);
  const [startTransition, setStartTransition] = React.useState("");

  React.useEffect(() => {
    if (type === "private" && startTransition.length) {
      navigate("/messages/private/" + startTransition);
    }
    setTimeout(() => !contacts.length && dispatch(getContacts()), 2000);
  }, [type, contacts, navigate, dispatch, startTransition]);

  const handleChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLElement;
    const value = target.parentElement?.parentElement?.getAttribute("value");

    if (!value) return;
    
    if (type === "private" && contacts.length > 0) {
      const id = contacts.filter((contact) => contact.id === value)[0].id;
      setStartTransition(id);
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
          placeholder={type === "channel" ? "find members" : "search for users"}
          type="name"
          name="name"
          variant="outlined"
          aria-label="name"
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
          <Button
            sx={{ mt: "1rem" }}
            onClick={() => navigate("/new-chat/channel")}
          >
            <Typography>Create New Channel</Typography>
          </Button>
        ) : null}
        <MenuList
          onClick={handleChange}
          className=" mt-6 overflow-y-scroll overflow-x-hidden"
        >
          {search.length
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
                      personName.includes(id) ? "ring-1 ring-[#4ab6f7]" : ""
                    }`}
                  />
                  <ListItemText primary={`${firstName} ${lastName}`} />
                  {type === "channel" ? (
                    <Checkbox checked={personName.includes(id)} />
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
