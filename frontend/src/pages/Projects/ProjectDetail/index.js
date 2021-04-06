import React from 'react';
import { useAuth } from '../../contexts/auth';

// import { Container } from './styles';

const Projects = () => {
  const { signed, Logout } = useAuth();

  return (
    <div>
      <h1>Datalhes do Projeto</h1>
    </div>
  );
};

export default Projects;
