import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.API;
const signup = createAsyncThunk("user/signup", async (userInfo: SignupInfo) => {
  const response = await axios.post(API + "/signup", userInfo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userInfo: User & { password: string }) => {
    const response = await axios.post(API + "/update-profile", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

const login = createAsyncThunk("user/login", async (userInfo: SignupInfo) => {
  const response = await axios.post(API + "/login", userInfo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.post(API + "/logout");
  return response.data;
});

export default {
  login,
  logout,
  signup,
  updateProfile,
};
