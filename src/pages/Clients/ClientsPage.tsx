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
  TablePagination,
  Avatar,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Tooltip,
  alpha,
  Tabs,
  Tab,
  Badge,
  Checkbox,
  FormControl,
  Select,
  SelectChangeEvent
} from '@mui/material';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Eye,
  Edit2,
  Trash2,
  Download,
  Upload,
  Users,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  FileText,
  Calendar,
  MapPin,
  Building2,
  Star,
  StarOff
} from 'lucide-react';

// Types
interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  status: 'active' | 'inactive' | 'pending';
  type: 'individual' | 'business';
  policies: number;
  totalPremium: number;
  lastContact: Date;
  createdAt: Date;
  avatar?: string;
  isFavorite: boolean;
}

// Mock data
const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    company: 'Dupont SARL',
    address: '123 Rue de Paris',
    city: 'Paris',
    status: 'active',
    type: 'business',
    policies: 3,
    totalPremium: 4500,
    lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2023-01-15'),
    isFavorite: true
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@email.com',
    phone: '+33 6 98 76 54 32',
    address: '45 Avenue des Champs',
    city: 'Lyon',
    status: 'active',
    type: 'individual',
    policies: 2,
    totalPremium: 1200,
    lastContact: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2023-03-22'),
    isFavorite: false
  },
  {
    id: '3',
    firstName: 'Pierre',
    lastName: 'Bernard',
    email: 'p.bernard@email.com',
    phone: '+33 6 11 22 33 44',
    company: 'Bernard & Fils',
    address: '78 Boulevard Victor Hugo',
    city: 'Marseille',
    status: 'pending',
    type: 'business',
    policies: 1,
    totalPremium: 2800,
    lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-01-10'),
    isFavorite: true
  },
  {
    id: '4',
    firstName: 'Sophie',
    lastName: 'Leroy',
    email: 'sophie.leroy@email.com',
    phone: '+33 6 55 66 77 88',
    address: '12 Rue de la Liberté',
    city: 'Bordeaux',
    status: 'inactive',
    type: 'individual',
    policies: 0,
    totalPremium: 0,
    lastContact: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2022-08-05'),
    isFavorite: false
  },
  {
    id: '5',
    firstName: 'Thomas',
    lastName: 'Moreau',
    email: 't.moreau@email.com',
    phone: '+33 6 99 88 77 66',
    company: 'Moreau Industries',
    address: '234 Zone Industrielle',
    city: 'Toulouse',
    status: 'active',
    type: 'business',
    policies: 5,
    totalPremium: 12500,
    lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2022-05-18'),
    isFavorite: true
  },
  {
    id: '6',
    firstName: 'Emma',
    lastName: 'Petit',
    email: 'emma.petit@email.com',
    phone: '+33 6 44 33 22 11',
    address: '56 Rue du Commerce',
    city: 'Nantes',
    status: 'active',
    type: 'individual',
    policies: 2,
    totalPremium: 890,
    lastContact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2023-09-12'),
    isFavorite: false
  },
  {
    id: '7',
    firstName: 'Lucas',
    lastName: 'Roux',
    email: 'lucas.roux@email.com',
    phone: '+33 6 77 88 99 00',
    company: 'Roux Consulting',
    address: '89 Avenue Jean Jaurès',
    city: 'Lille',
    status: 'pending',
    type: 'business',
    policies: 2,
    totalPremium: 3200,
    lastContact: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-02-28'),
    isFavorite: false
  },
  {
    id: '8',
    firstName: 'Camille',
    lastName: 'Fournier',
    email: 'c.fournier@email.com',
    phone: '+33 6 22 11 00 99',
    address: '167 Rue Nationale',
    city: 'Strasbourg',
    status: 'active',
    type: 'individual',
    policies: 1,
    totalPremium: 450,
    lastContact: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2023-11-05'),
    isFavorite: false
  },
];

// Stats cards data
const statsCards = [
  { 
    title: 'Total Clients', 
    value: '247', 
    change: '+12%', 
    changeType: 'positive' as const,
    icon: Users,
    color: '#3B82F6',
    bgColor: '#EFF6FF'
  },
  { 
    title: 'Active Clients', 
    value: '198', 
    change: '+8%', 
    changeType: 'positive' as const,
    icon: UserCheck,
    color: '#10B981',
    bgColor: '#ECFDF5'
  },
  { 
    title: 'Pending Review', 
    value: '23', 
    change: '-5%', 
    changeType: 'negative' as const,
    icon: Clock,
    color: '#F59E0B',
    bgColor: '#FFFBEB'
  },
  { 
    title: 'Inactive', 
    value: '26', 
    change: '+2%', 
    changeType: 'negative' as const,
    icon: UserX,
    color: '#EF4444',
    bgColor: '#FEF2F2'
  },
];

const ClientsPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, clientId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedClientId(clientId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClientId(null);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedClients(filteredClients.map(c => c.id));
    } else {
      setSelectedClients([]);
    }
  };

  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: '#ECFDF5', color: '#059669', label: 'Active' };
      case 'inactive':
        return { bg: '#FEF2F2', color: '#DC2626', label: 'Inactive' };
      case 'pending':
        return { bg: '#FFFBEB', color: '#D97706', label: 'Pending' };
      default:
        return { bg: '#F3F4F6', color: '#6B7280', label: status };
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Filter clients based on search and filters
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesType = typeFilter === 'all' || client.type === typeFilter;
    
    // Tab filtering
    if (selectedTab === 1) return matchesSearch && matchesStatus && matchesType && client.isFavorite;
    if (selectedTab === 2) return matchesSearch && matchesStatus && matchesType && client.status === 'active';
    if (selectedTab === 3) return matchesSearch && matchesStatus && matchesType && client.status === 'pending';
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#111827',
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                mb: 0.5
              }}
            >
              Clients
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              Manage and view all your client information
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<Upload size={18} />}
              sx={{
                borderColor: '#E5E7EB',
                color: '#374151',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  borderColor: '#D1D5DB',
                  backgroundColor: '#F9FAFB',
                }
              }}
            >
              Import
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download size={18} />}
              sx={{
                borderColor: '#E5E7EB',
                color: '#374151',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  borderColor: '#D1D5DB',
                  backgroundColor: '#F9FAFB',
                }
              }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              sx={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                }
              }}
            >
              Add Client
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 2.5,
          mb: 4
        }}
      >
        {statsCards.map((stat, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #E5E7EB',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: stat.color,
                boxShadow: `0 4px 20px ${alpha(stat.color, 0.15)}`,
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500, mb: 1 }}>
                  {stat.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', fontSize: '1.75rem' }}>
                  {stat.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                  <TrendingUp size={14} color={stat.changeType === 'positive' ? '#10B981' : '#EF4444'} />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: stat.changeType === 'positive' ? '#10B981' : '#EF4444',
                      fontWeight: 600
                    }}
                  >
                    {stat.change}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                    vs last month
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2.5,
                  backgroundColor: stat.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <stat.icon size={24} color={stat.color} />
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Main Content */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 3, 
          border: '1px solid #E5E7EB',
          overflow: 'hidden'
        }}
      >
        {/* Tabs */}
        <Box sx={{ borderBottom: '1px solid #E5E7EB', px: 2 }}>
          <Tabs 
            value={selectedTab} 
            onChange={(_e, v) => setSelectedTab(v)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#6B7280',
                minHeight: 56,
                '&.Mui-selected': {
                  color: '#3B82F6',
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#3B82F6',
                height: 3,
                borderRadius: '3px 3px 0 0',
              }
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  All Clients
                  <Chip label={mockClients.length} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star size={16} />
                  Favorites
                </Box>
              } 
            />
            <Tab label="Active" />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Pending
                  <Badge badgeContent={2} color="warning" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }} />
                </Box>
              } 
            />
          </Tabs>
        </Box>

        {/* Filters */}
        <Box sx={{ p: 2.5, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', borderBottom: '1px solid #F3F4F6' }}>
          <TextField
            placeholder="Search clients..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#9CA3AF" />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: 280,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#F9FAFB',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                }
              }
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={statusFilter}
              onChange={(e: SelectChangeEvent) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{ borderRadius: 2, backgroundColor: '#F9FAFB' }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={typeFilter}
              onChange={(e: SelectChangeEvent) => setTypeFilter(e.target.value)}
              displayEmpty
              sx={{ borderRadius: 2, backgroundColor: '#F9FAFB' }}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<Filter size={16} />}
            sx={{
              borderColor: '#E5E7EB',
              color: '#6B7280',
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                borderColor: '#D1D5DB',
                backgroundColor: '#F9FAFB',
              }
            }}
          >
            More Filters
          </Button>

          <Box sx={{ flex: 1 }} />

          {selectedClients.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                {selectedClients.length} selected
              </Typography>
              <Button
                size="small"
                sx={{ color: '#EF4444', textTransform: 'none' }}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedClients.length > 0 && selectedClients.length < filteredClients.length}
                    checked={filteredClients.length > 0 && selectedClients.length === filteredClients.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Client</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Policies</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Premium</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Last Contact</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#374151' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client) => {
                  const statusStyle = getStatusColor(client.status);
                  const isSelected = selectedClients.includes(client.id);

                  return (
                    <TableRow 
                      key={client.id}
                      hover
                      selected={isSelected}
                      sx={{ 
                        '&:hover': { backgroundColor: '#F9FAFB' },
                        '&.Mui-selected': { backgroundColor: alpha('#3B82F6', 0.08) }
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelectClient(client.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ position: 'relative' }}>
                            <Avatar
                              sx={{
                                width: 44,
                                height: 44,
                                backgroundColor: client.type === 'business' ? '#EFF6FF' : '#F5F3FF',
                                color: client.type === 'business' ? '#3B82F6' : '#8B5CF6',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                              }}
                            >
                              {client.firstName[0]}{client.lastName[0]}
                            </Avatar>
                            {client.isFavorite && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: -4,
                                  right: -4,
                                  width: 18,
                                  height: 18,
                                  borderRadius: '50%',
                                  backgroundColor: '#FEF3C7',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Star size={10} fill="#F59E0B" color="#F59E0B" />
                              </Box>
                            )}
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                              {client.firstName} {client.lastName}
                            </Typography>
                            {client.company && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Building2 size={12} color="#9CA3AF" />
                                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                  {client.company}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Mail size={14} color="#9CA3AF" />
                            <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.8rem' }}>
                              {client.email}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Phone size={14} color="#9CA3AF" />
                            <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.8rem' }}>
                              {client.phone}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <MapPin size={14} color="#9CA3AF" />
                          <Typography variant="body2" sx={{ color: '#6B7280' }}>
                            {client.city}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={statusStyle.label}
                          size="small"
                          sx={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: 24,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FileText size={14} color="#9CA3AF" />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                            {client.policies}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                          {formatCurrency(client.totalPremium)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Calendar size={14} color="#9CA3AF" />
                          <Typography variant="body2" sx={{ color: '#6B7280' }}>
                            {formatDate(client.lastContact)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                          <Tooltip title="View">
                            <IconButton size="small" sx={{ color: '#6B7280' }}>
                              <Eye size={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Call">
                            <IconButton size="small" sx={{ color: '#10B981' }}>
                              <Phone size={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Email">
                            <IconButton size="small" sx={{ color: '#3B82F6' }}>
                              <Mail size={18} />
                            </IconButton>
                          </Tooltip>
                          <IconButton 
                            size="small" 
                            onClick={(e) => handleMenuOpen(e, client.id)}
                            sx={{ color: '#6B7280' }}
                          >
                            <MoreVertical size={18} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredClients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid #E5E7EB',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: '#6B7280',
            }
          }}
        />
      </Paper>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
            border: '1px solid #E5E7EB',
            minWidth: 180,
          }
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5 }}>
          <Eye size={16} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5 }}>
          <Edit2 size={16} />
          Edit Client
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5 }}>
          <FileText size={16} />
          View Policies
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5 }}>
          {selectedClientId && mockClients.find(c => c.id === selectedClientId)?.isFavorite ? (
            <>
              <StarOff size={16} />
              Remove from Favorites
            </>
          ) : (
            <>
              <Star size={16} />
              Add to Favorites
            </>
          )}
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5, color: '#EF4444' }}>
          <Trash2 size={16} />
          Delete Client
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ClientsPage;
