import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.API;
const getChannels = createAsyncThunk("chats/getChannels", async () => {
  const response = await axios.get(API + "/get-user-channels", {
    withCredentials: true,
  });
  return response.data;
});

const getDmList = createAsyncThunk("chats/getDmList", async () => {
  const response = await axios.get(API + "/get-contacts-for-dm", {
    withCredentials: true,
  });
  return response.data;
});

const getContacts = createAsyncThunk(
  "chats/getContacts",
  async () => {
    const response = await axios.get(API + "/get-all-contacts", {
      withCredentials: true,
    });
    return response.data;
  }
);

export default{
    getChannels,
    getDmList,
    getContacts,
};
