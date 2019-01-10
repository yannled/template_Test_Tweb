import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import {post} from 'axios';
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/es/Button/Button";
import RemoveUserFriends from "../graphQLComponents/RemoveUserFriends";

const styles = theme => ({
    modal: {
        borderRadius: '5px',
        width: '333px',
        height: '600px',
        background: theme.palette.primary.main,
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative'
    },
    title: {
        marginTop: '0px',
    },
    col: {
        paddingLeft: '2.5px',
        paddingRight: '2.5px',
    },
    table: {
        paddingLeft: '5px',
        paddingRight: '5px',
    },
});


class FriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actual_user_id: this.props.user_id || '0',
            friends: this.props.data.getUser.friends || '',
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.modal}>
                {this.state.friends.length === 0 &&
                <h3 className={classes.title}>you don't have any friends</h3>
                }

                {this.state.friends.length > 0 &&
                <div>
                    <h3 className={classes.title}>your friends</h3>
                    <div className={classes.table}>
                        {this.state.friends.map(friend => (
                            <tr>
                                <td className={classes.col}>{friend.name}</td>
                                <td className={classes.col}>{friend.lastName}</td>
                                <RemoveUserFriends>
                                    {remove => {

                                        let {actual_user_id} = this.state;

                                        const onRemoveFriend = (e) => {
                                            e.preventDefault();
                                            remove(actual_user_id,friend._id)
                                                .then(() => {
                                                    var index = this.state.friends.indexOf(friend);
                                                    if (index > -1) {
                                                        this.state.friends.splice(index, 1);
                                                    }
                                                })
                                                .catch(
                                                    console.log
                                                )
                                        };
                                        return (
                                            <td><Button onClick={onRemoveFriend}>remove</Button></td>
                                        )
                                    }}
                                </RemoveUserFriends>
                            </tr>
                        ))}
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default withRouter(
    withStyles(styles)(
        FriendsList
    )
);
