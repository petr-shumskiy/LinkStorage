import { createMuiTheme } from '@material-ui/core'

export const createTheme = (type) => ({
  palette: {
    type,
    primary: {
      main: '#0074bf'
    },
    secondary: {
      main: type === 'light' ? '#000' : '#fff'
    }
  },
  unstable_strictMode: {},
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Open Sans"',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    h1: {
      fontSize: 'calc(12px + 2vmin)',
      color: type === 'light' ? '#000' : '#fff',
      fontFamily: 'Bree Serif'
    },
    h2: {
      fontSize: 'calc(6px + 2vmin)',
      fontFamily: 'Open Sans',
      fontWeight: '600',
      color: type === 'light' ? '#111' : '#fff'
    },
    h3: {
      fontSize: 'calc(10px + 1vmin)',
      fontFamily: 'Open Sans',
      fontWeight: '600',
      color: type === 'light' ? '#111' : '#fff'
    },
    body1: {
      color: type === 'light' ? '#222' : '#929292',
      fontSize: 'calc(9px + 1vmin)',
      fontFamily: 'Open Sans',
      textTransform: 'none'
    },
    body2: {
      fontSize: 'calc(8px + 1vmin)',
      color: type === 'light' ? '#404040' : '#fff'
    },
    subtitle1: {
      fontSize: 'calc(8px + 1vmin)',
      color: type === 'light' ? '#7a7a7a' : '#fff'
    },
    subtitle2: {
      fontSize: 'calc(6px + 1vmin)',
      color: type === 'light' ? '#7a7a7a' : '#fff',
      textTransform: 'none'
    }
  }
})

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0074bf'
    },
    secondary: {
      main: '#222'
    }
  },
  unstable_strictMode: {},
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Open Sans"',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    h1: {
      fontSize: 'calc(12px + 2vmin)',
      color: '#000',
      fontFamily: 'Bree Serif'
    },
    h2: {
      fontSize: 'calc(6px + 2vmin)',
      fontFamily: 'Open Sans',
      fontWeight: '600',
      color: '#111'
    },
    h3: {
      fontSize: 'calc(10px + 1vmin)',
      fontFamily: 'Open Sans',
      fontWeight: '600',
      color: '#111'
    },
    body1: {
      color: '#222',
      fontSize: 'calc(9px + 1vmin)',
      fontFamily: 'Open Sans',
      textTransform: 'none'
    },
    body2: {
      fontSize: 'calc(8px + 1vmin)',
      color: '#404040'
    },
    subtitle1: {
      fontSize: 'calc(8px + 1vmin)',
      color: '#7a7a7a'
    },
    subtitle2: {
      fontSize: 'calc(6px + 1vmin)',
      color: '#7a7a7a',
      textTransform: 'none'
    }
  }
})
