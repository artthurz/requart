import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NotFoundPage from "../pages/NotFoundPage";
import Login from "../pages/Login";

import AuthLayout from "../pages/_layouts/auth";

const SignRoutes = () => {
  return (
    <BrowserRouter>
      <AuthLayout>
        <Switch>
          <Route path="/" component={Login} />
          <Route component={NotFoundPage} />
        </Switch>
      </AuthLayout>
    </BrowserRouter>
  );
};

export default SignRoutes;
