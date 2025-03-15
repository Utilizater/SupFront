import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Drawer, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../components/navigation/Navbar';

interface MainLayoutProps {
  // Mock user data for demonstration
  user?: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
  } | null;
  isAuthenticated?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  user = null,
  isAuthenticated = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logout clicked');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onToggleSidebar={handleToggleSidebar}
      />

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
