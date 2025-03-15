import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

// Mock order data
const mockOrderData = {
  items: [
    {
      id: '1',
      name: 'Energy & Focus Pack',
      description:
        'Boost your energy levels and mental clarity with this carefully formulated supplement pack.',
      price: 89.99,
      quantity: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: '2',
      name: 'Gut Health Essentials',
      description:
        'Support your digestive system and microbiome with this comprehensive gut health pack.',
      price: 79.99,
      quantity: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ],
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
  },
  shipping: {
    address: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
      country: 'United States',
    },
    method: 'Standard Shipping',
    cost: 0,
    estimatedDelivery: '3-5 business days',
  },
  payment: {
    method: 'Credit Card',
    cardLast4: '4242',
  },
  pricing: {
    subtotal: 249.97,
    shipping: 0,
    tax: 17.5,
    total: 267.47,
  },
  date: new Date().toISOString(),
  status: 'Processing',
};

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Simulate fetching order data
  useEffect(() => {
    // In a real app, you would fetch the order data from your backend
    const fetchOrderData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Set mock data with the actual orderId from URL
        setOrderData({
          ...mockOrderData,
          id: orderId,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching order data:', error);
        setSnackbarMessage('Failed to load order details. Please try again.');
        setSnackbarOpen(true);
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const handleContinueShopping = () => {
    navigate('/packs');
  };

  const handleViewOrders = () => {
    navigate('/profile/orders');
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

  // Format date string to more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <Container maxWidth='md' sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant='h6' sx={{ mt: 3 }}>
          Loading order details...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Paper elevation={1} sx={{ p: 4, textAlign: 'center', mb: 4 }}>
        <CheckCircleIcon color='success' sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant='h4' component='h1' gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant='h6' color='text.secondary' gutterBottom>
          Thank you for your purchase
        </Typography>
        <Typography variant='body1' paragraph>
          Your order #{orderId} has been placed and is being processed.
        </Typography>
        <Typography variant='body1'>
          A confirmation email has been sent to{' '}
          <strong>{orderData.customer.email}</strong>
        </Typography>
      </Paper>

      {/* Order Details */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ReceiptIcon sx={{ mr: 1 }} />
          <Typography variant='h6'>Order Details</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='text.secondary'>
              Order Number
            </Typography>
            <Typography variant='body1' gutterBottom>
              {orderId}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='text.secondary'>
              Order Date
            </Typography>
            <Typography variant='body1' gutterBottom>
              {formatDate(orderData.date)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='text.secondary'>
              Payment Method
            </Typography>
            <Typography variant='body1' gutterBottom>
              {orderData.payment.method} ending in {orderData.payment.cardLast4}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='text.secondary'>
              Order Status
            </Typography>
            <Typography variant='body1' gutterBottom>
              {orderData.status}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Order Items */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant='h6' gutterBottom>
          Order Items
        </Typography>

        <List disablePadding>
          {orderData.items.map((item: any) => (
            <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <CardMedia
                  component='img'
                  sx={{ width: 80, height: 80, objectFit: 'cover', mr: 2 }}
                  image={item.imageUrl}
                  alt={item.name}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant='subtitle1'>{item.name}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Qty: {item.quantity}
                  </Typography>
                </Box>
                <Typography variant='subtitle1'>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            </ListItem>
          ))}

          <Divider sx={{ my: 2 }} />

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary='Subtotal' />
            <Typography variant='body1'>
              ${orderData.pricing.subtotal.toFixed(2)}
            </Typography>
          </ListItem>

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary='Shipping'
              secondary={orderData.shipping.method}
            />
            <Typography variant='body1'>
              {orderData.pricing.shipping === 0
                ? 'Free'
                : `$${orderData.pricing.shipping.toFixed(2)}`}
            </Typography>
          </ListItem>

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary='Tax' />
            <Typography variant='body1'>
              ${orderData.pricing.tax.toFixed(2)}
            </Typography>
          </ListItem>

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary='Total' />
            <Typography variant='subtitle1' fontWeight='bold'>
              ${orderData.pricing.total.toFixed(2)}
            </Typography>
          </ListItem>
        </List>
      </Paper>

      {/* Shipping Information */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalShippingIcon sx={{ mr: 1 }} />
              <Typography variant='h6'>Shipping Information</Typography>
            </Box>

            <Typography variant='body1'>
              {orderData.customer.firstName} {orderData.customer.lastName}
            </Typography>
            <Typography variant='body2'>
              {orderData.shipping.address.street}
            </Typography>
            <Typography variant='body2'>
              {orderData.shipping.address.city},{' '}
              {orderData.shipping.address.state}{' '}
              {orderData.shipping.address.zipCode}
            </Typography>
            <Typography variant='body2' gutterBottom>
              {orderData.shipping.address.country}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant='subtitle2' color='text.secondary'>
              Shipping Method
            </Typography>
            <Typography variant='body1'>{orderData.shipping.method}</Typography>
            <Typography variant='body2' color='text.secondary'>
              Estimated delivery: {orderData.shipping.estimatedDelivery}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant='h6'>What's Next?</Typography>
            </Box>

            <Typography variant='body1' paragraph>
              We're preparing your order for shipment. You'll receive an email
              notification when your order ships with tracking information.
            </Typography>

            <Stepper activeStep={0} orientation='vertical' sx={{ mt: 3 }}>
              <Step>
                <StepLabel>Order Placed</StepLabel>
              </Step>
              <Step>
                <StepLabel>Processing</StepLabel>
              </Step>
              <Step>
                <StepLabel>Shipped</StepLabel>
              </Step>
              <Step>
                <StepLabel>Delivered</StepLabel>
              </Step>
            </Stepper>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
        <Button
          variant='outlined'
          startIcon={<HomeIcon />}
          onClick={handleContinueShopping}>
          Continue Shopping
        </Button>
        <Button
          variant='contained'
          startIcon={<ShoppingBagIcon />}
          onClick={handleViewOrders}>
          View My Orders
        </Button>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleSnackbarClose}
          severity='error'
          sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OrderConfirmation;
