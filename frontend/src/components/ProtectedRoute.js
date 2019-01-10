import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(params) => (
    <AuthContext>
      {({ user_id, initialized }) => {
        console.log(user_id);
        if (!initialized){
          return <h2>Loading...</h2>
        }
        else{
        if (!user_id) {
            return <Redirect to="/login" />
          } 
          else {
          return <Component {...params} />
          }
        }
      }
      }
    </AuthContext>
  )}
  />
)

export default ProtectedRoute;