import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  People as PeopleIcon,
  InsertChartOutlined as ChartIcon,
  AccessTime as TimeIcon,
  ThumbUp as ThumbUpIcon
} from '@mui/icons-material';

interface KPIProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

const KPICard: React.FC<KPIProps> = ({ 
  icon, 
  title, 
  value, 
  change, 
  positive, 
  color, 
  bgColor,
  onClick
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid #f0f0f0',
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)'
        }
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="600">
            {value}
          </Typography>
          {change && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: positive ? 'success.main' : 'error.main',
                display: 'flex',
                alignItems: 'center',
                mt: 0.5
              }}
            >
              {positive ? '+' : '-'}{change}
            </Typography>
          )}
        </Box>
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
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );
};

const MiniKPIs: React.FC = () => {
  const handleKPIClick = (title: string) => {
    // This would typically filter data or navigate to a detailed view
    console.log(`Clicked on KPI: ${title}`);
    // In a real application, you might do something like:
    // navigate(`/details/${title.toLowerCase().replace(/ /g, '-')}`);
    // or dispatch an action to filter data
    // dispatch({ type: 'FILTER_BY_KPI', payload: title });
  };

  const kpis = [
    {
      icon: <PeopleIcon />,
      title: 'Active Members',
      value: '247',
      change: '12% this month',
      positive: true,
      color: '#2e7d32',
      bgColor: '#e8f5e9',
      onClick: () => handleKPIClick('Active Members'),
    },
    {
      icon: <ChartIcon />,
      title: 'Total Policies',
      value: '32',
      change: '8% this month',
      positive: true,
      color: '#0288d1',
      bgColor: '#e1f5fe',
      onClick: () => handleKPIClick('Total Policies'),
    },
    {
      icon: <TimeIcon />,
      title: 'Avg. Renewal Cycle',
      value: '18 days',
      change: '5% faster',
      positive: true,
      color: '#ed6c02',
      bgColor: '#fff4e5',
      onClick: () => handleKPIClick('Avg. Renewal Cycle'),
    },
    {
      icon: <ThumbUpIcon />,
      title: 'Satisfaction Rate',
      value: '96%',
      change: '2% this month',
      positive: true,
      color: '#d32f2f',
      bgColor: '#ffebee',
      onClick: () => handleKPIClick('Satisfaction Rate'),
    },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
        {kpis.map((kpi, index) => (
          <Box key={index}>
            <KPICard {...kpi} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MiniKPIs;
