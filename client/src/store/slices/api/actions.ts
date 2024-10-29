import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Channel, Message } from "../chats/types";
import { User } from "../user/types";

// Define a service using a base URL and expected endpoints
export const chatApi = createApi({
  reducerPath: "chat-api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<User, number>({
      query: (id) => ({
        url: `user/user-info`,
        method: "GET",
        body: { id },
      }),
    }),
    getAllContacts: builder.query<User[], string>({
      query: (searchTerm) => ({
        url: `contacts/search`,
        method: "POST",
        body: { searchTerm },
      }),
    }),
    getuserMessages: builder.query<Message[], number>({
      query: (id) => ({
        url: `messages/get-messages`,
        method: "POST",
        body: { id },
      }),
    }),
    getChannelMessages: builder.query<Message[], number>({
      query: (channelId) => ({
        url: `channels/get-channel-messages/${channelId}`,
        method: "GET",
      }),
    }),
    createChannel: builder.query<
      Channel,
      { name: string; members: User[]; avatar: string }
    >({
      query: ({ name, members, avatar }) => ({
        url: `user/create-channel`,
        method: "POST",
        body: { name, members, avatar },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserInfoQuery,
  useCreateChannelQuery,
  useGetChannelMessagesQuery,
  useGetuserMessagesQuery,
  useGetAllContactsQuery,
} = chatApi;
