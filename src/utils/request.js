import { baseUrl } from "../db/config";
import { _checkTokenStorage } from "./token";

export function getUrl(url) {
  return baseUrl + url;
}

export function postRequest(url, body) {
  const user = _checkTokenStorage();
  let token;
  if (user) {
    token = user.token;
  }

  return fetch(url, {
    method: "POST",
    body: body ? JSON.stringify(body) : "",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getRequest(url) {
  const { token } = _checkTokenStorage();
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
