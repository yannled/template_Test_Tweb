import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_USER_FRIEND = gql`
    mutation AddUserFriends($_id: ID!, $_idFriends: ID!){
        addUserFriends(_id: $_id, _idFriends: $_idFriends)
        {
        _id
        }
    }
`;

const token = window.localStorage.getItem('token');

const AddUserFriends = ({children}) => {

  return (
    <Mutation mutation={ADD_USER_FRIEND}>
      {(mutate) => {
        const addUserFriends = (_id, _idFriends) => {
            return mutate({ variables: {_id: _id, _idFriends: _idFriends }, context: {Authorization: `bearer ${token}`} });
        };
        return children(addUserFriends)
      }}
    </Mutation>
  );
};

export default AddUserFriends;
