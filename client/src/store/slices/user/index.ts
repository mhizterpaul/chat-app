import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import actions from "./actions";
import { User, IActivePage } from "./types";
import { AxiosError } from "axios";
import avatar from "../../../assets/avatar.avif";

interface UserState {
  user: User | null;
  error: AxiosError | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  activePage: IActivePage;
}

const initialState = {
  user: null,
  error: null,
  loading: "idle",
  activePage: {
    name: "",
    description: "",
    icon: null,
  },
} as UserState;

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActivePage: (state, { type, payload }) => {
      if (type !== "setActivePage") return;
      state.activePage = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(actions.logout.fulfilled, (state) => {
        state.loading = "succeeded";
        state.error = null;
        state.user = null;
      })
      .addCase(actions.logout.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as AxiosError;
      })
      .addCase(actions.removeProfileImage.fulfilled, (state) => {
        state.error = null;
        state.loading = "succeeded";
        state.user = { ...state.user, image: undefined } as User;
      })
      .addCase(actions.addProfileImage.fulfilled, (state, action) => {
        state.error = null;
        state.loading = "succeeded";
        state.user = { ...state.user, image: action.payload.image } as User;
      })
      .addMatcher(
        isAnyOf(
          actions.signup.pending,
          actions.login.pending,
          actions.logout.pending,
          actions.updateProfile.pending,
          actions.getUserInfo.pending,
          actions.removeProfileImage.pending,
          actions.addProfileImage.pending
        ),
        (state) => {
          state.loading = "pending";
        }
      )
      .addMatcher(
        isAnyOf(
          actions.signup.fulfilled,
          actions.updateProfile.fulfilled,
          actions.login.fulfilled,
          actions.getUserInfo.fulfilled
        ),
        (state, action) => {
          state.user = action.payload;
          if (!action.payload.image)
            state.user = { ...action.payload, image: avatar };
          state.loading = "succeeded";
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          actions.signup.rejected,
          actions.updateProfile.rejected,
          actions.login.rejected,
          actions.getUserInfo.rejected,
          actions.removeProfileImage.rejected,
          actions.addProfileImage.rejected
        ),
        (state, action) => {
          // Add user to the state array
          state.loading = "failed";
          state.error = action.error as AxiosError;
        }
      );
  },
});

export default userSlice.reducer;
