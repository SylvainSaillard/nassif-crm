import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Avatar,
  AvatarGroup,
  Tooltip,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
  Phone as CallIcon,
  Mail as EmailIcon,
  RefreshCw as RefreshIcon,
  FileText as DocumentIcon,
  Clock as PendingIcon,
  AlertTriangle as OverdueIcon,
  CheckCircle as CompletedIcon
} from 'lucide-react';

interface Task {
  id: number;
  client: {
    name: string;
    avatar: string;
    membershipId: string;
    lastInteraction: string;
    email?: string;
    phone?: string;
  };
  company: string;
  companyLogo: string;
  action: string;
  actionType: 'call' | 'email' | 'renew' | 'document';
  assignedTo: string[];
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

const getActionIcon = (actionType: string) => {
  switch (actionType) {
    case 'call':
      return <CallIcon fontSize="small" />;
    case 'email':
      return <EmailIcon fontSize="small" />;
    case 'renew':
      return <RefreshIcon fontSize="small" />;
    case 'document':
      return <DocumentIcon fontSize="small" />;
    default:
      return <CallIcon fontSize="small" />;
  }
};

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'pending':
      return {
        bg: '#93C5FD',
        color: '#1D4ED8',
        icon: <PendingIcon size={16} strokeWidth={2} />
      };
    case 'completed':
      return {
        bg: '#D1FAE5',
        color: '#10B981',
        icon: <CompletedIcon size={16} strokeWidth={2} />
      };
    case 'overdue':
      return {
        bg: '#FEE2E2',
        color: '#EF4444',
        icon: <OverdueIcon size={16} strokeWidth={2} />
      };
    default:
      return {
        bg: '#93C5FD',
        color: '#1D4ED8',
        icon: <PendingIcon size={16} strokeWidth={2} />
      };
  }
};

const TasksList: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Mock data for tasks
  const tasks: Task[] = [
    {
      id: 1,
      client: {
        name: 'James Smith',
        avatar: 'JS',
        membershipId: 'BUP-2023-1458',
        lastInteraction: '2025-05-10',
        email: 'james.smith@example.com',
        phone: '+40 721 123 456'
      },
      company: 'Bupa',
      companyLogo: 'B',
      action: 'Call to discuss renewal options',
      actionType: 'call',
      assignedTo: ['A', 'B'],
      dueDate: '2025-05-17',
      status: 'pending',
    },
    {
      id: 2,
      client: {
        name: 'Maria Popescu',
        avatar: 'MP',
        membershipId: 'ALZ-2022-7890',
        lastInteraction: '2025-05-12',
        email: 'maria.popescu@example.com',
        phone: '+40 722 345 678'
      },
      company: 'Allianz',
      companyLogo: 'A',
      action: 'Send email with new policy details',
      actionType: 'email',
      assignedTo: ['A'],
      dueDate: '2025-05-16',
      status: 'overdue',
    },
    {
      id: 3,
      client: {
        name: 'Carla Mihai',
        avatar: 'CM',
        membershipId: 'CIG-2024-4567',
        lastInteraction: '2025-05-05',
        email: 'carla.mihai@example.com',
        phone: '+40 723 456 789'
      },
      company: 'Cigna',
      companyLogo: 'C',
      action: 'Process renewal documents',
      actionType: 'document',
      assignedTo: ['A', 'C'],
      dueDate: '2025-05-18',
      status: 'pending',
    },
    {
      id: 4,
      client: {
        name: 'John Doe',
        avatar: 'JD',
        membershipId: 'BUP-2023-9012',
        lastInteraction: '2025-05-08',
        email: 'john.doe@example.com',
        phone: '+40 724 567 890'
      },
      company: 'Bupa',
      companyLogo: 'B',
      action: 'Complete renewal process',
      actionType: 'renew',
      assignedTo: ['A'],
      dueDate: '2025-05-15',
      status: 'overdue',
    },
    {
      id: 5,
      client: {
        name: 'Elena Vasilescu',
        avatar: 'EV',
        membershipId: 'ALZ-2024-3456',
        lastInteraction: '2025-05-14',
        email: 'elena.vasilescu@example.com',
        phone: '+40 725 678 901'
      },
      company: 'Allianz',
      companyLogo: 'A',
      action: 'Follow up on claim status',
      actionType: 'call',
      assignedTo: ['B'],
      dueDate: '2025-05-19',
      status: 'pending',
    },
  ];

  // Filter tasks based on tab selection
  const filteredTasks = tasks.filter((task) => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return task.status === 'pending';
    if (tabValue === 2) return task.status === 'overdue';
    return true;
  }).filter((task) => {
    if (!searchValue) return true;
    return (
      task.client.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      task.company.toLowerCase().includes(searchValue.toLowerCase()) ||
      task.action.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="600">
          My Tasks / Assigned Clients
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search tasks..."
            value={searchValue}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 200 }}
          />
          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Export as CSV</MenuItem>
            <MenuItem onClick={handleMenuClose}>Print list</MenuItem>
            <MenuItem onClick={handleMenuClose}>Bulk edit</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{ mb: 2 }}
        TabIndicatorProps={{
          style: {
            backgroundColor: '#f44336',
          },
        }}
      >
        <Tab label="All Tasks" />
        <Tab label="Pending" />
        <Tab label="Overdue" />
      </Tabs>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: 2, overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Action Required</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Assigned To</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => {
              return (
                <TableRow
                  key={task.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f5f7fa' },
                  }}
                >
                  <TableCell>
                    <Tooltip
                      title={
                        <Card sx={{ minWidth: 250, boxShadow: 'none', p: 0 }}>
                          <CardContent sx={{ p: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                              <Avatar 
                                sx={{ 
                                  width: 40, 
                                  height: 40, 
                                  mr: 1.5,
                                  bgcolor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                                  backgroundImage: 'url(https://source.unsplash.com/random/100x100/?portrait)',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                }}
                              >
                                {task.client.avatar}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {task.client.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {task.company}
                                </Typography>
                              </Box>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="caption" color="text.secondary">Membership ID:</Typography>
                                <Typography variant="caption" fontWeight="500">{task.client.membershipId}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="caption" color="text.secondary">Last Interaction:</Typography>
                                <Typography variant="caption" fontWeight="500">
                                  {new Date(task.client.lastInteraction).toLocaleDateString()}
                                </Typography>
                              </Box>
                              {task.client.email && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant="caption" color="text.secondary">Email:</Typography>
                                  <Typography variant="caption" fontWeight="500">{task.client.email}</Typography>
                                </Box>
                              )}
                              {task.client.phone && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant="caption" color="text.secondary">Phone:</Typography>
                                  <Typography variant="caption" fontWeight="500">{task.client.phone}</Typography>
                                </Box>
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                      }
                      placement="right"
                      arrow
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            mr: 1,
                            bgcolor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                            backgroundImage: 'url(https://source.unsplash.com/random/100x100/?portrait)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '2px solid #fff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          {task.client.avatar}
                        </Avatar>
                        <Typography variant="body2">{task.client.name}</Typography>
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          mr: 1,
                          fontSize: '0.75rem',
                          bgcolor: task.company === 'Bupa' ? '#0070ce' : task.company === 'Allianz' ? '#003781' : '#00857c',
                        }}
                      >
                        {task.companyLogo}
                      </Avatar>
                      <Typography variant="body2">{task.company}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: '#f5f5f5',
                          borderRadius: '50%',
                          width: 24,
                          height: 24,
                          mr: 1,
                        }}
                      >
                        {getActionIcon(task.actionType)}
                      </Box>
                      <Typography variant="body2">{task.action}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
                      {task.assignedTo.map((agent, index) => (
                        <Avatar 
                          key={index} 
                          sx={{ 
                            bgcolor: index === 0 ? 'primary.main' : 'secondary.main',
                            backgroundImage: 'url(https://source.unsplash.com/random/100x100/?person)', // Example of using profile pictures
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          {agent}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: new Date(task.dueDate) < new Date() ? 'error.main' : 'text.primary',
                      }}
                    >
                      {new Date(task.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusInfo(task.status).icon}
                      label={task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      size="small"
                      sx={{
                        bgcolor: getStatusInfo(task.status).bg,
                        color: getStatusInfo(task.status).color,
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: getStatusInfo(task.status).color,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TasksList;
