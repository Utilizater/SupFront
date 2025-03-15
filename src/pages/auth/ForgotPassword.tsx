import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestError, setRequestError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    setRequestError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, always succeed
      setIsSubmitted(true);
    } catch (error) {
      setRequestError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Typography variant='h4' component='h1' align='center' gutterBottom>
        Forgot Password
      </Typography>

      {!isSubmitted ? (
        <>
          <Typography
            variant='body1'
            align='center'
            color='text.secondary'
            sx={{ mb: 3 }}>
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>

          {requestError && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {requestError}
            </Alert>
          )}

          <Box component='form' onSubmit={handleSubmit} noValidate>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              disabled={isLoading}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              size='large'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Send Reset Link'
              )}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant='body2'>
                <Link component={RouterLink} to='/login' variant='body2'>
                  Back to Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <Paper
          sx={{
            p: 3,
            mt: 2,
            bgcolor: 'success.light',
            color: 'success.contrastText',
          }}>
          <Typography variant='h6' gutterBottom>
            Reset Link Sent
          </Typography>
          <Typography variant='body1' paragraph>
            We've sent a password reset link to <strong>{email}</strong>.
          </Typography>
          <Typography variant='body2'>
            Please check your email and follow the instructions to reset your
            password. If you don't receive an email within a few minutes, please
            check your spam folder.
          </Typography>
          <Button
            component={RouterLink}
            to='/login'
            variant='outlined'
            color='inherit'
            sx={{ mt: 2 }}>
            Return to Login
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default ForgotPassword;
