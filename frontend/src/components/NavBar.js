import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthProvider';

const styles = theme => ({
    profileBar: {
        marginRight: 100,
    },
    head: {
        flexGrow: 1,
        color: "white",
    },
    title:{
        fontFamily: "Caladea",
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: "white",
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        flexGrow: 1,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 300,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    }


});

const debounce = (func, wait) => {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
    }
}

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.updateSearch = this.updateSearch.bind(this);
        this.state = {
            navBarPosition: 'static',
            searchValue : 'none',
        }
    }


    componentDidMount() {
        // 32 is the number of milliseconds to debounce
        // I picked this because it's approx 1 frame (ie: 16.7ms)
        // You'll want to modulate that to your taste.
        // Add console.logs in handleScroll function to check if its flooding.
        return window.addEventListener('scroll', debounce(this.handleScroll, 16))
    }

    componentWillUnmount() {
        return window.removeEventListener('scroll', debounce(this.handleScroll, 16))
    }

    handleScroll = () => {
        // + is unary operator, same as Number(window.scrollY)
        const scrollPositionY = +window.scrollY;
        console.log(scrollPositionY);
        if(scrollPositionY<=0){
            return this.setState({navBarPosition: 'static'})
        }
        else{
            return this.setState({navBarPosition: 'fixed'})
        }
    };

    updateSearch(event){
        this.setState({searchValue: event.target.value});
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position={this.state.navBarPosition}>
                    <ToolBar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h4" color="inherit">Test-TWEB</Typography>

                        <AuthContext>
                            {({ signOut }) => (
                                <button onClick={signOut}>LOGOUT</button>
                            )}
                        </AuthContext>
                    </ToolBar>
                </AppBar>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
