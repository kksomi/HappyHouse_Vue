import apiInstance from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function searchPassword(user, success, fail) {
  await api
    .post(`/user/searchpassword`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function logout(success, fail) {
  await api.get(`/user/logout`).then(success).catch(fail);
}

async function userList(success, fail) {
  await api.get(`admin/user`).then(success).catch(fail);
}

export { login, findById, logout, userList, searchPassword };
