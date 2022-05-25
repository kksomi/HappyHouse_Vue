<template>
  <b-container v-if="house" class="bv-example-row">
    <b-row>
      <b-col
        ><h3>{{ house.aptName }}</h3></b-col
      >
    </b-row>
    <b-row class="mb-2 mt-1">
      <b-col
        ><b-img :src="require('@/assets/apt.png')" fluid-grow></b-img
      ></b-col>
    </b-row>
    <!-- <b-row>
      <b-col>
        <b-alert show variant="secondary"
          >일련번호 : {{ house.aptCode }}</b-alert
        >
      </b-col>
    </b-row> -->
    <b-row>
      <b-col>
        <b-alert show variant="primary"
          >아파트 이름 : {{ house.aptName }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="info">법정동 : {{ house.dongName }} </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="warning"
          >건축연도 : {{ house.buildYear }}년</b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <!-- (parseInt(house.recentPrice.replace(" ,", "")) * 10000) | price -->
        <b-alert show variant="danger"
          >거래금액 :
          {{ house.recentPrice.replace(" ,", "") | price }}원</b-alert
        >
      </b-col>
    </b-row>
    <div class="modal-footer">
      <button
        type="button"
        class="btn bg-gradient-warning"
        @click="deleteFavor"
        v-if="this.isLogin && this.house.isFavor"
      >
        관심 아파트 해제
      </button>
      <button
        type="button"
        class="btn bg-gradient-info"
        @click="insertFavor"
        v-else-if="this.isLogin && !this.house.isFavor"
      >
        관심 아파트 지정
      </button>
      <button
        type="button"
        class="btn bg-gradient-secondary"
        data-bs-dismiss="modal"
      >
        닫기
      </button>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import apiInstance from "@/api/index.js";
const api = apiInstance();
const memberStore = "memberStore";

export default {
  name: "HouseDetail",
  computed: {
    ...mapState(["house"]),
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  filters: {
    price(value) {
      if (!value) return value;
      value = value.replace(",", "");
      let str = value.toString();
      let first = str.substring(0, str.length - 4);
      let second = str.substring(str.length - 4, str.length);
      let res = "";
      if (first > 0) {
        res += first + "억";
        if (second > 0) {
          res += second + "만";
        }
      } else {
        if (second > 0) {
          res += second + "만";
        }
      }
      return res;
      // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  // mounted() {
  //   this.insertFavor();
  // },
  methods: {
    async insertFavor() {
      // console.log(this.$store.state.house.aptCode);
      // console.log(this.userInfo.id);
      var params = {
        userid: this.userInfo.id,
        aptCode: this.house.aptCode,
      };
      await api
        .post("/favor", params)
        .then(({ data }) => {
          console.log("insert", data);
          this.house.isFavor = true;
          this.$store.dispatch("getFavor", this.userInfo.id);
        })
        .catch((error) => {
          console.log("insertError:", error);
        });
      console.log("isLogin", this.isLogin);
      console.log("isFavor", this.house.isFavor);
    },
    async deleteFavor() {
      await api
        .delete("/favor", {
          data: {
            userid: this.userInfo.id,
            aptCode: this.house.aptCode,
          },
        })
        .then(({ data }) => {
          console.log("delete");
          console.log(data);
          this.house.isFavor = false;
          this.$store.dispatch("getFavor", this.userInfo.id);
        })
        .catch((error) => {
          console.log("deleteError:", error);
        });
      this.$store.dispatch("getFavor", this.userInfo.id);
      this.$store.dispatch("getFavorList", this.userInfo.id);
    },
  },
};
</script>

<style></style>
