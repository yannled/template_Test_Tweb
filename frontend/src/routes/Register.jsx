import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import RegisterForm from '../components/RegisterForm';

const styles = {
  form:{
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
  },
};

class Register extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.form}>
        <RegisterForm />
      </div>
    );
  }
}

export default withStyles(styles)(Register);
