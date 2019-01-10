import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar'
import Theme from './Theme'

const styles = theme => {
    return {
        body: {
        },
    }
};

class Layout extends Component {

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    render() {
        const { children,classes } = this.props;
        return (
            <div>
                <Theme>
                    <NavBar />
                    <div className={classes.body}>
                    {children}
                    </div>
                </Theme>
            </div>
        );
    }
}

export default compose(
    withRouter,
    withStyles(styles),
)(Layout);
