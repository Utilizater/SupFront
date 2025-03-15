import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  updateQuantity,
  removeItem,
  applyPromoCode,
  clearPromoCode,
  selectCartTotal,
} from '../../store/slices/cartSlice';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  IconButton,
  Divider,
  TextField,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart items and promo code details from Redux
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { promoCode, promoDiscount, promoCodeApplied } = useSelector(
    (state: RootState) => state.cart
  );

  // Get cart totals from selector
  const { subtotal, shipping, tax, total } = useSelector(selectCartTotal);

  const [localPromoCode, setLocalPromoCode] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId: string) => {
    setItemToDelete(itemId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      dispatch(removeItem(itemToDelete));
      setSnackbarMessage('Item removed from cart');
      setSnackbarOpen(true);
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleApplyPromoCode = () => {
    // In a real app, you would validate the promo code with your backend
    if (localPromoCode.toUpperCase() === 'SAVE20') {
      const discount = subtotal * 0.2; // 20% discount
      dispatch(applyPromoCode({ code: localPromoCode, discount }));
      setSnackbarMessage('Promo code applied successfully!');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('Invalid promo code');
      setSnackbarOpen(true);
    }
  };

  const handleClearPromoCode = () => {
    setLocalPromoCode('');
    dispatch(clearPromoCode());
  };

  const handleCheckout = () => {
    // In a real app, you would save the cart state to context/redux/backend
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/packs');
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

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length > 0 ? (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Paper elevation={1} sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
              <Typography variant='h6' gutterBottom>
                Cart Items ({cartItems.length})
              </Typography>

              <List>
                {cartItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem disableGutters sx={{ py: 2 }}>
                      <Card
                        sx={{
                          display: 'flex',
                          width: '100%',
                          boxShadow: 'none',
                        }}>
                        <CardMedia
                          component='img'
                          sx={{ width: 100, height: 100, objectFit: 'cover' }}
                          image={item.imageUrl}
                          alt={item.name}
                        />
                        <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={7}>
                              <Typography variant='subtitle1' component='div'>
                                {item.name}
                              </Typography>
                              <Typography
                                variant='body2'
                                color='text.secondary'
                                sx={{ mb: 1 }}>
                                {item.description}
                              </Typography>

                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  mt: 1,
                                }}>
                                <IconButton
                                  size='small'
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}>
                                  <RemoveIcon fontSize='small' />
                                </IconButton>
                                <TextField
                                  size='small'
                                  value={item.quantity}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value) && value > 0) {
                                      handleQuantityChange(item.id, value);
                                    }
                                  }}
                                  inputProps={{
                                    min: 1,
                                    style: {
                                      textAlign: 'center',
                                      width: '40px',
                                    },
                                  }}
                                  variant='outlined'
                                />
                                <IconButton
                                  size='small'
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }>
                                  <AddIcon fontSize='small' />
                                </IconButton>
                              </Box>
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              sm={5}
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: {
                                  xs: 'flex-start',
                                  sm: 'flex-end',
                                },
                              }}>
                              <Typography variant='subtitle1'>
                                ${(item.price * item.quantity).toFixed(2)}
                              </Typography>
                              <Typography
                                variant='body2'
                                color='text.secondary'>
                                ${item.price.toFixed(2)} each
                              </Typography>

                              <Button
                                startIcon={<DeleteIcon />}
                                color='error'
                                onClick={() => handleRemoveItem(item.id)}
                                sx={{
                                  mt: 'auto',
                                  alignSelf: {
                                    xs: 'flex-start',
                                    sm: 'flex-end',
                                  },
                                }}>
                                Remove
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 3,
                }}>
                <Button variant='outlined' onClick={handleContinueShopping}>
                  Continue Shopping
                </Button>

                <Button
                  variant='contained'
                  onClick={handleCheckout}
                  startIcon={<ShoppingCartIcon />}>
                  Proceed to Checkout
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant='h6' gutterBottom>
                Order Summary
              </Typography>

              <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary='Subtotal' />
                  <Typography variant='body2'>
                    ${subtotal.toFixed(2)}
                  </Typography>
                </ListItem>

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary='Shipping'
                    secondary={
                      subtotal > 100 ? 'Free shipping on orders over $100' : ''
                    }
                  />
                  <Typography variant='body2'>
                    ${shipping.toFixed(2)}
                  </Typography>
                </ListItem>

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary='Tax' />
                  <Typography variant='body2'>${tax.toFixed(2)}</Typography>
                </ListItem>

                {promoDiscount > 0 && (
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      primary='Discount'
                      secondary='Promo code: SAVE20'
                    />
                    <Typography variant='body2' color='error'>
                      -${promoDiscount.toFixed(2)}
                    </Typography>
                  </ListItem>
                )}

                <Divider sx={{ my: 1 }} />

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary='Total' />
                  <Typography variant='subtitle1' fontWeight='bold'>
                    ${total.toFixed(2)}
                  </Typography>
                </ListItem>
              </List>

              <Box sx={{ mt: 3 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Promo Code
                </Typography>

                <Box sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    size='small'
                    label='Enter code'
                    variant='outlined'
                    value={localPromoCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLocalPromoCode(e.target.value)
                    }
                    disabled={promoCodeApplied}
                    fullWidth
                    sx={{ mr: 1 }}
                  />

                  {promoCodeApplied ? (
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={handleClearPromoCode}>
                      Clear
                    </Button>
                  ) : (
                    <Button
                      variant='outlined'
                      onClick={handleApplyPromoCode}
                      disabled={!localPromoCode.trim()}>
                      Apply
                    </Button>
                  )}
                </Box>

                <Typography variant='body2' color='text.secondary'>
                  Try code "SAVE20" for 20% off your order
                </Typography>
              </Box>

              <Button
                variant='contained'
                fullWidth
                size='large'
                onClick={handleCheckout}
                startIcon={<ShoppingCartIcon />}
                sx={{ mt: 3 }}>
                Checkout (${total.toFixed(2)})
              </Button>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant='h6' gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant='body1' paragraph>
            Looks like you haven't added any supplements to your cart yet.
          </Typography>
          <Button
            variant='contained'
            onClick={handleContinueShopping}
            sx={{ mt: 2 }}>
            Browse Supplement Packs
          </Button>
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Remove Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this item from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color='error'>
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleSnackbarClose}
          severity={promoCodeApplied ? 'success' : 'info'}
          sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;
