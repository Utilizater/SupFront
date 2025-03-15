import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Paper,
  useTheme,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  // Mock data for demonstration
  const upcomingConsultations = [
    {
      id: 1,
      expertName: 'Dr. Sarah Johnson',
      expertAvatar: '/experts/sarah.jpg',
      date: 'Tomorrow, 2:00 PM',
      status: 'confirmed',
    },
    {
      id: 2,
      expertName: 'Michael Chen, RD',
      expertAvatar: '/experts/michael.jpg',
      date: 'March 20, 10:30 AM',
      status: 'pending',
    },
  ];

  const recommendedPacks = [
    {
      id: 1,
      name: 'Energy Boost Pack',
      description: 'Supplements to increase energy and reduce fatigue',
      price: 49.99,
      image: '/packs/energy.jpg',
    },
    {
      id: 2,
      name: 'Immune Support Pack',
      description:
        'Strengthen your immune system with these essential supplements',
      price: 39.99,
      image: '/packs/immune.jpg',
    },
    {
      id: 3,
      name: 'Sleep & Recovery Pack',
      description: 'Improve sleep quality and enhance recovery',
      price: 44.99,
      image: '/packs/sleep.jpg',
    },
  ];

  const recentConversations = [
    {
      id: 1,
      type: 'ai',
      title: 'Vitamin D Recommendations',
      preview:
        'Based on your profile, I recommend taking 2000 IU of Vitamin D daily...',
      date: '2 days ago',
    },
    {
      id: 2,
      type: 'expert',
      expertName: 'Dr. Sarah Johnson',
      title: 'Protein Intake Discussion',
      preview:
        'Your current protein intake seems low for your activity level...',
      date: '1 week ago',
    },
  ];

  const healthGoals = [
    { id: 1, name: 'Increase Energy', progress: 65 },
    { id: 2, name: 'Improve Sleep', progress: 40 },
    { id: 3, name: 'Strengthen Immunity', progress: 80 },
  ];

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Welcome Back, John
      </Typography>

      {/* Health Summary */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUpIcon color='primary' sx={{ mr: 1 }} />
          <Typography variant='h6'>Your Health Summary</Typography>
        </Box>
        <Grid container spacing={3}>
          {healthGoals.map((goal) => (
            <Grid item xs={12} md={4} key={goal.id}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}>
                  <Typography variant='body1'>{goal.name}</Typography>
                  <Typography variant='body2'>{goal.progress}%</Typography>
                </Box>
                <Box
                  sx={{
                    height: 8,
                    width: '100%',
                    bgcolor: 'grey.200',
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}>
                  <Box
                    sx={{
                      height: '100%',
                      width: `${goal.progress}%`,
                      bgcolor: 'primary.main',
                      borderRadius: 5,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button component={RouterLink} to='/profile/health' color='primary'>
            View Full Health Profile
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        {/* Upcoming Consultations */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color='primary' sx={{ mr: 1 }} />
                <Typography variant='h6'>Upcoming Consultations</Typography>
              </Box>

              {upcomingConsultations.length > 0 ? (
                <List>
                  {upcomingConsultations.map((consultation) => (
                    <React.Fragment key={consultation.id}>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar
                            src={consultation.expertAvatar}
                            alt={consultation.expertName}
                            onError={(
                              e: React.SyntheticEvent<HTMLImageElement>
                            ) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                consultation.expertName
                              )}&background=random`;
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={consultation.expertName}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component='span'
                                variant='body2'
                                color='text.primary'>
                                {consultation.date}
                              </Typography>
                              <Box sx={{ mt: 0.5 }}>
                                <Chip
                                  size='small'
                                  label={
                                    consultation.status === 'confirmed'
                                      ? 'Confirmed'
                                      : 'Pending'
                                  }
                                  color={
                                    consultation.status === 'confirmed'
                                      ? 'success'
                                      : 'warning'
                                  }
                                />
                              </Box>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant='body1' color='text.secondary'>
                  No upcoming consultations.
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                component={RouterLink}
                to='/consultations'
                size='small'
                color='primary'>
                Book a Consultation
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Recent Conversations */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChatIcon color='primary' sx={{ mr: 1 }} />
                <Typography variant='h6'>Recent Conversations</Typography>
              </Box>

              {recentConversations.length > 0 ? (
                <List>
                  {recentConversations.map((conversation) => (
                    <React.Fragment key={conversation.id}>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor:
                                conversation.type === 'ai'
                                  ? 'secondary.main'
                                  : 'primary.main',
                            }}>
                            {conversation.type === 'ai' ? (
                              <LocalHospitalIcon />
                            ) : (
                              <PeopleIcon />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={conversation.title}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component='span'
                                variant='body2'
                                color='text.primary'>
                                {conversation.type === 'expert' &&
                                  `${conversation.expertName} - `}
                                {conversation.date}
                              </Typography>
                              <Typography variant='body2' component='p'>
                                {conversation.preview}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant='body1' color='text.secondary'>
                  No recent conversations.
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                component={RouterLink}
                to='/ai-advisor'
                size='small'
                color='primary'>
                Chat with AI Advisor
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Recommended Supplement Packs */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingBasketIcon color='primary' sx={{ mr: 1 }} />
                <Typography variant='h6'>
                  Recommended Supplement Packs
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {recommendedPacks.map((pack) => (
                  <Grid item xs={12} sm={6} md={4} key={pack.id}>
                    <Card variant='outlined'>
                      <Box
                        sx={{
                          height: 140,
                          bgcolor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Box
                          component='img'
                          src={pack.image}
                          alt={pack.name}
                          sx={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                          }}
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement>
                          ) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const icon = document.createElement('div');
                              icon.innerHTML =
                                '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#9e9e9e" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>';
                              parent.appendChild(icon);
                            }
                          }}
                        />
                      </Box>
                      <CardContent>
                        <Typography variant='h6' component='h3' gutterBottom>
                          {pack.name}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{ mb: 1 }}>
                          {pack.description}
                        </Typography>
                        <Typography variant='h6' color='primary'>
                          ${pack.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          component={RouterLink}
                          to={`/packs/${pack.id}`}
                          size='small'>
                          View Details
                        </Button>
                        <Button
                          size='small'
                          variant='contained'
                          color='primary'>
                          Add to Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                component={RouterLink}
                to='/packs'
                size='small'
                color='primary'>
                View All Supplement Packs
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
