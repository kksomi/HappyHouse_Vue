<template>
  <b-container> </b-container>
</template>

<script>
import apiInstance from "@/api/index.js";
import { mapActions } from "vuex";

const memberStore = "memberStore";
const api = apiInstance();

export default {
  data() {
    return {};
  },
  props: {
    id: { type: String },
  },
  created() {
    console.log(this.$route.params.id);
    this.deleteUser();
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    async logout() {
      await this.userLogout();
      this.$router.go(this.$router.push({ name: "home" }));
    },
    deleteUser() {
      api
        .delete(`user/delete/${this.$route.params.id}`)
        .then(alert("탈퇴 성공"), this.logout());
    },
  },
};
</script>

<style></style>
