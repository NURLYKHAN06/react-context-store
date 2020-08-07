import React from "react";
import { Route, Redirect } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import SignIn from "./SignIn";
import News from "./press/News";
import AddNews from "./press/AddNews";
import EditNews from "./press/EditNews";
import AddPage from "./editor/AddPage";
import Pages from "./editor/Pages";
import EditPage from "./editor/EditPage";
import Admins from "./admin/Admins";
import AddAdmin from "./admin/AddAdmin";
import EditAdmin from "./admin/EditAdmin";

const RootRouter = ({ user }) => {
  return (
    <>
      {/* press */}
      <PrivateRoute exact path="/press" component={News} />
      <PrivateRoute path="/press/addnews" component={AddNews} />
      <PrivateRoute path="/press/editnews/:postId" component={EditNews} />

      {/* admin */}
      <PrivateRoute exact path="/admin" component={Admins} />
      <PrivateRoute exact path="/admin/addadmin" component={AddAdmin} />
      <PrivateRoute
        exact
        path="/admin/editadmin/:adminId"
        component={EditAdmin}
      />

      {/* editor */}
      <PrivateRoute exact path="/editor" component={Pages} />
      <PrivateRoute path="/editor/addpage" component={AddPage} />
      <PrivateRoute
        exact
        path="/editor/editpage/:pageId/:lang/"
        component={EditPage}
      />

      <Route
        exact
        path="/"
        render={() =>
          !user ? <Redirect to="/signin" /> : <Redirect to={`/${user.role}`} />
        }
      />
      <Route
        exact
        path="/signin"
        render={() => (!user ? <SignIn /> : <Redirect to={`/${user.role}`} />)}
      />

      {/* <Route path="/404" component={Error404} />
      <Redirect from="*" to="/404" /> */}
    </>
  );
};

export default RootRouter;
