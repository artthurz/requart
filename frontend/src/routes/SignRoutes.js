import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';

const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} />
    </BrowserRouter>
  );
};

export default SignRoutes;
