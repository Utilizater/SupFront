import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated?: boolean;
  user?: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
  } | null;
  onLogout?: () => void;
  onToggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated = false,
  user = null,
  onLogout,
  onToggleSidebar,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        {isMobile && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={onToggleSidebar}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant='h6'
          component={RouterLink}
          to='/'
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}>
          Supplement AI
        </Typography>

        {isAuthenticated ? (
          <>
            {!isMobile && (
              <>
                <Button color='inherit' component={RouterLink} to='/dashboard'>
                  Dashboard
                </Button>
                <Button color='inherit' component={RouterLink} to='/ai-advisor'>
                  AI Advisor
                </Button>
                <Button
                  color='inherit'
                  component={RouterLink}
                  to='/consultations'>
                  Consultations
                </Button>
                <Button color='inherit' component={RouterLink} to='/packs'>
                  Supplement Packs
                </Button>
              </>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color='inherit' component={RouterLink} to='/cart'>
                <Badge badgeContent={3} color='error'>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton color='inherit'>
                <Badge badgeContent={5} color='error'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
                sx={{ ml: 1 }}>
                {user?.profilePicture ? (
                  <Avatar
                    src={user.profilePicture}
                    alt={`${user.firstName} ${user.lastName}`}
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
            </Box>

            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}>
              <MenuItem
                component={RouterLink}
                to='/profile'
                onClick={handleMenuClose}>
                Profile
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to='/profile/orders'
                onClick={handleMenuClose}>
                Orders
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to='/profile/recommendations'
                onClick={handleMenuClose}>
                Saved Recommendations
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color='inherit' component={RouterLink} to='/login'>
              Login
            </Button>
            <Button
              variant='outlined'
              color='inherit'
              component={RouterLink}
              to='/register'
              sx={{ ml: 1 }}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
