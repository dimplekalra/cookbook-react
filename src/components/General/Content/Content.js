import React from "react";
import routes from "../../../routes/routes";
import { Switch, Route, Redirect } from "react-router-dom";
import { IsLoggedIn } from "../../../utility/generalMethods";

const Content = () => {
  const content = routes.map((route, idx) => {
    if (route.path === "/") {
      return (
        <Route
          exact
          path="/"
          render={() => {
            return IsLoggedIn() ? (
              <Redirect to="/recipes" />
            ) : (
              <Redirect to="/auth/login" />
            );
          }}
        />
      );
    } else {
      return (
        <Route
          key={idx}
          path={route.path}
          exact={route.exact}
          render={(props) => <route.Component {...props} />}
        />
      );
    }
  });

  return <Switch>{content}</Switch>;
};

export default Content;
