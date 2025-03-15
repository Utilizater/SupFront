import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Paper,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BasicInfo: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    birthDate: '',
    height: '',
    weight: '',
    units: 'imperial', // 'imperial' or 'metric'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      birthDate: e.target.value,
    });
  };

  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUnits = e.target.value;

    // Convert height and weight when switching units
    if (newUnits === 'metric' && formData.units === 'imperial') {
      // Convert from imperial to metric
      const heightParts = formData.height
        .split("'")
        .map((part) => part.trim().replace('"', ''));
      if (heightParts.length === 2) {
        const feet = parseFloat(heightParts[0]);
        const inches = parseFloat(heightParts[1]);
        const totalInches = feet * 12 + inches;
        const cm = Math.round(totalInches * 2.54);

        const lbs = parseFloat(formData.weight);
        const kg = Math.round(lbs * 0.453592);

        setFormData({
          ...formData,
          units: newUnits,
          height: cm.toString(),
          weight: kg.toString(),
        });
      } else {
        setFormData({
          ...formData,
          units: newUnits,
        });
      }
    } else if (newUnits === 'imperial' && formData.units === 'metric') {
      // Convert from metric to imperial
      const cm = parseFloat(formData.height);
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);

      const kg = parseFloat(formData.weight);
      const lbs = Math.round(kg / 0.453592);

      setFormData({
        ...formData,
        units: newUnits,
        height: `${feet}'${inches}"`,
        weight: lbs.toString(),
      });
    } else {
      setFormData({
        ...formData,
        units: newUnits,
      });
    }
  };

  const handleNext = () => {
    // In a real app, you would save this data to state/context/backend
    console.log('Basic info data:', formData);

    // Navigate to the next step
    navigate('/onboarding/health-goals');
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.gender !== '' &&
      formData.birthDate.trim() !== '' &&
      formData.height.trim() !== '' &&
      formData.weight.trim() !== ''
    );
  };

  return (
    <Container maxWidth='md'>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Tell Us About Yourself
        </Typography>

        <Typography variant='body1' sx={{ mb: 4 }}>
          We'll use this information to personalize your supplement
          recommendations.
        </Typography>

        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Personal Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label='First Name'
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label='Last Name'
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label='Email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Phone Number'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id='gender-label'>Gender</InputLabel>
              <Select
                labelId='gender-label'
                id='gender'
                name='gender'
                value={formData.gender}
                label='Gender'
                onChange={handleSelectChange as any}>
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='non-binary'>Non-binary</MenuItem>
                <MenuItem value='prefer-not-to-say'>Prefer not to say</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label='Date of Birth'
              name='birthDate'
              type='date'
              value={formData.birthDate}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Physical Information */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant='h6' gutterBottom>
              Physical Information
            </Typography>

            <FormControl component='fieldset' sx={{ mb: 2 }}>
              <FormLabel component='legend'>Units</FormLabel>
              <RadioGroup
                row
                name='units'
                value={formData.units}
                onChange={handleUnitsChange}>
                <FormControlLabel
                  value='imperial'
                  control={<Radio />}
                  label='Imperial (ft/in, lbs)'
                />
                <FormControlLabel
                  value='metric'
                  control={<Radio />}
                  label='Metric (cm, kg)'
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label='Height'
              name='height'
              value={formData.height}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {formData.units === 'imperial' ? 'ft/in' : 'cm'}
                  </InputAdornment>
                ),
              }}
              placeholder={formData.units === 'imperial' ? '5\'10"' : '178'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label='Weight'
              name='weight'
              value={formData.weight}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {formData.units === 'imperial' ? 'lbs' : 'kg'}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant='contained'
            onClick={handleNext}
            disabled={!isFormValid()}>
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BasicInfo;
