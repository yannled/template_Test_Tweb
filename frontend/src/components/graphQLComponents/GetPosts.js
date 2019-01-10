import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PostThumb from '../PostThumb';

const GETPOSTS = gql`
{
    getPublications{
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

const GetPosts = () => {
  return (
    <Query query={GETPOSTS}>
      {({ loading, error, data }) => {
        if (loading)
          return null;
        if (error)
          return `Error!: ${error}`;

        return (
          data.getPublications.map((post, key) => {
            return <PostThumb author={post.user.name + ' ' + post.user.lastName} title={post.title} content={post.content} key={key} />
          })
        );
      }}
    </Query>);
};

export default GetPosts;
