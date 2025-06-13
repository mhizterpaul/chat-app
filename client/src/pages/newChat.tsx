import * as React from "react";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import z from "zod";
import { HiOutlinePlus } from "react-icons/hi2";
import avatar from "../assets/group.svg";
import EditIcon from "../components/ui/editIcon";
import { GrFormEdit } from "react-icons/gr";
import { theme } from "../theme";
import SwipableDrawer from "../components/swipableDrawer";
import { getUserInfo } from "../store/slices/api/actions";
import { createChannel } from "../store/slices/api/actions";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  SnackbarContent,
  Tab,
  Avatar,
  AvatarGroup,
  Button,
  TextField,
  IconButton,
  Typography,
  CardMedia,
} from "@mui/material";
import { useFormik } from "formik";
import Contacts from "../components/contacts";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { User } from "../store/slices/user/types";
import { useAppDispatch } from "../store/hooks";
import { setActivePage } from "../store/slices/user";
import { useParams } from "react-router-dom";

export type ChannelData = {
  name: string;
  members: User[];
  avatar?: string;
};
function NewConversation() {
  const containerRef = React.useRef(null);
  const { type } = useParams();
  const [value, setValue] = React.useState(type === "channel" ? "0" : "1");
  const handleTab = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [channel, setChannel] = React.useState<ChannelData>({
    name: "",
    members: [],
  });
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setActivePage({ name: "new-chat" }));
  }, [dispatch]);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const [selectContacts, setSelectContacts] = React.useState(false);
  const handleSetChannel = async (
    key: keyof ChannelData,
    value: ChannelData[keyof ChannelData] | string[]
  ) => {
    if (key === "members") {
      try {
        const members = await getUserInfo(value as string[]);
        setChannel((prev) => ({ ...prev, members }));
      } catch (e) {
        console.log(e);
      }
      return;
    }

    setChannel((prev) => ({ ...prev, [key]: value }));
  };
  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    dirty,
    isValid,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: toFormikValidationSchema(
      z.object({ name: z.string().min(3) })
    ),
    onSubmit: async (values, { resetForm }) => {
      const { name } = values;
      if (!channel.members) return;
      const channelData = { ...channel, name };
      try {
        const { channel } = await createChannel(channelData);
        navigate("/messages/channel/" + channel._id);
        resetForm();
      } catch (e) {
        console.log(e);
      }
    },
  });
  return (
    <>
      <Container
        ref={containerRef}
        sx={{
          "& .MuiDrawer-root > .MuiPaper-root": {
            height: `50%`,
            overflow: "visible",
          },
        }}
      >
        <TabContext value={value}>
          <TabList
            centered
            sx={{
              "& .MuiTabs-flexContainer": {
                marginTop: "1.5rem",
                backgroundColor: "background.default",
                justifyContent: "space-around",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                borderRadius: "1rem",
                boxShadow:
                  "inset 0 2px 8px 0 rgba(0,0,0,0.15), inset 0 -2px 8px 0 rgba(0,0,0,0.10)",
              },
              "& button.MuiTab-root": {
                maxWidth: 200,
                textTransform: "capitalize",
                fontWeight: "bold",
              },
              "& button.Mui-selected > div.MuiSnackbarContent-root": {
                boxShadow: "0px 1px 5px -1px rgba(0,0,0,0.2), 0px 2px 10px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
              },
              "& button.Mui-selected": {
                borderRadius: "1.5rem",
                background: "background.paper",
              },
              '& button.MuiTab-root[aria-selected="false"]': {
                boxShadow: 'inset 0 2px 8px 0 rgba(0,0,0,0.10)',
                background: 'background.paper',
                borderRadius: '1rem',
                marginTop: "0.6rem",
                marginBottom: "0.6rem",
                width: "25%",
                transition: 'box-shadow 0.2s, border 0.2s',
              },
              "& .MuiSnackbarContent-message": {
                transform: "translateX(6rem);",
                color: theme.palette.green.main,
              },
              "& span.MuiTabs-indicator": {
                display: "none",
              },
            }}
            onChange={handleTab}
          >
            <Tab
              aria-label="channel"
              value={"0"}
              label={Number(value) ? "Channel" : undefined}
              icon={
                !Number(value) ? (
                  <SnackbarContent
                    sx={{ backgroundColor: "background.paper" }}
                    message="Channel"
                  />
                ) : undefined
              }
            />
            <Tab
              aria-label="personal"
              value={"1"}
              label={!Number(value) ? "Personal" : undefined}
              icon={
                Number(value) ? (
                  <SnackbarContent
                    sx={{ backgroundColor: "background.paper" }}
                    message="personal"
                  />
                ) : undefined
              }
            />
          </TabList>
          <TabPanel value={"0"}>
            {!selectContacts && (
              <>
                <Box
                  sx={{
                    position: "relative",
                    borderSpacing: "1px",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: "40%" }}
                    image={channel.avatar || avatar}
                    alt="david"
                    className=" rounded-full p-1 mx-auto"
                  />
                  <IconButton
                    onClick={toggleDrawer(true)}
                    className=" absolute right-[26%] bottom-1 sm:right-[28%] sm:bottom-[3%] "
                  >
                    <EditIcon className=" h-12 w-12 text-[#4ab6f7] bg-white rounded-full border-gray-400 border-[1px] p-2 " />
                  </IconButton>
                </Box>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="create channel"
                  className=" w-full flex flex-col place-items-center gap-y-6 mt-6 "
                >
                  <Typography variant="h6">
                    {values.name || "Conversation Name"}
                  </Typography>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Add Conversation Name"
                    type="name"
                    aria-label="name"
                    label="Conversation Name"
                    name="name"
                    variant="outlined"
                    value={values.name}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <Box
                    sx={{ borderColor: "secondary.body1" }}
                    className="flex hover:ring-black relative place-items-center px-4 ring-1 ring-inset min-h-[59px] min-w-[252px] ring-gray-300 rounded-md justify-between "
                  >
                    {!channel.members.length ? (
                      <>
                        <Typography sx={{ color: theme.palette.primary.main }}>
                          Add Members
                        </Typography>
                        <IconButton onClick={() => setSelectContacts(true)}>
                          <HiOutlinePlus className="text-[#4ab6f7]" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <div className="flex mx-2 justify-between gap-x-6">
                          <Typography>
                            <span className="text-[#9965d4]">
                              {channel.members.length}
                            </span>{" "}
                            are selected
                          </Typography>
                          <div>
                            <IconButton
                              className="mr-4"
                              onClick={() => setSelectContacts(true)}
                            >
                              <GrFormEdit className="text-[#4ab6f7]" />
                            </IconButton>
                            <IconButton onClick={() => setSelectContacts(true)}>
                              <HiOutlinePlus className="text-[#4ab6f7]" />
                            </IconButton>
                          </div>
                        </div>
                        <AvatarGroup total={12}>
                          {channel.members.map((member) => (
                            <Avatar
                              alt={`${member.firstName} ${member.lastName}`}
                              src={member.image}
                            />
                          ))}
                        </AvatarGroup>
                      </>
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        position: "absolute",
                        left: "1rem",
                        top: -10,
                        color: "text.secondary",
                      }}
                    >
                      Members
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={
                      (!isValid && dirty) || !dirty || !channel.members.length
                    }
                    aria-label="submit"
                    className="text-white "
                  >
                    Create Channel
                  </Button>
                </Box>
              </>
            )}
            {selectContacts && (
              <Contacts
                type="channel"
                selectContacts={setSelectContacts}
                setChannel={handleSetChannel}
              />
            )}
          </TabPanel>
          <TabPanel value={"1"}>
            <Contacts type="private" />
          </TabPanel>
        </TabContext>
        {containerRef.current ? (
          <SwipableDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            container={containerRef.current}
            setChannel={handleSetChannel}
          />
        ) : null}
      </Container>
    </>
  );
}

export default NewConversation;
