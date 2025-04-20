import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700' // Gold
    },
    secondary: {
      main: '#000000' // Black
    },
    background: {
      default: '#f5f5f5'
    },
    text: {
      primary: '#000000'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 600
    },
    body2: {
      fontSize: '0.95rem'
    }
  }
});

export default theme;
