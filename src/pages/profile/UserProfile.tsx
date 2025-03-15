import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Avatar,
  Button,
  TextField,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock user data
const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1985-06-15',
  address: {
    street: '123 Main St',
    city: 'Boston',
    state: 'MA',
    zipCode: '02108',
    country: 'United States',
  },
  profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
  memberSince: 'January 2023',
  healthGoals: ['Weight Management', 'Energy Boost', 'Better Sleep'],
  dietaryPreferences: ['Gluten-Free', 'Low Sugar'],
};

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email,
    phone: mockUser.phone,
    dateOfBirth: mockUser.dateOfBirth,
    street: mockUser.address.street,
    city: mockUser.address.city,
    state: mockUser.address.state,
    zipCode: mockUser.address.zipCode,
    country: mockUser.address.country,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    if (editMode) {
      // If we're exiting edit mode, reset form data
      setFormData({
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        phone: mockUser.phone,
        dateOfBirth: mockUser.dateOfBirth,
        street: mockUser.address.street,
        city: mockUser.address.city,
        state: mockUser.address.state,
        zipCode: mockUser.address.zipCode,
        country: mockUser.address.country,
      });
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    // In a real app, you would save the updated profile data to your backend
    console.log('Saving profile data:', formData);

    setSnackbarMessage('Profile updated successfully');
    setSnackbarOpen(true);
    setEditMode(false);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleNavigateToOrders = () => {
    navigate('/profile/orders');
  };

  const handleNavigateToRecommendations = () => {
    navigate('/profile/recommendations');
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={3} alignItems='center'>
              <Grid item xs={12} sm={2} md={1}>
                <Avatar
                  src={mockUser.profilePicture}
                  alt={`${mockUser.firstName} ${mockUser.lastName}`}
                  sx={{ width: 80, height: 80 }}
                />
              </Grid>

              <Grid item xs={12} sm={7} md={8}>
                <Typography variant='h4' component='h1' gutterBottom>
                  {mockUser.firstName} {mockUser.lastName}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Member since {mockUser.memberSince}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                <Button
                  variant='outlined'
                  onClick={handleNavigateToOrders}
                  sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}>
                  My Orders
                </Button>
                <Button
                  variant='outlined'
                  onClick={handleNavigateToRecommendations}>
                  Saved Items
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Profile Content */}
        <Grid item xs={12}>
          <Paper elevation={1}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label='profile tabs'
                variant='scrollable'
                scrollButtons='auto'>
                <Tab
                  icon={<PersonIcon />}
                  label='Personal Info'
                  id='profile-tab-0'
                  aria-controls='profile-tabpanel-0'
                />
                <Tab
                  icon={<SecurityIcon />}
                  label='Security'
                  id='profile-tab-1'
                  aria-controls='profile-tabpanel-1'
                />
                <Tab
                  icon={<NotificationsIcon />}
                  label='Notifications'
                  id='profile-tab-2'
                  aria-controls='profile-tabpanel-2'
                />
              </Tabs>
            </Box>

            {/* Personal Info Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 3,
                  }}>
                  <Typography variant='h6'>Personal Information</Typography>
                  {editMode ? (
                    <Box>
                      <IconButton
                        color='primary'
                        onClick={handleSaveProfile}
                        sx={{ mr: 1 }}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton color='default' onClick={handleEditToggle}>
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton color='primary' onClick={handleEditToggle}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='First Name'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin='normal'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Last Name'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin='normal'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin='normal'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin='normal'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Date of Birth'
                      name='dateOfBirth'
                      type='date'
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin='normal'
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography variant='h6' gutterBottom>
                  Address Information
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Street Address'
                      name='street'
                      value={formData.street}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin='normal'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label='City'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin='normal'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label='State/Province'
                      name='state'
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin='normal'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label='ZIP/Postal Code'
                      name='zipCode'
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin='normal'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Country'
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin='normal'
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography variant='h6' gutterBottom>
                  Health Profile
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant='subtitle1' gutterBottom>
                      Health Goals
                    </Typography>
                    <List dense>
                      {mockUser.healthGoals.map((goal, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={goal} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant='subtitle1' gutterBottom>
                      Dietary Preferences
                    </Typography>
                    <List dense>
                      {mockUser.dietaryPreferences.map((pref, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={pref} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant='outlined' color='primary' sx={{ mt: 2 }}>
                      Update Health Profile
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* Security Tab */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 2 }}>
                <Typography variant='h6' gutterBottom>
                  Security Settings
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant='subtitle1' gutterBottom>
                      Change Password
                    </Typography>
                    <TextField
                      fullWidth
                      label='Current Password'
                      type='password'
                      margin='normal'
                    />
                    <TextField
                      fullWidth
                      label='New Password'
                      type='password'
                      margin='normal'
                    />
                    <TextField
                      fullWidth
                      label='Confirm New Password'
                      type='password'
                      margin='normal'
                    />
                    <Button variant='contained' color='primary' sx={{ mt: 2 }}>
                      Update Password
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant='subtitle1' gutterBottom>
                      Two-Factor Authentication
                    </Typography>
                    <Typography variant='body2' paragraph>
                      Add an extra layer of security to your account by enabling
                      two-factor authentication.
                    </Typography>
                    <Button variant='outlined' color='primary'>
                      Enable Two-Factor Authentication
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* Notifications Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 2 }}>
                <Typography variant='h6' gutterBottom>
                  Notification Preferences
                </Typography>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary='Email Notifications'
                      secondary='Receive updates about your orders, recommendations, and special offers'
                    />
                    <Button variant='outlined' size='small'>
                      Manage
                    </Button>
                  </ListItem>
                  <Divider component='li' />
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary='SMS Notifications'
                      secondary='Receive text messages for order updates and important alerts'
                    />
                    <Button variant='outlined' size='small'>
                      Manage
                    </Button>
                  </ListItem>
                  <Divider component='li' />
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary='Newsletter'
                      secondary='Receive our weekly newsletter with health tips and product updates'
                    />
                    <Button variant='outlined' size='small'>
                      Manage
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleSnackbarClose}
          severity='success'
          sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
