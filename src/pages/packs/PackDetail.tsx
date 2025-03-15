import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Card,
  CardContent,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
      id={`pack-tabpanel-${index}`}
      aria-labelledby={`pack-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock data for a supplement pack
const mockPack = {
  id: '1',
  name: 'Energy & Focus Pack',
  description:
    'Boost your energy levels and mental clarity with this carefully formulated supplement pack.',
  longDescription:
    'Our Energy & Focus Pack is designed to help you maintain optimal energy levels throughout the day while supporting mental clarity and focus. This comprehensive formula combines key nutrients, adaptogens, and nootropics that work synergistically to combat fatigue, enhance cognitive function, and promote sustained energy without the crash associated with caffeine or stimulants.',
  benefits: [
    'Increased Energy',
    'Mental Clarity',
    'Reduced Fatigue',
    'Improved Focus',
    'Stress Adaptation',
  ],
  rating: 4.7,
  reviewCount: 156,
  price: 89.99,
  imageUrl:
    'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  isPopular: true,
  category: 'Energy',
  ingredients: [
    {
      name: 'Vitamin B Complex',
      amount: '50mg',
      description:
        'Essential B vitamins that support energy production and cognitive function.',
    },
    {
      name: 'Rhodiola Rosea',
      amount: '300mg',
      description:
        'An adaptogen that helps the body resist physical and mental stress while combating fatigue.',
    },
    {
      name: 'L-Theanine',
      amount: '200mg',
      description:
        'Promotes relaxation without drowsiness and helps maintain focus.',
    },
    {
      name: 'Coenzyme Q10',
      amount: '100mg',
      description:
        'Supports cellular energy production and acts as an antioxidant.',
    },
    {
      name: 'Ashwagandha Extract',
      amount: '250mg',
      description:
        'Helps the body manage stress and supports overall energy levels.',
    },
  ],
  directions:
    'Take 2 capsules in the morning with food. For enhanced results, take an additional capsule in the early afternoon. Do not exceed 4 capsules in a 24-hour period.',
  reviews: [
    {
      id: '1',
      author: 'Michael T.',
      rating: 5,
      date: '2 weeks ago',
      content:
        'This supplement pack has made a noticeable difference in my energy levels throughout the day. I no longer experience that mid-afternoon crash, and my focus has improved significantly.',
    },
    {
      id: '2',
      author: 'Jennifer L.',
      rating: 4,
      date: '1 month ago',
      content:
        "I've been taking this for about 3 weeks now and can definitely feel the difference. My energy is more consistent and I'm more productive at work.",
    },
    {
      id: '3',
      author: 'Robert K.',
      rating: 5,
      date: '2 months ago',
      content:
        'Great product! I appreciate that it gives me energy without the jitters I used to get from coffee. Will definitely purchase again.',
    },
  ],
  faqs: [
    {
      question: 'How long does it take to see results?',
      answer:
        'Most users report feeling a difference in energy levels within 1-2 weeks of consistent use. However, individual results may vary depending on factors such as diet, lifestyle, and overall health status.',
    },
    {
      question: 'Can I take this with other supplements?',
      answer:
        'This pack is designed to be comprehensive, but it can generally be taken with other supplements. However, we recommend consulting with a healthcare professional if you are taking multiple supplements to avoid any potential nutrient overlaps or interactions.',
    },
    {
      question: 'Is this product suitable for vegetarians/vegans?',
      answer:
        'Yes, this product is formulated with vegetarian capsules and does not contain any animal-derived ingredients, making it suitable for both vegetarians and vegans.',
    },
  ],
  relatedPacks: [
    {
      id: '4',
      name: 'Sleep & Recovery Formula',
      price: 69.99,
      imageUrl:
        'https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: '2',
      name: 'Gut Health Essentials',
      price: 79.99,
      imageUrl:
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ],
};

const PackDetail: React.FC = () => {
  const { packId } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // In a real app, you would fetch the pack data based on packId
  useEffect(() => {
    // Simulating API call to fetch pack data
    console.log(`Fetching pack data for ID: ${packId}`);
    // setPack(fetchedPack);
  }, [packId]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // In a real app, you would add the item to the cart
    console.log(`Adding ${quantity} of pack ${packId} to cart`);

    setSnackbarMessage(
      `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart`
    );
    setSnackbarOpen(true);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);

    setSnackbarMessage(
      isFavorite ? 'Removed from your favorites' : 'Added to your favorites'
    );
    setSnackbarOpen(true);
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

  const handleRelatedPackClick = (relatedPackId: string) => {
    navigate(`/packs/${relatedPackId}`);
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
        sx={{ mb: 3 }}>
        <Link
          color='inherit'
          href='#'
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            navigate('/');
          }}>
          Home
        </Link>
        <Link
          color='inherit'
          href='#'
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            navigate('/packs');
          }}>
          Supplement Packs
        </Link>
        <Typography color='text.primary'>{mockPack.name}</Typography>
      </Breadcrumbs>

      {/* Product Overview */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              mb: 2,
            }}>
            <Box
              component='img'
              src={mockPack.imageUrl}
              alt={mockPack.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant='h4' component='h1' gutterBottom>
            {mockPack.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={mockPack.rating} precision={0.1} readOnly />
            <Typography variant='body2' sx={{ ml: 1 }}>
              {mockPack.rating} ({mockPack.reviewCount} reviews)
            </Typography>
          </Box>

          <Typography variant='h5' color='primary' gutterBottom>
            ${mockPack.price.toFixed(2)}
          </Typography>

          <Typography variant='body1' paragraph>
            {mockPack.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            {mockPack.benefits.map((benefit, index) => (
              <Chip key={index} label={benefit} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant='subtitle1' sx={{ mr: 2 }}>
              Quantity:
            </Typography>
            <IconButton
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}>
              <RemoveIcon />
            </IconButton>
            <TextField
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{
                min: 1,
                max: 10,
                style: { textAlign: 'center' },
              }}
              sx={{ width: 60 }}
            />
            <IconButton
              onClick={handleIncreaseQuantity}
              disabled={quantity >= 10}>
              <AddIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant='contained'
              size='large'
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{ flex: 1 }}>
              Add to Cart
            </Button>
            <Button
              variant='outlined'
              size='large'
              onClick={handleToggleFavorite}
              startIcon={
                isFavorite ? (
                  <FavoriteIcon color='error' />
                ) : (
                  <FavoriteBorderIcon />
                )
              }>
              {isFavorite ? 'Saved' : 'Save'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ width: '100%', mt: 6 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label='pack detail tabs'
            variant='scrollable'
            scrollButtons='auto'>
            <Tab
              label='Details'
              id='pack-tab-0'
              aria-controls='pack-tabpanel-0'
            />
            <Tab
              label='Ingredients'
              id='pack-tab-1'
              aria-controls='pack-tabpanel-1'
            />
            <Tab
              label='Reviews'
              id='pack-tab-2'
              aria-controls='pack-tabpanel-2'
            />
            <Tab label='FAQs' id='pack-tab-3' aria-controls='pack-tabpanel-3' />
          </Tabs>
        </Box>

        {/* Details Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant='h6' gutterBottom>
            Product Description
          </Typography>
          <Typography variant='body1' paragraph>
            {mockPack.longDescription}
          </Typography>

          <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
            Benefits
          </Typography>
          <List>
            {mockPack.benefits.map((benefit, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  <CheckCircleIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary={benefit} />
              </ListItem>
            ))}
          </List>

          <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
            Directions for Use
          </Typography>
          <Typography variant='body1' paragraph>
            {mockPack.directions}
          </Typography>
        </TabPanel>

        {/* Ingredients Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant='h6' gutterBottom>
            Ingredients
          </Typography>
          <Typography variant='body2' paragraph>
            Each serving contains:
          </Typography>

          {mockPack.ingredients.map((ingredient, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Typography variant='subtitle1' fontWeight='bold'>
                {ingredient.name} ({ingredient.amount})
              </Typography>
              <Typography variant='body2'>{ingredient.description}</Typography>
            </Paper>
          ))}

          <Box
            sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant='subtitle1' gutterBottom>
              Quality Assurance
            </Typography>
            <Typography variant='body2'>
              All our supplements are manufactured in a GMP-certified facility
              and undergo rigorous testing for purity and potency. We source the
              highest quality ingredients and avoid unnecessary fillers,
              artificial colors, or preservatives.
            </Typography>
          </Box>
        </TabPanel>

        {/* Reviews Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant='h6'>Customer Reviews</Typography>
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
              <Rating value={mockPack.rating} precision={0.1} readOnly />
              <Typography variant='body2' sx={{ ml: 1 }}>
                {mockPack.rating} out of 5 ({mockPack.reviewCount} reviews)
              </Typography>
            </Box>
          </Box>

          {mockPack.reviews.map((review) => (
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

        {/* FAQs Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant='h6' gutterBottom>
            Frequently Asked Questions
          </Typography>

          {mockPack.faqs.map((faq, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
                {faq.question}
              </Typography>
              <Typography variant='body1'>{faq.answer}</Typography>
              {index < mockPack.faqs.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </TabPanel>
      </Box>

      {/* Related Products */}
      <Box sx={{ mt: 6 }}>
        <Typography variant='h5' gutterBottom>
          You May Also Like
        </Typography>

        <Grid container spacing={3}>
          {mockPack.relatedPacks.map((relatedPack) => (
            <Grid item xs={12} sm={6} md={3} key={relatedPack.id}>
              <Card sx={{ height: '100%' }}>
                <Box
                  sx={{
                    height: 200,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleRelatedPackClick(relatedPack.id)}>
                  <Box
                    component='img'
                    src={relatedPack.imageUrl}
                    alt={relatedPack.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography variant='subtitle1' gutterBottom>
                    {relatedPack.name}
                  </Typography>
                  <Typography variant='h6' color='primary'>
                    ${relatedPack.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

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

export default PackDetail;
