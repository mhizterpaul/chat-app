import {
  Avatar,
  Box,
  Divider,
  Toolbar,
  AvatarGroup,
  Typography,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { LuPlus } from "react-icons/lu";
import { FaCaretDown } from "react-icons/fa";
import EditIcon from "../components/ui/editIcon";
import theme from "../theme";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { useGetUserChannelQueryWithDefault } from "../store/slices/api/actions";

export const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
}

function DrawerElement() {
  const { type, id } = useParams();
  const selector = (state: RootState) => state.account.user;
  const channel = useGetUserChannelQueryWithDefault(Number(id));
  const user = useAppSelector(selector);
  if (type === "private") {
    if (!user) return null;
    return (
      <>
        <Box className="flex flex-col items-center content-center mt-8 gap-y-2 ">
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ width: 150, height: 150 }}
            src={user.image}
          />
          <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography
            className=" -translate-y-1"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            {user.email}
          </Typography>
        </Box>
      </>
    );
  }

  if (!channel) return;
  return (
    <>
      <Toolbar className="items-center content-center mr-3 justify-between mb-2">
        <Box className="[&>*]:inline-block ">
          <Avatar
            className="mr-4 translate-y-1"
            alt={channel.name}
            src={channel.avatar}
          />
          <Box>
            <Typography className=" font-semibold ">{channel.name}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {channel.members.length} Members
            </Typography>
          </Box>
        </Box>
        <EditIcon
          style={{ backgroundColor: theme.palette.primary.main }}
          className="w-8 h-8 p-2 text-white rounded-lg "
        />
      </Toolbar>
      <Box className="w-full mb-4">
        <AvatarGroup max={12} className=" ml-6 w-max ">
          {channel.members.map((member) => (
            <Avatar
              alt={`${member.firstName} ${member.lastName}`}
              src={member.image}
            />
          ))}
        </AvatarGroup>
      </Box>
      <Divider className="mb-2" />
      <MenuList className="ml-3 mr-2">
        <MenuItem>
          <ListItemIcon sx={{ width: "1.5rem", height: "1.5rem" }}>
            <FaCaretDown className="mt-1" />
          </ListItemIcon>
          <ListItemText>Topics</ListItemText>
          <ListItemIcon sx={{ color: "primary.main" }}>
            <LuPlus className=" outline-[#f5f7fa] rounded-lg outline-1 w-8 h-8 p-2 outline-double" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem>Web</MenuItem>
        <MenuItem>scripts</MenuItem>
        <MenuItem>Compiled Programs</MenuItem>
      </MenuList>
    </>
  );
}

export default function ResponsiveDrawer(props: Props) {
  const { mobileOpen, handleDrawerTransitionEnd, handleDrawerClose } = props;

  const container =
    window !== undefined ? () => window.document.getElementById("root") : undefined;
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        anchor="right"
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerElement />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        anchor="right"
        open
      >
        <DrawerElement />
      </Drawer>
    </Box>
  );
}
