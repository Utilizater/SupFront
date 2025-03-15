import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
  Button,
  Stepper,
  Step,
  StepLabel,
  Chip,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Breadcrumbs,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextField,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RepeatIcon from '@mui/icons-material/Repeat';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Mock order data
const mockOrder = {
  id: 'ORD-2025-1001',
  date: '2025-03-10',
  total: 89.99,
  subtotal: 79.99,
  shipping: 5.0,
  tax: 5.0,
  status: 'Delivered',
  deliveryDate: '2025-03-15',
  trackingNumber: 'TRK123456789',
  carrier: 'FedEx',
  paymentMethod: 'Visa ending in 4242',
  items: [
    {
      id: '1',
      name: 'Energy & Focus Pack',
      description:
        'Boost your energy levels and mental clarity with this carefully formulated supplement pack.',
      quantity: 1,
      price: 89.99,
      imageUrl:
        'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ],
  shippingAddress: {
    name: 'John Doe',
    street: '123 Main St',
    city: 'Boston',
    state: 'MA',
    zipCode: '02108',
    country: 'United States',
  },
  billingAddress: {
    name: 'John Doe',
    street: '123 Main St',
    city: 'Boston',
    state: 'MA',
    zipCode: '02108',
    country: 'United States',
  },
  timeline: [
    {
      status: 'Order Placed',
      date: '2025-03-10T10:30:00',
      description: 'Your order has been received and is being processed.',
    },
    {
      status: 'Payment Confirmed',
      date: '2025-03-10T10:35:00',
      description: 'Payment has been successfully processed.',
    },
    {
      status: 'Order Processed',
      date: '2025-03-11T09:15:00',
      description:
        'Your order has been processed and is being prepared for shipping.',
    },
    {
      status: 'Shipped',
      date: '2025-03-12T14:20:00',
      description:
        'Your order has been shipped. Tracking information has been provided.',
    },
    {
      status: 'Delivered',
      date: '2025-03-15T11:45:00',
      description: 'Your order has been delivered.',
    },
  ],
};

const OrderDetail: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

  // In a real app, you would fetch the order data based on orderId
  useEffect(() => {
    // Simulating API call to fetch order data
    console.log(`Fetching order data for ID: ${orderId}`);
    // setOrder(fetchedOrder);
  }, [orderId]);

  const handleReviewDialogOpen = () => {
    setReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setReviewDialogOpen(false);
  };

  const handleSupportDialogOpen = () => {
    setSupportDialogOpen(true);
  };

  const handleSupportDialogClose = () => {
    setSupportDialogOpen(false);
  };

  const handleSubmitReview = () => {
    // In a real app, you would submit the review to your backend
    console.log('Submitting review:', {
      orderId,
      productId: mockOrder.items[0].id,
      rating,
      reviewText,
    });

    setReviewDialogOpen(false);
    // Reset form
    setRating(null);
    setReviewText('');
  };

  const handleSubmitSupport = () => {
    // In a real app, you would submit the support request to your backend
    console.log('Submitting support request:', {
      orderId,
      message: supportMessage,
    });

    setSupportDialogOpen(false);
    // Reset form
    setSupportMessage('');
  };

  const handleReorder = () => {
    // In a real app, you would add the items to the cart
    console.log('Reordering items from order:', orderId);
    navigate('/cart');
  };

  // Format date string to more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format datetime string to more readable format
  const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  // Get the current step for the stepper
  const getCurrentStep = () => {
    const statusMap: { [key: string]: number } = {
      'Order Placed': 0,
      'Payment Confirmed': 1,
      'Order Processed': 2,
      Shipped: 3,
      Delivered: 4,
    };

    const currentStatus =
      mockOrder.timeline[mockOrder.timeline.length - 1].status;
    return statusMap[currentStatus] || 0;
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
            navigate('/profile');
          }}>
          My Account
        </Link>
        <Link
          color='inherit'
          href='#'
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            navigate('/profile/orders');
          }}>
          Orders
        </Link>
        <Typography color='text.primary'>{mockOrder.id}</Typography>
      </Breadcrumbs>

      {/* Order Header */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' component='h1' gutterBottom>
              Order {mockOrder.id}
            </Typography>
            <Typography variant='body1'>
              Placed on {formatDate(mockOrder.date)}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Chip
              label={mockOrder.status}
              color={
                mockOrder.status === 'Delivered'
                  ? 'success'
                  : mockOrder.status === 'Shipped'
                  ? 'primary'
                  : 'warning'
              }
              sx={{ mb: 1, mr: 1 }}
            />

            <Box sx={{ mt: 1 }}>
              <Button
                variant='outlined'
                size='small'
                startIcon={<RepeatIcon />}
                onClick={handleReorder}
                sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}>
                Reorder
              </Button>
              <Button
                variant='outlined'
                size='small'
                startIcon={<HelpOutlineIcon />}
                onClick={handleSupportDialogOpen}>
                Need Help?
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Order Progress */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant='h6' gutterBottom>
          Order Progress
        </Typography>

        <Stepper activeStep={getCurrentStep()} alternativeLabel sx={{ mt: 3 }}>
          <Step>
            <StepLabel>Order Placed</StepLabel>
          </Step>
          <Step>
            <StepLabel>Payment Confirmed</StepLabel>
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

        <Box sx={{ mt: 4 }}>
          <Typography variant='subtitle1' gutterBottom>
            Order Timeline
          </Typography>

          <List>
            {mockOrder.timeline.map((event, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems='flex-start'>
                  <ListItemText
                    primary={event.status}
                    secondary={
                      <>
                        <Typography
                          component='span'
                          variant='body2'
                          color='text.primary'>
                          {formatDateTime(event.date)}
                        </Typography>
                        {' — '}
                        {event.description}
                      </>
                    }
                  />
                </ListItem>
                {index < mockOrder.timeline.length - 1 && (
                  <Divider component='li' />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>

        {mockOrder.status === 'Shipped' && (
          <Box
            sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography
              variant='subtitle1'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalShippingIcon sx={{ mr: 1 }} />
              Tracking Information
            </Typography>
            <Typography variant='body1'>
              Carrier: {mockOrder.carrier}
            </Typography>
            <Typography variant='body1'>
              Tracking Number: {mockOrder.trackingNumber}
            </Typography>
            <Button variant='outlined' size='small' sx={{ mt: 1 }}>
              Track Package
            </Button>
          </Box>
        )}
      </Paper>

      {/* Order Items */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant='h6' gutterBottom>
          Order Items
        </Typography>

        <List>
          {mockOrder.items.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem alignItems='flex-start' sx={{ py: 2 }}>
                <Card
                  sx={{ display: 'flex', width: '100%', boxShadow: 'none' }}>
                  <CardMedia
                    component='img'
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                    image={item.imageUrl}
                    alt={item.name}
                  />
                  <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Typography variant='subtitle1' component='div'>
                          {item.name}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{ mb: 1 }}>
                          {item.description}
                        </Typography>
                        <Typography variant='body2'>
                          Quantity: {item.quantity}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                        <Typography variant='subtitle1' component='div'>
                          ${item.price.toFixed(2)}
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant='outlined'
                            size='small'
                            onClick={handleReviewDialogOpen}
                            sx={{ mr: 1, mb: 1 }}>
                            Review
                          </Button>
                          <Button
                            variant='outlined'
                            size='small'
                            onClick={() => navigate(`/packs/${item.id}`)}>
                            Buy Again
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </ListItem>
              <Divider component='li' />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Order Summary */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
            <Typography variant='h6' gutterBottom>
              Shipping Information
            </Typography>

            <Typography variant='subtitle2' gutterBottom sx={{ mt: 2 }}>
              Shipping Address
            </Typography>
            <Typography variant='body1'>
              {mockOrder.shippingAddress.name}
            </Typography>
            <Typography variant='body1'>
              {mockOrder.shippingAddress.street}
            </Typography>
            <Typography variant='body1'>
              {mockOrder.shippingAddress.city},{' '}
              {mockOrder.shippingAddress.state}{' '}
              {mockOrder.shippingAddress.zipCode}
            </Typography>
            <Typography variant='body1'>
              {mockOrder.shippingAddress.country}
            </Typography>

            <Typography variant='subtitle2' gutterBottom sx={{ mt: 3 }}>
              Shipping Method
            </Typography>
            <Typography variant='body1'>Standard Shipping</Typography>

            {mockOrder.status === 'Delivered' && (
              <>
                <Typography variant='subtitle2' gutterBottom sx={{ mt: 3 }}>
                  Delivery Date
                </Typography>
                <Typography variant='body1'>
                  {formatDate(mockOrder.deliveryDate)}
                </Typography>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center' }}>
              <ReceiptIcon sx={{ mr: 1 }} />
              Payment Information
            </Typography>

            <Typography variant='subtitle2' gutterBottom sx={{ mt: 2 }}>
              Payment Method
            </Typography>
            <Typography variant='body1'>{mockOrder.paymentMethod}</Typography>

            <Typography variant='subtitle2' gutterBottom sx={{ mt: 3 }}>
              Billing Address
            </Typography>
            <Typography variant='body1'>
              {mockOrder.billingAddress.name}
            </Typography>
            <Typography variant='body1'>
              {mockOrder.billingAddress.street}
            </Typography>
            <Typography variant='body1'>
              {mockOrder.billingAddress.city}, {mockOrder.billingAddress.state}{' '}
              {mockOrder.billingAddress.zipCode}
            </Typography>
            <Typography variant='body1'>
              {mockOrder.billingAddress.country}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant='body1'>Subtotal:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography variant='body1'>
                  ${mockOrder.subtotal.toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant='body1'>Shipping:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography variant='body1'>
                  ${mockOrder.shipping.toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant='body1'>Tax:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography variant='body1'>
                  ${mockOrder.tax.toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant='subtitle1' fontWeight='bold'>
                  Total:
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography variant='subtitle1' fontWeight='bold'>
                  ${mockOrder.total.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Review Dialog */}
      <Dialog
        open={reviewDialogOpen}
        onClose={handleReviewDialogClose}
        maxWidth='sm'
        fullWidth>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Share your experience with {mockOrder.items[0].name}. Your feedback
            helps other customers make informed decisions.
          </DialogContentText>

          <Box
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Typography component='legend' gutterBottom>
              Your Rating
            </Typography>
            <Rating
              name='product-rating'
              value={rating}
              onChange={(
                _event: React.SyntheticEvent<Element, Event>,
                newValue: number | null
              ) => {
                setRating(newValue);
              }}
              size='large'
            />
          </Box>

          <TextField
            autoFocus
            margin='dense'
            id='review'
            label='Your Review'
            fullWidth
            multiline
            rows={4}
            value={reviewText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setReviewText(e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewDialogClose}>Cancel</Button>
          <Button
            onClick={handleSubmitReview}
            variant='contained'
            disabled={!rating || !reviewText.trim()}>
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>

      {/* Support Dialog */}
      <Dialog
        open={supportDialogOpen}
        onClose={handleSupportDialogClose}
        maxWidth='sm'
        fullWidth>
        <DialogTitle>Need Help with Your Order?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please describe the issue you're experiencing with your order, and
            our customer support team will assist you.
          </DialogContentText>

          <TextField
            autoFocus
            margin='dense'
            id='support-message'
            label='Message'
            fullWidth
            multiline
            rows={4}
            value={supportMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSupportMessage(e.target.value)
            }
            placeholder='Please provide details about your issue...'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSupportDialogClose}>Cancel</Button>
          <Button
            onClick={handleSubmitSupport}
            variant='contained'
            disabled={!supportMessage.trim()}>
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderDetail;
