import React, { useState, useContext, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { store } from "../../store/store";
import { _addPost, _getPost, _deletePost } from "../../store/actions/post";
import { _draftToHtml } from "../../utils/draft";
import Editor from "../../components/Editor";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import "../styles/add-news.css";

const EditNews = () => {
  const { state, dispatch } = useContext(store);
  const { postForEdit, loadersForBtns } = state;
  const [value, setValue] = useState({ title: "" });
  const [defaultDraftValue, setDefaultDraftValue] = useState("<p></p>");
  const [draftValue, setDraftValue] = useState("<p></p>");

  const history = useHistory();

  const {
    params: { postId },
  } = useRouteMatch();

  useEffect(() => {
    if (postId) {
      _getPost({ dispatch }, postId);
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (postForEdit) {
      const { Text, Title } = postForEdit;
      setValue({ ...value, title: Title });
      setDefaultDraftValue(Text);
    }
  }, [postForEdit]);

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleDraftChange = (newValue) => {
    setDraftValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedPost = {
      ...postForEdit,
      Title: value.title,
      Text: _draftToHtml(draftValue),
    };

    _addPost({ dispatch, history }, editedPost);
  };

  const deletePost = () => _deletePost({ dispatch, history }, postId);

  return (
    <div>
      <h1>Редактирование новости</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Заголовок поста</Form.Label>
          <Form.Control
            type="text"
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

        {/* <Form.Group>
          <Form.Label>Текст поста</Form.Label>
          <Form.Control
            as="textarea"
            name="text"
            value={value.text}
            onChange={handleChange}
          />
        </Form.Group> */}

        <ButtonWithLoader
          options={["primary", "submit"]}
          loading={loadersForBtns.addNews}
        >
          Сохранить
        </ButtonWithLoader>

        <Button variant="danger" className="ml-2 mt-2" onClick={deletePost}>
          Удалить
        </Button>
      </Form>
    </div>
  );
};

export default EditNews;
