import jwt_decode from "jwt-decode";

import { apiSignIn } from "../../db/config";
import { getUrl, postRequest } from "../../utils/request";
import {
  _checkTokenStorage,
  _saveTokenToStorage,
  _removeTokenFromStorage,
} from "../../utils/token";
import { SET_USER, SET_LOADER_BTNS, SET_TOAST } from "./action.types";

export function _signIn({ dispatch }, { login, password }) {
  dispatch({
    type: SET_LOADER_BTNS,
    payload: { signIn: true },
  });

  postRequest(getUrl(apiSignIn), { l: login, p: password })
    .then((res) => {
      if (res.status === 200) return res.json();
      else if (res.status === 401) {
        throw new Error("Неверный логин / пароль!");
      } else new Error("Неизвестная ошибка!");
    })
    .then((data) => {
      const { token, role } = data;
      if (token) {
        _saveTokenToStorage({ token, role });
        const decoded = jwt_decode(token);
        dispatch({ type: SET_USER, payload: { login: decoded.login, role } });
      }
    })
    .catch((e) => {
      dispatch({
        type: SET_TOAST,
        payload: {
          type: "error",
          text: e.message,
        },
      });
    })
    .finally(() => {
      dispatch({
        type: SET_LOADER_BTNS,
        payload: { signIn: false },
      });
    });
}

export function _signOut({ dispatch }) {
  _removeTokenFromStorage();
  dispatch({ type: SET_USER, payload: null });
}

export function _checkUser({ dispatch }) {
  const user = _checkTokenStorage();

  if (user) {
    const { role, token } = user;
    const decoded = jwt_decode(token);

    if (decoded.exp < new Date().getTime() / 1000) {
      dispatch({ type: SET_USER, payload: null });
      dispatch({
        type: SET_TOAST,
        payload: {
          type: "error",
          text: "Срок токена истек",
        },
      });
      return;
    }

    dispatch({ type: SET_USER, payload: { login: decoded.login, role } });
  } else dispatch({ type: SET_USER, payload: null });
}
