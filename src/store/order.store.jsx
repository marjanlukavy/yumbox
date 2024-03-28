import create from "zustand";

const useItemStore = create((set, get) => ({
  selectedItems: {},
  isCartOpen: false,

  addItem: (item) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [item.id]: {
          ...item,
          quantity: (state.selectedItems[item.id]?.quantity || 0) + 1,
        },
      },
    })),

  removeItem: (itemId) =>
    set((state) => {
      const newSelectedItems = { ...state.selectedItems };
      delete newSelectedItems[itemId];
      return { selectedItems: newSelectedItems };
    }),

  changeItemQuantity: (itemId, newQuantity) =>
    set((state) => {
      const updatedSelectedItems = { ...state.selectedItems };

      if (newQuantity === 0) {
        delete updatedSelectedItems[itemId];
      } else {
        updatedSelectedItems[itemId] = {
          ...state.selectedItems[itemId],
          quantity: newQuantity,
        };
      }
      return { selectedItems: updatedSelectedItems };
    }),

  getSelectedItems: () => get().selectedItems,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

export default useItemStore;
