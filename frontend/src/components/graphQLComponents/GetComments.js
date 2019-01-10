import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Comments from '../Comments';


const GETPOSTCOMMENTS = gql`
{
    getCommentsByPublication{
        _id
        user{
            _id
            name
            lastName
        }
        title
        description
        content
        likes{
            _id
        }
    }
}`;

const GetComments = () => {
    return (
      <Query query={GETPOSTCOMMENTS}>
        {({ loading, error, data }) => {
          if (loading)
            return null;
          if (error)
            return `Error!: ${error}`;
  
          return (
            data.getCommentsByPublication.map((comment, key) => {
              return <Comments/>
            })
          );
        }}
      </Query>);
  };