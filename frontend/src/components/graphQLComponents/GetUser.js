import React from "react"
import gql from "graphql-tag";
import {Query} from 'react-apollo';

const GETUSER = gql`
query GETUSER($breed: ID!)
{
  getUser(_id: $breed){
    _id,
    name,
    lastName,
    email,
    inscriptionDate,
    moviesWatches {
      title
      }
  }
}
`;

const GetUser = ({ breed }) => (
  <Query query={GETUSER} variables={{ breed }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      return (
        <div>
          {data.getUser.moviesWatches(function (object, i) {
            return <li key={i}>{object.title}</li>;
          })}
        </div>
      );
    }}
  </Query>
);

export default GetUser;
