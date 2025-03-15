import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

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
      id={`saved-tabpanel-${index}`}
      aria-labelledby={`saved-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock data for saved recommendations
const mockRecommendations = [
  {
    id: '1',
    type: 'pack',
    name: 'Energy & Focus Pack',
    description:
      'Boost your energy levels and mental clarity with this carefully formulated supplement pack.',
    imageUrl:
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 89.99,
    tags: ['Energy', 'Focus', 'Mental Clarity'],
    savedDate: '2025-03-01',
    source: 'AI Advisor',
  },
  {
    id: '2',
    type: 'pack',
    name: 'Gut Health Essentials',
    description:
      'Support your digestive system and microbiome with this comprehensive gut health pack.',
    imageUrl:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 79.99,
    tags: ['Digestive Health', 'Microbiome', 'Probiotics'],
    savedDate: '2025-02-15',
    source: 'Expert Consultation',
  },
  {
    id: '3',
    type: 'article',
    name: 'Optimizing Sleep Quality Through Nutrition',
    description:
      'Learn how specific nutrients and supplements can dramatically improve your sleep quality and duration.',
    imageUrl:
      'https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tags: ['Sleep', 'Nutrition', 'Wellness'],
    savedDate: '2025-02-10',
    source: 'Health Library',
    readTime: '8 min read',
  },
  {
    id: '4',
    type: 'protocol',
    name: 'Stress Management Protocol',
    description:
      'A comprehensive approach to managing stress through targeted supplementation and lifestyle practices.',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tags: ['Stress', 'Adaptogens', 'Mental Health'],
    savedDate: '2025-01-28',
    source: 'AI Advisor',
    duration: '30-day protocol',
  },
  {
    id: '5',
    type: 'pack',
    name: 'Immune Defense Pack',
    description:
      'Strengthen your immune system with this powerful combination of immune-supporting supplements.',
    imageUrl:
      'https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 94.99,
    tags: ['Immune Support', 'Antioxidants', 'Wellness'],
    savedDate: '2025-01-15',
    source: 'AI Advisor',
  },
];

const SavedRecommendations: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

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

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    itemId: string
  ) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedItemId(null);
  };

  const handleDeleteClick = (itemId: string) => {
    setItemToDelete(itemId);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    // In a real app, you would delete the item from your backend
    console.log('Deleting item:', itemToDelete);

    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleShare = (itemId: string) => {
    // In a real app, you would implement sharing functionality
    console.log('Sharing item:', itemId);
    handleMenuClose();
  };

  const handleViewDetails = (item: any) => {
    if (item.type === 'pack') {
      navigate(`/packs/${item.id}`);
    } else if (item.type === 'article') {
      navigate(`/articles/${item.id}`);
    } else if (item.type === 'protocol') {
      navigate(`/protocols/${item.id}`);
    }
  };

  const handleAddToCart = (itemId: string) => {
    // In a real app, you would add the item to the cart
    console.log('Adding item to cart:', itemId);
  };

  // Filter recommendations based on selected tab
  const filteredRecommendations = mockRecommendations.filter((item) => {
    if (tabValue === 0) {
      return true; // All items
    } else if (tabValue === 1) {
      return item.type === 'pack'; // Only supplement packs
    } else if (tabValue === 2) {
      return item.type === 'article'; // Only articles
    } else if (tabValue === 3) {
      return item.type === 'protocol'; // Only protocols
    }
    return true;
  });

  // For pagination
  const itemsPerPage = 4;
  const pageCount = Math.ceil(filteredRecommendations.length / itemsPerPage);
  const displayedItems = filteredRecommendations.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
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
        Saved Recommendations
      </Typography>

      <Typography variant='body1' paragraph>
        View and manage your saved supplement recommendations, articles, and
        protocols.
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label='saved items tabs'
          variant='scrollable'
          scrollButtons='auto'>
          <Tab
            label='All Items'
            id='saved-tab-0'
            aria-controls='saved-tabpanel-0'
          />
          <Tab
            label='Supplement Packs'
            id='saved-tab-1'
            aria-controls='saved-tabpanel-1'
          />
          <Tab
            label='Articles'
            id='saved-tab-2'
            aria-controls='saved-tabpanel-2'
          />
          <Tab
            label='Protocols'
            id='saved-tab-3'
            aria-controls='saved-tabpanel-3'
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <RecommendationsList
          items={displayedItems}
          onMenuOpen={handleMenuOpen}
          onViewDetails={handleViewDetails}
          onAddToCart={handleAddToCart}
          formatDate={formatDate}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <RecommendationsList
          items={displayedItems}
          onMenuOpen={handleMenuOpen}
          onViewDetails={handleViewDetails}
          onAddToCart={handleAddToCart}
          formatDate={formatDate}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <RecommendationsList
          items={displayedItems}
          onMenuOpen={handleMenuOpen}
          onViewDetails={handleViewDetails}
          onAddToCart={handleAddToCart}
          formatDate={formatDate}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <RecommendationsList
          items={displayedItems}
          onMenuOpen={handleMenuOpen}
          onViewDetails={handleViewDetails}
          onAddToCart={handleAddToCart}
          formatDate={formatDate}
        />
      </TabPanel>

      {/* Pagination */}
      {filteredRecommendations.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color='primary'
          />
        </Box>
      )}

      {/* Item Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}>
        <MenuItem onClick={() => selectedItemId && handleShare(selectedItemId)}>
          <ShareIcon fontSize='small' sx={{ mr: 1 }} />
          Share
        </MenuItem>
        <MenuItem
          onClick={() => selectedItemId && handleDeleteClick(selectedItemId)}>
          <DeleteIcon fontSize='small' sx={{ mr: 1 }} />
          Remove
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Remove Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this item from your saved
            recommendations?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color='error'>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

// Helper component for rendering the recommendations list
interface RecommendationsListProps {
  items: any[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, itemId: string) => void;
  onViewDetails: (item: any) => void;
  onAddToCart: (itemId: string) => void;
  formatDate: (dateString: string) => string;
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({
  items,
  onMenuOpen,
  onViewDetails,
  onAddToCart,
  formatDate,
}) => {
  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant='h6' gutterBottom>
          No saved items found
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Items you save will appear here.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={6} key={item.id}>
          <Card
            sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component='img'
                height='160'
                image={item.imageUrl}
                alt={item.name}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                }}>
                <Typography
                  variant='caption'
                  sx={{ textTransform: 'capitalize' }}>
                  {item.type}
                </Typography>
              </Box>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                }}
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  onMenuOpen(e, item.id)
                }>
                <MoreVertIcon />
              </IconButton>
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant='h6' component='div' gutterBottom>
                {item.name}
              </Typography>

              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                {item.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                {item.tags.map((tag: string, index: number) => (
                  <Chip
                    key={index}
                    label={tag}
                    size='small'
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Typography variant='body2' color='text.secondary'>
                  Saved on {formatDate(item.savedDate)}
                </Typography>
                {item.type === 'pack' && (
                  <Typography variant='subtitle1' color='primary'>
                    ${item.price.toFixed(2)}
                  </Typography>
                )}
              </Box>

              <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                Source: {item.source}
              </Typography>

              {item.readTime && (
                <Typography variant='body2' color='text.secondary'>
                  {item.readTime}
                </Typography>
              )}

              {item.duration && (
                <Typography variant='body2' color='text.secondary'>
                  {item.duration}
                </Typography>
              )}
            </CardContent>

            <Divider />

            <CardActions>
              <Button size='small' onClick={() => onViewDetails(item)}>
                View Details
              </Button>

              {item.type === 'pack' && (
                <Button
                  size='small'
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => onAddToCart(item.id)}>
                  Add to Cart
                </Button>
              )}

              <Box sx={{ flexGrow: 1 }} />

              <IconButton color='error'>
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SavedRecommendations;
