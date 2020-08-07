import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";

import { store } from "../../store/store";
import { _addPost } from "../../store/actions/post";
import { SET_TOAST } from "../../store/actions/action.types";
import { _draftToHtml } from "../../utils/draft";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import Editor from "../../components/Editor";
import "../styles/add-news.css";

const defaultDraftState = `
<h1>Заголовок статьи</h1>

<ul>
<li>Список</li>
<li>Список 2</li>
<li>Список 3</li>
<li>Список 4</li>
</ul>
`;

const AddNews = () => {
  const { state, dispatch } = useContext(store);
  const { user, loadersForBtns } = state;

  const history = useHistory();

  const [value, setValue] = useState({ title: "" });
  const [defaultDraftValue] = useState(defaultDraftState);
  const [draftValue, setDraftValue] = useState(defaultDraftState);

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleDraftChange = (newValue) => {
    setDraftValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.title.trim().length < 5) {
      dispatch({
        type: SET_TOAST,
        payload: {
          type: "warning",
          text: "Заголовок должен быть больше 5 символов!",
        },
      });
      return;
    }

    const newPost = {
      ID: 0,
      userId: user.login,
      Title: value.title,
      Text: _draftToHtml(draftValue),
      Lang: "ru",
      NewsDate: new Date().toISOString(),
      V: true,
    };

    _addPost({ dispatch, history }, newPost);
  };

  return (
    <div>
      <h1>Добавить новость</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Заголовок поста</Form.Label>
          <Form.Control
            type="text"
            placeholder="Какой то заголовок"
            name="title"
            value={value.title}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="my-editor-wrap">
          <Editor
            handleDraftChange={handleDraftChange}
            draftValue={defaultDraftValue}
          />
        </div>

        <ButtonWithLoader
          options={["primary", "submit"]}
          loading={loadersForBtns.addNews}
        >
          Добавить
        </ButtonWithLoader>
      </Form>
    </div>
  );
};

export default AddNews;
