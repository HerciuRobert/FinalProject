import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';


import AuthContext from './AuthContext';


function PrivateRoute({ children, ...rest }) {
    let { auth } = useContext(AuthContext);
    if (!auth) {
        auth = localStorage.getItem('auth');
    }
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;