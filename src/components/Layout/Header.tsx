import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  InputBase, 
  Badge, 
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Chip,
  alpha,
  Typography
} from '@mui/material';
import { MoreVert as MoreIcon } from '@mui/icons-material';
import {
  Bell,
  Mail,
  RefreshCw,
  FileText,
  Users,
  Search,
  Command,
  Sparkles,
  Shield,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { styled } from '@mui/material/styles';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: '#F3F4F6',
  border: '1px solid #E5E7EB',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#ffffff',
    borderColor: '#D1D5DB',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  },
  '&:focus-within': {
    backgroundColor: '#ffffff',
    borderColor: '#3B82F6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const SearchIconWrapper = styled('div')(() => ({
  padding: '0 12px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#9CA3AF',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#374151',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '10px 12px 10px 44px',
    fontSize: '0.875rem',
    width: '100%',
    '&::placeholder': {
      color: '#9CA3AF',
      opacity: 1,
    },
  },
}));

const QuickActionButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 10,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const NotificationBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#EF4444',
    color: 'white',
    fontSize: '0.65rem',
    fontWeight: 700,
    minWidth: 18,
    height: 18,
    padding: '0 4px',
    borderRadius: 9,
    border: '2px solid white',
  },
}));

interface HeaderProps {
  onMenuToggle: () => void;
  sidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, sidebarOpen = true }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          borderRadius: 2,
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
          border: '1px solid #E5E7EB',
          minWidth: 200,
        },
      }}
    >
      <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, px: 2 }}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, px: 2 }}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, px: 2, color: '#EF4444' }}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          borderRadius: 2,
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
          border: '1px solid #E5E7EB',
        },
      }}
    >
      <MenuItem sx={{ py: 1.5 }}>
        <IconButton size="small" sx={{ mr: 1 }}>
          <Badge badgeContent={4} color="error">
            <Mail size={20} />
          </Badge>
        </IconButton>
        Messages
      </MenuItem>
      <MenuItem sx={{ py: 1.5 }}>
        <IconButton size="small" sx={{ mr: 1 }}>
          <Badge badgeContent={5} color="error">
            <Bell size={20} />
          </Badge>
        </IconButton>
        Notifications
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} sx={{ py: 1.5 }}>
        <Avatar sx={{ width: 28, height: 28, mr: 1 }}>SN</Avatar>
        Profile
      </MenuItem>
    </Menu>
  );

  const quickActions = [
    { icon: <RefreshCw size={18} />, label: 'Renewals', color: '#3B82F6', bgColor: '#EFF6FF', count: 3 },
    { icon: <FileText size={18} />, label: 'Claims', color: '#8B5CF6', bgColor: '#F5F3FF', count: 2 },
    { icon: <Users size={18} />, label: 'Clients', color: '#10B981', bgColor: '#ECFDF5', count: null },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E5E7EB',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 70 } }}>
          {/* Logo */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              mr: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
            >
              <Shield size={22} color="white" strokeWidth={2.5} />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                Nassif Assurance
              </Typography>
            </Box>
          </Box>

          {/* Sidebar Toggle */}
          <Tooltip title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"} arrow>
            <IconButton
              size="small"
              aria-label="toggle sidebar"
              onClick={onMenuToggle}
              sx={{ 
                mr: 2,
                color: '#6B7280',
                backgroundColor: '#F3F4F6',
                borderRadius: 1.5,
                width: 36,
                height: 36,
                '&:hover': { 
                  backgroundColor: '#E5E7EB',
                  color: '#374151',
                },
              }}
            >
              {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
            </IconButton>
          </Tooltip>

          {/* Search Bar */}
          <SearchContainer>
            <SearchIconWrapper>
              <Search size={18} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search clients, policies, tasks..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <Box sx={{ 
              position: 'absolute', 
              right: 8, 
              top: '50%', 
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}>
              <Chip
                size="small"
                icon={<Command size={12} />}
                label="K"
                sx={{
                  height: 24,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  backgroundColor: '#F3F4F6',
                  color: '#6B7280',
                  '& .MuiChip-icon': {
                    color: '#6B7280',
                  },
                }}
              />
            </Box>
          </SearchContainer>

          <Box sx={{ flexGrow: 1 }} />

          {/* Quick Actions */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1, mr: 2 }}>
            {quickActions.map((action, index) => (
              <Tooltip key={index} title={action.label} arrow>
                <QuickActionButton
                  sx={{ 
                    bgcolor: action.bgColor, 
                    color: action.color,
                    '&:hover': { 
                      bgcolor: alpha(action.color, 0.15),
                    },
                  }}
                >
                  {action.count ? (
                    <Badge 
                      badgeContent={action.count} 
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: action.color,
                          color: 'white',
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          minWidth: 16,
                          height: 16,
                        },
                      }}
                    >
                      {action.icon}
                    </Badge>
                  ) : action.icon}
                </QuickActionButton>
              </Tooltip>
            ))}
          </Box>

          {/* Divider */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              width: 1, 
              height: 32, 
              bgcolor: '#E5E7EB', 
              mx: 2 
            }} 
          />

          {/* Notifications */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            <Tooltip title="Messages" arrow>
              <IconButton 
                sx={{ 
                  color: '#6B7280',
                  '&:hover': { backgroundColor: '#F3F4F6' },
                }}
              >
                <NotificationBadge badgeContent={4}>
                  <Mail size={20} />
                </NotificationBadge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications" arrow>
              <IconButton 
                sx={{ 
                  color: '#6B7280',
                  '&:hover': { backgroundColor: '#F3F4F6' },
                }}
              >
                <NotificationBadge badgeContent={5}>
                  <Bell size={20} />
                </NotificationBadge>
              </IconButton>
            </Tooltip>
          </Box>

          {/* AI Assistant Button */}
          <Tooltip title="AI Assistant" arrow>
            <IconButton
              sx={{
                ml: 1,
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                color: 'white',
                width: 36,
                height: 36,
                '&:hover': {
                  background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={18} />
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Tooltip title="Account" arrow>
            <IconButton
              edge="end"
              aria-label="account"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ ml: 1.5 }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  border: '2px solid #ffffff',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                }}
              >
                SN
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              sx={{ color: '#374151' }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
