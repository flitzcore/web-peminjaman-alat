import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import userReducer from "./UserSlice";
import tokenReducer from "./TokenSlice";
export default configureStore({
  reducer: {
    isAuthenticated: authReducer,
    userData: userReducer,
    jwtToken: tokenReducer,
  },
});
