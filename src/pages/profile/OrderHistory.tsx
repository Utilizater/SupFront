import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Pagination,
  Divider,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-2025-1001',
    date: '2025-03-10',
    total: 89.99,
    status: 'Delivered',
    items: [
      {
        id: '1',
        name: 'Energy & Focus Pack',
        quantity: 1,
        price: 89.99,
      },
    ],
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-2025-0892',
    date: '2025-02-25',
    total: 149.98,
    status: 'Delivered',
    items: [
      {
        id: '2',
        name: 'Gut Health Essentials',
        quantity: 1,
        price: 79.99,
      },
      {
        id: '4',
        name: 'Sleep & Recovery Formula',
        quantity: 1,
        price: 69.99,
      },
    ],
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-2025-0754',
    date: '2025-02-12',
    total: 94.99,
    status: 'Delivered',
    items: [
      {
        id: '3',
        name: 'Immune Defense Pack',
        quantity: 1,
        price: 94.99,
      },
    ],
    trackingNumber: 'TRK456789123',
  },
  {
    id: 'ORD-2025-0623',
    date: '2025-01-28',
    total: 169.98,
    status: 'Delivered',
    items: [
      {
        id: '1',
        name: 'Energy & Focus Pack',
        quantity: 1,
        price: 89.99,
      },
      {
        id: '5',
        name: 'Hormone Balance Support',
        quantity: 1,
        price: 79.99,
      },
    ],
    trackingNumber: 'TRK789123456',
  },
  {
    id: 'ORD-2025-0512',
    date: '2025-01-15',
    total: 99.99,
    status: 'Delivered',
    items: [
      {
        id: '6',
        name: 'Athletic Performance Pack',
        quantity: 1,
        price: 99.99,
      },
    ],
    trackingNumber: 'TRK321654987',
  },
];

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(1); // Reset to first page when changing tabs
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleViewOrder = (orderId: string) => {
    navigate(`/profile/orders/${orderId}`);
  };

  // Filter orders based on search term and selected tab
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Filter based on tab selection
    if (tabValue === 0) {
      return matchesSearch; // All orders
    } else if (tabValue === 1) {
      return matchesSearch && order.status === 'Processing';
    } else if (tabValue === 2) {
      return matchesSearch && order.status === 'Shipped';
    } else if (tabValue === 3) {
      return matchesSearch && order.status === 'Delivered';
    }

    return matchesSearch;
  });

  // For pagination
  const ordersPerPage = 5;
  const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);
  const displayedOrders = filteredOrders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  // Format date string to more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Order History
      </Typography>

      <Typography variant='body1' paragraph>
        View and track your orders, check order status, and reorder your
        favorite supplements.
      </Typography>

      {/* Search and Filter */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder='Search orders by ID or product name...'
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
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label='order status tabs'
          variant='scrollable'
          scrollButtons='auto'>
          <Tab label='All Orders' />
          <Tab label='Processing' />
          <Tab label='Shipped' />
          <Tab label='Delivered' />
        </Tabs>
      </Box>

      {/* Orders Table */}
      {displayedOrders.length > 0 ? (
        <TableContainer component={Paper} elevation={1}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell align='right'>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedOrders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {order.id}
                  </TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    {order.items.map((item, index) => (
                      <Box
                        key={item.id}
                        sx={{ mb: index !== order.items.length - 1 ? 1 : 0 }}>
                        <Typography variant='body2'>
                          {item.name} x {item.quantity}
                        </Typography>
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell align='right'>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={
                        order.status === 'Delivered'
                          ? 'success'
                          : order.status === 'Shipped'
                          ? 'primary'
                          : 'warning'
                      }
                      size='small'
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      variant='outlined'
                      size='small'
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewOrder(order.id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant='h6' gutterBottom>
            No orders found
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {searchTerm
              ? 'No orders match your search criteria. Try a different search term.'
              : "You haven't placed any orders yet."}
          </Typography>
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
            onClick={() => navigate('/packs')}>
            Browse Supplement Packs
          </Button>
        </Paper>
      )}

      {/* Pagination */}
      {filteredOrders.length > ordersPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color='primary'
          />
        </Box>
      )}

      {/* Reorder Section */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant='h6' gutterBottom>
          Frequently Ordered Items
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {mockOrders[0].items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Typography variant='body1'>{item.name}</Typography>
                <Button variant='outlined' size='small'>
                  Reorder
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default OrderHistory;
