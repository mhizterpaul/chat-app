import { MessageBox } from "react-chat-elements";

<MessageBox
  position={"left"}
  type={"photo"}
  text={"react.svg"}
  data={{
    uri: "https://facebook.github.io/react/img/logo.svg",
    status: {
      click: false,
      loading: 0,
    },
  }}
/>;

<MessageBox
  reply={{
    photoURL: "https://facebook.github.io/react/img/logo.svg",
    title: "elit magna",
    titleColor: "#8717ae",
    message: "Aliqua amet incididunt id nostrud",
  }}
  onReplyMessageClick={() => console.log("reply clicked!")}
  position={"left"}
  type={"text"}
  text={
    "Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure."
  }
/>;
import { Input } from "react-chat-elements";
inputReferance = React.createRef();
<Input
  referance={inputReferance}
  placeholder="Type here..."
  multiline={true}
  value={inputValue}
  rightButtons={<Button color="white" backgroundColor="black" text="Send" />}
/>;

// Clear text, e.g.:

inputClear = () => {};
// ...
<Input clear={(clear) => (inputClear = clear)} placeholder="Type here..." />;
// ...
inputClear();

import { Popup } from "react-chat-elements";
<Popup
  show={this.state.show}
  header="Lorem ipsum dolor sit amet."
  headerButtons={[
    {
      type: "transparent",
      color: "black",
      text: "close",
      onClick: () => {
        this.setState({ show: false });
      },
    },
  ]}
  text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem animi veniam voluptas eius!"
  footerButtons={[
    {
      color: "white",
      backgroundColor: "#ff5e3e",
      text: "Vazgeç",
    },
    {
      color: "white",
      backgroundColor: "lightgreen",
      text: "Tamam",
    },
  ]}
/>;

import { MessageList } from "react-chat-elements";
messageListReferance = React.createRef();

<MessageList
  referance={messageListReferance}
  className="message-list"
  lockable={true}
  toBottomHeight={"100%"}
  dataSource={[
    {
      position: "right",
      type: "text",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
      date: new Date(),
    },
  ]}
/>;

import { LocationMessage } from "react-chat-elements";
<LocationMessage
  data={{
    latitude: "37.773972",
    longitude: "-122.431297",
    // staticURL: '<optional>',
    // mapURL: '<optional>'
  }}
/>;
