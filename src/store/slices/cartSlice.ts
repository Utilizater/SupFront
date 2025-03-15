import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for a cart item
export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

// Define the interface for the cart state
interface CartState {
  items: CartItem[];
  promoCode: string;
  promoDiscount: number;
  promoCodeApplied: boolean;
}

// Define the initial state
const initialState: CartState = {
  items: [],
  promoCode: '',
  promoDiscount: 0,
  promoCodeApplied: false,
};

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.promoCode = '';
      state.promoDiscount = 0;
      state.promoCodeApplied = false;
    },
    applyPromoCode: (
      state,
      action: PayloadAction<{ code: string; discount: number }>
    ) => {
      state.promoCode = action.payload.code;
      state.promoDiscount = action.payload.discount;
      state.promoCodeApplied = true;
    },
    clearPromoCode: (state) => {
      state.promoCode = '';
      state.promoDiscount = 0;
      state.promoCodeApplied = false;
    },
    // For development/testing purposes
    setCartState: (state, action: PayloadAction<Partial<CartState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export the actions
export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  applyPromoCode,
  clearPromoCode,
  setCartState,
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => {
  const subtotal = state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 5.99;
  const tax = subtotal * 0.07; // 7% tax rate
  return {
    subtotal,
    shipping,
    tax,
    promoDiscount: state.cart.promoDiscount,
    total: subtotal + shipping + tax - state.cart.promoDiscount,
  };
};
export const selectPromoCodeDetails = (state: { cart: CartState }) => ({
  promoCode: state.cart.promoCode,
  promoDiscount: state.cart.promoDiscount,
  promoCodeApplied: state.cart.promoCodeApplied,
});
