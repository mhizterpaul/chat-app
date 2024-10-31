import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import actions from "./actions";
import { Channel, Contact, Message } from "./types";
import { ApiError } from "../user/types";

interface State {
  channelList: Channel[];
  dmList: Contact[];
  error: { message: string } | null;
  contacts: { label: string; id: number; avatar: string }[];
  messages: (Message & { channelId?: number })[];
  loading: "idle" | "succeeded" | "failed" | "pending";
}
const initialState = {
  channelList: [],
  dmList: [],
  error: null,
  contacts: [],
  messages: [],
  loading: "idle",
} as State;

const userSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addMessage: (state, { type, payload }) => {
      if (type !== "addMessage") return;
      state.messages = [...state.messages, payload];
    },
    removeMessage: (state, { type, payload }) => {
      if (type !== "removeMessage") return;
      state.messages = state.messages.filter(
        (message: Message) => message.timeStamp !== payload.timeStamp
      );
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addMatcher(
        isAnyOf(
          actions.getChannels.pending,
          actions.getContacts.pending,
          actions.getDmList.pending
        ),
        (state) => {
          state.loading = "pending";
        }
      )
      .addMatcher(
        isAnyOf(
          actions.getChannels.fulfilled,
          actions.getContacts.fulfilled,
          actions.getDmList.fulfilled
        ),
        (state, action) => {
          // Add user to the state array
          state.loading = "succeeded";
          state.error = null;
          switch (typeof (action.payload.name || action.payload._id)) {
            case "string":
              state.channelList = action.payload;
              break;
            case "number":
              state.dmList = action.payload;
              break;
            case "undefined":
              state.contacts = action.payload;
              break;
            default:
          }
        }
      )
      .addMatcher(
        isAnyOf(
          actions.getChannels.rejected,
          actions.getDmList.rejected,
          actions.getContacts.rejected
        ),
        (state, action) => {
          // Add user to the state array
          state.loading = "failed";
          state.error = action.payload as ApiError;
        }
      );
  },
});

export default userSlice.reducer;
