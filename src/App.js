import React, { useContext, useEffect } from "react";

import { Container } from "react-bootstrap";
import { Switch } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RootRouter from "./pages/RootRouter";
import Header from "./components/Header";
import { store } from "./store/store";
import { _checkUser } from "./store/actions/user";
import { SET_TOAST } from "./store/actions/action.types";

function App() {
  const { state, dispatch } = useContext(store);
  const { user, toastState } = state;

  const notify = () => toast(toastState.text, { type: toastState.type });

  useEffect(() => {
    // Clear toasty
    if (toastState.type) {
      notify();
      dispatch({
        type: SET_TOAST,
        payload: {
          type: null,
          text: null,
        },
      });
    }
  }, [toastState, notify]);

  useEffect(() => {
    _checkUser({ dispatch });
  }, [dispatch]);

  return (
    <Container fluid>
      <Header user={user} />
      <Container className="mt-2">
        <Switch>
          <RootRouter user={user} />
        </Switch>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default App;
