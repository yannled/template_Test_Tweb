import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const token = window.localStorage.getItem('token');


const ADD_COMMENT_TO_PUBLICATION = gql`
mutation{
    createComment(input:{
      user : "$_id: ID!"
      content : "Hello"
      
    })
      {
        _id
      }
}
`;

const AddNewCommentToPublication = ({children}) => {
    return (
        <Mutation mutation={ADD_COMMENT_TO_PUBLICATION}>
            {(mutate) => {
                const AddNewCommentToPublication = (_id)  => {
                    return mutate({ variables: {_id: _id}, context: {Authorization: `bearer ${token}`} });
                };
            }
                return children(AddNewCommentToPublication)
            }}
        </Mutation>
    );
};

export default AddUserFriends;
