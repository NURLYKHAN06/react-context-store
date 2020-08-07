import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";

import { store } from "../../store/store";
import { SET_TOAST } from "../../store/actions/action.types";
import { _addAdmin } from "../../store/actions/admin";
import ButtonWithLoader from "../../components/ButtonWithLoader";

const AddAdmin = () => {
  const { state, dispatch } = useContext(store);
  const history = useHistory();
  const { loadersForBtns } = state;

  const [value, setValue] = useState({
    login: "",
    role: "admin",
    password: "",
    rePassword: "",
  });

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, rePassword } = value;

    if (password !== rePassword) {
      dispatch({
        type: SET_TOAST,
        payload: {
          type: "warning",
          text: "Пароли не совпадают!",
        },
      });

      return;
    }

    _addAdmin({ dispatch, history }, value);
  };
  return (
    <div>
      <h1>Создание админа</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="Логин"
            name="login"
            value={value.login}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Роль</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={value.role}
            onChange={handleChange}
          >
            <option>admin</option>
            <option>press</option>
            <option>editor</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Пароль"
            name="password"
            value={value.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Повторите пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Пароль"
            name="rePassword"
            value={value.rePassword}
            onChange={handleChange}
          />
        </Form.Group>

        <ButtonWithLoader
          options={["primary", "submit"]}
          loading={loadersForBtns.addAdmin}
        >
          Создать
        </ButtonWithLoader>
      </Form>
    </div>
  );
};

export default AddAdmin;
