import React from "react"
import gql from "graphql-tag";
import {Query} from 'react-apollo';
import NotificationIcon from "../NotificationIcon";

const GETUSER = gql`
query GETUSER($breed: ID!)
{
  getUser(_id: $breed){
    _id
    notifications{
        read
        publication{
        _id}
        user{
        name
        lastName}
    }
  }
}
`;

const GetUserNotificatons = ({ breed }) => (
    <Query query={GETUSER} variables={{ breed }}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            return (
                <NotificationIcon breed={breed} data={data}/>
            );
        }}
    </Query>
);

export default GetUserNotificatons;
