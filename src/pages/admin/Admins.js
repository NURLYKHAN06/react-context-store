import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { store } from "../../store/store";
import { _getAdmins } from "../../store/actions/admin";
import { Spinner, Table, Button } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="loader">
      Идет загрузка
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

const Admins = () => {
  const { state, dispatch } = useContext(store);

  const { loaders, admins } = state;

  useEffect(() => {
    _getAdmins({ dispatch });
  }, []);

  return (
    <div>
      <h1>Список админов</h1>
      {loaders.getAdmins && <Loader />}
      {loaders.getAdmins || (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Логин</th>
              <th>Роль</th>
              <th>Последняя активность</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => {
              const { Login, ID, Role, LastLogin } = admin;

              return (
                <tr key={ID}>
                  <td>{ID}</td>
                  <td>
                    <Link
                      to={{ pathname: `admin/editadmin/${ID}`, query: admin }}
                    >
                      {Login}
                    </Link>
                  </td>
                  <td>{Role}</td>
                  <td>
                    {LastLogin
                      ? new Date(LastLogin).toLocaleString()
                      : "Не вошел в систему"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Admins;
