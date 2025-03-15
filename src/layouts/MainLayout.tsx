import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import Navbar from '../components/navigation/Navbar';

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onLogout={handleLogout} onToggleSidebar={handleToggleSidebar} />

      {isMobile && (
        <Drawer anchor='left' open={sidebarOpen} onClose={handleToggleSidebar}>
          <Box
            sx={{ width: 250 }}
            role='presentation'
            onClick={handleToggleSidebar}
            onKeyDown={handleToggleSidebar}>
            {/* Sidebar content goes here */}
            {/* This will be implemented later */}
          </Box>
        </Drawer>
      )}

      <Container
        component='main'
        sx={{ flexGrow: 1, py: 3, mb: isMobile ? 7 : 0 }}>
        <Outlet />
      </Container>

      <Box
        component='footer'
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.grey[200],
        }}>
        <Container maxWidth='lg'>
          <Box sx={{ textAlign: 'center' }}>
            © {new Date().getFullYear()} Supplement AI. All rights reserved.
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
