import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import RaisedButton from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {AuthContext} from "../AuthProvider";
import UpdateUser from "../graphQLComponents/ModifyUser";
import FormControl from "@material-ui/core/FormControl/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    form: {
        borderRadius: '5px',
        width: '333px',
        height: 'auto',
        background: theme.palette.primary.main,
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative'
    },
    title: {
        marginTop: '0px',
    },
    input: {
        background: 'white',
        borderRadius: '5px',
        opacity: '0.9',
        width: '70%',
        margin: '5px 0'
    },
    button: {
        width: '50%',
        color: 'white',
        border: 'solid',
        borderWidth: 'thin',
    },
    radioGroup: {
        margin: '8px 0'
    },
    radio: {
        marginRight: '40px'
    }
});


class ModifyProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name || '',
            lastName: this.props.data.lastName || '',
            email: this.props.data.email || '',
            job: this.props.data.job || '',
            webSite: this.props.data.webSite || '',
            gender: this.props.data.gender || '',
            password1: this.props.data.password1 || '',
            password2: this.props.data.password2 || '',
        }
    }

    render() {
        const {classes} = this.props;
        const error = null;
        return (
            <AuthContext>
                {({user_id}) => {
                    return (
                        <UpdateUser>
                            {update => {

                                let {name, lastName, email, job, webSite, gender} = this.state;

                                const onSubmit = (e) => {
                                    e.preventDefault();
                                    update(user_id,{name, lastName, email, job, webSite, gender})
                                        .then(() => {
                                            window.location.reload();
                                        })
                                        .catch(
                                            console.log
                                        );
                                };
                                return (
                                    <Paper className={classes.form} elevation={8}>
                                        <div className={classes.title}>
                                            <h2 className={classes.title}>Modify Profile</h2>
                                        </div>
                                        <form onSubmit={onSubmit}>
                                            <TextField
                                                label="Name"
                                                id="name"
                                                className={classes.input}
                                                fullWidth={true}
                                                variant="outlined"
                                                value={this.state.name}
                                                onChange={e => this.setState({name: e.target.value})}
                                            />
                                            <TextField
                                                label="Last Name"
                                                id="lastName"
                                                className={classes.input}
                                                fullWidth={true}
                                                variant="outlined"
                                                value={this.state.lastName}
                                                onChange={e => this.setState({lastName: e.target.value})}
                                            />
                                            <TextField
                                                label="Email"
                                                id="email"
                                                className={classes.input}
                                                fullWidth={true}
                                                variant="outlined"
                                                value={this.state.email}
                                                onChange={e => this.setState({email: e.target.value})}
                                            />
                                            <rb/>
                                            <div>
                                                <FormControl component="fieldset">

                                                    <RadioGroup
                                                        aria-label="Gender"
                                                        name="gender"
                                                        className={classes.group}
                                                        value={this.state.gender}
                                                        onChange={e => this.setState({gender: e.target.value})}
                                                    >
                                                        <FormGroup row>
                                                            <FormControlLabel value="female" control={<Radio/>}
                                                                              label="Female"/>
                                                            <FormControlLabel value="male" control={<Radio/>}
                                                                              label="Male"/>
                                                        </FormGroup>
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <rb/>
                                            <TextField
                                                label="Job"
                                                id="job"
                                                className={classes.input}
                                                fullWidth={true}
                                                variant="outlined"
                                                value={this.state.job}
                                                onChange={e => this.setState({job: e.target.value})}
                                            />
                                            <TextField
                                                label="Website"
                                                id="website"
                                                className={classes.input}
                                                fullWidth={true}
                                                variant="outlined"
                                                value={this.state.webSite}
                                                onChange={e => this.setState({webSite: e.target.value})}
                                            />
                                            <br/>
                                            <TextField
                                                label="Password"
                                                id="password1"
                                                type="password"
                                                className={classes.input}
                                                fullWidth={true}
                                                variant="outlined"
                                                value={this.state.password1}
                                                onChange={e => this.setState({password1: e.target.value})}
                                            />
                                            <TextField
                                                label="Password Repeate"
                                                id="password2"
                                                type="password"
                                                className={classes.input}
                                                fullWidth={true}
                                                variant="outlined"
                                                value={this.state.password2}
                                                onChange={e => this.setState({password2: e.target.value})}
                                            /><br/>
                                            <br/>
                                            <RaisedButton
                                                label="Submit"
                                                type="submit"
                                                className={classes.button}
                                            >Update my profile</RaisedButton>
                                            <p style={{color: 'red'}}>{error}</p>
                                        </form>
                                        <br/>
                                    </Paper>
                                )
                            }}
                        </UpdateUser>
                    );
                }
                }
            </AuthContext>

        );
    }
}

export default withRouter(
    withStyles(styles)(
        ModifyProfileForm
    )
);
