import {
  SET_LOADER_BTNS,
  SET_MAX_CONTENT_LENGTH,
  SET_LOADERS,
  SET_PAGES,
  SET_TOAST,
  SET_PAGE,
} from "./action.types";
import {
  apiGetLengthPages,
  apiGetPreviewPages,
  apiSavePage,
  apiGetPage,
  apiDeletePage,
} from "../../db/config";
import { getRequest, getUrl, postRequest } from "../../utils/request";
import { _checkTokenStorage } from "../../utils/token";

export function _getPages({ dispatch }, quantityPages) {
  if (_checkTokenStorage()) {
    dispatch({ type: SET_LOADERS, payload: { getPages: true } });
    const url = getUrl(apiGetPreviewPages(quantityPages));
    getRequest(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: SET_PAGES, payload: data.data.reverse() });
      })
      .catch((e) => {
        dispatch({
          type: SET_TOAST,
          payload: { type: "error", text: e.message },
        });
      })
      .finally(() => {
        dispatch({ type: SET_LOADERS, payload: { getPages: false } });
      });
  }
}

export function _getPage({ dispatch }, pageId, lang) {
  const url = `/${pageId}/${lang}`;
  getRequest(getUrl(apiGetPage + url))
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: SET_PAGE, payload: data.data });
    })
    .catch((e) => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "error", text: e.message },
      });
    });
}

export function _addPage({ dispatch, history }, page) {
  dispatch({ type: SET_LOADER_BTNS, payload: { addPage: true } });
  postRequest(getUrl(apiSavePage), page)
    .then((r) => r.json())
    .then(() => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "success", text: "Успешно добавлено!" },
      });
      history.push("/editor");
    })
    .catch((e) => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "error", text: e.message },
      });
    })
    .finally(() => {
      dispatch({ type: SET_LOADER_BTNS, payload: { addPage: false } });
    });
}

export function _getLengthPages({ dispatch }) {
  getRequest(getUrl(apiGetLengthPages))
    .then((r) => r.json())
    .then((data) => {
      dispatch({ type: SET_MAX_CONTENT_LENGTH, payload: { pages: data.data } });
    });
}

export function _deletePage({ dispatch, history }, pageId) {
  postRequest(getUrl(apiDeletePage + pageId))
    .then((res) => res.json())
    .then(() => {
      history.push("/editor");

      dispatch({
        type: SET_TOAST,
        payload: { type: "success", text: "Успешно удалено!" },
      });
    })
    .catch((e) => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "error", text: e.message },
      });
    });
}
