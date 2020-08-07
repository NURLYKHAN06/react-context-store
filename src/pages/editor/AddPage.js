import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";

import { store } from "../../store/store";
import { SET_TOAST } from "../../store/actions/action.types";
import { _addPage } from "../../store/actions/page";
import { _draftToHtml } from "../../utils/draft";
import { lang_options, visible_options } from "../../utils/exports";
import Editor from "../../components/Editor";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import "../styles/add-news.css";

const defaultDraftState = `
<h1>Заголовок</h1>

<ul>
<li>Список</li>
<li>Список 2</li>
<li>Список 3</li>
<li>Список 4</li>
</ul>
`;

const AddPage = () => {
  const { state, dispatch } = useContext(store);
  const { loadersForBtns } = state;

  const history = useHistory();

  const [value, setValue] = useState({
    title: "",
    lid: "",
    routePath: "",
    lang: "ru",
    is_visible: 1,
  });
  const [defaultDraftValue] = useState(defaultDraftState);
  const [draftValue, setDraftValue] = useState(defaultDraftState);

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleDraftChange = (newValue) => {
    setDraftValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { routePath, title, lid, lang, is_visible } = value;

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

    const newPage = {
      title,
      lid,
      body: _draftToHtml(draftValue),
      id: 0,
      pid: 0,
      route: routePath,
      published_at: new Date().toISOString(),
      unpublish_at: null,
      is_published: true,
      is_visible: visible_options[is_visible].value,
      lang,
      sort_order: 0,
    };

    _addPage({ dispatch, history }, newPage);
  };

  return (
    <div>
      <h1>Добавить страницу</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Название страницы</Form.Label>
          <Form.Control
            type="text"
            placeholder="Какой то заголовок"
            name="title"
            value={value.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Краткое содержание</Form.Label>
          <Form.Control
            type="text"
            placeholder="Описание"
            name="lid"
            value={value.lid}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Язык</Form.Label>
          <Form.Control
            as="select"
            custom
            name="lang"
            value={value.lang}
            onChange={handleChange}
          >
            {lang_options.map((lang) => (
              <option value={lang.value}>{lang.text}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Путь страницы</Form.Label>
          <Form.Control
            type="text"
            placeholder="path"
            name="routePath"
            value={value.routePath}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Видимость страницы</Form.Label>
          <Form.Control
            as="select"
            custom
            name="is_visible"
            value={value.is_visible}
            onChange={handleChange}
          >
            {visible_options.map((v) => (
              <option value={v.i}>{v.text}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <div className="my-editor-wrap">
          <Editor
            handleDraftChange={handleDraftChange}
            draftValue={defaultDraftValue}
          />
        </div>

        <ButtonWithLoader
          options={["primary", "submit"]}
          loading={loadersForBtns.addPage}
        >
          Добавить
        </ButtonWithLoader>
      </Form>
    </div>
  );
};

export default AddPage;
