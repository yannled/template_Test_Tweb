import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from "./graphQLComponents/GetUserNotificatons";
import Menu from '@material-ui/core/Menu';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    list: {
        width: '100%',
        maxWidth: 360,
        padding: '0px',
        backgroundColor : theme.palette.primary.main,
    },
    listElement : {
        padding: '0px',
        backgroundColor : theme.palette.primary.main,
    },
    buttonListRead : {
        backgroundColor : theme.palette.white.white,
        borderColor : theme.palette.primary.main,
        borderStyle : 'solid',
        borderTop : '0px',
    },
    buttonListUnRead : {
        backgroundColor : theme.palette.primary.main,
        borderColor : theme.palette.primary.main,
        borderStyle : 'solid',
        borderTop : '0px',
        '&:hover': {
            backgroundColor : theme.palette.white.white,
        }
    },

});

//TODO : ENVOYER Le UPDATE NOTIFICATION lors du click sur une notification
class NotificationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actual_user_id: this.props.user_id || '0',
            notifications: this.props.data.getUser.notifications || 'Unknown',
        };
    }


    render() {
        const {classes} = this.props;
        return (
            <List className={classes.list}>
                {this.state.notifications.map((notification, i) => {
                    const text = notification.user.name + " " + notification.user.lastName + " has a new publication";
                    const handleClick = (e) => {
                        e.preventDefault();
                        notification.read = true;
                    };
                    return (
                        <ListItem className={classes.listElement} alignItems="flex-start">
                            <button className={ notification.read ? classes.buttonListRead : classes.buttonListUnRead}
                            onClick={handleClick}
                            >
                            <ListItemText primary={text}/>
                            </button>
                        </ListItem>)
                })}
            </List>
        );
    }
}


export default withStyles(styles)(NotificationList);
