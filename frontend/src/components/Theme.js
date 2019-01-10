import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light:'#00faa8',
            main:'#00db93',
            dark:'#009c69'
        },
        secondary: {
            main:'#54748A'
        },
        white : {
            white:'#ffffff'
        }
    }
});

const Theme = ({children}) => {
    return(
     <MuiThemeProvider theme={theme}>
        {children}
    </MuiThemeProvider>
    )
}

export default Theme;
