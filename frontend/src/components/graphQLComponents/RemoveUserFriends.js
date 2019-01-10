import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const REMOVE_USER_FRIEND = gql`
    mutation RemoveUserFriends($_id: ID!, $_idFriends: ID!){
        removeUserFriends(_id: $_id, _idFriends: $_idFriends)
        {
        _id
        }
    }
`;

const token = window.localStorage.getItem('token');

const RemoveUserFriends = ({children}) => {

  return (
    <Mutation mutation={REMOVE_USER_FRIEND}>
      {(mutate) => {
        const removeUserFriends = (_id, _idFriends) => {
            return mutate({ variables: {_id: _id, _idFriends: _idFriends }, context: {Authorization: `bearer ${token}`} });
        };
        return children(removeUserFriends)
      }}
    </Mutation>
  );
};

export default RemoveUserFriends;
