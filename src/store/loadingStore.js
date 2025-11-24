// src/stores/loadingStore.js
import { create } from "zustand";

const useLoadingStore = create((set) => ({
  isLoading: false,
  setLoading: (val = false) => set({ isLoading: val }),
}));

export default useLoadingStore;
