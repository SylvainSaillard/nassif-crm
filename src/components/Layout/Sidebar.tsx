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
  Divider,
  alpha,
  Badge,
  Chip,
  Tooltip
} from '@mui/material';
import { 
  LayoutDashboard,
  Users,
  ClipboardList,
  Bell,
  FileText,
  Settings,
  Calendar,
  BarChart3,
  LogOut,
  ChevronRight
} from 'lucide-react';

const drawerWidthExpanded = 280;
const drawerWidthCollapsed = 80;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: number;
  section?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const mainMenuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
    { text: 'Clients', icon: <Users size={20} />, badge: 247 },
    { text: 'Tasks', icon: <ClipboardList size={20} />, badge: 12 },
    { text: 'Calendar', icon: <Calendar size={20} /> },
    { text: 'Documents', icon: <FileText size={20} /> },
    { text: 'Analytics', icon: <BarChart3 size={20} /> },
  ];

  const secondaryMenuItems: MenuItem[] = [
    { text: 'Notifications', icon: <Bell size={20} />, badge: 5 },
    { text: 'Settings', icon: <Settings size={20} /> },
  ];

  const drawerWidth = open ? drawerWidthExpanded : drawerWidthCollapsed;

  const renderMenuItem = (item: MenuItem, index: number) => {
    const menuButton = (
      <ListItemButton
        sx={{
          borderRadius: 2,
          mx: open ? 1.5 : 1,
          py: 1.25,
          px: open ? 2 : 1.5,
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          transition: 'all 0.2s ease',
          ...(item.active && {
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)',
            '& .MuiListItemIcon-root': {
              color: '#3B82F6',
            },
            '& .MuiListItemText-primary': {
              color: '#3B82F6',
              fontWeight: 600,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 4,
              height: '60%',
              borderRadius: '0 4px 4px 0',
              background: 'linear-gradient(180deg, #3B82F6 0%, #6366F1 100%)',
            },
          }),
          '&:hover': {
            backgroundColor: alpha('#3B82F6', 0.08),
            '& .menu-arrow': {
              opacity: 1,
              transform: 'translateX(0)',
            },
          },
        }}
      >
        <ListItemIcon 
          sx={{ 
            minWidth: open ? 40 : 0,
            mr: open ? 'auto' : 0,
            justifyContent: 'center',
            color: item.active ? '#3B82F6' : '#6B7280',
          }}
        >
          {item.badge && !open ? (
            <Badge 
              badgeContent={item.badge > 99 ? '99+' : item.badge} 
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: item.active ? '#3B82F6' : '#6B7280',
                  color: 'white',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  minWidth: 16,
                  height: 16,
                  padding: '0 4px',
                },
              }}
            >
              {item.icon}
            </Badge>
          ) : (
            item.icon
          )}
        </ListItemIcon>
        {open && (
          <>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: item.active ? 600 : 500,
                color: item.active ? '#3B82F6' : '#374151',
              }}
            />
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                sx={{
                  height: 22,
                  minWidth: 28,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  backgroundColor: item.active ? alpha('#3B82F6', 0.15) : '#F3F4F6',
                  color: item.active ? '#3B82F6' : '#6B7280',
                }}
              />
            )}
            <ChevronRight 
              size={16} 
              className="menu-arrow"
              style={{ 
                marginLeft: 8,
                opacity: 0,
                transform: 'translateX(-4px)',
                transition: 'all 0.2s ease',
                color: '#9CA3AF',
              }} 
            />
          </>
        )}
      </ListItemButton>
    );

    return (
      <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
        {open ? (
          menuButton
        ) : (
          <Tooltip title={item.text} placement="right" arrow>
            {menuButton}
          </Tooltip>
        )}
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: 'none',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.04)',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowX: 'hidden',
          marginTop: '70px',
          height: 'calc(100% - 70px)',
        },
      }}
    >
      {/* Main Navigation */}
      <Box sx={{ overflow: 'auto', flex: 1, py: 2 }}>
        {open && (
          <Typography 
            variant="caption" 
            sx={{ 
              px: 3, 
              py: 1, 
              display: 'block',
              color: '#9CA3AF',
              fontWeight: 600,
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Main Menu
          </Typography>
        )}
        <List sx={{ px: 0 }}>
          {mainMenuItems.map(renderMenuItem)}
        </List>

        <Divider sx={{ mx: open ? 2 : 1, my: 2, borderColor: '#F3F4F6' }} />

        {open && (
          <Typography 
            variant="caption" 
            sx={{ 
              px: 3, 
              py: 1, 
              display: 'block',
              color: '#9CA3AF',
              fontWeight: 600,
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Settings
          </Typography>
        )}
        <List sx={{ px: 0 }}>
          {secondaryMenuItems.map(renderMenuItem)}
        </List>
      </Box>

      {/* User Profile Section */}
      <Box 
        sx={{ 
          p: open ? 2 : 1,
          mx: open ? 1.5 : 1,
          mb: 1.5,
          borderRadius: open ? 3 : 2,
          background: open ? 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' : 'transparent',
          border: open ? '1px solid #E5E7EB' : 'none',
          display: 'flex',
          justifyContent: open ? 'flex-start' : 'center',
        }}
      >
        {open ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    border: '2px solid white',
                  }}
                />
              }
            >
              <Avatar 
                sx={{ 
                  width: 44, 
                  height: 44,
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                }}
              >
                SN
              </Avatar>
            </Badge>
            <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: '#111827',
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Sylvain Nassif
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#6B7280',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                }}
              >
                Senior Agent
              </Typography>
            </Box>
            <Box
              sx={{
                p: 0.75,
                borderRadius: 1.5,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#E5E7EB',
                },
              }}
            >
              <LogOut size={18} color="#6B7280" />
            </Box>
          </Box>
        ) : (
          <Tooltip title="Sylvain Nassif" placement="right" arrow>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    border: '2px solid white',
                  }}
                />
              }
            >
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40,
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  cursor: 'pointer',
                }}
              >
                SN
              </Avatar>
            </Badge>
          </Tooltip>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
