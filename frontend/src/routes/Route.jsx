import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';
import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';

import { useAuth } from '../hooks/auth';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <ReactDOMRoute
      render={() => {
        return isPrivate === isAuthenticated ? (
          <>
            {isPrivate ? (
              <DefaultLayout>
                <Component {...rest}/>
              </DefaultLayout>
            ) : (
              <AuthLayout>
                <Component {...rest}/>
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
