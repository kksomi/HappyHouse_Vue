import jwt_decode from "jwt-decode";
import { login, logout, userList, searchPassword } from "@/api/member.js";
import { findById } from "../../api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    userList: null,
    password: "",
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_USER_LIST: (state, userList) => {
      state.isLogin = true;
      state.userList = userList;
    },
    SET_PASSWORD: (state, password) => {
      state.password = password;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {},
      );
    },
    async userLogout({ commit }) {
      await logout(
        (response) => {
          if (response.data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_USER_INFO", null);
            sessionStorage.clear("access-token");
          } else {
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {},
      );
    },
    async getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      await findById(
        decode_token.id,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getUserList({ commit }) {
      await userList(
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_LIST", response.data.userList);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async findPassword({ commit }, user) {
      await this.initPassword;
      await searchPassword(
        user,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_PASSWORD", response.data.password);
            console.log("비밀번호 찾기 성공");
          } else {
            commit("SET_PASSWORD", null);
            console.log("비밀번호 찾기 실패");
          }
        },
        (error) => {
          commit("SET_PASSWORD", null);
          console.log(error);
        },
      );
    },
  },
  initPassword({ commit }) {
    commit("SET_PASSWORD", null);
  },
};

export default memberStore;
