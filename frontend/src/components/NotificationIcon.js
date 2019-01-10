import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from "@material-ui/core/IconButton";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import NotificationList from "./NotificationList";
import Badge from "@material-ui/core/Badge";

const styles = theme => ({
    notificationPoper: {
        width : '160px',
    }
});


class NotificationIcon extends Component {
    constructor(props) {
        super(props);
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
        const {classes} = this.props;
        const {open} = this.state;

        let nbrNotifications = this.props.data.getUser.notifications.filter(notif => notif.read === false).length

        return (
            <IconButton color="inherit"
                        buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle}
            >
                <Popper className={classes.notificationPoper} open={open} anchorEl={this.anchorEl} transition disablePortal>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <NotificationList user_id={this.props.breed} data={this.props.data}/>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>

                <Badge badgeContent={nbrNotifications} color="secondary">
                    <NotificationsIcon/>
                </Badge>
            </IconButton>
        );
    }
}


export default withStyles(styles)(NotificationIcon);
