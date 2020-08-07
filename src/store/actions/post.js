import {
  apiSavePost,
  apiGetPreviewPosts,
  apiGetPost,
  apiDeletePost,
  apiGetLengthPosts,
} from "../../db/config";
import { postRequest, getUrl, getRequest } from "../../utils/request";

import {
  SET_POSTS,
  SET_POST,
  SET_LOADER_BTNS,
  SET_TOAST,
  SET_LOADERS,
  SET_MAX_CONTENT_LENGTH,
} from "./action.types";
import { _checkTokenStorage } from "../../utils/token";

export function _addPost({ dispatch, history }, post) {
  dispatch({ type: SET_LOADER_BTNS, payload: { addNews: true } });
  postRequest(getUrl(apiSavePost), post)
    .then((res) => res.json())
    .then(() => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "success", text: "Успешно добавлено!" },
      });
      history.push("/press");
    })
    .catch((e) => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "error", text: e.message },
      });
    })
    .finally(() => {
      dispatch({ type: SET_LOADER_BTNS, payload: { addNews: false } });
    });
}

export function _deletePost({ dispatch, history }, postId) {
  postRequest(getUrl(apiDeletePost + postId))
    .then((res) => res.json())
    .then(() => {
      history.push("/press");

      _getPosts({ dispatch }, 10);
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

export function _getLengthPosts({ dispatch }) {
  getRequest(getUrl(apiGetLengthPosts))
    .then((r) => r.json())
    .then((data) => {
      dispatch({ type: SET_MAX_CONTENT_LENGTH, payload: { posts: data.data } });
    });
}
export function _getPosts({ dispatch }, quantityPosts) {
  if (_checkTokenStorage()) {
    dispatch({ type: SET_LOADERS, payload: { getPosts: true } });
    const url = getUrl(apiGetPreviewPosts(quantityPosts));
    getRequest(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: SET_POSTS, payload: data.data });
      })
      .catch((e) => {
        dispatch({
          type: SET_TOAST,
          payload: { type: "error", text: e.message },
        });
      })
      .finally(() => {
        dispatch({ type: SET_LOADERS, payload: { getPosts: false } });
      });
  }
}

export function _getPost({ dispatch }, postId) {
  getRequest(getUrl(apiGetPost + postId))
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: SET_POST, payload: data.data });
    })
    .catch((e) => {
      dispatch({
        type: SET_TOAST,
        payload: { type: "error", text: e.message },
      });
    });
}
