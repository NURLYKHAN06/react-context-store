import {
  SET_LOADERS,
  SET_ADMINS,
  SET_TOAST,
  SET_LOADER_BTNS,
} from "./action.types";
import { _checkTokenStorage } from "../../utils/token";
import {
  apiGetAdmins,
  apiCreateAdmin,
  apiSaveAdmin,
  apiAdminChangePassword,
} from "../../db/config";
import { getUrl, getRequest, postRequest } from "../../utils/request";

export function _getAdmins({ dispatch }) {
  if (_checkTokenStorage()) {
    dispatch({ type: SET_LOADERS, payload: { getAdmins: true } });

    const url = getUrl(apiGetAdmins);
    getRequest(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: SET_ADMINS, payload: data.data.reverse() });
      })
      .catch((e) => {
        dispatch({
          type: SET_TOAST,
          payload: { type: "error", text: e.message },
        });
      })
      .finally(() => {
        dispatch({ type: SET_LOADERS, payload: { getAdmins: false } });
      });
  }
}

export function _addAdmin({ dispatch, history }, admin) {
  dispatch({ type: SET_LOADER_BTNS, payload: { addAdmin: true } });
  const { login, role, password } = admin;
  const url = apiCreateAdmin({ login, role, password });
  postRequest(getUrl(url))
    .then((r) => r.json())
    .then(() => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "success", text: "Успешно добавлено!" },
      });
      history.push("/admin");
    })
    .catch((e) => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "error", text: e.message },
      });
    })
    .finally(() => {
      dispatch({ type: SET_LOADER_BTNS, payload: { addAdmin: false } });
    });
}

export function _saveAdmin({ dispatch, history }, admin) {
  dispatch({ type: SET_LOADER_BTNS, payload: { addAdmin: true } });
  const { login, role, id } = admin;
  const url = apiSaveAdmin({ id, login, role });
  postRequest(getUrl(url))
    .then((r) => r.json())
    .then(() => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "success", text: "Успешно добавлено!" },
      });
      history.push("/admin");
    })
    .catch((e) => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "error", text: e.message },
      });
    })
    .finally(() => {
      dispatch({ type: SET_LOADER_BTNS, payload: { addAdmin: false } });
    });
}

export function _changeAdminPassword({ dispatch }, { id, password }) {
  dispatch({ type: SET_LOADER_BTNS, payload: { changeAdminPassword: true } });
  const url = apiAdminChangePassword({ id, password });
  return postRequest(getUrl(url))
    .then((r) => r.json())
    .then(() => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "success", text: "Успешно изменено!" },
      });
    })
    .catch((e) => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "error", text: e.message },
      });
    })
    .finally(() => {
      dispatch({
        type: SET_LOADER_BTNS,
        payload: { changeAdminPassword: false },
      });
    });
}
