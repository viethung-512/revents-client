import { createMuiTheme } from '@material-ui/core/styles';

const parentTheme = createMuiTheme({});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00B5AD',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1678C2',
      contrastText: '#fff',
    },
  },
  custom: {
    successButton: {
      contained: {
        backgroundColor: parentTheme.palette.success.main,
        '&:hover': {
          backgroundColor: parentTheme.palette.success.dark,
        },
      },
      outlined: {
        color: parentTheme.palette.success.main,
        borderColor: parentTheme.palette.success.main,
        '&:hover': {
          backgroundColor: parentTheme.palette.action.hover,
          borderColor: parentTheme.palette.success.main,
        },
      },
    },
    errorButton: {
      contained: {
        backgroundColor: parentTheme.palette.error.main,
        '&:hover': {
          backgroundColor: parentTheme.palette.error.dark,
        },
      },
      outlined: {
        color: parentTheme.palette.error.main,
        borderColor: parentTheme.palette.error.main,
        '&:hover': {
          backgroundColor: parentTheme.palette.action.hover,
          borderColor: parentTheme.palette.error.main,
        },
      },
    },
  },
});

export default theme;
