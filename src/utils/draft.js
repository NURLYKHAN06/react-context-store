import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export function _draftToHtml(editorState) {
  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  return html;
}
