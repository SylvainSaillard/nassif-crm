import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';

const drawerWidthExpanded = 280;
const drawerWidthCollapsed = 80;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  marginLeft: open ? `${drawerWidthExpanded}px` : `${drawerWidthCollapsed}px`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      <CssBaseline />
      <Header onMenuToggle={handleSidebarToggle} />
      <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
      <Main open={sidebarOpen}>
        <Box 
          component="div" 
          sx={{ 
            mt: 9, 
            width: '100%', 
            maxWidth: '1440px',
            px: { xs: 2, md: 3 },
            boxSizing: 'border-box'
          }}
        >
          {children}
        </Box>
      </Main>
    </Box>
  );
};

export default Layout;
