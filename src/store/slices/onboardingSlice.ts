import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces for the onboarding data structure
export interface BasicInfo {
  name: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
}

export interface Lifestyle {
  activityLevel: string;
  sleepHours: number;
  stressLevel: number;
  diet: string;
  dietaryRestrictions: string;
}

export interface MedicalHistory {
  conditions: string[];
  medications: string[];
  supplements: string[];
}

export interface OnboardingState {
  basicInfo: BasicInfo | null;
  healthGoals: string[];
  lifestyle: Lifestyle | null;
  medicalHistory: MedicalHistory | null;
  isComplete: boolean;
  isSubmittedToBackend: boolean;
}

// Define the initial state
const initialState: OnboardingState = {
  basicInfo: null,
  healthGoals: [],
  lifestyle: null,
  medicalHistory: null,
  isComplete: false,
  isSubmittedToBackend: false,
};

// Create the onboarding slice
const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setBasicInfo: (state, action: PayloadAction<BasicInfo>) => {
      state.basicInfo = action.payload;
    },
    setHealthGoals: (state, action: PayloadAction<string[]>) => {
      state.healthGoals = action.payload;
    },
    setLifestyle: (state, action: PayloadAction<Lifestyle>) => {
      state.lifestyle = action.payload;
    },
    setMedicalHistory: (state, action: PayloadAction<MedicalHistory>) => {
      state.medicalHistory = action.payload;
    },
    completeOnboarding: (
      state,
      action: PayloadAction<{
        basicInfo: BasicInfo;
        healthGoals: string[];
        lifestyle: Lifestyle;
        medicalHistory: MedicalHistory;
      }>
    ) => {
      state.basicInfo = action.payload.basicInfo;
      state.healthGoals = action.payload.healthGoals;
      state.lifestyle = action.payload.lifestyle;
      state.medicalHistory = action.payload.medicalHistory;
      state.isComplete = true;
    },
    markSubmittedToBackend: (state) => {
      state.isSubmittedToBackend = true;
    },
    resetOnboarding: (state) => {
      return initialState;
    },
  },
});

// Export the actions
export const {
  setBasicInfo,
  setHealthGoals,
  setLifestyle,
  setMedicalHistory,
  completeOnboarding,
  markSubmittedToBackend,
  resetOnboarding,
} = onboardingSlice.actions;

// Export the reducer
export default onboardingSlice.reducer;
