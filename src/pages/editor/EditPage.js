import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useRouteMatch, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { _getPage, _addPage } from "../../store/actions/page";
import { _deletePage } from "../../store/actions/page";
import { store } from "../../store/store";
import { visible_options } from "../../utils/exports";
import { _draftToHtml } from "../../utils/draft";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import Editor from "../../components/Editor";
import "../styles/add-news.css";

const EditPage = () => {
  const { state, dispatch } = useContext(store);
  const { pageForEdit, loadersForBtns } = state;
  const [value, setValue] = useState({});
  const [defaultDraftValue, setDefaultDraftValue] = useState("<p></p>");
  const [draftValue, setDraftValue] = useState("<p></p>");

  const history = useHistory();

  const {
    params: { pageId, lang },
  } = useRouteMatch();

  useEffect(() => {
    if (pageId) {
      _getPage({ dispatch }, pageId, lang);
    }
  }, [dispatch, pageId]);

  useEffect(() => {
    if (pageForEdit.title) {
      setValue({ ...pageForEdit, is_visible: Number(pageForEdit.is_visible) });
      setDefaultDraftValue(pageForEdit.body);
    }
  }, [pageForEdit]);

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleDraftChange = (newValue) => {
    setDraftValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { is_visible, body } = value;
    const _draft = _draftToHtml(draftValue);
    const editedPage = {
      ...value,
    };

    editedPage.id = Number(pageId);
    editedPage.body = _draft.trim() === "<p></p>" ? body : _draft;
    editedPage.is_visible = visible_options[is_visible].value;
    editedPage.lang = lang;

    _addPage({ dispatch, history }, editedPage);
  };

  const deletePage = () => _deletePage({ dispatch, history }, pageId);

  return (
    <div>
      <h1>Редактирование страницы</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Название страницы</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={value.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Краткое содержание</Form.Label>
          <Form.Control name="lid" value={value.lid} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Путь страницы</Form.Label>
          <Form.Control
            name="route"
            value={value.route}
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
              <option value={v.i} key={v.i}>
                {v.text}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <div className="my-editor-wrap">
            <Editor
              handleDraftChange={handleDraftChange}
              draftValue={defaultDraftValue}
            />
          </div>
        </Form.Group>

        <ButtonWithLoader
          options={["primary", "submit"]}
          loading={loadersForBtns.addPage}
        >
          Сохранить
        </ButtonWithLoader>

        <Button variant="danger" className="ml-2 mt-2" onClick={deletePage}>
          Удалить
        </Button>
      </Form>
    </div>
  );
};

export default EditPage;
