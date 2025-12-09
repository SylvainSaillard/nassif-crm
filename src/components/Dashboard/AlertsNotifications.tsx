import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  alpha,
  IconButton
} from '@mui/material';
import {
  AlertTriangle,
  Clock,
  CreditCard,
  CalendarClock,
  ChevronRight,
  Bell
} from 'lucide-react';

interface AlertProps {
  icon: React.ReactNode;
  text: string;
  count: number;
  color: string;
  bgColor: string;
  priority: 'high' | 'medium' | 'low';
  onClick?: () => void;
}

const AlertItem: React.FC<AlertProps> = ({ icon, text, count, color, bgColor, priority, onClick }) => {
  const priorityColors = {
    high: { dot: '#EF4444', pulse: true },
    medium: { dot: '#F59E0B', pulse: false },
    low: { dot: '#3B82F6', pulse: false },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2.5,
        border: '1px solid',
        borderColor: '#E5E7EB',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 8px 25px -8px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
          borderColor: color,
          '& .alert-arrow': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: color,
          borderRadius: '4px 0 0 4px',
        },
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: bgColor,
            color: color,
            borderRadius: 2,
            width: 44,
            height: 44,
            mr: 2,
            position: 'relative',
          }}
        >
          {icon}
          {priorityColors[priority].pulse && (
            <Box
              sx={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: priorityColors[priority].dot,
                border: '2px solid white',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.4)' },
                  '70%': { boxShadow: '0 0 0 6px rgba(239, 68, 68, 0)' },
                  '100%': { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)' },
                },
              }}
            />
          )}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600,
              color: '#111827',
              fontSize: '0.875rem',
            }}
          >
            {text}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#6B7280',
              fontSize: '0.75rem',
            }}
          >
            {count} {count === 1 ? 'item' : 'items'} require attention
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(color, 0.1),
            color: color,
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            fontWeight: 700,
            fontSize: '0.875rem',
          }}
        >
          {count}
        </Box>
        <ChevronRight 
          size={18} 
          className="alert-arrow"
          style={{ 
            color: '#9CA3AF',
            opacity: 0,
            transform: 'translateX(-4px)',
            transition: 'all 0.2s ease',
          }} 
        />
      </Box>
    </Paper>
  );
};

const AlertsNotifications: React.FC = () => {
  const handleAlertClick = (alertType: string) => {
    console.log(`Clicked on alert: ${alertType}`);
  };

  const alerts: Omit<AlertProps, 'onClick'>[] = [
    {
      icon: <AlertTriangle size={22} />,
      text: 'Renewals due today',
      count: 3,
      color: '#EF4444',
      bgColor: '#FEE2E2',
      priority: 'high',
    },
    {
      icon: <Clock size={22} />,
      text: 'Follow-ups overdue',
      count: 2,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      priority: 'medium',
    },
    {
      icon: <CreditCard size={22} />,
      text: 'Unpaid invoices',
      count: 1,
      color: '#10B981',
      bgColor: '#D1FAE5',
      priority: 'low',
    },
    {
      icon: <CalendarClock size={22} />,
      text: 'Expiring in 10 days',
      count: 5,
      color: '#3B82F6',
      bgColor: '#DBEAFE',
      priority: 'medium',
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
            }}
          >
            <Bell size={18} color="white" />
          </Box>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: '#111827',
                fontSize: '1.1rem',
              }}
            >
              Alerts & Notifications
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#6B7280',
              }}
            >
              {alerts.reduce((acc, a) => acc + a.count, 0)} items need your attention
            </Typography>
          </Box>
        </Box>
        <IconButton
          sx={{
            color: '#3B82F6',
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            '&:hover': {
              backgroundColor: alpha('#3B82F6', 0.08),
            },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mr: 0.5 }}>View All</Typography>
          <ChevronRight size={16} />
        </IconButton>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
        {alerts.map((alert, index) => (
          <AlertItem 
            key={index} 
            {...alert} 
            onClick={() => handleAlertClick(alert.text)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AlertsNotifications;
