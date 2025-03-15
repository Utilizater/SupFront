import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for the auth state
interface AuthState {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  user: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePicture?: string;
  } | null;
}

// Define the initial state
const initialState: AuthState = {
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  user: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: AuthState['user'] }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.hasCompletedOnboarding = false;
      state.user = null;
    },
    completeOnboarding: (state) => {
      console.log('completeOnboarding');
      state.hasCompletedOnboarding = true;
    },
    updateUser: (state, action: PayloadAction<Partial<AuthState['user']>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    // For development/testing purposes
    setAuthState: (state, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export the actions
export const { login, logout, completeOnboarding, updateUser, setAuthState } =
  authSlice.actions;

// Export the reducer
export default authSlice.reducer;
