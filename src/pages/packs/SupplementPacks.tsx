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
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Mock data for supplement packs
const mockPacks = [
  {
    id: '1',
    name: 'Energy & Focus Pack',
    description:
      'Boost your energy levels and mental clarity with this carefully formulated supplement pack.',
    benefits: ['Increased Energy', 'Mental Clarity', 'Reduced Fatigue'],
    rating: 4.7,
    reviewCount: 156,
    price: 89.99,
    imageUrl:
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isPopular: true,
    category: 'Energy',
  },
  {
    id: '2',
    name: 'Gut Health Essentials',
    description:
      'Support your digestive system and microbiome with this comprehensive gut health pack.',
    benefits: ['Digestive Support', 'Microbiome Balance', 'Reduced Bloating'],
    rating: 4.8,
    reviewCount: 132,
    price: 79.99,
    imageUrl:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isPopular: true,
    category: 'Digestive Health',
  },
  {
    id: '3',
    name: 'Immune Defense Pack',
    description:
      'Strengthen your immune system with this powerful combination of immune-supporting supplements.',
    benefits: ['Immune Support', 'Antioxidant Protection', 'Seasonal Wellness'],
    rating: 4.9,
    reviewCount: 178,
    price: 94.99,
    imageUrl:
      'https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isPopular: false,
    category: 'Immune Support',
  },
  {
    id: '4',
    name: 'Sleep & Recovery Formula',
    description:
      'Improve your sleep quality and recovery with this specialized supplement pack.',
    benefits: ['Better Sleep', 'Faster Recovery', 'Stress Reduction'],
    rating: 4.6,
    reviewCount: 112,
    price: 69.99,
    imageUrl:
      'https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isPopular: false,
    category: 'Sleep',
  },
  {
    id: '5',
    name: 'Hormone Balance Support',
    description:
      'Support healthy hormone levels and balance with this targeted supplement pack.',
    benefits: ['Hormone Balance', 'Mood Support', 'Energy Regulation'],
    rating: 4.8,
    reviewCount: 98,
    price: 84.99,
    imageUrl:
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isPopular: false,
    category: 'Hormonal Health',
  },
  {
    id: '6',
    name: 'Athletic Performance Pack',
    description:
      'Enhance your athletic performance and recovery with this sports-focused supplement pack.',
    benefits: [
      'Performance Enhancement',
      'Muscle Recovery',
      'Endurance Support',
    ],
    rating: 4.7,
    reviewCount: 145,
    price: 99.99,
    imageUrl:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isPopular: true,
    category: 'Sports Nutrition',
  },
];

// Categories for filtering
const categories = [
  'All Categories',
  'Energy',
  'Digestive Health',
  'Immune Support',
  'Sleep',
  'Hormonal Health',
  'Sports Nutrition',
];

const SupplementPacks: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('popularity');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter packs based on search criteria
  const filteredPacks = mockPacks.filter((pack) => {
    const matchesSearch =
      pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.benefits.some((benefit) =>
        benefit.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      category === 'All Categories' || pack.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort packs based on selected criteria
  const sortedPacks = [...filteredPacks].sort((a, b) => {
    if (sortBy === 'popularity') {
      return a.isPopular === b.isPopular ? 0 : a.isPopular ? -1 : 1;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'price_low') {
      return a.price - b.price;
    } else if (sortBy === 'price_high') {
      return b.price - a.price;
    }
    return 0;
  });

  const handlePackClick = (packId: string) => {
    navigate(`/packs/${packId}`);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleToggleFavorite = (
    packId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setFavorites((prev) =>
      prev.includes(packId)
        ? prev.filter((id) => id !== packId)
        : [...prev, packId]
    );
  };

  // For pagination
  const packsPerPage = 6;
  const pageCount = Math.ceil(sortedPacks.length / packsPerPage);
  const displayedPacks = sortedPacks.slice(
    (page - 1) * packsPerPage,
    page * packsPerPage
  );

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Supplement Packs
      </Typography>

      <Typography variant='body1' paragraph>
        Discover our expertly formulated supplement packs designed to address
        specific health needs and goals. Each pack contains a carefully selected
        combination of high-quality supplements that work synergistically.
      </Typography>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder='Search supplement packs...'
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

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id='category-select-label'>Category</InputLabel>
              <Select
                labelId='category-select-label'
                id='category-select'
                value={category}
                label='Category'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value as string)
                }>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id='sort-select-label'>Sort By</InputLabel>
              <Select
                labelId='sort-select-label'
                id='sort-select'
                value={sortBy}
                label='Sort By'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSortBy(e.target.value as string)
                }>
                <MenuItem value='popularity'>Popularity</MenuItem>
                <MenuItem value='rating'>Highest Rated</MenuItem>
                <MenuItem value='price_low'>Price: Low to High</MenuItem>
                <MenuItem value='price_high'>Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Supplement Packs Grid */}
      <Grid container spacing={3}>
        {displayedPacks.length > 0 ? (
          displayedPacks.map((pack) => (
            <Grid item xs={12} sm={6} md={4} key={pack.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <CardActionArea onClick={() => handlePackClick(pack.id)}>
                  <CardMedia
                    component='img'
                    height='200'
                    image={pack.imageUrl}
                    alt={pack.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}>
                      <Typography variant='h6' component='div' gutterBottom>
                        {pack.name}
                      </Typography>
                      <Button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleToggleFavorite(pack.id, e)
                        }
                        sx={{ minWidth: 'auto', p: 0.5 }}>
                        {favorites.includes(pack.id) ? (
                          <FavoriteIcon color='error' />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </Button>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating
                        value={pack.rating}
                        precision={0.1}
                        readOnly
                        size='small'
                      />
                      <Typography variant='body2' sx={{ ml: 1 }}>
                        {pack.rating} ({pack.reviewCount})
                      </Typography>
                    </Box>

                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mb: 2 }}>
                      {pack.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      {pack.benefits.map((benefit, index) => (
                        <Chip
                          key={index}
                          label={benefit}
                          size='small'
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Typography variant='h6' color='primary'>
                        ${pack.price.toFixed(2)}
                      </Typography>
                      {pack.isPopular && (
                        <Chip label='Popular' color='secondary' size='small' />
                      )}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant='h6'>
                No supplement packs found matching your criteria
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Try adjusting your search or filters
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Pagination */}
      {filteredPacks.length > packsPerPage && (
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

export default SupplementPacks;
