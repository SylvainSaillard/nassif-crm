import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Avatar,
  Divider
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  InsertDriveFile as DocumentIcon,
  Settings as SettingsIcon,
  CalendarMonth as CalendarIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, active: true },
    { text: 'Clients', icon: <PeopleIcon /> },
    { text: 'Tasks', icon: <AssignmentIcon /> },
    { text: 'Calendar', icon: <CalendarIcon /> },
    { text: 'Documents', icon: <DocumentIcon /> },
    { text: 'Analytics', icon: <AnalyticsIcon /> },
    { text: 'Notifications', icon: <NotificationsIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #f0f0f0',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar 
          sx={{ 
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            width: 36,
            height: 36,
            fontSize: '1rem',
            fontWeight: 600,
            border: '2px solid #ffffff',
            boxShadow: '0 0 0 1px rgba(229, 231, 235, 0.8)',
          }}
        >
          NA
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#2563EB' }}>
          Nassif Assurance
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                sx={{
                  borderRadius: '0 24px 24px 0',
                  mr: 2,
                  ml: 1,
                  mb: 0.5,
                  ...(item.active && {
                    backgroundColor: 'rgba(244, 67, 54, 0.08)',
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar 
            sx={{ 
              width: 36, 
              height: 36,
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              fontSize: '1rem',
              fontWeight: 600,
              border: '2px solid #ffffff',
              boxShadow: '0 0 0 1px rgba(229, 231, 235, 0.8)',
            }}
          >
            A
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Agent Name
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Insurance Agent
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
