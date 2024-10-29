import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IActivePage, SignupInfo, User } from "./types";

const API = process.env.API;
export const signup = createAsyncThunk(
  "user/signup",
  async (userInfo: SignupInfo) => {
    const response = await axios.post(API + "user/signup", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const getUserInfo = createAsyncThunk("user/userInfo", async () => {
  const response = await axios.get(API + "user/user-info", {
    withCredentials: true,
  });
  return response.data;
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userInfo: User & { password: string }) => {
    const response = await axios.post(API + "user/update-profile", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userInfo: SignupInfo) => {
    const response = await axios.post(API + "user/login", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.post(API + "/logout");
  return response.data;
});

export const setActivePage = (payload: IActivePage) => ({
  type: "setActivePage",
  payload,
});

export default {
  login,
  logout,
  signup,
  updateProfile,
  getUserInfo,
  setActivePage,
};
