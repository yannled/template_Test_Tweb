import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import RaisedButton from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import CreateUser from './graphQLComponents/CreateUser';

const styles = theme => ({
  form: {
    borderRadius: '5px',
    width: '333px',
    height: 'auto',
    background: theme.palette.primary.main,
    color: '#ffffff',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  formContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    marginTop: '30px',
  },
  input: {
    background: 'white',
    borderRadius: '5px',
    opacity: '0.9',
    margin: '5px 0',
  },
  button: {
    width: '50%',
    color: 'white',
    border: 'solid',
    borderWidth: 'thin',
    marginTop: '15px',
  },
  radioGroup: {
    margin: '8px 0',
  },
  radio: {
    marginRight: '40px',
  },
  bottom: {
    marginBottom: '30px',
  },
});


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      gender: 'Woman',
      password1: '',
      password2: '',
      nameError: false,
      nameErrorText: null,
      lastNameError: false,
      lastNameErrorText: null,
      emailError: false,
      emailErrorText: null,
      password1Error: false,
      password1ErrorText: null,
      password2Error: false,
      password2ErrorText: null,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <CreateUser>
        {(create) => {
          const {
            name, lastName, email, password1: password,
          } = this.state;

          const onSubmit = (e) => {
            e.preventDefault();
            let error = false;
            this.setState({ nameError: false });
            this.setState({ nameErrorText: null });
            this.setState({ lastNameError: false });
            this.setState({ lastNameErrorText: null });
            this.setState({ emailError: false });
            this.setState({ emailErrorText: null });
            this.setState({ password1Error: false });
            this.setState({ password1ErrorText: null });
            this.setState({ password2Error: false });
            this.setState({ password2ErrorText: null });
            if (this.state.name === '') {
              this.setState({ nameError: true });
              this.setState({ nameErrorText: "Can't be empty" });
              error = true;
            }
            if (this.state.lastName === '') {
              this.setState({ lastNameError: true });
              this.setState({ lastNameErrorText: "Can't be empty" });
              error = true;
            }
            if (this.state.email === '') {
              this.setState({ emailError: true });
              this.setState({ emailErrorText: "Can't be empty" });
              error = true;
            }
            if (this.state.password1 === '') {
              this.setState({ password1Error: true });
              this.setState({ password1ErrorText: "Can't be empty" });
              error = true;
            }
            if (this.state.password2 === '') {
              this.setState({ password2Error: true });
              this.setState({ password2ErrorText: "Can't be empty" });
              error = true;
            }
            if (this.state.password1 !== this.state.password2) {
              this.setState({ password2Error: true });
              this.setState({ password2ErrorText: 'Passwords should be equals' });
              error = true;
            }
            // eslint-disable-next-line
                        if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
              this.setState({ emailError: true });
              this.setState({ emailErrorText: 'Should be an email' });
              error = true;
            }
            if (!error) {
              create({
                name, lastName, email, password,
              })
                .then(() => {
                  this.props.history.push('/login');
                })
                .catch(
                  console.log,
                );
            }
          };

          return (
            <Paper className={classes.form} elevation={8}>
              <div className={classes.title}>
                <h2>Register</h2>
              </div>
              <form onSubmit={onSubmit} className={classes.formContent}>
                <TextField
                  label="First Name"
                  id="name"
                  className={classes.inputContainer}
                  InputProps={{ className: classes.input }}
                  fullWidth
                  variant="outlined"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  error={this.state.nameError}
                  helperText={this.state.nameErrorText}
                />
                <br />
                <TextField
                  label="Last Name"
                  id="lastName"
                  className={classes.inputContainer}
                  InputProps={{ className: classes.input }}
                  fullWidth
                  variant="outlined"
                  value={this.state.lastName}
                  onChange={e => this.setState({ lastName: e.target.value })}
                  error={this.state.lastNameError}
                  helperText={this.state.lastNameErrorText}
                />
                <br />
                <rb />
                <TextField
                  label="Email"
                  id="email"
                  className={classes.inputContainer}
                  InputProps={{ className: classes.input }}
                  fullWidth
                  variant="outlined"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  error={this.state.emailError}
                  helperText={this.state.emailErrorText}
                />
                <br />
                <TextField
                  label="Password"
                  id="password1"
                  type="password"
                  className={classes.inputContainer}
                  InputProps={{ className: classes.input }}
                  fullWidth
                  variant="outlined"
                  value={this.state.password1}
                  onChange={e => this.setState({ password1: e.target.value })}
                  error={this.state.password1Error}
                  helperText={this.state.password1ErrorText}
                />
                <br />
                <TextField
                  label="Repeate Password"
                  id="password2"
                  type="password"
                  className={classes.inputContainer}
                  InputProps={{ className: classes.input }}
                  fullWidth
                  variant="outlined"
                  value={this.state.password2}
                  onChange={e => this.setState({ password2: e.target.value })}
                  error={this.state.password2Error}
                  helperText={this.state.password2ErrorText}
                />
                <RaisedButton
                  label="Submit"
                  type="submit"
                  className={classes.button}
                >
Submit
                </RaisedButton>
              </form>
              <div className={classes.bottom} />
            </Paper>
          );
        }}
      </CreateUser>
    );
  }
}

export default withRouter(
  withStyles(styles)(
    LoginForm,
  ),
);
