
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';


const style = {
    name: {
        h1: 'h1',
        fontFamily: 'Snell Roundhand',
        fontWeight: 'bold',
        fontStyle: 'cursive',
        color: 'red',
    },
};

class ProfileName extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography className={classes.name} variant="h2" justify="center" alignItems="center" direction='column'>
                    Sarrah Baker
            </Typography>
            </div>
        );
    }
}

export default withStyles(style)(ProfileName);
