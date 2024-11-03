import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../utils/constants";

export const getChannels = createAsyncThunk("chats/getChannels", async () => {
  const response = await axios.get(API + "channels/get-user-channels", {
    withCredentials: true,
  });
  return response.data.channels;
});

export const getDmList = createAsyncThunk("chats/getDmList", async () => {
  const response = await axios.get(API + "contacts/get-contacts-for-dm", {
    withCredentials: true,
  });
  return response.data.contacts;
});

export const getContacts = createAsyncThunk("chats/getContacts", async () => {
  const response = await axios.get(API + "contacts/get-all-contacts", {
    withCredentials: true,
  });
  return response.data.contacts;
});

export default {
  getChannels,
  getDmList,
  getContacts,
};
