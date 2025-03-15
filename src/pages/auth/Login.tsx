import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

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

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
    setLoginError('');

    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, check for a specific email/password
      navigate('/dashboard');
      // if (
      //   formData.email === 'demo@example.com' &&
      //   formData.password === 'password'
      // ) {
      //   // Successful login
      //   navigate('/dashboard');
      // } else {
      //   // Failed login
      //   setLoginError('Invalid email or password');
      // }
    } catch (error) {
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Typography variant='h4' component='h1' align='center' gutterBottom>
        Welcome Back
      </Typography>
      <Typography
        variant='body1'
        align='center'
        color='text.secondary'
        sx={{ mb: 3 }}>
        Sign in to your account to continue
      </Typography>

      {loginError && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {loginError}
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
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          disabled={isLoading}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          id='password'
          autoComplete='current-password'
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
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

        <Box sx={{ mt: 1, textAlign: 'right' }}>
          <Link component={RouterLink} to='/forgot-password' variant='body2'>
            Forgot password?
          </Link>
        </Box>

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
            'Sign In'
          )}
        </Button>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant='body2'>
            Don't have an account?{' '}
            <Link component={RouterLink} to='/register' variant='body2'>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Demo credentials hint */}
      <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant='body2' color='text.secondary'>
          <strong>Demo Credentials:</strong>
          <br />
          Email: demo@example.com
          <br />
          Password: password
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
