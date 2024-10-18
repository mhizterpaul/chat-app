import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Auth from "./pages/auth";
const Chat = lazy(() => import("./pages/chat"));
const Profile = lazy(() => import("./pages/settings"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<Navigate to="/Auth" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
