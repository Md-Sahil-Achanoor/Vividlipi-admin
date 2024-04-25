import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, AuthState, UpdateAdmin } from "../../types";

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  tokens: null,
  token: "",
  role: "",
  reRender: false,
  type: "",
  selectedUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      { payload: { user, jwt } }: PayloadAction<AuthResponse>
    ) => {
      state.isLoggedIn = true;
      state.user = user;
      state.token = jwt;
      state.role = user.role;
      state.type =
        user?.role === "Saleman"
          ? "ad-partner"
          : user?.role === "EventManager"
          ? "event-manager"
          : user?.role?.toLocaleLowerCase();
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.token = "";
      state.role = "";
      state.user = null;
    },
    setSelectedUser: (state, action: PayloadAction<UpdateAdmin | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
