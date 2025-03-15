import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import reducers
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

// Configure persist options
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated', 'hasCompletedOnboarding', 'user'], // only persist these fields
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'promoCode', 'promoDiscount', 'promoCodeApplied'], // persist all cart fields
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Combine reducers
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  cart: persistedCartReducer,
});

// Create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
