<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col></b-col>
      <!-- header="회원정보"
        header-tag="header"
        header-bg-variant="info"
        title="My Page" -->
      <b-card
        v-if="!isUserid"
        style="width: 550px"
        class="mt-5 mb-5"
        header="My Page"
        header-tag="header"
        header-text-variant="light"
        header-bg-variant="info"
        align="center"
      >
        <!-- <hr class="my-4" /> -->
        <div class="text-center">
          <b-container>
            <b-row class="mt-5">
              <b-col></b-col>
              <b-col cols="3" style="font-weight: bolder" class="text-left">
                <b-icon icon="key"></b-icon> ID </b-col
              ><b-col cols="4">{{ userInfo.id }}</b-col>
              <b-col></b-col>
            </b-row>
            <!-- <hr class="my-4 mt-5" /> -->
            <b-row class="mt-5">
              <b-col></b-col>
              <b-col cols="3" style="font-weight: bolder" class="text-left">
                <b-icon icon="person"></b-icon> Name</b-col
              ><b-col cols="4">{{ userInfo.name }}</b-col>
              <b-col></b-col>
            </b-row>
            <!-- <hr class="my-4 mt-5" /> -->
            <b-row class="mt-5">
              <b-col></b-col>
              <b-col cols="3" style="font-weight: bolder" class="text-left">
                <b-icon icon="envelope"></b-icon> E-mail </b-col
              ><b-col cols="4">{{ userInfo.email }} </b-col>
              <b-col></b-col>
            </b-row>
            <!-- <hr class="my-4 mt-5" /> -->
            <b-row class="mt-5 mb-5">
              <b-col></b-col>
              <b-col cols="3" style="font-weight: bolder" class="text-left"
                ><b-icon icon="house"></b-icon> Address </b-col
              ><b-col cols="4">{{ userInfo.address }}</b-col>
              <b-col></b-col>
            </b-row>
          </b-container>
          <!-- <hr class="my-4 mt-5 mb-5" /> -->

          <b-button variant="success" href="#" class="mr-1" @click="moveUpdate"
            >정보수정</b-button
          >
          <b-button variant="danger" href="#" @click="moveDelete"
            >회원탈퇴</b-button
          >
        </div>
      </b-card>
      <!-- <b-col cols="8">
        <b-jumbotron>
          <template #header>My Page</template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.id }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.name }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.email }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">주소</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.address }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button variant="success" href="#" class="mr-1" @click="moveUpdate"
            >정보수정</b-button
          >
          <b-button variant="danger" href="#" @click="moveDelete"
            >회원탈퇴</b-button
          >
        </b-jumbotron>
      </b-col> -->
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.myInfo();
  },
  methods: {
    ...mapActions(memberStore, ["getUserInfo"]),
    async myInfo() {
      let token = sessionStorage.getItem("access-token");
      await this.getUserInfo(token);
    },
    moveUpdate() {
      this.$router.push({ name: "signUp" });
    },
    moveDelete() {
      this.$router.push({
        name: "userDelete",
        params: { id: this.userInfo.id },
      });
    },
  },
};
</script>

<style></style>
