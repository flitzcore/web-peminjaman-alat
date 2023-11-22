import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "isAuthenticated",
  initialState: {
    value: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
