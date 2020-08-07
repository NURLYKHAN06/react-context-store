const TOKEN = "test_token__";

export function _saveTokenToStorage(user) {
  localStorage.setItem(TOKEN, JSON.stringify(user));
}

export function _removeTokenFromStorage() {
  localStorage.removeItem(TOKEN);
}

export function _checkTokenStorage() {
  return JSON.parse(localStorage.getItem(TOKEN));
}
