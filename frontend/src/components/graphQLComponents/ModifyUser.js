import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const UPDATE_USER = gql`
    mutation UpdateUser($_id: ID!, $input: UserInput){
        updateUser(_id: $_id, input: $input)
        {
        _id
        }
    }
`;

const token = window.localStorage.getItem('token');

const UpdateUser = ({children}) => {

  return (
    <Mutation mutation={UPDATE_USER}>
      {(mutate) => {
        const updateUser = (_id, user) => {
            return mutate({ variables: {_id: _id, input: user }, context: {Authorization: `bearer ${token}`} });
        };
        return children(updateUser)
      }}
    </Mutation>
  );
};

export default UpdateUser;
