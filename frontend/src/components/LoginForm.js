import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import RaisedButton from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { Redirect, Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


const styles = theme => ({
  form: {
    borderRadius: '5px',
    width: '333px',
    height: 'auto',
    background: theme.palette.primary.main,
    color: '#ffffff',
    textAlign: 'center',
    position: 'relative',
  },
  title: {
    marginTop: '30px',
  },
  input: {
    background: 'white',
    borderRadius: '5px',
    opacity: '0.9',
    width: '70%',
    margin: '5px 0',
  },
  button: {
    width: '50%',
    color: 'white',
    border: 'solid',
    borderWidth: 'thin',
  },
  register: {
    fontWeight: 'bold',
    fontSize: '19px',
    color: theme.palette.primary.dark,
    textDecoration: 'none',
  },
  bottom: {
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '15px',
  },

});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <AuthContext>
        {
                    ({ error, user_id, signIn }) => {
                      if (user_id) {
                        return <Redirect to="/home" />;
                      }
                      const onSubmit = (e) => {
                        e.preventDefault();
                        signIn({ email: this.state.email, password: this.state.password });
                      };
                      return (
                        <Paper className={classes.form} elevation={8}>
                          <div className={classes.title}>
                            <h2>Login</h2>
                          </div>
                          <form onSubmit={onSubmit}>
                            <TextField
                              label="Email"
                              id="email"
                              className={classes.input}
                              fullWidth
                              variant="outlined"
                              value={this.state.email}
                              onChange={e => this.setState({ email: e.target.value })}
                            />
                            <br />
                            <TextField
                              label="Password"
                              id="password"
                              type="password"
                              className={classes.input}
                              fullWidth
                              variant="outlined"
                              value={this.state.password}
                              onChange={e => this.setState({ password: e.target.value })}
                            />
                            <br />
                            <p style={{ color: 'red' }}>
                              {' '}
                              {error}
                            </p>
                            <br />
                            <RaisedButton
                              label="Submit"
                              type="submit"
                              className={classes.button}
                            >
Submit
                            </RaisedButton>
                          </form>
                          <div className={classes.bottom}>
                                    Don't have an account ?
                            {' '}
                            <Link className={classes.register} to="/register">Register</Link>
                          </div>
                        </Paper>
                      );
                    }
                }
      </AuthContext>
    );
  }
}

export default withStyles(styles)(LoginForm);
