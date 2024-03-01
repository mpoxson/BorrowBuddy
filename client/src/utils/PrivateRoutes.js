// PrivateRoute.js; Avoiding the page jump to the internal other page without logging in
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isAuthenticated, redirectTo }) => {
  //return <Navigate to={redirectTo} replace />  //Test only if false == no login
  //return <Outlet />;   //Test only if true == login

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoutes;
