import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_NOTIFICATION = gql`
    mutation CreateNotification($user : ID!, $input: NotificationInput){
        createNotification(user : $user, input: $input)
    }
`;

const token = window.localStorage.getItem('token');

const CreateNotification = ({children}) => {

  return (
    <Mutation mutation={CREATE_NOTIFICATION}>
      {(mutate) => {
        const createNotification = (user, notification) => {
            return mutate({ variables: { user: user, input: notification }, context: {Authorization: `bearer ${token}`} });
        }
        return children(createNotification)
      }}
    </Mutation>
  );
};

export default CreateNotification;
