import { store } from './index';
import { setAuthState } from './slices/authSlice';
import { setCartState, CartItem } from './slices/cartSlice';

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

// Initialize store with mock data for development
export const initializeMockData = () => {
  // Set authentication state
  store.dispatch(
    setAuthState({
      isAuthenticated: true,
      hasCompletedOnboarding: true,
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
};
