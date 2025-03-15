import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useAppDispatch, useAppSelector } from '../../store';
import { completeOnboarding as completeAuthOnboarding } from '../../store/slices/authSlice';
import {
  completeOnboarding,
  markSubmittedToBackend,
  BasicInfo,
  Lifestyle,
  MedicalHistory,
} from '../../store/slices/onboardingSlice';

const OnboardingSummary: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onboardingData = useAppSelector((state) => state.onboarding);

  // In a real app, this data would come from previous onboarding steps
  // This is mock data for demonstration
  const mockUserData = {
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

  // Function to send onboarding data to backend
  const sendOnboardingDataToBackend = async (data: {
    basicInfo: BasicInfo;
    healthGoals: string[];
    lifestyle: Lifestyle;
    medicalHistory: MedicalHistory;
  }) => {
    try {
      // This is a placeholder for the actual API call
      console.log('Sending onboarding data to backend:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mark as submitted to backend in Redux
      dispatch(markSubmittedToBackend());

      return true;
    } catch (error) {
      console.error('Error sending onboarding data to backend:', error);
      return false;
    }
  };

  const handleComplete = async () => {
    // Save onboarding data to Redux
    dispatch(
      completeOnboarding({
        basicInfo: mockUserData.basicInfo as BasicInfo,
        healthGoals: mockUserData.healthGoals,
        lifestyle: mockUserData.lifestyle as Lifestyle,
        medicalHistory: mockUserData.medicalHistory as MedicalHistory,
      })
    );

    // Mark onboarding as complete in auth slice
    dispatch(completeAuthOnboarding());

    // Send data to backend (placeholder)
    await sendOnboardingDataToBackend({
      basicInfo: mockUserData.basicInfo as BasicInfo,
      healthGoals: mockUserData.healthGoals,
      lifestyle: mockUserData.lifestyle as Lifestyle,
      medicalHistory: mockUserData.medicalHistory as MedicalHistory,
    });

    // Navigate to the dashboard
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/onboarding/medical-history');
  };

  return (
    <Container maxWidth='md'>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CheckCircleOutlineIcon
            color='success'
            sx={{ fontSize: 40, mr: 2 }}
          />
          <Typography variant='h4' component='h1'>
            Onboarding Summary
          </Typography>
        </Box>

        <Alert severity='info' sx={{ mb: 4 }}>
          Please review your information below. You can go back to make changes
          if needed.
        </Alert>

        {/* Basic Information */}
        <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
          Basic Information
        </Typography>
        <List>
          {Object.entries(mockUserData.basicInfo).map(([key, value]) => (
            <ListItem key={key} sx={{ py: 1 }}>
              <ListItemText
                primary={
                  key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, ' $1')
                }
                secondary={value}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Health Goals */}
        <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
          Health Goals
        </Typography>
        <List>
          {mockUserData.healthGoals.map((goal, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemText primary={goal} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Lifestyle */}
        <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
          Lifestyle
        </Typography>
        <List>
          {Object.entries(mockUserData.lifestyle).map(([key, value]) => (
            <ListItem key={key} sx={{ py: 1 }}>
              <ListItemText
                primary={
                  key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, ' $1')
                }
                secondary={value}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Medical History */}
        <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
          Medical History
        </Typography>

        <Typography variant='subtitle1' gutterBottom>
          Medical Conditions
        </Typography>
        <List dense>
          {mockUserData.medicalHistory.conditions.map((condition, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemText primary={condition} />
            </ListItem>
          ))}
        </List>

        <Typography variant='subtitle1' gutterBottom sx={{ mt: 2 }}>
          Current Medications
        </Typography>
        <List dense>
          {mockUserData.medicalHistory.medications.map((medication, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemText primary={medication} />
            </ListItem>
          ))}
        </List>

        <Typography variant='subtitle1' gutterBottom sx={{ mt: 2 }}>
          Current Supplements
        </Typography>
        <List dense>
          {mockUserData.medicalHistory.supplements.map((supplement, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemText primary={supplement} />
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant='outlined' onClick={handleBack}>
            Back
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleComplete}
            size='large'>
            Complete Onboarding
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OnboardingSummary;
