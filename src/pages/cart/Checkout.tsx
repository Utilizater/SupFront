import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Mock cart data
const mockCartItems = [
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
];

// Mock user data
const mockUserData = {
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  address: {
    street: '123 Main St',
    city: 'Boston',
    state: 'MA',
    zipCode: '02108',
    country: 'United States',
  },
  phone: '(555) 123-4567',
};

// Steps for checkout process
const steps = ['Shipping', 'Payment', 'Review'];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('info');

  // Form state
  const [shippingData, setShippingData] = useState({
    firstName: mockUserData.firstName,
    lastName: mockUserData.lastName,
    email: mockUserData.email,
    phone: mockUserData.phone,
    street: mockUserData.address.street,
    city: mockUserData.address.city,
    state: mockUserData.address.state,
    zipCode: mockUserData.address.zipCode,
    country: mockUserData.address.country,
    saveAddress: true,
    shippingMethod: 'standard',
  });

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    saveCard: false,
    billingAddressSame: true,
    billingStreet: mockUserData.address.street,
    billingCity: mockUserData.address.city,
    billingState: mockUserData.address.state,
    billingZipCode: mockUserData.address.zipCode,
    billingCountry: mockUserData.address.country,
  });

  // Calculate order totals
  const subtotal = mockCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping =
    shippingData.shippingMethod === 'express'
      ? 15.99
      : subtotal > 100
      ? 0
      : 5.99;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;

  const handleShippingInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = e.target;
    setShippingData({
      ...shippingData,
      [name]: name === 'saveAddress' ? checked : value,
    });
  };

  const handleShippingMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingData({
      ...shippingData,
      shippingMethod: e.target.value,
    });
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === 'billingAddressSame' && checked) {
      // If billing address is same as shipping, update billing fields
      setPaymentData({
        ...paymentData,
        billingAddressSame: checked,
        billingStreet: shippingData.street,
        billingCity: shippingData.city,
        billingState: shippingData.state,
        billingZipCode: shippingData.zipCode,
        billingCountry: shippingData.country,
      });
    } else {
      setPaymentData({
        ...paymentData,
        [name]:
          name === 'saveCard' || name === 'billingAddressSame'
            ? checked
            : value,
      });
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    // Simulate API call to process order
    setTimeout(() => {
      setIsProcessing(false);

      // Generate a random order ID
      const orderId = `ORD-${Math.floor(
        Math.random() * 10000
      )}-${new Date().getFullYear()}`;

      // Navigate to order confirmation page
      navigate(`/order-confirmation/${orderId}`);
    }, 2000);
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

  const isShippingFormValid = () => {
    return (
      shippingData.firstName.trim() !== '' &&
      shippingData.lastName.trim() !== '' &&
      shippingData.email.trim() !== '' &&
      shippingData.phone.trim() !== '' &&
      shippingData.street.trim() !== '' &&
      shippingData.city.trim() !== '' &&
      shippingData.state.trim() !== '' &&
      shippingData.zipCode.trim() !== '' &&
      shippingData.country.trim() !== ''
    );
  };

  const isPaymentFormValid = () => {
    return (
      paymentData.cardName.trim() !== '' &&
      paymentData.cardNumber.trim() !== '' &&
      paymentData.expDate.trim() !== '' &&
      paymentData.cvv.trim() !== ''
    );
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ShippingForm
            shippingData={shippingData}
            handleInputChange={handleShippingInputChange}
            handleShippingMethodChange={handleShippingMethodChange}
            subtotal={subtotal}
          />
        );
      case 1:
        return (
          <PaymentForm
            paymentData={paymentData}
            handleInputChange={handlePaymentInputChange}
          />
        );
      case 2:
        return (
          <ReviewOrder
            shippingData={shippingData}
            paymentData={paymentData}
            cartItems={mockCartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  const isNextButtonDisabled = () => {
    if (activeStep === 0) {
      return !isShippingFormValid();
    } else if (activeStep === 1) {
      return !isPaymentFormValid();
    }
    return false;
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}

          <Button
            variant='contained'
            onClick={handleNext}
            disabled={isNextButtonDisabled() || isProcessing}
            startIcon={
              activeStep === steps.length - 1 ? <LockIcon /> : undefined
            }>
            {activeStep === steps.length - 1 ? (
              isProcessing ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                  Processing...
                </>
              ) : (
                'Place Order'
              )
            ) : (
              'Next'
            )}
          </Button>
        </Box>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

// Shipping Form Component
interface ShippingFormProps {
  shippingData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShippingMethodChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  subtotal: number;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingData,
  handleInputChange,
  handleShippingMethodChange,
  subtotal,
}) => {
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Shipping Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='firstName'
            name='firstName'
            label='First Name'
            fullWidth
            autoComplete='given-name'
            variant='outlined'
            value={shippingData.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='lastName'
            name='lastName'
            label='Last Name'
            fullWidth
            autoComplete='family-name'
            variant='outlined'
            value={shippingData.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='email'
            name='email'
            label='Email'
            fullWidth
            autoComplete='email'
            variant='outlined'
            value={shippingData.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='phone'
            name='phone'
            label='Phone Number'
            fullWidth
            autoComplete='tel'
            variant='outlined'
            value={shippingData.phone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='street'
            name='street'
            label='Street Address'
            fullWidth
            autoComplete='shipping address-line1'
            variant='outlined'
            value={shippingData.street}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='city'
            name='city'
            label='City'
            fullWidth
            autoComplete='shipping address-level2'
            variant='outlined'
            value={shippingData.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='state'
            name='state'
            label='State/Province/Region'
            fullWidth
            variant='outlined'
            value={shippingData.state}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='zipCode'
            name='zipCode'
            label='Zip / Postal Code'
            fullWidth
            autoComplete='shipping postal-code'
            variant='outlined'
            value={shippingData.zipCode}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id='country-label'>Country</InputLabel>
            <Select
              labelId='country-label'
              id='country'
              name='country'
              value={shippingData.country}
              label='Country'
              onChange={handleInputChange as any}>
              <MenuItem value='United States'>United States</MenuItem>
              <MenuItem value='Canada'>Canada</MenuItem>
              <MenuItem value='United Kingdom'>United Kingdom</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name='saveAddress'
                color='primary'
                checked={shippingData.saveAddress}
                onChange={handleInputChange}
              />
            }
            label='Save this address for future orders'
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant='h6' gutterBottom>
            Shipping Method
          </Typography>

          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='shipping-method'
              name='shippingMethod'
              value={shippingData.shippingMethod}
              onChange={handleShippingMethodChange}>
              <FormControlLabel
                value='standard'
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant='body1'>
                      Standard Shipping (3-5 business days)
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {subtotal > 100 ? 'Free' : '$5.99'}
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value='express'
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant='body1'>
                      Express Shipping (1-2 business days)
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      $15.99
                    </Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

// Payment Form Component
interface PaymentFormProps {
  paymentData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentData,
  handleInputChange,
}) => {
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Payment Method
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CreditCardIcon sx={{ mr: 1 }} />
            <Typography variant='subtitle1'>Credit Card</Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id='cardName'
            name='cardName'
            label='Name on Card'
            fullWidth
            autoComplete='cc-name'
            variant='outlined'
            value={paymentData.cardName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='cardNumber'
            name='cardNumber'
            label='Card Number'
            fullWidth
            autoComplete='cc-number'
            variant='outlined'
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            placeholder='XXXX XXXX XXXX XXXX'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='expDate'
            name='expDate'
            label='Expiry Date'
            fullWidth
            autoComplete='cc-exp'
            variant='outlined'
            value={paymentData.expDate}
            onChange={handleInputChange}
            placeholder='MM/YY'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='cvv'
            name='cvv'
            label='CVV'
            fullWidth
            autoComplete='cc-csc'
            variant='outlined'
            value={paymentData.cvv}
            onChange={handleInputChange}
            placeholder='XXX'
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name='saveCard'
                color='primary'
                checked={paymentData.saveCard}
                onChange={handleInputChange}
              />
            }
            label='Save this card for future purchases'
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant='h6' gutterBottom>
            Billing Address
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                name='billingAddressSame'
                color='primary'
                checked={paymentData.billingAddressSame}
                onChange={handleInputChange}
              />
            }
            label='Same as shipping address'
          />
        </Grid>

        {!paymentData.billingAddressSame && (
          <>
            <Grid item xs={12}>
              <TextField
                required
                id='billingStreet'
                name='billingStreet'
                label='Street Address'
                fullWidth
                autoComplete='billing address-line1'
                variant='outlined'
                value={paymentData.billingStreet}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='billingCity'
                name='billingCity'
                label='City'
                fullWidth
                autoComplete='billing address-level2'
                variant='outlined'
                value={paymentData.billingCity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='billingState'
                name='billingState'
                label='State/Province/Region'
                fullWidth
                variant='outlined'
                value={paymentData.billingState}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='billingZipCode'
                name='billingZipCode'
                label='Zip / Postal Code'
                fullWidth
                autoComplete='billing postal-code'
                variant='outlined'
                value={paymentData.billingZipCode}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='billing-country-label'>Country</InputLabel>
                <Select
                  labelId='billing-country-label'
                  id='billingCountry'
                  name='billingCountry'
                  value={paymentData.billingCountry}
                  label='Country'
                  onChange={handleInputChange as any}>
                  <MenuItem value='United States'>United States</MenuItem>
                  <MenuItem value='Canada'>Canada</MenuItem>
                  <MenuItem value='United Kingdom'>United Kingdom</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

// Review Order Component
interface ReviewOrderProps {
  shippingData: any;
  paymentData: any;
  cartItems: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const ReviewOrder: React.FC<ReviewOrderProps> = ({
  shippingData,
  paymentData,
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
}) => {
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order Summary
      </Typography>

      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <CardMedia
                component='img'
                sx={{ width: 60, height: 60, objectFit: 'cover', mr: 2 }}
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
          <Typography variant='body1'>${subtotal.toFixed(2)}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary='Shipping'
            secondary={
              shippingData.shippingMethod === 'express'
                ? 'Express Shipping'
                : 'Standard Shipping'
            }
          />
          <Typography variant='body1'>${shipping.toFixed(2)}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Tax' />
          <Typography variant='body1'>${tax.toFixed(2)}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' fontWeight='bold'>
            ${total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Card variant='outlined'>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalShippingIcon sx={{ mr: 1 }} />
                <Typography variant='h6' component='div'>
                  Shipping Information
                </Typography>
              </Box>

              <Typography variant='body1'>
                {shippingData.firstName} {shippingData.lastName}
              </Typography>
              <Typography variant='body2'>{shippingData.street}</Typography>
              <Typography variant='body2'>
                {shippingData.city}, {shippingData.state} {shippingData.zipCode}
              </Typography>
              <Typography variant='body2'>{shippingData.country}</Typography>
              <Typography variant='body2' sx={{ mt: 1 }}>
                {shippingData.email}
              </Typography>
              <Typography variant='body2'>{shippingData.phone}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card variant='outlined'>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaymentIcon sx={{ mr: 1 }} />
                <Typography variant='h6' component='div'>
                  Payment Information
                </Typography>
              </Box>

              <Typography variant='body1'>{paymentData.cardName}</Typography>
              <Typography variant='body2'>
                Card ending in {paymentData.cardNumber.slice(-4)}
              </Typography>
              <Typography variant='body2'>
                Expires {paymentData.expDate}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant='subtitle2'>Billing Address:</Typography>
                {paymentData.billingAddressSame ? (
                  <Typography variant='body2' color='text.secondary'>
                    Same as shipping address
                  </Typography>
                ) : (
                  <>
                    <Typography variant='body2'>
                      {paymentData.billingStreet}
                    </Typography>
                    <Typography variant='body2'>
                      {paymentData.billingCity}, {paymentData.billingState}{' '}
                      {paymentData.billingZipCode}
                    </Typography>
                    <Typography variant='body2'>
                      {paymentData.billingCountry}
                    </Typography>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ReceiptIcon sx={{ mr: 1 }} />
          <Typography variant='subtitle1'>Order Confirmation</Typography>
        </Box>
        <Typography variant='body2' sx={{ mt: 1 }}>
          By placing your order, you agree to our terms and conditions and
          privacy policy. You will receive an email confirmation with your order
          details.
        </Typography>
      </Box>
    </>
  );
};

export default Checkout;
