// src/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (!existingItem) {
        state.items.push({ ...item, quantity: 1 });
        state.count += 1;
      } else {
        existingItem.quantity += 1;
        state.count += 1;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i._id === itemId);
      if (item) {
        state.count -= item.quantity;
        state.items = state.items.filter((i) => i._id !== itemId);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;