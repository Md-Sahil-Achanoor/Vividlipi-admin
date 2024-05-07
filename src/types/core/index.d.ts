export interface InitialStateType {
  isSideBarOpen: boolean;
  open: boolean;
  type: string;
  signupProgress: number;
  sort: SortObject;
  selectedStatus: string;
  isCreateAble: boolean;
  currentTab: number;
  selectedDate: string;
  sortType: string;
  page: number;
}

export interface SortObject {
  sortBy: string;
  sortType: string;
}
