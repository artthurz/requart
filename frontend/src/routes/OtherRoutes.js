import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Profile from "../pages/Profile";
import NotFoundPage from "../pages/NotFoundPage";

import DefaultLayout from "../pages/_layouts/default";

const OtherRoutes = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Switch>
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/" component={Home} />
          <Route component={NotFoundPage} />
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  );
};

export default OtherRoutes;
