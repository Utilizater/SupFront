import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface ResetPasswordParams {
  token: string;
}

const ResetPassword: React.FC = () => {
  const params = useParams();
  const token = params.token;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resetError, setResetError] = useState('');
  const [isValidToken, setIsValidToken] = useState(true);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      // In a real app, you would validate the token with an API call
      // For demo purposes, we'll just check if it exists and has a reasonable length
      if (!token || token.length < 10) {
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setResetError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, always succeed
      setIsSubmitted(true);
    } catch (error) {
      setResetError(
        'An error occurred while resetting your password. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (!isValidToken) {
    return (
      <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
        <Alert severity='error' sx={{ mb: 3 }}>
          Invalid or expired password reset link.
        </Alert>
        <Typography variant='body1' paragraph>
          The password reset link is invalid or has expired. Please request a
          new password reset link.
        </Typography>
        <Button
          component={RouterLink}
          to='/forgot-password'
          variant='contained'
          color='primary'>
          Request New Link
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Typography variant='h4' component='h1' align='center' gutterBottom>
        Reset Password
      </Typography>

      {!isSubmitted ? (
        <>
          <Typography
            variant='body1'
            align='center'
            color='text.secondary'
            sx={{ mb: 3 }}>
            Enter your new password below
          </Typography>

          {resetError && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {resetError}
            </Alert>
          )}

          <Box component='form' onSubmit={handleSubmit} noValidate>
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='New Password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='new-password'
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={
                errors.password || 'Password must be at least 8 characters'
              }
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              name='confirmPassword'
              label='Confirm New Password'
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              autoComplete='new-password'
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle confirm password visibility'
                      onClick={handleClickShowConfirmPassword}
                      edge='end'>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
                'Reset Password'
              )}
            </Button>
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
            Password Reset Successful
          </Typography>
          <Typography variant='body1' paragraph>
            Your password has been successfully reset.
          </Typography>
          <Button
            component={RouterLink}
            to='/login'
            variant='outlined'
            color='inherit'
            sx={{ mt: 2 }}>
            Go to Login
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default ResetPassword;
