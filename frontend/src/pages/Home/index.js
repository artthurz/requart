import React from 'react';
import { useAuth } from '../../contexts/auth';

// import { Container } from './styles';

const Home = () => {
  const { signed, Logout } = useAuth();

  async function handleLogout() {
    Logout();
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
