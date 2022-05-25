<template>
  <b-row class="mt-4 mb-4 text-center">
    <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
    <b-col class="sm-3">
      <b-form-select
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select
        v-model="gugunCode"
        :options="guguns"
        @change="searchApt"
      ></b-form-select>
    </b-col>
    <!-- <b-col md="auto">
      <b-input
        id="searchInput"
        type="text"
        v-model="gugunName"
        @keyup.enter="searchAptByText"
      />
    </b-col>
    <b-col lg="2">
      <b-button variant="outline-primary" @click="searchAptByText"
        >검색</b-button
      >
    </b-col> -->
    <!-- <kakao-map></kakao-map> -->
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
// import KakaoMap from "@/components/house/KakaoMap.vue";
// import "vue-range-component/dist/vue-range-slider.css";
// import VueRangeSlider from "vue-range-component";

export default {
  name: "HouseSearchBar",
  components: {
    // VueRangeSlider,
  },
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      gugunName: null,
      range: [0, 100],
    };
  },
  computed: {
    ...mapState(["sidos", "guguns", "houses"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_HOUSE_LIST();
    this.CLEAR_DETAIL_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions([
      "getSido",
      "getGugun",
      "getHouseList",
      "getHouseListByName",
    ]),
    ...mapMutations([
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_HOUSE_LIST",
      "CLEAR_DETAIL_LIST",
    ]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchApt() {
      console.log(this.houses);
      // 텍스트로 검색하면 선택하세요로 변경
      this.gugunName = "";
      if (this.gugunCode) this.getHouseList(this.gugunCode);
    },
    searchAptByText() {
      // select로 검색하면 input 창 비우기
      this.sidoCode = null;
      this.gugunCode = null;
      // input 창에 값 있으면 검색
      if (this.gugunName) this.getHouseListByName(this.gugunName);
    },
  },
};
</script>

<style>
.slider {
  /* overwrite slider styles */
  width: 100%;
}
</style>
