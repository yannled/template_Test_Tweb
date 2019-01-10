import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom'
import {AuthContext} from "./AuthProvider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import GetUserNotificatons from "./graphQLComponents/GetUserNotificatons";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";

const styles = {
    avatar: {
        margin: 10,
        width: 30,
        height: 30
    },
    notificationPoper: {
      width : '160px',
    }
};

class ProfileNav extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    state = {
        anchorEl: null,
        open: false,
    };

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const {anchorEl} = this.state;
        const {classes} = this.props;
        const {open} = this.state;
        const isMenuOpen = Boolean(anchorEl);

        return (

            <div className={classes.sectionDesktop}>

                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <AuthContext>
                    {({user_id}) => {
                        return (
                            <GetUserNotificatons breed={user_id}/>
                        );
                    }
                    }
                </AuthContext>
                <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                >
                    <div className={classes.ProfileNav}>
                        <Avatar alt="profile_avatar"
                                src={require("../img/profile_pic.png")}
                                className={classes.avatar}
                        />
                    </div>
                </IconButton>
            </div>

        );
    }
}


ProfileNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileNav);
