<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-steelblue">
      <b-icon icon="house"></b-icon> Happy House
    </h3>
    <b-row>
      <b-col></b-col>
      <news-view></news-view>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import NewsView from "@/components/main/NewsView.vue";

export default {
  name: "HomeView",
  props: {
    msg: String,
  },
  components: {
    NewsView,
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}
</style>
