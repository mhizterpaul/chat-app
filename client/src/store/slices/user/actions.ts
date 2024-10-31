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
  return response.data.user;
});

export const removeProfileImage = createAsyncThunk(
  "user/remove-profile-image",
  async () => {
    const response = await axios.post(API + "user/remove-profile-image", {
      withCredentials: true,
    });
    return response.data.message;
  }
);

export const addProfileImage = createAsyncThunk(
  "user/add-profile-image",
  async (file: Blob) => {
    const formData = new FormData();
    formData.append("profile-image", file);
    const response = await axios.post(
      API + "user/add-profile-image",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.image;
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userInfo: User & { password: string }) => {
    const response = await axios.post(API + "user/update-profile", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data.user;
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
    return response.data.user;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.post(API + "/logout");
  return response.data.message;
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
  removeProfileImage,
  addProfileImage,
};
