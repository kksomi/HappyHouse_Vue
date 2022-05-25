import apiInstance from "./index.js";

const api = apiInstance();

async function newsList(success, fail) {
  await api.get(`/crawling`).then(success).catch(fail);
}

export default newsList;
