import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Stack,
  Tabs,
  Tab,
  Card,
  CardContent,
  useTheme,
  alpha,
  Tooltip,
  Checkbox,
  LinearProgress
} from '@mui/material';
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Trash2,
  Edit,
  Eye,
  CheckSquare
} from 'lucide-react';

// Mock Data for Tasks
const mockTasks = Array.from({ length: 25 }, (_, i) => ({
  id: `TASK-${1000 + i}`,
  title: [
    'Renouvellement contrat',
    'Appel de suivi client',
    'Préparer proposition commerciale',
    'Mise à jour dossier médical',
    'Réunion équipe mensuelle',
    'Vérification paiements',
    'Envoi documents adhésion'
  ][Math.floor(Math.random() * 7)],
  description: 'Vérifier les conditions actuelles et proposer les nouvelles options.',
  client: {
    name: [
      'Jean Dupont',
      'Marie Martin',
      'Pierre Durand',
      'Sophie Bernard',
      'Lucas Petit',
      'Emma Thomas'
    ][Math.floor(Math.random() * 6)],
    avatar: `https://i.pravatar.cc/150?img=${i + 10}`
  },
  priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
  status: ['To Do', 'In Progress', 'Done', 'Review'][Math.floor(Math.random() * 4)],
  dueDate: new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
  assignedTo: {
    name: 'Sylvain Saillard',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  completion: Math.floor(Math.random() * 100)
}));

// Components
const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box 
          sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            bgcolor: alpha(color, 0.1),
            color: color
          }}
        >
          <Icon size={24} />
        </Box>
        {change && (
          <Box sx={{ display: 'flex', alignItems: 'center', color: change >= 0 ? 'success.main' : 'error.main' }}>
            {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <Typography variant="caption" fontWeight="bold" sx={{ ml: 0.5 }}>
              {Math.abs(change)}%
            </Typography>
          </Box>
        )}
      </Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const TasksPage = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedTasks(mockTasks.map(n => n.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleSelectOne = (id: string) => {
    const selectedIndex = selectedTasks.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTasks, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTasks.slice(1));
    } else if (selectedIndex === selectedTasks.length - 1) {
      newSelected = newSelected.concat(selectedTasks.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedTasks.slice(0, selectedIndex),
        selectedTasks.slice(selectedIndex + 1),
      );
    }

    setSelectedTasks(newSelected);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return theme.palette.error.main;
      case 'Medium': return theme.palette.warning.main;
      case 'Low': return theme.palette.success.main;
      default: return theme.palette.info.main;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'success';
      case 'In Progress': return 'primary';
      case 'Review': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            Tasks
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your daily activities and follow-ups
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Download size={20} />}
            sx={{ textTransform: 'none' }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            sx={{ 
              textTransform: 'none',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
            }}
          >
            New Task
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, 
          gap: 3, 
          mb: 4 
        }}
      >
        <StatCard 
          title="Total Tasks" 
          value="34" 
          change={12} 
          icon={CheckSquare} 
          color="#3B82F6" 
        />
        <StatCard 
          title="In Progress" 
          value="12" 
          change={5} 
          icon={Clock} 
          color="#F59E0B" 
        />
        <StatCard 
          title="Completed" 
          value="18" 
          change={8} 
          icon={CheckCircle2} 
          color="#10B981" 
        />
        <StatCard 
          title="High Priority" 
          value="4" 
          change={-2} 
          icon={AlertCircle} 
          color="#EF4444" 
        />
      </Box>

      {/* Main Content */}
      <Paper sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }} elevation={0}>
        {/* Tabs and Filters */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={currentTab} 
            onChange={(e, v) => setCurrentTab(v)}
            sx={{ px: 2, pt: 2 }}
          >
            <Tab label="All Tasks" />
            <Tab label="My Tasks" />
            <Tab label="Assigned" />
            <Tab label="Completed" />
          </Tabs>
        </Box>

        {/* Toolbar */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <TextField
            placeholder="Search tasks..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color={theme.palette.text.secondary} />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          <Button
            variant="outlined"
            startIcon={<Filter size={18} />}
            size="small"
            sx={{ textTransform: 'none', color: 'text.secondary', borderColor: 'divider' }}
          >
            Filter
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {selectedTasks.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', bgcolor: alpha(theme.palette.primary.main, 0.08), px: 2, py: 0.5, borderRadius: 2 }}>
              <Typography variant="body2" color="primary" fontWeight="bold">
                {selectedTasks.length} selected
              </Typography>
              <IconButton size="small" color="primary">
                <CheckCircle2 size={18} />
              </IconButton>
              <IconButton size="small" color="error">
                <Trash2 size={18} />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox 
                    checked={selectedTasks.length === mockTasks.length}
                    indeterminate={selectedTasks.length > 0 && selectedTasks.length < mockTasks.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Assigned</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task) => {
                  const isSelected = selectedTasks.indexOf(task.id) !== -1;
                  return (
                    <TableRow 
                      key={task.id} 
                      hover
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox 
                          checked={isSelected}
                          onChange={() => handleSelectOne(task.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="600">
                            {task.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {task.id}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar 
                            src={task.client.avatar} 
                            sx={{ width: 24, height: 24 }} 
                          />
                          <Typography variant="body2">
                            {task.client.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={task.priority}
                          size="small"
                          sx={{
                            bgcolor: alpha(getPriorityColor(task.priority), 0.1),
                            color: getPriorityColor(task.priority),
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 24
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={task.status}
                          size="small"
                          color={getStatusColor(task.status) as any}
                          variant="outlined"
                          sx={{ fontWeight: 600, fontSize: '0.75rem', height: 24 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 100 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={task.completion} 
                            sx={{ flexGrow: 1, borderRadius: 1, height: 6 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {task.completion}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                          <Calendar size={14} />
                          <Typography variant="caption">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={task.assignedTo.name}>
                          <Avatar 
                            src={task.assignedTo.avatar} 
                            sx={{ width: 28, height: 28, border: '2px solid white' }} 
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <IconButton size="small">
                            <CheckCircle2 size={18} color={theme.palette.success.main} />
                          </IconButton>
                          <IconButton size="small">
                            <Edit size={18} />
                          </IconButton>
                          <IconButton size="small" onClick={handleMenuOpen}>
                            <MoreVertical size={18} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mockTasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { width: 160, borderRadius: 2 }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Eye size={16} style={{ marginRight: 8 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Clock size={16} style={{ marginRight: 8 }} />
          Reschedule
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TasksPage;
