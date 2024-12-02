import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  console.log(children,"chi")
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
