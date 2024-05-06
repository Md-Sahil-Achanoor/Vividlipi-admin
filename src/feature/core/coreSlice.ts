import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalToggle } from "../../types";
import type { InitialStateType } from "../../types/core";
import { formatDate } from "../../utils/time";

const initialState: InitialStateType = {
  isSideBarOpen: true,
  open: false,
  type: "",
  signupProgress: 1,
  sort: {
    sortBy: "",
    sortType: "",
  },
  selectedStatus: "1",
  currentTab: 0,
  selectedDate: formatDate(new Date()),
  isCreateAble: true,
  sortType: "asc",
  page: 1,
};

export type State = (typeof initialState)[keyof typeof initialState];

const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    toggleModal(state, { payload }: PayloadAction<Partial<ModalToggle>>) {
      state.open = payload.open ? payload.open : !state.open;
      state.type = payload.type || "";
    },
    setSignupProgress(state, { payload }: PayloadAction<number>) {
      state.signupProgress = payload;
    },
    setSort(state, { payload }: PayloadAction<InitialStateType["sort"]>) {
      state.sort = payload;
    },
    resetSort(state) {
      state.sort = {
        sortBy: "",
        sortType: "",
      };
      state.sortType = "asc";
      state.selectedStatus = "1";
      state.isCreateAble = true;
      state.currentTab = 0;
      state.selectedDate = formatDate(new Date());
    },
    setSelectedStatus(state, { payload }: PayloadAction<string>) {
      state.selectedStatus = payload;
    },
    setIsCreateAble(state, { payload }: PayloadAction<boolean>) {
      state.isCreateAble = payload;
    },
    setCurrentTab(state, { payload }: PayloadAction<number>) {
      state.currentTab = payload;
    },
    setSortType(state, { payload }: PayloadAction<string>) {
      state.sortType = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
});

export const coreAction = coreSlice.actions;
export default coreSlice.reducer;
