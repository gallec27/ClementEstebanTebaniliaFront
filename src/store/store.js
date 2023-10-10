// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  categories: [],
  productToEdit: null, 
  setUser: (user) => set({ user }),
  setCategories: (categories) => set({ categories }), 
  setProductToEdit: (productToEdit) => set( { productToEdit } ),
  clearProductToEdit: () => set({ productToEdit: null }),
}));

export default useStore;
