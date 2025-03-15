import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 8,
        }}>
        <Typography variant='h1' component='h1' gutterBottom>
          404
        </Typography>
        <Typography variant='h4' component='h2' gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant='body1' color='text.secondary' paragraph>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant='contained'
            color='primary'
            component={RouterLink}
            to='/'
            size='large'>
            Go to Homepage
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
