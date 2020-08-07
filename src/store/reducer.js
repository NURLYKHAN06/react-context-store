import {
  SET_USER,
  SET_POSTS,
  SET_POST,
  SET_LOADER_BTNS,
  SET_TOAST,
  SET_LOADERS,
  SET_MAX_CONTENT_LENGTH,
  SET_PAGES,
  SET_PAGE,
  SET_ADMINS,
} from "./actions/action.types";

export const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: [...payload],
      };
    case SET_PAGES:
      return {
        ...state,
        pages: [...payload],
      };
    case SET_ADMINS:
      return {
        ...state,
        admins: [...payload],
      };
    case SET_POST:
      return {
        ...state,
        postForEdit: { ...payload },
      };
    case SET_PAGE:
      return {
        ...state,
        pageForEdit: { ...payload },
      };
    case SET_LOADER_BTNS:
      return {
        ...state,
        loadersForBtns: { ...state.loadersForBtns, ...payload },
      };
    case SET_LOADERS:
      return {
        ...state,
        loaders: { ...state.loaders, ...payload },
      };
    case SET_TOAST:
      return {
        ...state,
        toastState: { ...payload },
      };
    case SET_MAX_CONTENT_LENGTH:
      return {
        ...state,
        maxContentLength: { ...state.maxContentLength, ...payload },
      };
    default:
      return state;
  }
};
