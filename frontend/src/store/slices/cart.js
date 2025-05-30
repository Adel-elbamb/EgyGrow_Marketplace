import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: JSON.parse(localStorage.getItem("cart")) || [],
  },
  reducers: {
    addToCart: (state, actions) => {
      if (actions.payload.stock === 0) {
        return "Stock is empty ";
      }
      actions.payload.stock -= 1;
      state.products.push({
        element: actions.payload,
        quantity: 1,
        totalPrice: actions.payload.price,
      });

      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    increaseQuantity: (state, actions) => {
      const productIndex = state.products.findIndex(
        (item) => item.element._id === actions.payload._id
      );
      if (productIndex !== -1) {
        state.products[productIndex].quantity += 1;
        state.products[productIndex].element.stock -= 1;
        state.products[productIndex].totalPrice =
          state.products[productIndex].quantity * actions.payload.price;
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    decreaseQuantity: (state, actions) => {
      const productIndex = state.products.findIndex(
        (item) => item.element._id === actions.payload._id
      );
      if (productIndex !== -1 && state.products[productIndex].quantity > 1) {
        state.products[productIndex].quantity -= 1;
        state.products[productIndex].totalPrice =
          state.products[productIndex].quantity * actions.payload.price;
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeProduct: (state, actions) => {
      state.products = state.products.filter(
        (product) => product.element._id !== actions.payload.element._id
      );
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
