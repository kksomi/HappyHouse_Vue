<template>
  <b-container> </b-container>
</template>

<script>
import { mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      isUserid: false,
    };
  },
  created() {
    this.logout();
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    async logout() {
      await this.userLogout();
      this.$router.go(this.$router.push({ name: "home" }));
    },
  },
};
</script>

<style></style>
