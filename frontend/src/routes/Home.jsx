import React, { Component } from 'react';
import GetUser from '../components/graphQLComponents/GetUser';
import AuthContext from '../components/AuthProvider';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <h3>Welcome</h3>
        <AuthContext>
          {({ user_id }) => {
            return (
                <GetUser breed={user_id} />
            );
          }
          }
        </AuthContext>
      </div>
    );
  }
}

export default Home;
