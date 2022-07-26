import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ACCESS_KEY = "u-access";
const USERNAME_KEY = "u-username";

interface AuthState {
  access: string;
  username: string;
  isAuth: boolean;
}
interface AuthPayload {
  username: string;
  access: string;
}
const initialState: AuthState = {
  access: localStorage.getItem(ACCESS_KEY) ?? "",
  username: localStorage.getItem(USERNAME_KEY) ?? "",
  isAuth: Boolean(localStorage.getItem(ACCESS_KEY)),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthPayload>) {
      state.access = action.payload.access;
      state.username = action.payload.username;
      state.isAuth = Boolean(action.payload.access);

      localStorage.setItem(ACCESS_KEY, action.payload.access);
      localStorage.setItem(USERNAME_KEY, action.payload.username);
    },
    logout(state) {
      state.access = "";
      state.username = "";
      state.isAuth = false;

      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(USERNAME_KEY);
    },
  },
});

export default authSlice.reducer;
