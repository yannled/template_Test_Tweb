import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GetPosts from './graphQLComponents/GetPosts'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 1200,
        height: 'auto',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    gridListHeader: {
        height: 30,
    }
});

class PostsList extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <GridList cellHeight={200} spacing={20} cols={3}
                          className={classes.gridList}
                          onClick={ (e) => {
                            //onTileTouch(id)
                          }}>
                        
                <GetPosts/>

                </GridList>
            </div>
        );
    }
}

PostsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsList);