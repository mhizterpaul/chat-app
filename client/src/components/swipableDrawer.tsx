import * as React from "react";
import Box from "@mui/material/Box";
import { TbArrowNarrowRight } from "react-icons/tb";
import { GrFormEdit } from "react-icons/gr";
import { AiOutlinePicture } from "react-icons/ai";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  SvgIcon,
  ListItemText,
} from "@mui/material";
import { uploadFile } from "../store/slices/api/actions";
import { drawerBleeding } from "../utils/constants";
import { ChannelData } from "../pages/newChat";

type Props = {
  container: HTMLDivElement;
  toggleDrawer: (value: boolean) => void;
  open: boolean;
  setChannel: (
    key: keyof ChannelData,
    value: ChannelData[keyof ChannelData] | string[]
  ) => unknown;
};

export default function SwipeableEdgeDrawer(props: Props) {
  const { container, open, toggleDrawer, setChannel } = props;
  return (
    <>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false) as unknown as React.ReactEventHandler}
        onOpen={toggleDrawer(true) as unknown as React.ReactEventHandler}
        swipeAreaWidth={drawerBleeding}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "1.5rem 1.5rem 0 0",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            position: "absolute",
            top: 0,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <div
            style={{
              width: 30,
              height: 6,
              backgroundColor: "gray",
              borderRadius: 3,
              position: "absolute",
              top: 16,
              left: "calc(50% - 15px)",
            }}
          ></div>
          <MenuList sx={{ marginTop: "3rem" }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="file-upload"
              name="image"
              type="file"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                let fileUrl;
                if (file) {
                  try {
                    const { data } = await uploadFile(file);
                    fileUrl = data.fileUrl;
                  } catch (e) {
                    console.log(e);
                  }
                }
                if (fileUrl) setChannel("avatar", fileUrl);
              }}
            />
            <label htmlFor="file-upload">
              <MenuItem>
                <ListItemIcon
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                    alignItems: "center",
                  }}
                >
                  <AiOutlinePicture />
                </ListItemIcon>
                <ListItemText className="inline-block align-top ">
                  Upload a Photo
                </ListItemText>
                <ListItemIcon sx={{ color: "text.secondary" }}>
                  <TbArrowNarrowRight />
                </ListItemIcon>
              </MenuItem>
            </label>
            <MenuItem>
              <ListItemIcon sx={{ width: "1.5rem", height: "1.5rem" }}>
                <GrFormEdit className=" -ml-1 w-6 h-6" />
              </ListItemIcon>
              <ListItemText>Edit Avatar Preferences</ListItemText>
              <ListItemIcon sx={{ color: "text.secondary" }}>
                <TbArrowNarrowRight />
              </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={() => setChannel("avatar", undefined)}>
              <ListItemIcon sx={{ width: "1.5rem", height: "1.5rem" }}>
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className=" w-[1.25rem] h-[1.25rem] "
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    >
                      <path d="M5.47 6.015v12.514a2.72 2.72 0 0 0 2.721 2.721h7.618a2.72 2.72 0 0 0 2.72-2.72V6.014m-15.235.001h17.412" />
                      <path d="M8.735 6.015V4.382a1.63 1.63 0 0 1 1.633-1.632h3.264a1.63 1.63 0 0 1 1.633 1.632v1.633m-5.984 6.081h5.438m-5.438 4.353h5.438" />
                    </g>
                  </svg>
                </SvgIcon>
              </ListItemIcon>
              <ListItemText>Delete (set to default)</ListItemText>
              <ListItemIcon sx={{ color: "text.secondary" }}>
                <TbArrowNarrowRight />
              </ListItemIcon>
            </MenuItem>
          </MenuList>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
