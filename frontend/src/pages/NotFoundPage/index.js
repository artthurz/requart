import React from 'react';
import { useAuth } from '../../contexts/auth';

// import { Container } from './styles';

const NotFoundPage = () => {
  const { signed, Logout } = useAuth();

  return (
    <div>
      <h1>Ops! Essa página não existe.</h1>
    </div>
  );
};

export default NotFoundPage;
