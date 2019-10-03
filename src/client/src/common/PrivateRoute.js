import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../services/AuthService";

const auth = new Auth();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.loggedIn() === true ? (
        auth.getProfile().verified ? (
          <Component {...props} />
        ) : (
          <Redirect to="/password" />
        )
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
