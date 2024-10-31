import * as React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignOn from "./pages/signOn";
import Welcome from "./pages/welcome";
import AppGuard from "./routeGuards/appGuard";
import ChatGuard from "./routeGuards/chatGuard";
const Chats = React.lazy(() => import("./pages/chatList"));
const MessageList = React.lazy(() => import("./pages/messageList"));
const NewChat = React.lazy(() => import("./pages/newChat"));
const Settings = React.lazy(() => import("./pages/settings"));
const Profile = React.lazy(() => import("./pages/editProfile"));
const PageNotFound = React.lazy(() => import("./pages/404"));
const Layout = React.lazy(() => import("./components/navbar"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/sign-on" element={<SignOn />} />
        <Route element={<AppGuard />}>
          <Layout>
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route element={<ChatGuard />}>
              <Route path="/new-chat/:type" element={<NewChat />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/messages/:type/:id" element={<MessageList />} />
            </Route>
          </Layout>
        </Route>
        <Route path="/" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
