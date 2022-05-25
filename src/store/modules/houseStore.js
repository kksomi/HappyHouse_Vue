import apiInstance from "@/api/index.js";

const api = apiInstance();
const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
    isOK: true,
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    // CLEAR_SIDO_LIST: (state) => {
    //   state.sidos = [{ value: null, text: "선택하세요" }];
    // },
    // CLEAR_GUGUN_LIST: (state) => {
    //   state.guguns = [{ value: null, text: "선택하세요" }];
    // },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    // SET_HOUSE_LIST: (state, houses) => {
    //   //   console.log(houses);
    //   state.houses = houses;
    // },
    // SET_DETAIL_HOUSE: (state, house) => {
    //   state.house = house;
    // },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
      // for (let i = 0; i < houses.length; i++) {
      //   state.houses.push(houses[i]);
      // }
      //console.log(state.houses);
    },
    SET_DETAIL_HOUSE(state, house) {
      //console.log("Mutations", house);
      state.house = house;
      state.isOK = !state.isOK;
    },

    // GET_APT_DEAL_INFO(state, houses) {
    //   state.houses = houses;
    //   state.isOK = !state.isOK;
    // },
  },

  actions: {
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
    // db로 변경
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
    getHouseList({ commit }, gugunCode) {
      const params = {
        gugun: gugunCode,
      };
      console.log(gugunCode);
      api
        .get(`/map/searchBygugun`, { params })
        .then(({ data }) => {
          console.log(commit, data[0]);
          console.log(data.length);
          commit("SET_HOUSE_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    detailHouse({ commit }, house) {
      // 나중에 house.일련번호를 이용하여 API 호출
      // console.log(commit, house);
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default houseStore;
