import React from "react";
import { useAuth } from "../contexts/auth";

import SignRoutes from "./SignRoutes";
import OtherRoutes from "./OtherRoutes";

import AuthLayout from "../pages/_layouts/auth";
import DefaultLayout from "../pages/_layouts/default";

const Routes = () => {
  const { signed } = useAuth();

  return signed ? (
    <DefaultLayout>
      <OtherRoutes />
    </DefaultLayout>
  ) : (
    <AuthLayout>
      <SignRoutes />
    </AuthLayout>
  );
};

export default Routes;
