import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  Stack
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Warning as WarningIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Event as EventIcon
} from '@mui/icons-material';

interface AlertProps {
  icon: React.ReactNode;
  text: string;
  count: number;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

const AlertItem: React.FC<AlertProps> = ({ icon, text, count, color, bgColor, onClick }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2,
        border: '1px solid #f0f0f0',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transform: 'translateY(-2px)'
        },
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: bgColor,
            color: color,
            borderRadius: 1.5,
            width: 40,
            height: 40,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="body1" color="text.primary">
          {text}
        </Typography>
      </Box>
      <Chip
        label={count}
        size="small"
        sx={{
          bgcolor: bgColor,
          color: color,
          fontWeight: 'bold',
          minWidth: 28,
        }}
      />
    </Paper>
  );
};

const AlertsNotifications: React.FC = () => {
  const handleAlertClick = (alertType: string) => {
    // This would typically filter data or navigate to a detailed view
    console.log(`Clicked on alert: ${alertType}`);
    // In a real application, you might do something like:
    // navigate(`/alerts/${alertType.toLowerCase().replace(/ /g, '-')}`);
    // or dispatch an action to show filtered data
    // dispatch({ type: 'FILTER_BY_ALERT', payload: alertType });
  };

  const alerts = [
    {
      icon: <WarningIcon />,
      text: 'Renewals due today',
      count: 3,
      color: '#d32f2f',
      bgColor: '#ffebee',
      onClick: () => handleAlertClick('Renewals due today'),
    },
    {
      icon: <TimeIcon />,
      text: 'Follow-ups overdue',
      count: 2,
      color: '#ed6c02',
      bgColor: '#fff4e5',
      onClick: () => handleAlertClick('Follow-ups overdue'),
    },
    {
      icon: <MoneyIcon />,
      text: 'Unpaid invoices',
      count: 1,
      color: '#2e7d32',
      bgColor: '#e8f5e9',
      onClick: () => handleAlertClick('Unpaid invoices'),
    },
    {
      icon: <EventIcon />,
      text: 'Contracts expiring in 10 days',
      count: 5,
      color: '#0288d1',
      bgColor: '#e1f5fe',
      onClick: () => handleAlertClick('Contracts expiring in 10 days'),
    },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="600">
          Notifications & Alerts
        </Typography>
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', fontWeight: 500 }}>
          View All
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
        {alerts.map((alert, index) => (
          <Box key={index}>
            <AlertItem {...alert} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AlertsNotifications;
