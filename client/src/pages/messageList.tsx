import * as React from "react";
import { MessageType } from "react-chat-elements";
import { MessageList as MList, MessageBox } from "react-chat-elements";
import { Message } from "../store/slices/chats/types";
import {
  useGetUserMessagesQuery,
  useGetChannelMessagesQuery,
  useGetUserInfoQuery,
} from "../store/slices/api/actions";
import { uploadFile } from "../store/slices/api/actions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setActivePage } from "../store/slices/user/actions";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import { User } from "../store/slices/user/types";
import { Container, Popover, IconButton, Box } from "@mui/material";
import { BsFillSendFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { GrEmoji } from "react-icons/gr";
import InputBase from "@mui/material/InputBase";
import EmojiPicker from "emoji-picker-react";
import { useSocket } from "../context/socket";
import { removeMessage } from "../store/slices/chats/actions";

function MessageList({ messageListItem }: { messageListItem: Message[] }) {
  const selector = (state: RootState) => state.account.user;
  const user = useAppSelector(selector) as User;
  const messageListReference = React.createRef();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = React.useState(false);
  const socket = useSocket();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [messageQ, setMessageQ] = React.useState<Message[]>([]);
  const { type, id } = useParams();
  const { data } = useGetUserInfoQuery(Number(id));
  const handleClose = () => {
    setAnchorEl(null);
  };
  const mssgSeletor = (state: RootState) => state.chats.messages;
  const messages = useAppSelector(mssgSeletor);
  const open = Boolean(anchorEl);
  const _id = open ? "simple-popover" : undefined;
  //handle new messages
  if (messages?.[0].recipient?.id === id || messages?.[0].channelId === id) {
    setMessageQ((prev) => [...prev, messages[0]]);
    dispatch(removeMessage(messages[0]));
  }
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
      const message: Message & { channelId: number } = {
        channelId: Number(id),
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
  const messageList: MessageType[] = messageListItem.map(
    (message: Message) => ({
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
    })
  );

  return (
    <Container>
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
      <Box component="form" onSubmit={handleSubmit}>
        <input
          accept="*"
          style={{ display: "none" }}
          id="file-upload"
          name="file"
          type="file"
        />
        <label htmlFor="file-upload">
          <IconButton
            sx={{ p: "10px" }}
            component="input"
            aria-label="attachment"
            type="file"
          >
            <ImAttachment />
          </IconButton>
        </label>
        <Box>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
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
  const { data } = useGetChannelMessagesQuery(Number(id));
  const dispatch = useAppDispatch();
  if (!data) return;
  dispatch(setActivePage({ name: "channel:" + id }));
  return <MessageList messageListItem={data.messages} />;
}

function PrivateMessageList({ id }: { id: string }) {
  const { data } = useGetUserMessagesQuery(Number(id));
  const dispatch = useAppDispatch();
  if (!data) return;
  dispatch(setActivePage({ name: "private:" + id }));
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
