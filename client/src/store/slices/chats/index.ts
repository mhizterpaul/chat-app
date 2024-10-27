import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import actions from "./actions";
import { Channel, Contact } from "./types";

interface State {
  channelList: Channel[];
  dmList: Contact[];
  error: { message: string } | null;
  contacts: { label: string }[];
  loading: "idle" | "succeeded" | "failed" | "pending";
}
const initialState = {
  channelList: [],
  dmList: [],
  error: null,
  contacts: [],
  loading: "idle",
} as State;

const userSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
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
