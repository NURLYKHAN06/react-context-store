import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { store } from "../../store/store";
import { _saveAdmin, _changeAdminPassword } from "../../store/actions/admin";
import ModalComponent from "../../components/Modal";
import ButtonWithLoader from "../../components/ButtonWithLoader";

const EditAdmin = () => {
  const { state, dispatch } = useContext(store);
  const [modalState, setModalState] = useState(false);
  const history = useHistory();
  const { query } = history.location;

  const { loadersForBtns } = state;

  const [value, setValue] = useState({
    ...query,
    new_password: "",
    new_repassword: "",
  });

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { ID, Login, Role } = value;

    const newValues = {
      id: ID,
      login: Login,
      role: Role,
    };

    _saveAdmin({ dispatch, history }, newValues);
  };

  const changePassword = () => {
    const { new_password, new_repassword, ID } = value;
    if (
      new_password.trim() &&
      new_repassword.trim() &&
      new_password === new_repassword
    ) {
      const payload = {
        id: ID,
        password: new_repassword,
      };
      _changeAdminPassword({ dispatch }, payload).then(() =>
        setModalState(false)
      );
    }
  };

  return (
    <div>
      <h1>Редактирование админа</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="Логин"
            name="Login"
            value={value.Login}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Роль</Form.Label>
          <Form.Control
            as="select"
            name="Role"
            value={value.Role}
            onChange={handleChange}
          >
            <option>admin</option>
            <option>press</option>
            <option>editor</option>
          </Form.Control>
        </Form.Group>

        <ButtonWithLoader
          options={["primary", "submit"]}
          loading={loadersForBtns.addAdmin}
        >
          Сохранить
        </ButtonWithLoader>

        <Button variant="link" onClick={() => setModalState(true)}>
          Изменить пароль
        </Button>

        <ModalComponent
          show={modalState}
          setShow={(state) => setModalState(state)}
          title="Изменение пароля"
          action={
            <ButtonWithLoader
              options={["primary"]}
              loading={loadersForBtns.changeAdminPassword}
              onClick={changePassword}
            >
              Сохранить
            </ButtonWithLoader>
          }
        >
          <Form.Group>
            <Form.Label>Введите новый пароль</Form.Label>
            <Form.Control
              type="password"
              name="new_password"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Повторите новый пароль</Form.Label>
            <Form.Control
              type="password"
              name="new_repassword"
              onChange={handleChange}
            />
          </Form.Group>
        </ModalComponent>
      </Form>
    </div>
  );
};

export default EditAdmin;
