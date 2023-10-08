// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  categories: [], 
  setUser: (user) => set({ user }),
  setCategories: (categories) => set({ categories }), 
}));

export default useStore;
