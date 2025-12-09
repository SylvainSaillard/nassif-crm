import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB', // Primary blue as requested
      light: '#93C5FD', // Light pastel blue for pending status
      dark: '#1D4ED8', // Darker blue for status text
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#212b36', // Near-black as secondary color
      light: '#4e5862',
      dark: '#0a0f14',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F9FAFB', // Lighter background for a cleaner look
      paper: '#ffffff',
    },
    text: {
      primary: '#212b36', // Near-black for text
      secondary: '#637381', // Medium gray with blue undertone
    },
    error: {
      main: '#EF4444', // Red for errors/overdue
    },
    warning: {
      main: '#F59E0B', // Amber for warnings
    },
    info: {
      main: '#E0F2FE', // Light blue for notification badges
    },
    success: {
      main: '#10B981', // Green for success/completed
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.1rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(26, 95, 156, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1a5f9c 0%, #2d7cc7 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px 0 rgba(33, 43, 54, 0.08)',
          border: '1px solid rgba(26, 95, 156, 0.05)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 4px 20px 0 rgba(33, 43, 54, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: '#F9FAFB',
          color: '#212b36',
          borderBottom: '1px solid #E5E7EB',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        filledPrimary: {
          backgroundColor: '#93C5FD',
          color: '#1D4ED8',
        },
        filledSecondary: {
          backgroundColor: '#E0F2FE',
          color: '#2563EB',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          color: '#ffffff',
          border: '2px solid #ffffff',
          boxShadow: '0 0 0 1px rgba(229, 231, 235, 0.8)',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '0.875rem',
          letterSpacing: '0.01em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        colorDefault: {
          background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        },
        circular: {
          borderRadius: '50%',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#212b36',
          backgroundColor: 'rgba(26, 95, 156, 0.04)',
        },
      },
    },
  },
});

export default theme;
