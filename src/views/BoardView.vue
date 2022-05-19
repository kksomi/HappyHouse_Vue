<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-blue" style="font-weight: bolder">공지사항</h3>
    <router-view></router-view>
  </b-container>
</template>
<script>
export default {
  name: "NoticeView",
};
</script>
<style scoped>
.underline-blue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(28, 87, 247, 0.3) 30%
  );
}
</style>
