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

const OnboardingSummary: React.FC = () => {
  const navigate = useNavigate();

  // In a real app, this data would come from context/state management
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

  const handleComplete = () => {
    // In a real app, you would finalize the onboarding process here
    // This might include API calls to save all the collected data

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
