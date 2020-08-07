import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";

import { store } from "../store/store";
import { _signOut } from "../store/actions/user";

import "./styles/header.scss";

const _navbarLinks = {
  default: [
    {
      path: "/signin",
      text: "Выйти",
      forGuest: false,
      optionFunction: "logout",
    },
  ],
  editor: [
    {
      text: "Страницы",
      path: "/editor",
      forGuest: false,
    },
    {
      text: "Добавить страницу",
      path: "/editor/addpage",
      forGuest: false,
    },
  ],
  press: [
    {
      text: "Новости",
      path: "/press",
      forGuest: false,
    },
    {
      text: "Добавить новость",
      path: "/press/addnews",
      forGuest: false,
    },
  ],
  admin: [
    {
      text: "Список админов",
      path: "/admin",
      forGuest: false,
    },
    {
      text: "Создание админа",
      path: "/admin/addadmin",
      forGuest: false,
    },
  ],
};

const Header = ({ user }) => {
  const { dispatch } = useContext(store);

  const navbarLinks = [..._navbarLinks.default];

  if (user && user.role) {
    navbarLinks.unshift(..._navbarLinks[user.role]);
  }

  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  // it is necessary to style active links
  useRouteMatch();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Navbar.Brand className="d-flex justify-content-between ">
        <a href="/" className="main-logo">
          <span id="left">admin.</span>
          <span id="right">context</span>
        </a>
        {user ? <p className="my-header-role">{user.role}</p> : null}
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        className="justify-content-end header-items"
        id="responsive-navbar-nav"
      >
        {navbarLinks.map(
          ({ text, path, forGuest, optionFunction, forRole }) => {
            return !!user === !forGuest ? (
              <NavLink
                className={`mx-1 disabled ${
                  pathname === path ? "active-link" : ""
                } `}
                to={path}
                key={text + path}
                onClick={() => {
                  if (optionFunction === "logout") {
                    _signOut({ dispatch });
                  }
                }}
              >
                {text}
              </NavLink>
            ) : null;
          }
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
