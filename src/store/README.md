# Redux Implementation

This directory contains the Redux implementation for the Supplement AI application. Redux is used to manage global state, particularly for authentication and cart data.

## Installation

To use this Redux implementation, you need to install the following packages:

```bash
npm install @reduxjs/toolkit react-redux redux-persist
```

## Structure

The Redux store is organized as follows:

- `store/index.ts`: Main store configuration with Redux Persist setup
- `store/slices/authSlice.ts`: Authentication state management
- `store/slices/cartSlice.ts`: Shopping cart state management
- `store/mockData.ts`: Mock data for development and testing

## Authentication State

The authentication state includes:

- `isAuthenticated`: Boolean indicating if a user is logged in
- `hasCompletedOnboarding`: Boolean indicating if the user has completed the onboarding process
- `user`: User object with profile information

### Usage Example

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { login, logout, completeOnboarding } from '../store/slices/authSlice';

// In a component
const { isAuthenticated, hasCompletedOnboarding, user } = useSelector(
  (state: RootState) => state.auth
);

const dispatch = useDispatch();

// Login a user
dispatch(login({ user: { id: '123', firstName: 'John', lastName: 'Doe' } }));

// Mark onboarding as complete
dispatch(completeOnboarding());

// Logout
dispatch(logout());
```

## Cart State

The cart state includes:

- `items`: Array of cart items
- `promoCode`: Current promo code
- `promoDiscount`: Discount amount from promo code
- `promoCodeApplied`: Boolean indicating if a promo code is applied

### Usage Example

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  applyPromoCode,
  clearPromoCode,
  selectCartTotal,
} from '../store/slices/cartSlice';

// In a component
const { items } = useSelector((state: RootState) => state.cart);
const { subtotal, shipping, tax, total } = useSelector(selectCartTotal);

const dispatch = useDispatch();

// Add an item to cart
dispatch(
  addItem({
    id: '1',
    name: 'Product Name',
    description: 'Product description',
    price: 29.99,
    quantity: 1,
    imageUrl: 'image-url.jpg',
  })
);

// Update quantity
dispatch(updateQuantity({ id: '1', quantity: 2 }));

// Remove an item
dispatch(removeItem('1'));

// Apply promo code
dispatch(applyPromoCode({ code: 'SAVE20', discount: 10 }));

// Clear promo code
dispatch(clearPromoCode());

// Clear cart
dispatch(clearCart());
```

## Redux Persist

The store uses Redux Persist to save the state to localStorage, ensuring that authentication and cart data persist across page refreshes and browser sessions.
