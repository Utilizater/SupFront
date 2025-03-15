import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import OnboardingLayout from '../layouts/OnboardingLayout';

// Lazy-loaded components for better performance
const LandingPage = lazy(() => import('../pages/LandingPage'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

const BasicInfo = lazy(() => import('../pages/onboarding/BasicInfo'));
const HealthGoals = lazy(() => import('../pages/onboarding/HealthGoals'));
const Lifestyle = lazy(() => import('../pages/onboarding/Lifestyle'));
const MedicalHistory = lazy(() => import('../pages/onboarding/MedicalHistory'));
const OnboardingSummary = lazy(() => import('../pages/onboarding/Summary'));

const Dashboard = lazy(() => import('../pages/Dashboard'));
const AIAdvisor = lazy(() => import('../pages/AIAdvisor'));
const ExpertsList = lazy(() => import('../pages/experts/ExpertsList'));
const ExpertProfile = lazy(() => import('../pages/experts/ExpertProfile'));
const ConsultationChat = lazy(
  () => import('../pages/experts/ConsultationChat')
);
const SupplementPacks = lazy(() => import('../pages/packs/SupplementPacks'));
const PackDetail = lazy(() => import('../pages/packs/PackDetail'));
const UserProfile = lazy(() => import('../pages/profile/UserProfile'));
const OrderHistory = lazy(() => import('../pages/profile/OrderHistory'));
const OrderDetail = lazy(() => import('../pages/profile/OrderDetail'));
const SavedRecommendations = lazy(
  () => import('../pages/profile/SavedRecommendations')
);
const Cart = lazy(() => import('../pages/cart/Cart'));
const Checkout = lazy(() => import('../pages/cart/Checkout'));
const OrderConfirmation = lazy(() => import('../pages/cart/OrderConfirmation'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading component for suspense fallback
const Loader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
    Loading...
  </div>
);

// Mock authentication for demonstration
// In a real app, this would come from a context or state management
const isAuthenticated = true; //TO DO!!
const hasCompletedOnboarding = true; //TO DO!!

// Route guards
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (isAuthenticated && !hasCompletedOnboarding) {
    return <Navigate to='/onboarding/basic-info' />;
  }

  return <>{children}</>;
};

const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (isAuthenticated && hasCompletedOnboarding) {
    return <Navigate to='/dashboard' />;
  }

  return <>{children}</>;
};

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  if (isAuthenticated && hasCompletedOnboarding) {
    return <Navigate to='/dashboard' />;
  }

  if (isAuthenticated && !hasCompletedOnboarding) {
    return <Navigate to='/onboarding/basic-info' />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LandingPage />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route
            path='/login'
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            }
          />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Route>

        {/* Onboarding Routes */}
        <Route element={<OnboardingLayout />}>
          <Route
            path='/onboarding'
            element={
              <OnboardingRoute>
                <Navigate to='/onboarding/basic-info' />
              </OnboardingRoute>
            }
          />
          <Route
            path='/onboarding/basic-info'
            element={
              <OnboardingRoute>
                <BasicInfo />
              </OnboardingRoute>
            }
          />
          <Route
            path='/onboarding/health-goals'
            element={
              <OnboardingRoute>
                <HealthGoals />
              </OnboardingRoute>
            }
          />
          <Route
            path='/onboarding/lifestyle'
            element={
              <OnboardingRoute>
                <Lifestyle />
              </OnboardingRoute>
            }
          />
          <Route
            path='/onboarding/medical-history'
            element={
              <OnboardingRoute>
                <MedicalHistory />
              </OnboardingRoute>
            }
          />
          <Route
            path='/onboarding/summary'
            element={
              <OnboardingRoute>
                <OnboardingSummary />
              </OnboardingRoute>
            }
          />
        </Route>

        {/* Protected Routes */}
        <Route element={<MainLayout isAuthenticated={isAuthenticated} />}>
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* AI Advisor */}
          <Route
            path='/ai-advisor'
            element={
              <ProtectedRoute>
                <AIAdvisor />
              </ProtectedRoute>
            }
          />

          {/* Expert Consultations */}
          <Route
            path='/consultations'
            element={
              <ProtectedRoute>
                <ExpertsList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/consultations/:expertId'
            element={
              <ProtectedRoute>
                <ExpertProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/consultations/chat/:consultationId'
            element={
              <ProtectedRoute>
                <ConsultationChat />
              </ProtectedRoute>
            }
          />

          {/* Supplement Packs */}
          <Route
            path='/packs'
            element={
              <ProtectedRoute>
                <SupplementPacks />
              </ProtectedRoute>
            }
          />
          <Route
            path='/packs/:packId'
            element={
              <ProtectedRoute>
                <PackDetail />
              </ProtectedRoute>
            }
          />

          {/* User Profile */}
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders/:orderId'
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/recommendations'
            element={
              <ProtectedRoute>
                <SavedRecommendations />
              </ProtectedRoute>
            }
          />

          {/* Shopping Cart */}
          <Route
            path='/cart'
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path='/checkout'
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path='/order-confirmation/:orderId'
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 Not Found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
