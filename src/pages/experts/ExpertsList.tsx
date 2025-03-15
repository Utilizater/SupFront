import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Rating,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

// Mock data for experts
const mockExperts = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Nutritionist, PhD',
    specialties: ['Weight Management', 'Sports Nutrition', 'Gut Health'],
    rating: 4.8,
    reviewCount: 124,
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    availability: 'Available Today',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'Functional Medicine, MD',
    specialties: ['Hormone Balance', 'Autoimmune Conditions', 'Detoxification'],
    rating: 4.9,
    reviewCount: 98,
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    availability: 'Available Tomorrow',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    title: 'Holistic Health Coach',
    specialties: [
      'Stress Management',
      'Sleep Optimization',
      'Plant-Based Nutrition',
    ],
    rating: 4.7,
    reviewCount: 87,
    imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    availability: 'Available Today',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    title: 'Naturopathic Doctor',
    specialties: ['Digestive Health', 'Immune Support', 'Natural Medicine'],
    rating: 4.6,
    reviewCount: 112,
    imageUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
    availability: 'Next Week',
  },
  {
    id: '5',
    name: 'Dr. Lisa Patel',
    title: 'Integrative Medicine, MD',
    specialties: ["Women's Health", 'Longevity', 'Metabolic Health'],
    rating: 4.9,
    reviewCount: 156,
    imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    availability: 'Available Tomorrow',
  },
  {
    id: '6',
    name: 'Robert Thompson',
    title: 'Sports Nutrition Specialist',
    specialties: ['Athletic Performance', 'Recovery', 'Supplement Protocols'],
    rating: 4.7,
    reviewCount: 92,
    imageUrl: 'https://randomuser.me/api/portraits/men/64.jpg',
    availability: 'Available Today',
  },
];

const ExpertsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [availability, setAvailability] = useState('');
  const [page, setPage] = useState(1);

  // Filter experts based on search criteria
  const filteredExperts = mockExperts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialties.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSpecialty =
      specialty === '' ||
      expert.specialties.some((s) =>
        s.toLowerCase().includes(specialty.toLowerCase())
      );

    const matchesAvailability =
      availability === '' ||
      expert.availability.toLowerCase().includes(availability.toLowerCase());

    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  const handleExpertClick = (expertId: string) => {
    navigate(`/consultations/${expertId}`);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // For pagination
  const expertsPerPage = 4;
  const pageCount = Math.ceil(filteredExperts.length / expertsPerPage);
  const displayedExperts = filteredExperts.slice(
    (page - 1) * expertsPerPage,
    page * expertsPerPage
  );

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Expert Consultations
      </Typography>

      <Typography variant='body1' paragraph>
        Connect with our certified health experts for personalized guidance on
        supplements, nutrition, and wellness strategies tailored to your
        specific needs.
      </Typography>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder='Search by name, specialty, or expertise...'
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id='specialty-select-label'>Specialty</InputLabel>
              <Select
                labelId='specialty-select-label'
                id='specialty-select'
                value={specialty}
                label='Specialty'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSpecialty(e.target.value as string)
                }>
                <MenuItem value=''>All Specialties</MenuItem>
                <MenuItem value='Weight'>Weight Management</MenuItem>
                <MenuItem value='Nutrition'>Nutrition</MenuItem>
                <MenuItem value='Hormone'>Hormone Health</MenuItem>
                <MenuItem value='Gut'>Digestive Health</MenuItem>
                <MenuItem value='Sleep'>Sleep</MenuItem>
                <MenuItem value='Stress'>Stress Management</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id='availability-select-label'>
                Availability
              </InputLabel>
              <Select
                labelId='availability-select-label'
                id='availability-select'
                value={availability}
                label='Availability'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAvailability(e.target.value as string)
                }>
                <MenuItem value=''>Any Availability</MenuItem>
                <MenuItem value='Today'>Available Today</MenuItem>
                <MenuItem value='Tomorrow'>Available Tomorrow</MenuItem>
                <MenuItem value='Week'>This Week</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Experts Grid */}
      <Grid container spacing={3}>
        {displayedExperts.length > 0 ? (
          displayedExperts.map((expert) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={expert.id}>
              <Card sx={{ display: 'flex', height: '100%' }}>
                <CardActionArea onClick={() => handleExpertClick(expert.id)}>
                  <Box sx={{ display: 'flex', height: '100%' }}>
                    <CardMedia
                      component='img'
                      sx={{ width: 140, display: { xs: 'none', sm: 'block' } }}
                      image={expert.imageUrl}
                      alt={expert.name}
                    />
                    <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
                      <Typography variant='h6' component='div'>
                        {expert.name}
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        color='text.secondary'
                        gutterBottom>
                        {expert.title}
                      </Typography>

                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating
                          value={expert.rating}
                          precision={0.1}
                          readOnly
                          size='small'
                        />
                        <Typography variant='body2' sx={{ ml: 1 }}>
                          {expert.rating} ({expert.reviewCount} reviews)
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 1.5 }}>
                        {expert.specialties.map((specialty, index) => (
                          <Chip
                            key={index}
                            label={specialty}
                            size='small'
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>

                      <Chip
                        label={expert.availability}
                        color={
                          expert.availability.includes('Today')
                            ? 'success'
                            : 'primary'
                        }
                        size='small'
                        variant='outlined'
                      />
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant='h6'>
                No experts found matching your criteria
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Try adjusting your search or filters
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Pagination */}
      {filteredExperts.length > expertsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color='primary'
          />
        </Box>
      )}
    </Container>
  );
};

export default ExpertsList;
