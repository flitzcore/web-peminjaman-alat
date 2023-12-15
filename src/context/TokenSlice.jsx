import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "jwtToken",
  initialState: {
    value: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
