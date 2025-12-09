import React, { useState } from 'react';
import { Box, CssBaseline, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  // marginLeft removed because Sidebar is in the flex flow
  width: '100%', // Take remaining space
  minWidth: 0, // Prevent flex item overflow
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    width: '100%',
  }
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      <CssBaseline />
      <Header onMenuToggle={handleSidebarToggle} sidebarOpen={isMobile ? mobileOpen : sidebarOpen} />
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Main open={!isMobile && sidebarOpen}>
        <Box 
          component="div" 
          sx={{ 
            mt: { xs: 8, md: 9 }, 
            width: '100%', 
            maxWidth: '1600px', // Increased max-width for better use of space
            mx: 'auto', // Center horizontally
            px: { xs: 2, md: 3, lg: 4 },
            pb: 4,
            boxSizing: 'border-box',
          }}
        >
          {children}
        </Box>
      </Main>
    </Box>
  );
};

export default Layout;
