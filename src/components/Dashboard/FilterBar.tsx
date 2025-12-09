import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
  Popover,
  Typography,
  IconButton,
  Paper,
  Stack,
  SelectChangeEvent
} from '@mui/material';
// import { DateRange } from '@mui/lab';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  DateRange as DateRangeIcon,
  Add as AddIcon
} from '@mui/icons-material';
// Using standard inputs for date selection instead of date pickers to avoid dependency issues

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const insurers = [
  'Bupa',
  'Cigna',
  'Allianz',
  'Aetna',
  'AXA',
  'MetLife',
  'Generali',
];

const agents = [
  'John Smith',
  'Maria Popescu',
  'Alex Johnson',
  'Elena Vasilescu',
  'Robert Brown',
];

const statuses = [
  'Pending',
  'Overdue',
  'Completed',
  'All'
];

const dateRanges = [
  'Today',
  'Tomorrow',
  'Next 7 days',
  'Next 30 days',
  'Custom range'
];

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInsurers, setSelectedInsurers] = useState<string[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Next 7 days');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleDateClick = (event: React.MouseEvent<HTMLElement>) => {
    setDateAnchorEl(event.currentTarget);
  };

  const handleDateClose = () => {
    setDateAnchorEl(null);
  };

  const handleInsurerChange = (event: SelectChangeEvent<typeof selectedInsurers>) => {
    const {
      target: { value },
    } = event;
    const newValues = typeof value === 'string' ? value.split(',') : value;
    setSelectedInsurers(newValues);
    updateActiveFilters('insurer', newValues.length > 0);
  };

  const handleAgentChange = (event: SelectChangeEvent<typeof selectedAgents>) => {
    const {
      target: { value },
    } = event;
    const newValues = typeof value === 'string' ? value.split(',') : value;
    setSelectedAgents(newValues);
    updateActiveFilters('agent', newValues.length > 0);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
    updateActiveFilters('status', event.target.value !== 'All');
  };

  const handleDateRangeChange = (event: SelectChangeEvent) => {
    setSelectedDateRange(event.target.value);
    updateActiveFilters('date', event.target.value !== 'All');
    if (event.target.value === 'Custom range') {
      handleDateClick(event as unknown as React.MouseEvent<HTMLElement>);
    }
  };

  const updateActiveFilters = (filterType: string, isActive: boolean) => {
    if (isActive && !activeFilters.includes(filterType)) {
      setActiveFilters([...activeFilters, filterType]);
    } else if (!isActive && activeFilters.includes(filterType)) {
      setActiveFilters(activeFilters.filter(filter => filter !== filterType));
    }
  };

  const handleClearFilters = () => {
    setSelectedInsurers([]);
    setSelectedAgents([]);
    setSelectedStatus('All');
    setSelectedDateRange('Next 7 days');
    setStartDate(null);
    setEndDate(null);
    setActiveFilters([]);
  };

  const applyFilters = () => {
    const filters = {
      search: searchValue,
      insurers: selectedInsurers,
      agents: selectedAgents,
      status: selectedStatus,
      dateRange: selectedDateRange,
      customDateRange: {
        start: startDate,
        end: endDate
      }
    };
    
    if (onFilterChange) {
      onFilterChange(filters);
    }
    
    handleFilterClose();
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2.5, 
          border: '1px solid #E5E7EB', 
          borderRadius: 3,
          background: '#ffffff',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search clients, policies, or tasks..."
            value={searchValue}
            onChange={handleSearchChange}
            sx={{ 
              flexGrow: 1, 
              minWidth: '200px',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                backgroundColor: '#F9FAFB',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: '#9CA3AF' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            size="small"
            sx={{ 
              borderRadius: 2.5,
              borderColor: '#E5E7EB',
              color: '#374151',
              fontWeight: 600,
              px: 2,
              position: 'relative',
              '&:hover': {
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.04)',
              },
            }}
          >
            Filters
            {activeFilters.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  color: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
                }}
              >
                {activeFilters.length}
              </Box>
            )}
          </Button>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            sx={{ 
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              fontWeight: 600,
              px: 2,
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
                boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
              },
            }}
          >
            Add Task
          </Button>
        </Box>
        
        {activeFilters.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {activeFilters.includes('insurer') && selectedInsurers.length > 0 && (
              <Chip 
                label={`Insurers: ${selectedInsurers.length}`} 
                onDelete={() => {
                  setSelectedInsurers([]);
                  updateActiveFilters('insurer', false);
                }}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            
            {activeFilters.includes('agent') && selectedAgents.length > 0 && (
              <Chip 
                label={`Agents: ${selectedAgents.length}`} 
                onDelete={() => {
                  setSelectedAgents([]);
                  updateActiveFilters('agent', false);
                }}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            
            {activeFilters.includes('status') && (
              <Chip 
                label={`Status: ${selectedStatus}`} 
                onDelete={() => {
                  setSelectedStatus('All');
                  updateActiveFilters('status', false);
                }}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            
            {activeFilters.includes('date') && (
              <Chip 
                label={`Date: ${selectedDateRange}`} 
                onDelete={() => {
                  setSelectedDateRange('Next 7 days');
                  updateActiveFilters('date', false);
                }}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            
            {activeFilters.length > 1 && (
              <Chip 
                label="Clear all" 
                onDelete={handleClearFilters}
                size="small"
                color="error"
                variant="outlined"
              />
            )}
          </Box>
        )}
      </Paper>
      
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          style: {
            width: 350,
            padding: '8px 0',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="600">
              Filter Options
            </Typography>
            <IconButton size="small" onClick={handleClearFilters}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={selectedStatus}
              onChange={handleStatusChange}
              label="Status"
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="insurer-label">Insurer</InputLabel>
            <Select
              labelId="insurer-label"
              multiple
              value={selectedInsurers}
              onChange={handleInsurerChange}
              input={<OutlinedInput label="Insurer" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {insurers.map((insurer) => (
                <MenuItem key={insurer} value={insurer}>
                  {insurer}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="agent-label">Assigned Agent</InputLabel>
            <Select
              labelId="agent-label"
              multiple
              value={selectedAgents}
              onChange={handleAgentChange}
              input={<OutlinedInput label="Assigned Agent" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {agents.map((agent) => (
                <MenuItem key={agent} value={agent}>
                  {agent}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="date-range-label">Date Range</InputLabel>
            <Select
              labelId="date-range-label"
              value={selectedDateRange}
              onChange={handleDateRangeChange}
              label="Date Range"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleDateClick}
                    size="small"
                  >
                    <DateRangeIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              }
            >
              {dateRanges.map((range) => (
                <MenuItem key={range} value={range}>
                  {range}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              onClick={applyFilters}
              sx={{ borderRadius: 2 }}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Menu>
      
      <Popover
        open={Boolean(dateAnchorEl)}
        anchorEl={dateAnchorEl}
        onClose={handleDateClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Custom Date Range
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              onClick={handleDateClose}
              sx={{ borderRadius: 2 }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default FilterBar;
