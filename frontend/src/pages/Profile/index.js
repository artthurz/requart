import React from 'react';
import { useAuth } from '../../contexts/auth';

// import { Container } from './styles';

const Profile = () => {
  const { signed, Logout } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
    </div>
    
  );
};

export default Profile;
