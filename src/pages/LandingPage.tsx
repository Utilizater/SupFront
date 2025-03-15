import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  useTheme,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const LandingPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          mb: 6,
        }}>
        <Container maxWidth='lg'>
          <Grid container spacing={4} alignItems='center'>
            <Grid item xs={12} md={6}>
              <Typography variant='h2' component='h1' gutterBottom>
                AI-Powered Supplement Recommendations
              </Typography>
              <Typography variant='h5' paragraph>
                Get personalized supplement recommendations based on your unique
                health profile and goals.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant='contained'
                  color='secondary'
                  size='large'
                  component={RouterLink}
                  to='/register'
                  sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}>
                  Get Started
                </Button>
                <Button
                  variant='outlined'
                  color='inherit'
                  size='large'
                  component={RouterLink}
                  to='/login'>
                  Login
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component='img'
                src='/hero-image.jpg'
                alt='AI Supplement Advisor'
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                  display: { xs: 'none', md: 'block' },
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  // Fallback if image doesn't exist
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth='lg' sx={{ mb: 8 }}>
        <Typography variant='h3' component='h2' align='center' gutterBottom>
          How It Works
        </Typography>
        <Typography
          variant='h6'
          align='center'
          color='text.secondary'
          paragraph>
          Our AI-powered platform makes finding the right supplements easy and
          personalized.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* AI Chat Feature */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                <ChatIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant='h5' component='h3' gutterBottom>
                  AI Chat
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Chat with our AI to get personalized supplement
                  recommendations based on your health profile and goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Expert Consultations Feature */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                <PeopleIcon
                  sx={{ fontSize: 60, color: 'primary.main', mb: 2 }}
                />
                <Typography variant='h5' component='h3' gutterBottom>
                  Expert Consultations
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Book consultations with nutrition and health experts for
                  personalized advice and guidance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Supplement Packs Feature */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                <ShoppingBasketIcon
                  sx={{ fontSize: 60, color: 'primary.main', mb: 2 }}
                />
                <Typography variant='h5' component='h3' gutterBottom>
                  Supplement Packs
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Browse and purchase curated supplement packs designed for
                  specific health goals and needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8, mb: 6 }}>
        <Container maxWidth='lg'>
          <Typography variant='h3' component='h2' align='center' gutterBottom>
            What Our Users Say
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {/* Testimonial 1 */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant='body1' paragraph>
                    "The AI recommendations were spot on! I've been taking the
                    suggested supplements for a month and already feel more
                    energetic."
                  </Typography>
                  <Typography variant='subtitle1' color='primary.main'>
                    - Sarah J.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Testimonial 2 */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant='body1' paragraph>
                    "I loved being able to chat with a nutrition expert who
                    helped me understand exactly what supplements I needed for
                    my specific goals."
                  </Typography>
                  <Typography variant='subtitle1' color='primary.main'>
                    - Michael T.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Testimonial 3 */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant='body1' paragraph>
                    "The convenience of having curated supplement packs
                    delivered to my door has made it so much easier to stay
                    consistent with my health routine."
                  </Typography>
                  <Typography variant='subtitle1' color='primary.main'>
                    - Emily R.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth='md' sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant='h3' component='h2' gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant='h6' color='text.secondary' paragraph>
          Join thousands of users who have improved their health with our
          personalized supplement recommendations.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          size='large'
          component={RouterLink}
          to='/register'
          sx={{ mt: 2 }}>
          Create Your Account
        </Button>
      </Container>
    </Box>
  );
};

export default LandingPage;
