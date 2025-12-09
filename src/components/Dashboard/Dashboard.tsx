import React from 'react';
import { Box, Button, Typography, Fab, Chip, alpha } from '@mui/material';
import MiniKPIs from './MiniKPIs';
import AlertsNotifications from './AlertsNotifications';
import TasksList from './TasksList';
import Timeline from './Timeline';
import RecentActivity from './RecentActivity';
import FilterBar from './FilterBar';
import { 
  Plus, 
  Users, 
  Sparkles,
  Calendar
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
  };

  const handleAddMember = () => {
    console.log('Add new member clicked');
  };

  const handleViewAllClients = () => {
    console.log('View all clients clicked');
  };

  // Get current date info
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);

  return (
    <Box sx={{ flexGrow: 1, py: 4, width: '100%' }}>
      {/* Welcome Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', md: 'center' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          mb: 4,
          pb: 3,
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: '#111827',
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Welcome back, Sylvain
            </Typography>
            <Chip
              icon={<Sparkles size={14} />}
              label="Pro"
              size="small"
              sx={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.65rem',
                height: 24,
                '& .MuiChip-icon': {
                  color: 'white',
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Calendar size={16} color="#6B7280" />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#6B7280',
                fontWeight: 500,
              }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            startIcon={<Users size={18} />}
            onClick={handleViewAllClients}
            sx={{ 
              borderRadius: 2.5,
              borderColor: '#E5E7EB',
              color: '#374151',
              fontWeight: 600,
              px: 2.5,
              '&:hover': {
                borderColor: '#3B82F6',
                backgroundColor: alpha('#3B82F6', 0.04),
              },
            }}
          >
            View Clients
          </Button>
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={handleAddMember}
            sx={{ 
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              fontWeight: 600,
              px: 2.5,
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
              '&:hover': {
                background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
                boxShadow: '0 6px 20px rgba(59, 130, 246, 0.45)',
              },
            }}
          >
            Add Member
          </Button>
        </Box>
      </Box>

      <MiniKPIs />
      <AlertsNotifications />
      <FilterBar onFilterChange={handleFilterChange} />
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        <Box>
          <TasksList />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Timeline />
            <RecentActivity />
          </Box>
        </Box>
      </Box>

      {/* Mobile floating action button */}
      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24, 
          display: { xs: 'flex', md: 'none' },
          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
          },
        }}
        onClick={handleAddMember}
      >
        <Plus size={24} />
      </Fab>
    </Box>
  );
};

export default Dashboard;
