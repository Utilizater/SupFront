import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container, Paper, Stepper, Step, StepLabel } from '@mui/material';

const steps = [
  { label: 'Basic Information', path: '/onboarding/basic-info' },
  { label: 'Health Goals', path: '/onboarding/health-goals' },
  { label: 'Lifestyle', path: '/onboarding/lifestyle' },
  { label: 'Medical History', path: '/onboarding/medical-history' },
  { label: 'Summary', path: '/onboarding/summary' },
];

const OnboardingLayout: React.FC = () => {
  const location = useLocation();
  const activeStep = steps.findIndex((step) => step.path === location.pathname);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}>
      <Container maxWidth='md'>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <img
              src='/logo.png'
              alt='Supplement AI Logo'
              style={{ height: 60 }}
              onError={(e) => {
                // Fallback if logo image doesn't exist
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </Box>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{ width: '100%', mb: 4 }}>
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ width: '100%' }}>
              <Outlet />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default OnboardingLayout;
