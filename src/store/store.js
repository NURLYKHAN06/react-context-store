import React, { useReducer, useEffect } from "react";

import { reducer } from "./reducer";

export const INITIAL_STATE = {
  user: null,
  posts: [],
  pages: [],
  admins: [],
  maxContentLength: {
    posts: null,
    pages: null,
  },
  postForEdit: {
    Text: "",
    Title: "",
  },
  pageForEdit: {},
  loadersForBtns: {
    addNews: false,
    signIn: false,
    addPage: false,
    addAdmin: false,
    changeAdminPassword: false,
  },
  loaders: {
    getPosts: false,
    getPages: false,
    getAdmins: false,
  },
  toastState: {
    type: null,
    text: null,
  },
};

const store = React.createContext();
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Subscribe to changes
  useEffect(() => {
    console.log(state);
  }, [state]);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
