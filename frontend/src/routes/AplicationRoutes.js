import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Projects from '../pages/Projects';
import ProjectDetails from '../pages/Projects/ProjectDetails';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
import NotFoundPage from '../pages/NotFoundPage';

import DefaultLayout from '../pages/_layouts/default';

const AplicationRoutes = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Switch>
          <Route exact path="/users" component={Users} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/projects/details" component={ProjectDetails} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/" component={Home} />
          <Route component={NotFoundPage} />
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  );
};

export default AplicationRoutes;
