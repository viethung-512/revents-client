import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthRoute({ component: Component, ...rest }) {
  const { loading } = useSelector(state => state.async);
  const { authenticated } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        !loading && authenticated ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default AuthRoute;
