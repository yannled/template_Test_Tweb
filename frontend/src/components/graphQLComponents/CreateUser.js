import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_USER = gql`
    mutation CreateUser($input: UserInput){
        createUser(input: $input)
        {
        _id,
        email
        }
    }
`

const CreateUser = ({children}) => {

  return (
    <Mutation mutation={CREATE_USER}>
      {(mutate) => {
        const createUser = (user) => {
            return mutate({ variables: { input: user } });
        }
        return children(createUser)
      }}
    </Mutation>
  );
};

export default CreateUser;