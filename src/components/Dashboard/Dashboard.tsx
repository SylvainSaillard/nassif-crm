import React from 'react';
import { Box, Button, Typography, Fab } from '@mui/material';
import Grid from '@mui/material/Grid';
import MiniKPIs from './MiniKPIs';
import AlertsNotifications from './AlertsNotifications';
import TasksList from './TasksList';
import Timeline from './Timeline';
import RecentActivity from './RecentActivity';
import FilterBar from './FilterBar';
import { Add as AddIcon, People as PeopleIcon } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // In a real application, this would update the data displayed
  };

  const handleAddMember = () => {
    console.log('Add new member clicked');
    // In a real application, this would open a form or navigate to a new page
  };

  const handleViewAllClients = () => {
    console.log('View all clients clicked');
    // In a real application, this would navigate to the clients list page
  };

  return (
    <Box sx={{ flexGrow: 1, py: 3, width: '100%' }}>
        {/* Header with action buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="600">
            Nassif Assurance Dashboard
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<PeopleIcon />}
              onClick={handleViewAllClients}
              sx={{ borderRadius: 2 }}
            >
              View All Clients
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddMember}
              sx={{ borderRadius: 2 }}
            >
              Add New Member
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

        {/* Mobile floating action button - only visible on small screens */}
        <Fab 
          color="primary" 
          aria-label="add" 
          sx={{ 
            position: 'fixed', 
            bottom: 16, 
            right: 16, 
            display: { xs: 'flex', md: 'none' } 
          }}
          onClick={handleAddMember}
        >
          <AddIcon />
        </Fab>
    </Box>
  );
};

export default Dashboard;
