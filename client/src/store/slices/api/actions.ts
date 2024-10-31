import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Channel, Message } from "../chats/types";
import { User } from "../user/types";
import axios, { AxiosResponse } from "axios";
import { API } from "../../../utils/constants";

// Define a service using a base URL and expected endpoints
export const chatApi = createApi({
  reducerPath: "chat-api",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<{ user: User }, number>({
      query: (id) => ({
        url: `user/user-info`,
        method: "GET",
        params: { id },
      }),
    }),
    getUserMessages: builder.query<{ messages: Message[] }, number>({
      query: (id) => ({
        url: `messages/get-messages`,
        method: "POST",
        body: { id },
      }),
    }),
    getUserChannel: builder.query<{ channel: Channel }, number>({
      query: (channelId) => ({
        url: `channel/get-user-channel`,
        method: "GET",
        params: { channelId },
      }),
    }),
    getChannelMessages: builder.query<{ messages: Message[] }, number>({
      query: (channelId) => ({
        url: `channels/get-channel-messages/${channelId}`,
        method: "GET",
      }),
    }),
  }),
});

export function uploadFile(file: Blob) {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post<{ fileUrl: string }>(
    API + "messages/upload-file",
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export function searchUsers(searchTerm: string) {
  return axios.post<{ contacts: User[] }>(
    `${API}contacts/search`,
    { searchTerm },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function getUserInfo(ids: number[]): Promise<User[]> {
  try {
    const requests = ids.map((id) =>
      axios.get<{ user: User }>(`${API}user/user-info`, {
        params: { id },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    const responses = await Promise.allSettled(requests);
    const users = responses
      .filter((response) => response.status === "fulfilled")
      .map(
        (response) =>
          (response as PromiseFulfilledResult<unknown>).value as AxiosResponse<{
            user: User;
          }>
      )
      .map((response) => response.data.user);

    return users;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}
export async function createChannel({
  name,
  members,
  avatar,
}: {
  name: string;
  members: User[];
  avatar?: string;
}): Promise<{ channel: Channel }> {
  try {
    const response = await axios.post<{ channel: Channel }>(
      `${API}user/create-channel`,
      { name, members, avatar },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating channel:", error);
    throw error;
  }
}
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetChannelMessagesQuery,
  useGetUserChannelQuery,
  useGetUserMessagesQuery,
  useGetUserInfoQuery,
} = chatApi;
