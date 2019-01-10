import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { StarBorder } from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import Blur from 'react-blur-image';
import Comments from './Comments';

const style = {
  post: {
    maxWidth: '700px',
    border: 'solid',
    borderWidth: 'thin',
    borderRadius: '5px',
    backgroundColor: 'white',
  },
  picture: {
    width: '100%',
    height: '50%',
  },
};

const Post = (props) => {
  const {
    classes,
    author,
    title,
    description,
    content,
    likes,
  } = props;
  return (
    <div className={classes.post}>
      <Paper className={classes.root} elevation={8}>
        <Grid container justify="center" alignItems="left" direction="column">
          <Grid item xs={12}>
            <h2>{author}</h2>
          </Grid>

          <Grid item xs={12}>
            <Blur img={`/api/images/${content}`} blurRadius={100} className={classes.picture} enableStyles >
              This is a blurred image
            </Blur>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <StarBorder />
              {likes}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  author: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
  likes: PropTypes.number,
};

Post.defaultProps = {
  author: 'author',
  title: 'title',
  description: 'desc',
  content: 'content',
  likes: 'nblikes',

};

export default withStyles(style)(Post);
