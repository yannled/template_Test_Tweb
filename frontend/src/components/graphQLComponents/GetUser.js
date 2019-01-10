import React from "react"
import gql from "graphql-tag";
import {Query} from 'react-apollo';
import ProfileInfos from "../profileComponents/ProfileInfos";

const GETUSER = gql`
query GETUSER($breed: ID!)
{
  getUser(_id: $breed){
    _id,
    name,
    lastName,
    email,
    inscriptionDate,
    job,
    webSite,
    gender,
  }
}
`;

const GetUser = ({ breed }) => (
    <Query query={GETUSER} variables={{ breed }}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;

            return (
                <ProfileInfos user_id={breed} data={data}/>
            );
        }}
    </Query>
);

export default GetUser;
