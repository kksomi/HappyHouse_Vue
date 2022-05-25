import axios from "axios";
import API_BASE_URL from "@/config";

// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    //baseURL: "http://localhost",
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

// function newsInstance() {
//   const instance = axios.create({
//     baseURL:
//       "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=260",
//     //baseURL: "http://localhost",
//   });
//   return instance;
// }

export default apiInstance;
