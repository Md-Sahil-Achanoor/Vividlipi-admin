import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: true,
  layoutType: "vertical",
  layoutWidth: "fluid",
  leftSideBarTheme: "light",
  leftSideBarType: "default",
  topbarTheme: "light",
  isPreloader: false,
  showRightSidebar: false,
  isMobile: false,
  showSidebar: true,
  leftMenu: false,
  previousItem: null,
  showMenu: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.toggle = !state.toggle;
    },
    changeLayout: (state, action) => {
      state.layoutType = action.payload;
    },
    changeLayoutWidth: (state, action) => {
      state.layoutWidth = action.payload;
    },
    changePreloader: (state, action) => {
      state.isPreloader = action.payload;
    },
    changeSidebarTheme: (state, action) => {
      state.leftSideBarTheme = action.payload;
    },
    changeSidebarType: (state, action) => {
      state.leftSideBarType = action.payload.sidebarType;
      state.isMobile = action.payload.isMobile;
      state.showMenu = action.payload.showMenu;
    },
    changeTopbarTheme: (state, action) => {
      state.topbarTheme = action.payload;
    },
    changeRightSidebar: (state, action) => {
      state.showRightSidebar = action.payload;
    },
    changeMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    showSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    toggleLeftmenu: (state, action) => {
      state.leftMenu = action.payload;
    },
    showRightSidebarAction: (state, action) => {
      state.showRightSidebar = action.payload;
    },
    storePreviousItem: (state, action: PayloadAction<any>) => {
      state.previousItem = action.payload;
    },
  },
});

export const {
  toggleNavbar,
  changeLayout,
  changeLayoutWidth,
  changeMobile,
  changePreloader,
  changeRightSidebar,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  toggleLeftmenu,
  showRightSidebarAction,
  storePreviousItem,
} = layoutSlice.actions;

export default layoutSlice.reducer;
