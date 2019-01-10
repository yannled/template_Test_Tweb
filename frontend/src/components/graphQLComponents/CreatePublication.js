import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_PUBLICATION = gql`
    mutation CreatePublication($input: PublicationInput){
        createPublication(input: $input)
        {
        _id
        }
    }
`;

const token = window.localStorage.getItem('token');

const CreatePublication = ({children}) => {

  return (
    <Mutation mutation={CREATE_PUBLICATION}>
      {(mutate) => {
        const createPublication = (publication) => {
            return mutate({ variables: { input: publication }, context: {Authorization: `bearer ${token}`} });
        };
        return children(createPublication)
      }}
    </Mutation>
  );
};

export default CreatePublication;
