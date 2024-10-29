import {
  Box,
  Container,
  Stack,
  Card,
  Button,
  CardActions,
  CardContent,
  IconButton,
  CardMedia,
  Typography,
  Switch,
} from "@mui/material";
import avatar from "../assets/avatar2.jpg";
import EditIcon from "../components/ui/editIcon.tsx";
import BottomNavigation from "../components/bottomNavigation";
import { MdKeyboardArrowRight } from "react-icons/md";
import * as React from "react";
import { IoMdTime } from "react-icons/io";
import { RiFontSize2 } from "react-icons/ri";

const stackItemStyle = {
  marginLeft: "auto",
  textWrap: "nowrap",
  "& > *": {
    display: "inline-block",
  },
  "&>p": {
    textAlign: "end",
    verticalAlign: "middle",
    width: {
      xs: "130px",
      sm: "fit-content",
    },
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

function Profile() {
  return (
    <>
      <Container
        className=" mx-auto pt-8 "
        sx={{
          backgroundColor: "background.default",
          maxWidth: {
            lg: "none",
          },
        }}
      >
        <Card
          sx={{
            maxWidth: 580,
            marginRight: "auto",
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
            marginBottom: "2rem",
            justifyContent: "space-between",
            padding: "1.5rem",
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderSpacing: "1px",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: "50%" }}
              image={avatar}
              alt="david"
              className=" rounded-full border-[#8653cb] p-1 border-[3px]  mx-auto"
            />
            <IconButton className=" absolute right-[24%] bottom-1 sm:right-[26%] sm:bottom-[3%] ">
              <EditIcon className=" h-12 w-12 text-[#4ab6f7] bg-white rounded-full border-gray-400 border-[1px] p-2 " />
            </IconButton>
          </Box>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              className=" text-center capitalize "
              component="div"
            >
              Kevin Backer
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              kevin.backer188593@gmail.com
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              sx={{ color: "background.paper" }}
              variant="contained"
              size="large"
              className=" text-center font-bold"
            >
              <EditIcon className=" mr-2 pb-[2px] h-[1.1rem] w-[1.1rem]" /> Edit
              Profile
            </Button>
          </CardActions>
        </Card>
        <Stack
          sx={{ backgroundColor: "background.paper" }}
          className=" [&_span:first-of-type]:font-semibold  [&>div]:w-full [&>div]:gap-x-2 [&>div]:items-center [&>div]:overflow-x-hidden [&>div]:flex rounded-lg p-6"
        >
          <Box>
            <IoMdTime className="h-8 w-8" />
            <Typography variant="body1">Timezone</Typography>
            <Box sx={stackItemStyle}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                UTC +2:00 Athens, Eastern European Time (EET)
              </Typography>
              <IconButton sx={{ color: "text.secondarty" }}>
                <MdKeyboardArrowRight />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                color="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M7 8.38h4.5m5.5 0h-2.5m-3 0h3m-3 0V7m3 1.38c-.527 1.886-1.632 3.669-2.893 5.236M8.393 17c1.019-.937 2.17-2.087 3.214-3.384m0 0c-.643-.754-1.543-1.973-1.8-2.525m1.8 2.525l1.929 2.005" />
              </g>
            </svg>
            <Typography variant="body1">Language</Typography>

            <Box sx={stackItemStyle}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                English
              </Typography>
              <IconButton sx={{ color: "text.secondarty" }}>
                <MdKeyboardArrowRight />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <RiFontSize2 className="h-8 w-8" />
            <Typography variant="body1">Font Size</Typography>
            <Box sx={stackItemStyle}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Default
              </Typography>
              <IconButton sx={{ color: "text.secondary" }}>
                <MdKeyboardArrowRight />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className=" rotate-180 "
            >
              <path
                fill="currentColor"
                d="M12 3.75a8.25 8.25 0 1 0 0 16.5a8.25 8.25 0 0 0 0-16.5M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m9-5a.75.75 0 0 1 .75-.75a5.75 5.75 0 0 1 0 11.5a.75.75 0 0 1-.75-.75z"
              />
            </svg>
            <Typography variant="body2">Dark Mode </Typography>
            <Switch className="ml-auto" />
          </Box>
          <Button>Update</Button>
        </Stack>
      </Container>
      <BottomNavigation />
    </>
  );
}

export default Profile;
