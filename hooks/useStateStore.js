import { create } from "zustand";


export const useStateStore = create((set) => ({
  // searchInput: null,
  // setSearchInput: (searchInput) => {
  //   set({searchInput});
  // }
  searchCategory: 'all',
  searchType: 'all',

  setSearchCategory: (category) => {
    set({ searchCategory: category });
  },
  setSearchType: (type) => {
    set({ searchType: type });
  }
}));
