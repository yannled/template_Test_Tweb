import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../components/LoginForm';


const styles = {
  form: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
  },
};

class Login extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.form}>
        <LoginForm />
      </div>
    );
  }
}

export default withStyles(styles)(Login);
