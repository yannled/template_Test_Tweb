import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Modal from 'react-modal';
import ModifyProfileForm from './ModifyProfileForm';
import Button from '@material-ui/core/Button';
import AddUserFriends from "../graphQLComponents/AddUserFriends";
import GetUserFriends from "../graphQLComponents/GetUserFriends";


const styles = theme => ({
    form: {
        borderRadius: '5px',
        width: '100%',
        height: '550px',
        background: theme.palette.primary.main,
        color: '#ffffff',
        position: 'relative',
        textAlign: 'center',
    },
    title: {
        marginTop: '30px',
        textAlign: 'center',
    },
    input: {
        background: 'white',
        borderRadius: '5px',
        opacity: '0.9',
        width: '20%',
        margin: '5px 0',
        marginLeft: '10px',
    },
    button: {
        width: '50%',
        color: 'white',
        border: 'solid',
        borderWidth: 'thin'
    }

});

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
        padding: '0px',
    }
};

class ProfileInfos extends Component {
    constructor(props) {
        super(props);
        this.openModalModifyProfile = this.openModalModifyProfile.bind(this);
        this.afterOpenModalModifyProfile = this.afterOpenModalModifyProfile.bind(this);
        this.closeModalModifyProfile = this.closeModalModifyProfile.bind(this);
        this.openModalListFriends = this.openModalListFriends.bind(this);
        this.afterOpenModalListFriends = this.afterOpenModalListFriends.bind(this);
        this.closeModalListFriends = this.closeModalListFriends.bind(this);
        this.state = {
            actual_user_id: this.props.user_id || '0',
            _id: this.props.data.getUser._id || 'Unknown',
            name: this.props.data.getUser.name || 'Unknown',
            lastName: this.props.data.getUser.lastName || 'Unknown',
            email: this.props.data.getUser.email || 'Unknown',
            gender: this.props.data.getUser.gender || 'Unknown',
            password1: this.props.data.getUser.password1 || 'Unknown',
            password2: this.props.data.getUser.password2 || 'Unknown',
            job: this.props.data.getUser.job || 'Unknown',
            webSite: this.props.data.getUser.webSite || 'Unknown',
            modalModifyProfileIsOpen: false,
            modalListFriendsIsOpen: false,
            isMyFriend: false,
        };
    }

    openModalModifyProfile() {
        this.setState({modalModifyProfileIsOpen: true});
    }

    afterOpenModalModifyProfile() {
    }

    closeModalModifyProfile() {

        this.setState({modalModifyProfileIsOpen: false});
    }

    openModalListFriends() {
        this.setState({modalListFriendsIsOpen: true});
    }

    afterOpenModalListFriends() {
    }

    closeModalListFriends() {

        this.setState({modalListFriendsIsOpen: false});
    }

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.form} elevation={8}>
                <div>
                    <div>
                        <TextField
                            disabled={true}
                            label="Name"
                            id="name"
                            className={classes.input}
                            fullWidth={true}
                            variant="outlined"
                            value={this.state.name}
                        />
                        <TextField
                            disabled={true}
                            label="Last Name"
                            id="lastName"
                            className={classes.input}
                            fullWidth={true}
                            variant="outlined"
                            value={this.state.lastName}
                        />
                    </div>
                    <rb/>
                    <div>
                        <TextField
                            disabled={true}
                            label="Job"
                            id="job"
                            className={classes.input}
                            fullWidth={true}
                            variant="outlined"
                            value={this.state.job}
                        />
                        <TextField
                            disabled={true}
                            label="Website"
                            id="website"
                            className={classes.input}
                            fullWidth={true}
                            variant="outlined"
                            value={this.state.webSite}
                        />
                    </div>
                </div>
                {this.state.actual_user_id === this.state._id &&
                <div>
                    <Button onClick={this.openModalModifyProfile}>Modify Profile</Button>
                    <Button onClick={this.openModalListFriends}>my Friends</Button>
                </div>
                }
                < Modal
                    isOpen={this.state.modalModifyProfileIsOpen}
                    onAfterOpen={this.afterOpenModalModifyProfile}
                    onRequestClose={this.closeModalModifyProfile}
                    style={customStyles}
                    contentLabel="Modify Profile Modal"
                >
                    <ModifyProfileForm data={this.state}/>
                </Modal>

                < Modal
                    isOpen={this.state.modalListFriendsIsOpen}
                    onAfterOpen={this.afterOpenModalListFriends}
                    onRequestClose={this.closeModalListFriends}
                    style={customStyles}
                    contentLabel="Modify Profile Modal"
                >
                    <GetUserFriends breed={this.state.actual_user_id}/>
                </Modal>
                <AddUserFriends>
                    {add => {

                        let {actual_user_id, _id} = this.state;

                        const onAddFriend = (e) => {
                            e.preventDefault();
                            add(actual_user_id, _id)
                                .then(() => {
                                    this.setState({isMyFriend: true});
                                })
                                .catch(
                                    console.log
                                )
                        };
                        return (
                            <div>
                                {this.state.actual_user_id !== this.state._id &&
                                <div>
                                    <Button onClick={onAddFriend}>Add As Friend</Button>
                                    {this.state.isMyFriend &&
                                    <p>{this.state.name} is your friend</p>
                                    }
                                </div>
                                }

                            </div>
                        );
                    }
                    }
                </AddUserFriends>
            </Paper>
        );
    }
}


export default withStyles(styles)(ProfileInfos);
