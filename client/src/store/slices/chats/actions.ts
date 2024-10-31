import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Message } from "./types";

const API = process.env.API;
export const getChannels = createAsyncThunk("chats/getChannels", async () => {
  const response = await axios.get(API + "/get-user-channels", {
    withCredentials: true,
  });
  return response.data.channels;
});

export const getDmList = createAsyncThunk("chats/getDmList", async () => {
  const response = await axios.get(API + "/get-contacts-for-dm", {
    withCredentials: true,
  });
  return response.data.contacts;
});

export const getContacts = createAsyncThunk("chats/getContacts", async () => {
  const response = await axios.get(API + "/get-all-contacts", {
    withCredentials: true,
  });
  return response.data.contacts;
});

export const addMessage = (payload: Message) => ({
  type: "addMessage",
  payload,
});

export const removeMessage = (payload: Message) => ({
  type: "removeMessage",
  payload,
});

export default {
  getChannels,
  getDmList,
  getContacts,
  addMessage,
  removeMessage,
};
