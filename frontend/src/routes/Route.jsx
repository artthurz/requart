import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';
import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';

import { useAuth } from '../hooks/auth';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === isAuthenticated ? (
          <>
            {isAuthenticated ? (
              <DefaultLayout>
                <Component />
              </DefaultLayout>
            ) : (
              <AuthLayout>
                <Component />
              </AuthLayout>
            )}
          </>
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/login' : '/home' }} />
        );
      }}
    />
  );
};

export default Route;
