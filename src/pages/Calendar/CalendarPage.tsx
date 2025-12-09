import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  useTheme,
  alpha,
  Stack
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Video,
  Phone
} from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  addHours,
  startOfDay
} from 'date-fns';

// Mock Data
const EVENT_TYPES = {
  MEETING: { label: 'Meeting', color: '#3B82F6', icon: Video },
  CALL: { label: 'Call', color: '#10B981', icon: Phone },
  DEADLINE: { label: 'Deadline', color: '#EF4444', icon: Clock },
  OFFICE: { label: 'Office', color: '#8B5CF6', icon: MapPin },
};

const generateMockEvents = () => {
  const today = new Date();
  const events = [];
  
  // Generate some random events for the current month
  for (let i = 0; i < 15; i++) {
    const dayOffset = Math.floor(Math.random() * 30) - 10;
    const date = startOfDay(new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset));
    const typeKey = Object.keys(EVENT_TYPES)[Math.floor(Math.random() * 4)];
    const type = EVENT_TYPES[typeKey as keyof typeof EVENT_TYPES];
    
    events.push({
      id: `evt-${i}`,
      title: [
        'Client Review: Jean Dupont',
        'Contract Renewal Discussion',
        'Team Sync',
        'Follow-up Call',
        'Policy Update Meeting',
        'Lunch with Partner'
      ][Math.floor(Math.random() * 6)],
      start: addHours(date, 9 + Math.floor(Math.random() * 8)),
      end: addHours(date, 10 + Math.floor(Math.random() * 8)),
      type: type,
      participants: [
        'https://i.pravatar.cc/150?img=10',
        'https://i.pravatar.cc/150?img=12'
      ].slice(0, Math.floor(Math.random() * 2) + 1)
    });
  }
  return events;
};

const mockEvents = generateMockEvents();

const CalendarPage = () => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('Month');

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getEventsForDay = (day: Date) => {
    return mockEvents.filter(event => isSameDay(event.start, day));
  };

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            Calendar
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider', p: 0.5 }}>
            <IconButton size="small" onClick={prevMonth}>
              <ChevronLeft size={20} />
            </IconButton>
            <Button 
              onClick={goToToday}
              sx={{ 
                mx: 1, 
                textTransform: 'none', 
                color: 'text.primary',
                fontWeight: 600,
                minWidth: 140
              }}
            >
              {format(currentDate, 'MMMM yyyy')}
            </Button>
            <IconButton size="small" onClick={nextMonth}>
              <ChevronRight size={20} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider', p: 0.5 }}>
            {['Month', 'Week', 'Day'].map((view) => (
              <Button
                key={view}
                size="small"
                onClick={() => setSelectedView(view)}
                sx={{
                  textTransform: 'none',
                  borderRadius: 1.5,
                  bgcolor: selectedView === view ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                  color: selectedView === view ? 'primary.main' : 'text.secondary',
                  fontWeight: selectedView === view ? 600 : 400,
                  '&:hover': {
                    bgcolor: selectedView === view ? alpha(theme.palette.primary.main, 0.15) : alpha(theme.palette.grey[500], 0.05),
                  }
                }}
              >
                {view}
              </Button>
            ))}
          </Box>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            sx={{ 
              textTransform: 'none',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
            }}
          >
            Add Event
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flex: 1, minHeight: 0 }}>
        {/* Main Calendar Grid */}
        <Box sx={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: 3, 
              border: '1px solid', 
              borderColor: 'divider',
              overflow: 'hidden' 
            }}
          >
            {/* Week Days Header */}
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                borderBottom: '1px solid', 
                borderColor: 'divider',
                bgcolor: 'background.default'
              }}
            >
              {weekDays.map((day) => (
                <Box key={day} sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" fontWeight="600" color="text.secondary">
                    {day}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Days Grid */}
            <Box 
              sx={{ 
                flex: 1, 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gridAutoRows: '1fr',
                overflowY: 'auto' // Allow scrolling if content overflows
              }}
            >
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isTodayDate = isToday(day);

                return (
                  <Box
                    key={day.toString()}
                    sx={{
                      borderRight: (index + 1) % 7 !== 0 ? '1px solid' : 'none',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      p: 1,
                      bgcolor: isTodayDate ? alpha(theme.palette.primary.main, 0.02) : 'transparent',
                      minHeight: 120, // Minimum height for each cell
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.grey[500], 0.02)
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          width: 28,
                          height: 28,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          fontWeight: isTodayDate ? 700 : 500,
                          bgcolor: isTodayDate ? 'primary.main' : 'transparent',
                          color: isTodayDate ? 'white' : isCurrentMonth ? 'text.primary' : 'text.disabled',
                        }}
                      >
                        {format(day, 'd')}
                      </Typography>
                    </Box>

                    {dayEvents.map((event) => (
                      <Box
                        key={event.id}
                        sx={{
                          p: 0.75,
                          borderRadius: 1,
                          bgcolor: alpha(event.type.color, 0.1),
                          borderLeft: `3px solid ${event.type.color}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: alpha(event.type.color, 0.2),
                            transform: 'translateY(-1px)'
                          }
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            display: 'block', 
                            fontWeight: 600, 
                            color: 'text.primary',
                            lineHeight: 1.2,
                            mb: 0.5,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {event.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <event.type.icon size={10} color={event.type.color} />
                          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                            {format(event.start, 'HH:mm')}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Box>

        {/* Sidebar */}
        <Box sx={{ width: 320, height: '100%', display: { xs: 'none', md: 'block' }, flexShrink: 0 }}>
          <Stack spacing={3} sx={{ height: '100%' }}>
            {/* Mini Calendar Preview (Placeholder for now) */}
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }} elevation={0}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                Filters
              </Typography>
              <Stack spacing={1}>
                {Object.values(EVENT_TYPES).map((type) => (
                  <Box 
                    key={type.label} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5,
                      p: 1,
                      borderRadius: 2,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: alpha(theme.palette.grey[500], 0.05) }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        borderRadius: 0.5, 
                        bgcolor: type.color 
                      }} 
                    />
                    <Typography variant="body2">{type.label}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Upcoming Events */}
            <Paper sx={{ p: 2, flex: 1, borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} elevation={0}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                Upcoming Events
              </Typography>
              <Stack spacing={2} sx={{ overflowY: 'auto', pr: 1 }}>
                {mockEvents
                  .filter(e => e.start >= new Date())
                  .sort((a, b) => a.start.getTime() - b.start.getTime())
                  .slice(0, 5)
                  .map((event) => (
                  <Box key={event.id} sx={{ display: 'flex', gap: 2 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        minWidth: 40
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" fontWeight="600">
                        {format(event.start, 'MMM')}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" lineHeight={1}>
                        {format(event.start, 'd')}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight="600" sx={{ lineHeight: 1.3, mb: 0.5 }}>
                        {event.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                          label={event.type.label} 
                          size="small" 
                          sx={{ 
                            height: 20, 
                            fontSize: '0.65rem', 
                            bgcolor: alpha(event.type.color, 0.1),
                            color: event.type.color,
                            fontWeight: 600
                          }} 
                        />
                        {event.participants.length > 0 && (
                          <Avatar 
                            src={event.participants[0]} 
                            sx={{ width: 20, height: 20 }} 
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarPage;
