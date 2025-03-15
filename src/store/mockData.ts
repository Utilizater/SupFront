import { store } from './index';
import { setAuthState } from './slices/authSlice';
import { setCartState, CartItem } from './slices/cartSlice';
import { completeOnboarding } from './slices/onboardingSlice';

// Mock user data
const mockUser = {
  id: 'user123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
};

// Mock cart items
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Energy & Focus Pack',
    description:
      'Boost your energy levels and mental clarity with this carefully formulated supplement pack.',
    price: 89.99,
    quantity: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '2',
    name: 'Gut Health Essentials',
    description:
      'Support your digestive system and microbiome with this comprehensive gut health pack.',
    price: 79.99,
    quantity: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

// Mock onboarding data
const mockOnboardingData = {
  basicInfo: {
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    height: '5\'10"',
    weight: '175 lbs',
  },
  healthGoals: ['Weight Loss', 'Energy Boost', 'Better Sleep'],
  lifestyle: {
    activityLevel: 'Moderate',
    sleepHours: 7,
    stressLevel: 6,
    diet: 'Omnivore',
    dietaryRestrictions: 'Lactose intolerant',
  },
  medicalHistory: {
    conditions: ['Hypertension', 'High Cholesterol'],
    medications: ['Lisinopril', 'Atorvastatin'],
    supplements: ['Multivitamin', 'Fish Oil'],
  },
};

// Initialize store with mock data for development
export const initializeMockData = () => {
  // Set authentication state
  store.dispatch(
    setAuthState({
      isAuthenticated: true,
      hasCompletedOnboarding: false,
      user: mockUser,
    })
  );

  // Set cart state
  store.dispatch(
    setCartState({
      items: mockCartItems,
      promoCode: '',
      promoDiscount: 0,
      promoCodeApplied: false,
    })
  );

  // Set onboarding state
  store.dispatch(
    completeOnboarding({
      basicInfo: mockOnboardingData.basicInfo,
      healthGoals: mockOnboardingData.healthGoals,
      lifestyle: mockOnboardingData.lifestyle,
      medicalHistory: mockOnboardingData.medicalHistory,
    })
  );
};
