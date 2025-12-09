import React from 'react';
import {
  Box,
  Typography,
  Paper,
  alpha,
} from '@mui/material';
import {
  Users,
  FileText,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface KPIProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  gradient: string;
  lightColor: string;
  onClick?: () => void;
}

const KPICard: React.FC<KPIProps> = ({ 
  icon, 
  title, 
  value, 
  change, 
  positive, 
  gradient,
  lightColor,
  onClick
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: '#E5E7EB',
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        background: '#ffffff',
        '&:hover': {
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.12)',
          transform: 'translateY(-4px)',
          borderColor: lightColor,
          '& .kpi-icon-box': {
            transform: 'scale(1.1) rotate(5deg)',
          },
          '& .kpi-arrow': {
            transform: 'translateX(2px)',
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          background: `linear-gradient(135deg, transparent 0%, ${alpha(lightColor, 0.08)} 100%)`,
          borderRadius: '0 16px 16px 0',
        },
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#6B7280',
              fontWeight: 500,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              mt: 1,
              mb: 1.5,
              color: '#111827',
              fontSize: '1.75rem',
              letterSpacing: '-0.02em',
            }}
          >
            {value}
          </Typography>
          {change && (
            <Box 
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: 1.5,
                backgroundColor: positive ? alpha('#10B981', 0.1) : alpha('#EF4444', 0.1),
              }}
            >
              {positive ? (
                <ArrowUpRight size={14} color="#10B981" className="kpi-arrow" style={{ transition: 'transform 0.2s ease' }} />
              ) : (
                <ArrowDownRight size={14} color="#EF4444" className="kpi-arrow" style={{ transition: 'transform 0.2s ease' }} />
              )}
              <Typography 
                variant="caption" 
                sx={{ 
                  color: positive ? '#059669' : '#DC2626',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                }}
              >
                {change}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          className="kpi-icon-box"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: gradient,
            borderRadius: 2.5,
            width: 52,
            height: 52,
            boxShadow: `0 8px 16px -4px ${alpha(lightColor, 0.4)}`,
            transition: 'transform 0.3s ease',
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
    console.log(`Clicked on KPI: ${title}`);
  };

  const kpis = [
    {
      icon: <Users size={24} color="white" strokeWidth={2} />,
      title: 'Active Members',
      value: '247',
      change: '+12% this month',
      positive: true,
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      lightColor: '#10B981',
      onClick: () => handleKPIClick('Active Members'),
    },
    {
      icon: <FileText size={24} color="white" strokeWidth={2} />,
      title: 'Total Policies',
      value: '32',
      change: '+8% this month',
      positive: true,
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      lightColor: '#3B82F6',
      onClick: () => handleKPIClick('Total Policies'),
    },
    {
      icon: <Clock size={24} color="white" strokeWidth={2} />,
      title: 'Avg. Renewal Cycle',
      value: '18 days',
      change: '5% faster',
      positive: true,
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      lightColor: '#F59E0B',
      onClick: () => handleKPIClick('Avg. Renewal Cycle'),
    },
    {
      icon: <TrendingUp size={24} color="white" strokeWidth={2} />,
      title: 'Satisfaction Rate',
      value: '96%',
      change: '+2% this month',
      positive: true,
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      lightColor: '#8B5CF6',
      onClick: () => handleKPIClick('Satisfaction Rate'),
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </Box>
    </Box>
  );
};

export default MiniKPIs;
