import * as React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignOn from "./pages/signOn";
import Welcome from "./pages/welcome";
import AppGuard from "./routeGuards/appGuard";
import ChatGuard from "./routeGuards/chatGuard";
const Chats = React.lazy(() => import("./pages/chatList"));
const PrivateChat = React.lazy(() => import("./pages/privateChat"));
const createChannel = React.lazy(() => import("./pages/createChannel"));
const ChannelChat = React.lazy(() => import("./pages/channelChat"));
const Settings = React.lazy(() => import("./pages/settings"));
const Profile = React.lazy(() => import("./pages/editProfile"));
const PageNotFound = React.lazy(() => import("./pages/404"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/sign-on" element={<SignOn />} />
        <Route element={<AppGuard />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route element={<ChatGuard />}>
            <Route path="/new-channel" element={<createChannel />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/channels/:id" element={<ChannelChat />} />
            <Route path="/chats/:id" element={<PrivateChat />} />
          </Route>
        </Route>
        <Route path="/" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
