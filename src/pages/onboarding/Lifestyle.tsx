import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Slider,
  TextField,
  Divider,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Lifestyle: React.FC = () => {
  const navigate = useNavigate();
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [diet, setDiet] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivityLevel(event.target.value);
  };

  const handleSleepChange = (_event: Event, newValue: number | number[]) => {
    setSleepHours(newValue as number);
  };

  const handleStressChange = (_event: Event, newValue: number | number[]) => {
    setStressLevel(newValue as number);
  };

  const handleDietChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiet(event.target.value);
  };

  const handleNext = () => {
    // In a real app, you would save this data to state/context/backend
    console.log('Lifestyle data:', {
      activityLevel,
      sleepHours,
      stressLevel,
      diet,
      dietaryRestrictions,
    });

    // Navigate to the next step
    navigate('/onboarding/medical-history');
  };

  const handleBack = () => {
    navigate('/onboarding/health-goals');
  };

  return (
    <Container maxWidth='md'>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Lifestyle Information
        </Typography>

        <Typography variant='body1' sx={{ mb: 4 }}>
          Tell us about your lifestyle to help us tailor supplement
          recommendations to your daily routine.
        </Typography>

        {/* Activity Level */}
        <FormControl component='fieldset' sx={{ mb: 4, width: '100%' }}>
          <FormLabel component='legend'>Physical Activity Level</FormLabel>
          <RadioGroup
            row
            name='activity-level'
            value={activityLevel}
            onChange={handleActivityChange}>
            <FormControlLabel
              value='sedentary'
              control={<Radio />}
              label='Sedentary'
            />
            <FormControlLabel value='light' control={<Radio />} label='Light' />
            <FormControlLabel
              value='moderate'
              control={<Radio />}
              label='Moderate'
            />
            <FormControlLabel
              value='active'
              control={<Radio />}
              label='Active'
            />
            <FormControlLabel
              value='very_active'
              control={<Radio />}
              label='Very Active'
            />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        {/* Sleep Hours */}
        <Box sx={{ mb: 4 }}>
          <Typography id='sleep-hours-slider' gutterBottom>
            Average Hours of Sleep per Night: {sleepHours}
          </Typography>
          <Slider
            value={sleepHours}
            onChange={handleSleepChange}
            aria-labelledby='sleep-hours-slider'
            valueLabelDisplay='auto'
            step={0.5}
            marks
            min={4}
            max={12}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Stress Level */}
        <Box sx={{ mb: 4 }}>
          <Typography id='stress-level-slider' gutterBottom>
            Stress Level (1-10): {stressLevel}
          </Typography>
          <Slider
            value={stressLevel}
            onChange={handleStressChange}
            aria-labelledby='stress-level-slider'
            valueLabelDisplay='auto'
            step={1}
            marks
            min={1}
            max={10}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Diet */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id='diet-select-label'>Diet Type</InputLabel>
          <Select
            labelId='diet-select-label'
            id='diet-select'
            value={diet}
            label='Diet Type'
            onChange={handleDietChange}>
            <MenuItem value=''>
              <em>Select your diet type</em>
            </MenuItem>
            <MenuItem value='omnivore'>Omnivore (Meat & Plants)</MenuItem>
            <MenuItem value='pescatarian'>Pescatarian</MenuItem>
            <MenuItem value='vegetarian'>Vegetarian</MenuItem>
            <MenuItem value='vegan'>Vegan</MenuItem>
            <MenuItem value='keto'>Keto</MenuItem>
            <MenuItem value='paleo'>Paleo</MenuItem>
            <MenuItem value='mediterranean'>Mediterranean</MenuItem>
            <MenuItem value='other'>Other</MenuItem>
          </Select>
        </FormControl>

        {/* Dietary Restrictions */}
        <TextField
          fullWidth
          multiline
          rows={3}
          label='Dietary Restrictions or Allergies'
          placeholder='List any food allergies or dietary restrictions...'
          value={dietaryRestrictions}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDietaryRestrictions(e.target.value)
          }
          sx={{ mb: 4 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant='outlined' onClick={handleBack}>
            Back
          </Button>
          <Button variant='contained' onClick={handleNext} disabled={!diet}>
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Lifestyle;
