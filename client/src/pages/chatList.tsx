import { ChatList as ChtList } from "react-chat-elements";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RootState } from "../store";
import action from "../store/slices/chats/actions";
import { Channel, Contact } from "../store/slices/chats/types";
import avatar from "../assets/avatar.png";
import BottomNavigation from "../components/bottomNavigation";

export default function ChatList() {
  const selector = (state: RootState) => state.chats;
  const dispatch = useAppDispatch();
  dispatch(action.getChannels());
  dispatch(action.getDmList());
  const chats = useAppSelector(selector);
  const chatList = [
    ...chats.channelList.map((channel: Channel) => ({
      id: channel._id,
      avatar: channel.avatar || avatar,
      alt: channel.name,
      subtitle: channel.messages[-1].content,
      date: channel.messages[-1].timeStamp,
    })),
    ...chats.dmList.map((contact: Contact) => ({
      id: contact._id,
      avatar: contact.image || avatar,
      alt: contact.firstName + " " + contact.lastName,
      subtitle: contact.lastMessage.content,
      date: contact.lastMessage.timeStamp,
    })),
  ];

  return (
    <>
      <ChtList
        className="chat-list"
        dataSource={chatList}
        id="chat-list"
        lazyLoadingImage="path/to/lazy-loading-image.jpg"
      />
      <BottomNavigation />
    </>
  );
}
