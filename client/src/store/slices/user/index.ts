import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import actions from "./actions";
interface UserState {
  user: User | null;
  error: ApiError | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  user: null,
  error: null,
  loading: "idle",
} as UserState;

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addMatcher(
        isAnyOf(
          actions.signup.pending,
          actions.login.pending,
          actions.logout.pending,
          actions.updateProfile.pending
        ),
        (state) => {
          state.loading = "pending";
        }
      )
      .addMatcher(
        isAnyOf(
          actions.signup.fulfilled,
          actions.updateProfile.fulfilled,
          actions.login.fulfilled
        ),
        (state, action) => {
          // Add user to the state array
          state.user = action.payload;
          state.loading = "succeeded";
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          actions.signup.rejected,
          actions.updateProfile.rejected,
          actions.login.rejected
        ),
        (state, action) => {
          // Add user to the state array
          state.loading = "failed";
          state.error = action.payload as ApiError;
        }
      );
    builder
      .addCase(actions.logout.fulfilled, (state) => {
        // Add user to the state array
        state.loading = "succeeded";
        state.error = null;
        state.user = null;
      })
      .addCase(actions.logout.rejected, (state, action) => {
        // Add user to the state array
        state.loading = "failed";
        state.error = action.payload as ApiError;
      });
  },
});

export default userSlice.reducer;
