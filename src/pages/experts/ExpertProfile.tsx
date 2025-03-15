import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Divider,
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Tab,
  Tabs,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

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
      id={`expert-tabpanel-${index}`}
      aria-labelledby={`expert-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock expert data
const mockExpert = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  title: 'Nutritionist, PhD',
  specialties: [
    'Weight Management',
    'Sports Nutrition',
    'Gut Health',
    'Hormone Balance',
  ],
  rating: 4.8,
  reviewCount: 124,
  imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  availability: 'Available Today',
  bio: 'Dr. Sarah Johnson is a certified nutritionist with over 10 years of experience helping clients achieve their health goals through personalized nutrition plans and supplement recommendations. She specializes in gut health, hormone balance, and sports nutrition.',
  education: [
    'PhD in Nutritional Sciences, Stanford University',
    'Master of Science in Dietetics, UCLA',
    'Bachelor of Science in Biology, UC Berkeley',
  ],
  certifications: [
    'Certified Nutrition Specialist (CNS)',
    'Board Certified in Holistic Nutrition',
    'Sports Nutrition Certification',
  ],
  expertise: [
    'Personalized nutrition planning',
    'Supplement protocol development',
    'Gut microbiome optimization',
    'Hormone balance',
    'Sports performance nutrition',
    'Weight management strategies',
  ],
  consultationTypes: [
    {
      id: 'initial',
      name: 'Initial Consultation',
      duration: '60 min',
      price: 150,
    },
    {
      id: 'followup',
      name: 'Follow-up Session',
      duration: '30 min',
      price: 85,
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Health Plan',
      duration: '90 min',
      price: 225,
    },
  ],
  reviews: [
    {
      id: '1',
      author: 'Michael T.',
      rating: 5,
      date: '2 weeks ago',
      content:
        'Dr. Johnson provided excellent guidance on supplements for my specific health concerns. Her recommendations have made a noticeable difference in my energy levels and overall wellbeing.',
    },
    {
      id: '2',
      author: 'Jennifer L.',
      rating: 5,
      date: '1 month ago',
      content:
        "I've been struggling with digestive issues for years. Dr. Johnson created a personalized supplement plan that has significantly improved my symptoms. Highly recommend!",
    },
    {
      id: '3',
      author: 'Robert K.',
      rating: 4,
      date: '2 months ago',
      content:
        'Very knowledgeable about sports nutrition. The supplement protocol she designed helped improve my recovery time and performance.',
    },
  ],
};

const ExpertProfile: React.FC = () => {
  const { expertId } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');

  // In a real app, you would fetch the expert data based on expertId
  useEffect(() => {
    // Simulating API call to fetch expert data
    console.log(`Fetching expert data for ID: ${expertId}`);
    // setExpert(fetchedExpert);
  }, [expertId]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConsultationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedConsultation(event.target.value as string);
  };

  const handleBookConsultation = () => {
    // In a real app, you would submit the booking request to your backend
    console.log('Booking consultation:', {
      expertId,
      consultationType: selectedConsultation,
      preferredDate,
      preferredTime,
      notes,
    });

    // Close the dialog and navigate to a confirmation page or chat
    handleCloseDialog();
    navigate(`/consultations/chat/new-${Date.now()}`); // In a real app, this would be the actual consultation ID
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {/* Expert Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} md={2}>
            <Avatar
              src={mockExpert.imageUrl}
              alt={mockExpert.name}
              sx={{ width: 120, height: 120, mx: 'auto' }}
            />
          </Grid>

          <Grid item xs={12} sm={9} md={7}>
            <Typography variant='h4' component='h1' gutterBottom>
              {mockExpert.name}
            </Typography>

            <Typography variant='h6' color='text.secondary' gutterBottom>
              {mockExpert.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={mockExpert.rating} precision={0.1} readOnly />
              <Typography variant='body2' sx={{ ml: 1 }}>
                {mockExpert.rating} ({mockExpert.reviewCount} reviews)
              </Typography>
              <Chip
                icon={<VerifiedUserIcon />}
                label='Verified Expert'
                color='primary'
                size='small'
                sx={{ ml: 2 }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              {mockExpert.specialties.map((specialty, index) => (
                <Chip key={index} label={specialty} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>

            <Chip
              icon={<EventAvailableIcon />}
              label={mockExpert.availability}
              color='success'
              variant='outlined'
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-end' },
            }}>
            <Button
              variant='contained'
              size='large'
              onClick={handleOpenDialog}
              sx={{ minWidth: 200 }}>
              Book Consultation
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs Section */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label='expert profile tabs'
            variant='scrollable'
            scrollButtons='auto'>
            <Tab
              label='About'
              id='expert-tab-0'
              aria-controls='expert-tabpanel-0'
            />
            <Tab
              label='Expertise'
              id='expert-tab-1'
              aria-controls='expert-tabpanel-1'
            />
            <Tab
              label='Consultation Options'
              id='expert-tab-2'
              aria-controls='expert-tabpanel-2'
            />
            <Tab
              label='Reviews'
              id='expert-tab-3'
              aria-controls='expert-tabpanel-3'
            />
          </Tabs>
        </Box>

        {/* About Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant='h6' gutterBottom>
                Biography
              </Typography>
              <Typography variant='body1' paragraph>
                {mockExpert.bio}
              </Typography>

              <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
                Education
              </Typography>
              <List>
                {mockExpert.education.map((edu, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon>
                      <SchoolIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary={edu} />
                  </ListItem>
                ))}
              </List>

              <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
                Certifications
              </Typography>
              <List>
                {mockExpert.certifications.map((cert, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon>
                      <VerifiedUserIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary={cert} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    Why Choose Me
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color='success' />
                      </ListItemIcon>
                      <ListItemText primary='Personalized supplement recommendations' />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color='success' />
                      </ListItemIcon>
                      <ListItemText primary='Evidence-based approach' />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color='success' />
                      </ListItemIcon>
                      <ListItemText primary='10+ years of clinical experience' />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color='success' />
                      </ListItemIcon>
                      <ListItemText primary='Ongoing support between sessions' />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color='success' />
                      </ListItemIcon>
                      <ListItemText primary='Holistic health perspective' />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Expertise Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant='h6' gutterBottom>
            Areas of Expertise
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {mockExpert.expertise.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <StarIcon color='primary' sx={{ mr: 1, mt: 0.5 }} />
                      <Typography variant='body1'>{item}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
            How I Can Help You
          </Typography>

          <Typography variant='body1' paragraph>
            As a nutrition expert specializing in supplement recommendations, I
            can help you navigate the complex world of supplements to find the
            right options for your specific health needs. My approach combines
            scientific research with personalized assessment to create targeted
            supplement protocols that complement your diet and lifestyle.
          </Typography>

          <Typography variant='body1' paragraph>
            Whether you're looking to improve your energy levels, support gut
            health, optimize athletic performance, or address specific health
            concerns, I'll work with you to develop a comprehensive plan that
            includes high-quality supplement recommendations along with dietary
            and lifestyle strategies.
          </Typography>
        </TabPanel>

        {/* Consultation Options Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant='h6' gutterBottom>
            Consultation Options
          </Typography>

          <Grid container spacing={3}>
            {mockExpert.consultationTypes.map((consultation) => (
              <Grid item xs={12} sm={6} md={4} key={consultation.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      {consultation.name}
                    </Typography>

                    <Typography
                      variant='body2'
                      color='text.secondary'
                      gutterBottom>
                      Duration: {consultation.duration}
                    </Typography>

                    <Typography variant='h6' color='primary' sx={{ mb: 2 }}>
                      ${consultation.price}
                    </Typography>

                    <Button
                      variant='outlined'
                      fullWidth
                      onClick={handleOpenDialog}>
                      Select
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant='h6' gutterBottom>
              What to Expect
            </Typography>

            <Typography variant='body1' paragraph>
              Before our consultation, you'll receive a health questionnaire to
              complete, which helps me understand your health history, current
              concerns, and goals. During our session, we'll discuss your
              specific needs and I'll provide personalized recommendations for
              supplements and nutrition strategies.
            </Typography>

            <Typography variant='body1'>
              After our consultation, you'll receive a detailed summary of our
              discussion, including specific supplement recommendations,
              dosages, and any additional resources to support your health
              journey.
            </Typography>
          </Box>
        </TabPanel>

        {/* Reviews Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant='h6'>Client Reviews</Typography>
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
              <Rating value={mockExpert.rating} precision={0.1} readOnly />
              <Typography variant='body2' sx={{ ml: 1 }}>
                {mockExpert.rating} out of 5 ({mockExpert.reviewCount} reviews)
              </Typography>
            </Box>
          </Box>

          {mockExpert.reviews.map((review) => (
            <Paper key={review.id} sx={{ p: 3, mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {review.author}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {review.date}
                </Typography>
              </Box>

              <Rating
                value={review.rating}
                readOnly
                size='small'
                sx={{ mb: 1 }}
              />

              <Typography variant='body1'>{review.content}</Typography>
            </Paper>
          ))}
        </TabPanel>
      </Box>

      {/* Booking Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='sm'
        fullWidth>
        <DialogTitle>Book a Consultation</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Please select your preferred consultation type and time to schedule
            with {mockExpert.name}.
          </DialogContentText>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id='consultation-type-label'>
              Consultation Type
            </InputLabel>
            <Select
              labelId='consultation-type-label'
              id='consultation-type'
              value={selectedConsultation}
              label='Consultation Type'
              onChange={handleConsultationChange as any}>
              {mockExpert.consultationTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name} ({type.duration}) - ${type.price}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Preferred Date'
                type='date'
                value={preferredDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPreferredDate(e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Preferred Time'
                type='time'
                value={preferredTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPreferredTime(e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label='Notes or Questions'
            multiline
            rows={4}
            value={notes}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNotes(e.target.value)
            }
            placeholder="Please share any specific concerns or questions you'd like to discuss during the consultation."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleBookConsultation}
            variant='contained'
            disabled={
              !selectedConsultation || !preferredDate || !preferredTime
            }>
            Book Now
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExpertProfile;
