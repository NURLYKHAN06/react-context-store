export const baseUrl = " http://your_api_url/";
export const apiSignIn = "adminlogin"; // POST

// PRESS
export const apiSavePost = "adm/news/save"; // POST
export const apiGetPost = "adm/news/"; // :news_id GET
export const apiDeletePost = "adm/news/shiftdelete/"; // :news_id POST
export const apiGetLengthPosts = "api/newscount/all";
export function apiGetPreviewPosts(quantity) {
  return `adm/news/titleslist/date/${quantity}/0`; // :sort/:num/:offset GET
}

// EDITOR
export const apiSavePage = "adm/page/save"; // POST
export const apiGetLengthPages = "api/pagescount/all"; // v/all
export const apiGetPage = `adm/page`; // GET :id/:lang
export const apiDeletePage = "adm/page/delete/"; //:id POST
export function apiGetPreviewPages(quantity) {
  return `adm/page/list/date/${quantity}/0`; // :sort/:num/:offset GET
}

// ADMIN
export const apiGetAdmins = "adm/admins/list"; // GET
export const apiCreateAdmin = ({ login, role, password }) => {
  return `adm/admins/create/${login}/${password}/${role}`;
};
export const apiSaveAdmin = ({ login, role, id }) => {
  return `adm/admins/save/${id}/${login}/${role}`;
};
export const apiAdminChangePassword = ({ id, password }) => {
  return `adm/admins/changepass/${id}/${password}/${password} `;
};
