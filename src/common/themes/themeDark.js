import { createMuiTheme } from '@material-ui/core/styles';

const themeDark = createMuiTheme({
    palette: {
        primary: {
            main: '#2C3A47',
            icon: '#777777',
            light: '#dfe6e9'
        },
        secondary: {
            main: '#ffffff'
        },
        background: {
            default: '#f2f7fb',
            dark: '#D9E3EB'
        },
        list: {
            main: '#D9E3EB'
        },
        label: {
            main: '#777777'
        },
        colors: {
            black: '#000',
            gray: {
                main: '#777777',
                light: '#d0d0d0',
                dark: '#46474E',
                veryLight: '#E6E6E6',
                darkGrayishBlue: '#60626E'
            },

            main: '#004372',
            white: '#ffffff',
            red: '#b33939',
            green: '#218c74',
            magenta: '#6D214F',
            pink: '#34495e',
            indigo: '#2980b9',
            purple: 'rgba(64, 64, 122,1.0)',
            dark: '#2C3A47',
            blue: {
                light: '#a2c6e0',
                veryLight: '#f2f7fb'
            }
        }
    },

    overrides: {
        MuiListItem: {
            root: {
                '&$selected': {
                    color: '#2C3A47',
                    fontSize: '16px',
                    backgroundColor: '#D9E3EB',
                    '&:hover': {
                        backgroundColor: '#D9E3EB',
                        color: '#2C3A47'
                    }
                }
            }
        },
        MuiCssBaseline: {
            '@global': {
                '*': {
                    'scrollbar-width': 'thin'
                },
                '*::-webkit-scrollbar': {
                    width: '1em',
                    height: '0.5em'
                },
                '*::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    borderRadius: '6px'
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: 'rgba(0,0,0,.4)',
                    borderRadius: '6px'
                }
            }
        },
        MuiFormHelperText: {
            root: {
                position: 'absolute',
                top: '2.7rem',
                textTransform: 'capitalize',
                color: '#FF0000',
                fontWeight: '300',
                marginLeft: 0
            }
        }
    }
});

export default themeDark;