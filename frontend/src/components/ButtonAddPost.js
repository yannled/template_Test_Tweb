import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

import AddIcon from '@material-ui/icons/Add';
import * as PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab/Fab';
import Modal from 'react-modal';
import AddPublicationForm from './AddPublicationForm';

const style = (theme) => {
  return {
    tooltipAddPost: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      backgroundColor: theme.palette.primary.main,
    },
    absolute: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 3,
    },
  };
};

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

class ButtonAddPost extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      modalIsOpen: false,
    };
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Tooltip onClick={this.openModal} className={classes.tooltipAddPost} title="Add post"
          aria-label="Add post">
          <Fab color="secondary" className={classes.absolute}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <AddPublicationForm />
        </Modal>
      </div>
    );
  }
}

/*
function ButtonAddPost (props) {
    const { classes } = props;
    return (
        <Tooltip className={classes.tooltipAddPost} title="Add post" aria-label="Add post">
            <Fab color="secondary" className={classes.absolute}>
                <AddIcon />
            </Fab>
        </Tooltip>
    );
};*/

ButtonAddPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(ButtonAddPost);

/**/
