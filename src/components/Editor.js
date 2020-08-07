import React, { useState, useEffect, useRef } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";

import "./styles/editor.css";

function EditorComponent(props) {
  const refEditor = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty(""));

  const { handleDraftChange, draftValue } = props;
  useEffect(() => {
    const blocksFromHtml = htmlToDraft(draftValue);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);

    setEditorState(editorState);
  }, [draftValue]);

  // it is necessary
  useEffect(() => {
    refEditor.current.focusEditor();
  }, []);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    handleDraftChange(newEditorState);
  };

  return (
    <div>
      <Editor
        ref={refEditor}
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}

export default EditorComponent;
