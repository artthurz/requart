import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Requirements from '../pages/Requirements';
import ProjectDetails from '../pages/Projects/ProjectDetails';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
import NotFoundPage from '../pages/NotFoundPage';
import Login from '../pages/Login';

const Routes = () => {

  return (
      <Switch>
        <Route isPrivate exact path="/users" component={Users} />
        <Route isPrivate exact path="/requirements" component={Requirements} />
        <Route isPrivate exact path="/projects" component={Projects} />
        <Route isPrivate exact path="/projects/:project" component={ProjectDetails} />
        <Route isPrivate exact path="/profile" component={Profile} />
        <Route isPrivate exact path="/home" component={Home} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        
        <Route component={NotFoundPage} />
      </Switch>
  );
};

export default Routes;
