import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Container,
  TextField,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const healthGoalOptions = [
  { id: 'weight_loss', label: 'Weight Loss' },
  { id: 'muscle_gain', label: 'Muscle Gain' },
  { id: 'energy_boost', label: 'Energy Boost' },
  { id: 'better_sleep', label: 'Better Sleep' },
  { id: 'stress_reduction', label: 'Stress Reduction' },
  { id: 'immune_support', label: 'Immune System Support' },
  { id: 'heart_health', label: 'Heart Health' },
  { id: 'digestive_health', label: 'Digestive Health' },
  { id: 'brain_function', label: 'Brain Function & Focus' },
  { id: 'joint_health', label: 'Joint Health & Mobility' },
];

const HealthGoals: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [otherGoal, setOtherGoal] = useState('');

  const handleGoalChange = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    // In a real app, you would save this data to state/context/backend
    console.log('Selected health goals:', selectedGoals);
    if (otherGoal) console.log('Other health goal:', otherGoal);

    // Navigate to the next step
    navigate('/onboarding/lifestyle');
  };

  const handleBack = () => {
    navigate('/onboarding/basic-info');
  };

  return (
    <Container maxWidth='md'>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Health Goals
        </Typography>

        <Typography variant='body1' sx={{ mb: 3 }}>
          Select the health goals you'd like to focus on. This will help us
          personalize your supplement recommendations.
        </Typography>

        <FormGroup sx={{ mb: 3 }}>
          {healthGoalOptions.map((goal) => (
            <FormControlLabel
              key={goal.id}
              control={
                <Checkbox
                  checked={selectedGoals.includes(goal.id)}
                  onChange={() => handleGoalChange(goal.id)}
                />
              }
              label={goal.label}
            />
          ))}
        </FormGroup>

        <Divider sx={{ my: 2 }} />

        <Typography variant='body1' gutterBottom>
          Any other health goals not listed above?
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder='Describe any other health goals you have...'
          value={otherGoal}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOtherGoal(e.target.value)
          }
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant='outlined' onClick={handleBack}>
            Back
          </Button>
          <Button
            variant='contained'
            onClick={handleNext}
            disabled={selectedGoals.length === 0}>
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default HealthGoals;
