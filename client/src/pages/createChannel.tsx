import * as React from "react";
import NavBar from "../components/navbar";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { z } from "zod";
import { HiOutlinePlus } from "react-icons/hi2";
import avatar from "../assets/avatar.png";
import EditIcon from "../components/ui/editIcon";
import { GrFormEdit } from "react-icons/gr";
import { theme } from "../theme";
import SwipableDrawer from "../components/swipableDrawer";
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
import { toFormikValidationSchema } from "zod-formik-adapter";

function NewConversation() {
  const containerRef = React.useRef(null);
  const [value, setValue] = React.useState("0");
  const handleTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <NavBar name="create a new conversation" />
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
                backgroundColor: "background.default",
                justifyContent: "space-between",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                borderRadius: "1rem",
              },
              "& button.MuiTab-root": {
                maxWidth: 200,
                textTransform: "capitalize",
                fontWeight: "bold",
              },
              "& button.Mui-selected": {
                backgroundColor: "background.paper",
                borderRadius: "1.5rem",
              },
              "& div.MuiSnackbarContent-message": {
                marginLeft: "4.5rem",
                color: theme.palette.green.main,
              },
              "& span.MuiTabs-indicator": {
                display: "none",
              },
            }}
            onChange={handleTab}
          >
            <Tab
              aria-label="conversation"
              value={"0"}
              label={Number(value) ? "Conversation" : undefined}
              icon={
                !Number(value) ? (
                  <SnackbarContent
                    sx={{ backgroundColor: "background.paper" }}
                    message="Conversation"
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
            <Box
              sx={{
                position: "relative",
                borderSpacing: "1px",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "40%" }}
                image={avatar}
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
              aria-label="signup"
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
                className="flex hover:ring-black place-items-center px-4 ring-1 ring-inset min-h-[59px] min-w-[252px] ring-gray-300 rounded-md justify-between "
              >
                {true ? (
                  <>
                    <Typography sx={{ color: theme.palette.primary.main }}>
                      Add Members
                    </Typography>
                    <IconButton>
                      <HiOutlinePlus className="text-[#4ab6f7]" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <div>
                      <Typography></Typography>
                      <IconButton>
                        <GrFormEdit />
                      </IconButton>
                      <IconButton>
                        <HiOutlinePlus />
                      </IconButton>
                    </div>
                    <AvatarGroup total={24}>
                      <Avatar alt="Remy Sharp" src={avatar} />
                      <Avatar alt="Travis Howard" src={avatar} />
                      <Avatar alt="Agnes Walker" src={avatar} />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroup>
                  </>
                )}
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                type="submit"
                variant="contained"
                disabled={(!isValid && dirty) || !dirty}
                aria-label="submit"
                className="text-white "
              >
                Create Conversation
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={"1"}></TabPanel>
        </TabContext>
        {containerRef.current ? (
          <SwipableDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            container={containerRef.current}
          />
        ) : null}
      </Container>
    </>
  );
}

export default NewConversation;
