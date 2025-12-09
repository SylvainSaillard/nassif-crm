import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Avatar,
  alpha,
  IconButton
} from '@mui/material';
import {
  Phone,
  Mail,
  RefreshCw,
  Bell,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: number;
  type: 'call' | 'email' | 'renewal' | 'notification';
  action: string;
  client: {
    name: string;
    avatar: string;
    initials: string;
  };
  timestamp: Date;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'call':
      return <Phone size={16} />;
    case 'email':
      return <Mail size={16} />;
    case 'renewal':
      return <RefreshCw size={16} />;
    case 'notification':
      return <Bell size={16} />;
    default:
      return <Bell size={16} />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'call':
      return { bg: '#EFF6FF', color: '#3B82F6' };
    case 'email':
      return { bg: '#F5F3FF', color: '#8B5CF6' };
    case 'renewal':
      return { bg: '#ECFDF5', color: '#10B981' };
    case 'notification':
      return { bg: '#FFF7ED', color: '#F59E0B' };
    default:
      return { bg: '#F3F4F6', color: '#6B7280' };
  }
};

const RecentActivity: React.FC = () => {
  const activities: Activity[] = [
    {
      id: 1,
      type: 'call',
      action: 'You called',
      client: {
        name: 'James Smith',
        avatar: '',
        initials: 'JS'
      },
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    {
      id: 2,
      type: 'renewal',
      action: 'Renewal completed for',
      client: {
        name: 'Maria Popescu',
        avatar: '',
        initials: 'MP'
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 3,
      type: 'notification',
      action: 'Reminder sent to',
      client: {
        name: 'Carla M.',
        avatar: '',
        initials: 'CM'
      },
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: 4,
      type: 'email',
      action: 'Document sent to',
      client: {
        name: 'John Doe',
        avatar: '',
        initials: 'JD'
      },
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    },
    {
      id: 5,
      type: 'call',
      action: 'Missed call from',
      client: {
        name: 'Elena Vasilescu',
        avatar: '',
        initials: 'EV'
      },
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
  ];

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        border: '1px solid #E5E7EB', 
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 2,
              backgroundColor: '#F3F4F6',
              color: '#4B5563',
            }}
          >
            <Clock size={16} />
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              fontSize: '1rem',
              color: '#111827'
            }}
          >
            Recent Activity
          </Typography>
        </Box>
        <IconButton size="small">
          <MoreHorizontal size={18} color="#9CA3AF" />
        </IconButton>
      </Box>

      <List sx={{ p: 0, flex: 1, overflow: 'auto' }}>
        {activities.map((activity, index) => {
          const colors = getActivityColor(activity.type);
          
          return (
            <ListItem 
              key={activity.id} 
              alignItems="flex-start" 
              sx={{ 
                py: 2, 
                px: 2.5,
                borderBottom: index < activities.length - 1 ? '1px solid #F9FAFB' : 'none',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#F9FAFB',
                }
              }}
            >
              <Box sx={{ position: 'relative', mr: 2 }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    bgcolor: colors.bg,
                    color: colors.color,
                    border: '1px solid',
                    borderColor: alpha(colors.color, 0.1),
                  }}
                >
                  {getActivityIcon(activity.type)}
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    color: '#6B7280',
                  }}
                >
                  {activity.client.initials}
                </Box>
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body2" 
                  component="div" 
                  sx={{ 
                    color: '#6B7280', 
                    fontSize: '0.875rem',
                    mb: 0.5,
                    lineHeight: 1.4
                  }}
                >
                  {activity.action}{' '}
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ 
                      color: '#111827', 
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }}
                  >
                    {activity.client.name}
                  </Typography>
                </Typography>
                
                <Typography 
                  variant="caption" 
                  component="div"
                  sx={{ 
                    color: '#9CA3AF',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>
      
      <Box sx={{ p: 2, borderTop: '1px solid #F3F4F6', textAlign: 'center' }}>
        <Typography 
          variant="button" 
          sx={{ 
            fontSize: '0.75rem', 
            fontWeight: 600, 
            color: '#6B7280',
            textTransform: 'none',
            cursor: 'pointer',
            '&:hover': {
              color: '#3B82F6',
            }
          }}
        >
          View all history
        </Typography>
      </Box>
    </Paper>
  );
};

export default RecentActivity;
