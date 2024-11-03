import * as React from "react";
import { MessageType } from "react-chat-elements";
import { MessageList as MList, MessageBox } from "react-chat-elements";
import { Message } from "../store/slices/chats/types";
import {
  useGetUserMessagesQuery,
  useGetChannelMessagesQuery,
  useGetUserInfoQuery,
  useGetUserChannelQueryWithDefault,
} from "../store/slices/api/actions";
import { uploadFile } from "../store/slices/api/actions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setActivePage } from "../store/slices/user";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import { User } from "../store/slices/user/types";
import { Container, Popover, IconButton, Box } from "@mui/material";
import { BsFillSendFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { GrEmoji } from "react-icons/gr";
import InputBase from "@mui/material/InputBase";
import EmojiPicker from "emoji-picker-react";
import Drawer from "../components/drawer";
import { useSocket, useMobile } from "../utils/constants";
import { removeMessage } from "../store/slices/chats";

const messageListMap =
  (user: User) =>
  (message: Message): MessageType => ({
    id: btoa(`${message.sender.id}${message.timeStamp}`),
    position: message.sender.id === user.id ? "right" : "left",
    text: message.content || "",
    title: "",
    focus: false,
    date: message.timeStamp,
    avatar: message.sender.image,
    titleColor: "#000",
    forwarded: false,
    replyButton: false,
    removeButton: false,
    status: "read",
    notch: true,
    data: {
      uri: message.fileUrl,
    },
    retracted: false,
    type: message.messageType,
  });

function MessageList({ messageListItem }: { messageListItem: Message[] }) {
  const selector = (state: RootState) => state.account.user;
  const user = useAppSelector(selector) as User;
  const messageListReference = React.createRef();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { setIsClosing, mobileOpen, setMobileOpen } = useMobile();
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = React.useState(false);
  const socket = useSocket();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [messageQ, setMessageQ] = React.useState<Message[]>([]);
  const { type, id } = useParams();
  const { data } = useGetUserInfoQuery(id as string);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const mssgSeletor = (state: RootState) => state.chats.messages;
  const messages = useAppSelector(mssgSeletor);
  const open = Boolean(anchorEl);
  const _id = open ? "simple-popover" : undefined;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (disabled) return;
    setDisabled(true);
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const textInput = form.elements.namedItem("text") as HTMLInputElement;
    const file = fileInput.files?.[0];
    const text = textInput.value;
    let fileUrl;
    //upload file
    if (file) {
      try {
        const { data } = await uploadFile(file);
        fileUrl = data.fileUrl;
      } catch (e) {
        console.log(e);
      }
    }

    if (type === "private") {
      const message: Message = {
        sender: user,
        recipient: data?.user,
        messageType: text.length > 0 ? "text" : "file",
        content: text,
        fileUrl,
        timeStamp: new Date(),
      };
      socket?.emit("sendMessage", message);
      setMessageQ((prev) => [...prev, message]);
    } else {
      const message: Message & { channelId: string } = {
        channelId: id as string,
        sender: user,
        messageType: text.length > 0 ? "text" : "file",
        content: text,
        fileUrl,
        timeStamp: new Date(),
      };
      socket?.emit("sendChannelMessage", message);
      setMessageQ((prev) => [...prev, message]);
    }

    fileInput.files = null;
    textInput.value = "";
    setDisabled(false);
  };
  const MessageListMap = messageListMap(user);
  const messageList = messageListItem.map(MessageListMap);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  //handle new messages
  if (messages?.[0]?.recipient?.id === id || messages?.[0]?.channelId === id) {
    setMessageQ((prev) => [...prev, messages[0]]);
    dispatch(removeMessage(messages[0]));
  }

  return (
    <Container>
      <Drawer
        mobileOpen={mobileOpen}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        handleDrawerClose={handleDrawerClose}
      />
      <MList
        referance={messageListReference}
        className="message-list"
        lockable={false}
        toBottomHeight={"100%"}
        dataSource={messageList}
      />
      {messageQ.map((message) => (
        <MessageBox
          id={btoa(`${message.sender.id}${message.timeStamp}`)}
          title={""}
          focus={false}
          titleColor="#000"
          status="read"
          notch={true}
          retracted={false}
          forwarded={false}
          replyButton={false}
          removeButton={false}
          avatar={message.sender.image}
          date={message.timeStamp}
          position={message.sender.id === user.id ? "right" : "left"}
          type={message.messageType}
          text={message.content || ""}
          data={{
            uri: message.fileUrl,
          }}
        />
      ))}
      <Box
        component="form"
        className="flex items-center content-center jusitfy-between pl-8"
        onSubmit={handleSubmit}
      >
        <input
          accept="*"
          style={{ display: "none" }}
          id="file-upload"
          name="file"
          type="file"
        />
        <label htmlFor="file-upload">
          <IconButton sx={{ p: "10px" }} aria-label="attachment">
            <ImAttachment />
          </IconButton>
        </label>
        <Box className="w-[50%] ">
          <InputBase
            sx={{ ml: 1, flex: 1, width: "85%" }}
            placeholder="Type here..."
            ref={inputRef}
            name="text"
            multiline
            inputProps={{ "aria-label": "type here" }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="emoji picker"
            aria-describedby={_id}
            onClick={handleClick}
          >
            <GrEmoji />
          </IconButton>
        </Box>
        <IconButton
          type="submit"
          disabled={disabled}
          color="primary"
          sx={{ p: "10px" }}
          aria-label="send"
        >
          <BsFillSendFill />
        </IconButton>
      </Box>
      <Popover
        id={_id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <EmojiPicker
          onEmojiClick={(emoji) => {
            if (inputRef.current) inputRef.current.value += emoji;
          }}
        />
      </Popover>
    </Container>
  );
}

function ChannelMessageList({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const channelMessages = useGetChannelMessagesQuery(id);

  const channelData = useGetUserChannelQueryWithDefault(id);
  React.useEffect(() => {
    if (channelData && channelMessages.data)
      dispatch(
        setActivePage({
          name: channelData.name || "",
          icon: channelData.avatar,
          description: `${channelData.members.length} members`,
        })
      );
  }, [dispatch, channelMessages.data, channelData]);
  if (!channelData || !channelMessages.data) return;

  return <MessageList messageListItem={channelMessages.data?.messages} />;
}

function PrivateMessageList({ id }: { id: string }) {
  const { data } = useGetUserMessagesQuery(id);
  const selector = (state: RootState) => state.chats.contacts;
  const contacts = useAppSelector(selector);
  const contact = contacts.filter((_contact) => String(_contact.id) === id)[0];
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (data)
      dispatch(setActivePage({ name: contact.label, icon: contact.avatar }));
  }, [data, dispatch, contact]);

  if (!data) return;
  return <MessageList messageListItem={data.messages} />;
}
export default function MessageListContainer() {
  const { type, id } = useParams();
  if (!id) return;
  return type === "private" ? (
    <PrivateMessageList id={id} />
  ) : (
    <ChannelMessageList id={id} />
  );
}
