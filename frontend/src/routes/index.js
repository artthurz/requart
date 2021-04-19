import React from 'react';
import { useAuth } from '../contexts/AuthContext';

import SignRoutes from './SignRoutes';
import AplicationRoutes from './AplicationRoutes';

const Routes = () => {
  const { authenticated } = useAuth();

  return authenticated ? <AplicationRoutes /> : <SignRoutes />;
};

export default Routes;
