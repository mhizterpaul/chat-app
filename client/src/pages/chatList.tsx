import { ChatList as ChtList } from "react-chat-elements";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RootState } from "../store";
import action from "../store/slices/chats/actions";
import { Channel, Contact } from "../store/slices/chats/types";
import avatar from "../assets/avatar.avif";
import group from "../assets/group.svg";
import { Box } from "@mui/material";
import BottomNavigation from "../components/bottomNavigation";
import { useNavigate } from "react-router-dom";
import { setActivePage } from "../store/slices/user";
import * as React from "react";

export default function ChatList() {
  const selector = (state: RootState) => state.chats;
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selector);
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(setActivePage({ name: "chats" }));
    dispatch(action.getChannels());
    dispatch(action.getDmList());
  }, [dispatch]);

  const chatList = [
    ...chats.channelList.map((channel: Channel) => ({
      id: channel._id,
      avatar: channel.avatar || group,
      alt: channel.name,
      subtitle: channel.messages[-1].content,
      date: channel.messages[-1].timeStamp,
      onClick: () => {
        navigate("/messages/channel/" + channel._id);
      },
    })),
    ...chats.dmList.map((contact: Contact) => ({
      id: contact._id,
      avatar: contact.image || avatar,
      alt: contact.firstName + " " + contact.lastName,
      subtitle: contact.lastMessage.content,
      date: contact.lastMessage.timeStamp,
      onClick: () => {
        navigate("/messages/private/" + contact._id);
      },
    })),
  ];

  return (
    <>
      {chatList.length ? (
        <ChtList
          className="chat-list"
          dataSource={chatList}
          id="chat-list"
          lazyLoadingImage=""
        />
      ) : (
        <Box sx={{ width: "full", height: "75vh" }}></Box>
      )}
      <BottomNavigation />
    </>
  );
}
