import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RolePermissionResponse,
  UserManagementResponse,
  UserManagementState,
} from "../../types";

const initialState: UserManagementState = {
  selectedRolePermission: null,
  selectedUser: null,
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setSelectedRolePermission: (
      state,
      action: PayloadAction<RolePermissionResponse | null>
    ) => {
      state.selectedRolePermission = action.payload;
    },
    setSelectedUser: (
      state,
      action: PayloadAction<UserManagementResponse | null>
    ) => {
      state.selectedUser = action.payload;
    },
  },
});

// Actions
export const userManagementAction = userManagementSlice.actions;

export default userManagementSlice.reducer;
