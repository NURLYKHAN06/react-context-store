import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";

import { store } from "../store/store";
import { _signIn } from "../store/actions/user";
import { SET_TOAST } from "../store/actions/action.types";
import ButtonWithLoader from "../components/ButtonWithLoader";

const SignIn = () => {
  const { state, dispatch } = useContext(store);
  const { loadersForBtns } = state;

  const [value, setValue] = useState({
    login: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { login, password } = value;
    const userData = { login, password };

    if (login.trim().length < 1 || password.trim().length < 1) {
      dispatch({
        type: SET_TOAST,
        payload: {
          type: "warning",
          text: "Поля не может быть пустым!",
        },
      });
      return;
    }

    _signIn({ dispatch }, userData);
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Войти</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label type="email">Логин</Form.Label>
          <Form.Control
            value={value.login}
            name="login"
            placeholder="Логин"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            value={value.password}
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>

        <ButtonWithLoader
          options={["primary", "submit"]}
          loading={loadersForBtns.signIn}
        >
          Войти
        </ButtonWithLoader>
      </Form>
    </div>
  );
};

export default SignIn;
