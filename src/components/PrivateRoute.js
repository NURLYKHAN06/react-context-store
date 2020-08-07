import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { store } from "../store/store";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(store);
  const { user } = state;

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          const { history } = props;
          const url = history.location.pathname.split("/")[1];
          if (user) {
            const { role } = user;
            if (role !== url) return history.push(`/${role}`);
          }
          return user ? <Component {...props} /> : <Redirect to="/signin" />;
        }}
      />
    </>
  );
};

export default PrivateRoute;
