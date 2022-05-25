import { apiInstance } from "./index.js";

const api = apiInstance();

function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  api.get(`/map/gugun`, { params: params }).then(success).catch(fail);
}

// function houseList(params, success, fail) {
//   house.get(``, { params: params }).then(success).catch(fail);
// }

export { sidoList, gugunList };
