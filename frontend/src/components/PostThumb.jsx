import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import * as PropTypes from 'prop-types';
import Modal from 'react-modal';
import Post from './Post'
import Comments from './Comments'

const style = {
  root: {
    margin: '30px',
  },
  post: {
    position: 'relative',
    width: 'auto',
    height: '216px',
    borderRadius: '0px',
    backgroundColor: 'white',
  },
  picture: {
    width: 'auto',
    height: '100%',
  },
  descriptionContainerHover: {
    visibility: 'visible',
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    width: '100%',
    height: '35%',
    backgroundColor: 'rgba(81, 81, 81, 0.6)',
  },
  descriptionContainer: {
    visibility: 'hidden',
    position: 'absolute',
    bottom: '0px',
    left: '0px',
  },
  description: {
    position: 'relative',
    color: 'white',
    top: '0px',
    margin: '15px',
  },
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
  },
};

class PostThumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      hover: false,
      img: null,
      url: null,
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  afterOpenModal = () => {
  }

  hoverOn = () => {
    this.setState({ hover: true });
  }

  hoverOff = () => {
    this.setState({ hover: false });
  }

  render() {
    const {
      classes,
      title,
      author,
      content,
    } = this.props;

    const {
      hover,
      modalIsOpen,
    } = this.state;

    return (
      <div>
        <Paper className={classes.root} elevation={8}>
          <div
            className={classes.post}
            onMouseEnter={this.hoverOn}
            onMouseLeave={this.hoverOff}
            onClick={this.openModal}
          >
            <div className={hover ? classes.descriptionContainerHover : classes.descriptionContainer}>
              <div className={classes.description}>
                {author}
                <br />
                {title}
              </div>
            </div>

            <div className={classes.picture}>
              <img src={`/api/images/${content}`} alt={title} className={classes.picture} />
            </div>
          </div>
        </Paper>
       <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {/*<Post title={title} author={author} content={content} />*/}
          {/*<AddPublicationForm />*/}
          <Post title={title} author={author} content={content}/>
          {/*<Comments/>*/}
        </Modal>
      </div>
    );
  }
}

PostThumb.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(PostThumb);
