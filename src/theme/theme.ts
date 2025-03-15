import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Color palette
const colors = {
  primary: {
    main: '#4CAF50', // Green - representing health and wellness
    light: '#80E27E',
    dark: '#087F23',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#2196F3', // Blue - representing trust and reliability
    light: '#6EC6FF',
    dark: '#0069C0',
    contrastText: '#FFFFFF',
  },
  accent: {
    main: '#FF9800', // Orange - representing energy and vitality
    light: '#FFC947',
    dark: '#C66900',
    contrastText: '#000000',
  },
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#333333',
    secondary: '#757575',
    disabled: '#9E9E9E',
  },
  error: {
    main: '#F44336',
    light: '#FF7961',
    dark: '#BA000D',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFC107',
    light: '#FFE082',
    dark: '#FFA000',
    contrastText: '#000000',
  },
  info: {
    main: '#03A9F4',
    light: '#67DAFF',
    dark: '#007AC1',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#4CAF50',
    light: '#80E27E',
    dark: '#087F23',
    contrastText: '#FFFFFF',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

// Create base theme
let theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
    text: colors.text,
    background: colors.background,
    divider: colors.divider,
  },
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: 'none', // Avoid all-caps buttons
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 2.66,
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8, // Base spacing unit of 8px
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50, // Rounded buttons
          padding: '8px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: colors.primary.dark,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: colors.secondary.dark,
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Make typography responsive
theme = responsiveFontSizes(theme);

export default theme;
