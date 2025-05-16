import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Chip
} from '@mui/material';
import {
  Call as CallIcon,
  Email as EmailIcon,
  Refresh as RenewIcon,
  Notifications as NotificationIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: number;
  type: 'call' | 'email' | 'renewal' | 'notification';
  action: string;
  client: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'call':
      return <CallIcon />;
    case 'email':
      return <EmailIcon />;
    case 'renewal':
      return <RenewIcon />;
    case 'notification':
      return <NotificationIcon />;
    default:
      return <NotificationIcon />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'call':
      return '#e3f2fd';
    case 'email':
      return '#e1f5fe';
    case 'renewal':
      return '#f3e5f5';
    case 'notification':
      return '#fff3e0';
    default:
      return '#e8eaf6';
  }
};

const RecentActivity: React.FC = () => {
  // Mock data for recent activities
  const activities: Activity[] = [
    {
      id: 1,
      type: 'call',
      action: 'You called',
      client: {
        name: 'James Smith',
        avatar: 'JS',
      },
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    {
      id: 2,
      type: 'renewal',
      action: 'Renewal completed for',
      client: {
        name: 'Maria Popescu',
        avatar: 'MP',
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 3,
      type: 'notification',
      action: 'Reminder sent to',
      client: {
        name: 'Carla M.',
        avatar: 'CM',
      },
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: 4,
      type: 'email',
      action: 'You sent policy documents to',
      client: {
        name: 'John Doe',
        avatar: 'JD',
      },
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    },
    {
      id: 5,
      type: 'call',
      action: 'Missed call from',
      client: {
        name: 'Elena Vasilescu',
        avatar: 'EV',
      },
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
  ];

  return (
    <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: 2 }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="600">
            Recent Activity
          </Typography>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', fontWeight: 500 }}>
            View All
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              {index > 0 && <Divider component="li" />}
              <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: getActivityColor(activity.type),
                      color: 'primary.main',
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" component="span">
                        {activity.action}{' '}
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          fontWeight="600"
                        >
                          {activity.client.name}
                        </Typography>
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Chip
                        label={formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                        size="small"
                        sx={{ 
                          height: 20, 
                          fontSize: '0.7rem',
                          bgcolor: '#f5f5f5',
                          fontWeight: 400
                        }}
                      />
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default RecentActivity;
