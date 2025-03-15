import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';

const AuthLayout: React.FC = () => {
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
      <Container maxWidth='sm'>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Supplement AI
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            Your personalized supplement advisor
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
