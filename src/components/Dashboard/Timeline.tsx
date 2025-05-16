import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Avatar
} from '@mui/material';
import { CalendarViewWeek as WeekIcon, CalendarViewMonth as MonthIcon } from '@mui/icons-material';
import {
  Phone as CallIcon,
  RefreshCw as RenewIcon,
  Calendar as EventIcon,
  Mail as EmailIcon
} from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';

interface TimelineEvent {
  id: number;
  type: 'call' | 'renewal' | 'meeting' | 'email';
  title: string;
  time: string;
  date: Date;
  client: {
    name: string;
    avatar: string;
  };
  company: string;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'call':
      return <CallIcon color="#2563EB" size={18} />;
    case 'renewal':
      return <RenewIcon color="#8B5CF6" size={18} />;
    case 'meeting':
      return <EventIcon color="#F59E0B" size={18} />;
    case 'email':
      return <EmailIcon color="#2563EB" size={18} />;
    default:
      return <EventIcon size={18} />;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'call':
      return '#E0F2FE'; // Light blue background
    case 'renewal':
      return '#F3E8FF'; // Light purple background
    case 'meeting':
      return '#FEF3C7'; // Light amber background
    case 'email':
      return '#DBEAFE'; // Lighter blue background
    default:
      return '#F9FAFB'; // Default light background
  }
};

const Timeline: React.FC = () => {
  const [view, setView] = useState<string>('week');

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  // Generate mock timeline events
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
  
  const events: TimelineEvent[] = [
    {
      id: 1,
      type: 'call',
      title: 'Follow-up call',
      time: '10:00 AM',
      date: addDays(startOfCurrentWeek, 0),
      client: {
        name: 'James Smith',
        avatar: 'JS',
      },
      company: 'Bupa',
    },
    {
      id: 2,
      type: 'renewal',
      title: 'Policy renewal',
      time: '2:30 PM',
      date: addDays(startOfCurrentWeek, 0),
      client: {
        name: 'Maria Popescu',
        avatar: 'MP',
      },
      company: 'Allianz',
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Client meeting',
      time: '11:00 AM',
      date: addDays(startOfCurrentWeek, 1),
      client: {
        name: 'John Doe',
        avatar: 'JD',
      },
      company: 'Cigna',
    },
    {
      id: 4,
      type: 'email',
      title: 'Send policy documents',
      time: '4:00 PM',
      date: addDays(startOfCurrentWeek, 2),
      client: {
        name: 'Elena Vasilescu',
        avatar: 'EV',
      },
      company: 'Bupa',
    },
    {
      id: 5,
      type: 'call',
      title: 'Renewal discussion',
      time: '1:30 PM',
      date: addDays(startOfCurrentWeek, 3),
      client: {
        name: 'Carla Mihai',
        avatar: 'CM',
      },
      company: 'Allianz',
    },
    {
      id: 6,
      type: 'meeting',
      title: 'Team meeting',
      time: '9:00 AM',
      date: addDays(startOfCurrentWeek, 4),
      client: {
        name: 'Team',
        avatar: 'T',
      },
      company: 'Internal',
    },
  ];

  // Group events by date
  const eventsByDate = events.reduce((acc: { [key: string]: TimelineEvent[] }, event) => {
    const dateKey = format(event.date, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  return (
    <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: 2, height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="600">
            Timeline / Calendar
          </Typography>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            size="small"
            aria-label="view"
          >
            <ToggleButton value="week" aria-label="week view">
              <WeekIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="month" aria-label="month view">
              <MonthIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <List sx={{ p: 0 }}>
          {Object.entries(eventsByDate).map(([dateKey, dateEvents], dateIndex) => (
            <React.Fragment key={dateKey}>
              {dateIndex > 0 && (
                <Divider sx={{ 
                  my: 2,
                  borderStyle: 'dashed',
                  borderColor: 'rgba(0, 0, 0, 0.08)'
                }} />
              )}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1.5, 
                  mt: dateIndex > 0 ? 2 : 0,
                  py: 1,
                  px: 1.5,
                  borderRadius: 1,
                  bgcolor: isSameDay(new Date(dateKey), new Date()) ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="subtitle2" 
                    fontWeight="600" 
                    color={isSameDay(new Date(dateKey), new Date()) ? 'primary.main' : 'text.secondary'}
                  >
                    {format(new Date(dateKey), 'EEEE, MMMM d')}
                  </Typography>
                  {isSameDay(new Date(dateKey), new Date()) && (
                    <Box 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.main', 
                        ml: 1 
                      }} 
                    />
                  )}
                </Box>
                <Chip 
                  label={`${dateEvents.length} events`} 
                  size="small" 
                  sx={{ 
                    ml: 1, 
                    bgcolor: isSameDay(new Date(dateKey), new Date()) ? '#E0F2FE' : '#F9FAFB', 
                    color: isSameDay(new Date(dateKey), new Date()) ? '#2563EB' : '#637381',
                    height: 20, 
                    fontSize: '0.7rem',
                    fontWeight: isSameDay(new Date(dateKey), new Date()) ? 600 : 500,
                    border: isSameDay(new Date(dateKey), new Date()) ? '1px solid #BFDBFE' : 'none',
                  }} 
                />
              </Box>
              {dateEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    mb: 1,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: getEventColor(event.type),
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {getEventIcon(event.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" fontWeight="500">
                          {event.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                          {event.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Avatar sx={{ width: 20, height: 20, fontSize: '0.75rem', mr: 0.5 }}>
                          {event.client.avatar}
                        </Avatar>
                        <Typography variant="caption" color="text.secondary">
                          {event.client.name} • {event.company}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default Timeline;
