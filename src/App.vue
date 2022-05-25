/* eslint-disable */
<template>
  <div id="app">
    <navi-bar /> <router-view />
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import NaviBar from "@/components/layout/HeaderNaviBar.vue";
import VueFooter from "@/components/layout/VueFooter.vue";

export default {
  name: "App",
  components: {
    NaviBar,
    VueFooter,
  },
};
</script>

<style>
a {
  text-decoration: none;
}

/* html {
  background-color: #f0f8ff;
} */

a:hover {
  text-decoration: none;
  font-weight: bold;
  color: chartreuse;
}

a.router-link-exact-active {
  color: #3aa4ca;
}
.page-item.active .page-link {
  background-color: #f0f8ff !important;
  border-color: lightgrey !important;
  color: #1e90ff !important;
}
.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  background-color: #f0f8ff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
/* eslint-enable */
