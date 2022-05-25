import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import apiInstance from "@/api/index.js";

Vue.use(Vuex);

import memberStore from "@/store/modules/memberStore.js";
import boardStore from "@/store/modules/boardStore.js";
import houseStore from "@/store/modules/houseStore.js";

const api = apiInstance();

const store = new Vuex.Store({
  modules: {
    memberStore,
    boardStore,
    houseStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    houses: [],
    //house: null,
    house: {
      aptCode: 0,
      aptName: "",
      dongCode: "",
      dongName: "",
      sidoCode: "",
      sidoName: "",
      gugunCode: "",
      gugunName: "",
      buildYear: "",
      jibun: "",
      lat: "",
      lng: "",
      img: "",
      recentPrice: "",
      isFavor: false,
    },
    todos: [
      // { title: '할 일1', completed: false },
      // { title: '할 일2', completed: false },
    ],
    //isFavor: false,
    houseFavorList: [],
    popularList: [],
    //isOK: false,
  },
  getters: {},
  mutations: {
    /////////////////////////////// House start /////////////////////////////////////
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_HOUSE_LIST(state) {
      state.houses = [];
    },
    CLEAR_DETAIL_LIST(state) {
      state.house = null;
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
      state.isOK = !state.isOK;
      console.log("isOK", state.isOK);
    },
    SET_DETAIL_HOUSE(state, house) {
      console.log("Mutations", house);
      state.house = house;
      state.isClick = !state.isClick;
      console.log("isClick", state.isClick);
    },
    /////////////////////////////// House end /////////////////////////////////////

    /////////////////////////////// Favor start /////////////////////////////////////
    SET_FAVOR(state) {
      state.houseFavorList.forEach((int) => {
        console.log("SET_FAVOR", int);
        if (state.house.aptCode == int) {
          state.house.isFavor = true;
        }
      });
      console.log("SET_FAVOR", state.house.isFavor);
    },
    SET_FAVOR_LIST(state, favor) {
      console.log("SET_FAVOR_LIST", favor);
      state.houseFavorList = favor;
    },
    SET_FAVOR_HOUSE_LIST(state, houses) {
      state.houseFavorList = houses;
      console.log("SET_FAVOR_HOUSE_LIST", houses);
    },
  },
  actions: {
    /////////////////////////////// House start /////////////////////////////////////
    getSido({ commit }) {
      api
        .get(`/map/sido`)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGugun({ commit }, sidoCode) {
      const params = { sido: sidoCode };
      api
        .get(`/map/gugun`, { params })
        .then(({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHouseListByName({ commit }, gugunName) {
      const params = { text: gugunName };
      api
        .get(`/map/aptByText`, { params })
        .then(({ data }) => {
          // console.log(commit, response);
          commit("SET_HOUSE_LIST", data);
          //console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // db로 변경
    getHouseList({ commit }, gugunCode) {
      const params = {
        gugun: gugunCode,
      };
      console.log(gugunCode);
      api
        .get(`/map/searchBygugun`, { params })
        .then(({ data }) => {
          console.log(commit, data[0]);
          console.log("house", data[0]);
          commit("SET_HOUSE_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    detailHouse({ commit }, house) {
      // 나중에 house.일련번호를 이용하여 API 호출
      console.log("detail", house);
      commit("SET_DETAIL_HOUSE", house);
    },
    /////////////////////////////// House end /////////////////////////////////////

    /////////////////////////////// Favor start /////////////////////////////////////
    getFavor({ commit }, userid) {
      api
        .get(`/favor`, { userid })
        .then(({ data }) => {
          console.log("getFavor: ", data);
          commit("SET_FAVOR_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFavorList({ commit }, userid) {
      console.log("getFavorList: ", userid);
      api
        .get("/favor/favorlist/" + userid)
        .then(({ data }) => {
          console.log("getFavorList: ", data);
          commit("SET_FAVOR_HOUSE_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});

export default store;
