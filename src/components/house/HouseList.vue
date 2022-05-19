/* eslint-disable */
<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <kakao-map></kakao-map>
    <house-list-item
      v-for="(house, index) in houses"
      :key="index"
      :house="house"
    />
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseListItem from "@/components/house/HouseListItem.vue";
import KakaoMap from "@/components/house/KakaoMap.vue";
import { mapState } from "vuex";

export default {
  name: "HouseList",
  components: {
    HouseListItem,
    KakaoMap,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["houses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
};
</script>

<style></style>
/* eslint-enable */
