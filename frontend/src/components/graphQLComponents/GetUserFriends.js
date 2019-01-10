import React from "react"
import gql from "graphql-tag";
import {Query} from 'react-apollo';
import FriendsList from "../profileComponents/FriendsList";

const GETUSERFRIENDS = gql`
query GETUSERFRIENDS($breed: ID!)
{
  getUser(_id: $breed){
  _id
    friends {
      _id
      name
      lastName
      }
  }
}
`;

const GetUser = ({ breed }) => (
    <Query query={GETUSERFRIENDS} variables={{ breed }}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            return (
                <FriendsList user_id={breed} data={data}/>
            );
        }}
    </Query>
);

export default GetUser;
