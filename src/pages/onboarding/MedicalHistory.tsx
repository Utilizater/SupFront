import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const commonConditions = [
  'Hypertension',
  'Diabetes',
  'High Cholesterol',
  'Asthma',
  'Thyroid Disorder',
  'Heart Disease',
  'Arthritis',
  'Depression/Anxiety',
  'Digestive Disorders',
  'Migraines',
];

const MedicalHistory: React.FC = () => {
  const navigate = useNavigate();
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [otherConditions, setOtherConditions] = useState('');
  const [medications, setMedications] = useState<string[]>([]);
  const [currentMedication, setCurrentMedication] = useState('');
  const [supplements, setSupplements] = useState<string[]>([]);
  const [currentSupplement, setCurrentSupplement] = useState('');

  const handleConditionChange = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const handleAddMedication = () => {
    if (currentMedication.trim() !== '') {
      setMedications([...medications, currentMedication.trim()]);
      setCurrentMedication('');
    }
  };

  const handleRemoveMedication = (medication: string) => {
    setMedications(medications.filter((med) => med !== medication));
  };

  const handleAddSupplement = () => {
    if (currentSupplement.trim() !== '') {
      setSupplements([...supplements, currentSupplement.trim()]);
      setCurrentSupplement('');
    }
  };

  const handleRemoveSupplement = (supplement: string) => {
    setSupplements(supplements.filter((sup) => sup !== supplement));
  };

  const handleNext = () => {
    // In a real app, you would save this data to state/context/backend
    console.log('Medical history data:', {
      selectedConditions,
      otherConditions,
      medications,
      supplements,
    });

    // Navigate to the next step
    navigate('/onboarding/summary');
  };

  const handleBack = () => {
    navigate('/onboarding/lifestyle');
  };

  return (
    <Container maxWidth='md'>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Medical History
        </Typography>

        <Typography variant='body1' sx={{ mb: 4 }}>
          Please provide your medical history to help us recommend supplements
          that are safe and effective for you.
        </Typography>

        {/* Medical Conditions */}
        <Typography variant='h6' gutterBottom>
          Do you have any of the following medical conditions?
        </Typography>

        <FormGroup sx={{ mb: 3 }}>
          {commonConditions.map((condition) => (
            <FormControlLabel
              key={condition}
              control={
                <Checkbox
                  checked={selectedConditions.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                />
              }
              label={condition}
            />
          ))}
        </FormGroup>

        <TextField
          fullWidth
          label='Other Medical Conditions'
          placeholder='List any other medical conditions not mentioned above...'
          value={otherConditions}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOtherConditions(e.target.value)
          }
          multiline
          rows={2}
          sx={{ mb: 4 }}
        />

        <Divider sx={{ my: 3 }} />

        {/* Current Medications */}
        <Typography variant='h6' gutterBottom>
          Current Medications
        </Typography>

        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            label='Add Medication'
            placeholder='Enter medication name...'
            value={currentMedication}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCurrentMedication(e.target.value)
            }
            sx={{ mr: 2 }}
          />
          <Button
            variant='contained'
            onClick={handleAddMedication}
            disabled={currentMedication.trim() === ''}>
            Add
          </Button>
        </Box>

        <Stack direction='row' spacing={1} flexWrap='wrap' sx={{ mb: 4 }}>
          {medications.map((medication, index) => (
            <Chip
              key={index}
              label={medication}
              onDelete={() => handleRemoveMedication(medication)}
              sx={{ m: 0.5 }}
            />
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Current Supplements */}
        <Typography variant='h6' gutterBottom>
          Current Supplements
        </Typography>

        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            label='Add Supplement'
            placeholder='Enter supplement name...'
            value={currentSupplement}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCurrentSupplement(e.target.value)
            }
            sx={{ mr: 2 }}
          />
          <Button
            variant='contained'
            onClick={handleAddSupplement}
            disabled={currentSupplement.trim() === ''}>
            Add
          </Button>
        </Box>

        <Stack direction='row' spacing={1} flexWrap='wrap' sx={{ mb: 4 }}>
          {supplements.map((supplement, index) => (
            <Chip
              key={index}
              label={supplement}
              onDelete={() => handleRemoveSupplement(supplement)}
              sx={{ m: 0.5 }}
            />
          ))}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant='outlined' onClick={handleBack}>
            Back
          </Button>
          <Button variant='contained' onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default MedicalHistory;
