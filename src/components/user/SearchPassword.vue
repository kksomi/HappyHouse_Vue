<template>
  <b-container class="bv-example-row mt-3" style="width: 70%">
    <b-row>
      <b-col></b-col>
      <b-card
        header="비밀번호 찾기"
        header-tag="header"
        header-text-variant="light"
        header-bg-variant="danger"
        style="width: 50%"
        class="mt-5 mb-5"
        align="center"
      >
        <b-form class="text-left">
          <b-form-group id="id" label="아이디 :" label-for="id">
            <b-form-input
              id="id"
              v-model="user.id"
              type="text"
              placeholder="아이디 입력..."
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="name" label="이름 :" label-for="name">
            <b-form-input
              id="name"
              v-model="user.name"
              type="text"
              placeholder="이름 입력..."
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="email" label="이메일 :" label-for="email">
            <b-form-input
              id="email"
              v-model="user.email"
              type="email"
              placeholder="이메일 입력..."
              required
            ></b-form-input>
          </b-form-group>

          <div class="text-center">
            <b-button type="button" variant="danger" class="m-1" @click="search"
              >비밀번호 찾기</b-button
            >
          </div>
        </b-form>
      </b-card>
      <b-col></b-col>
      <b-modal
        ref="pwd-modal"
        title="비밀번호 찾기 성공"
        v-if="pwd.length"
        @ok="handleOk"
        @hide="resetInfoModal"
      >
        [{{ user.name }}]님의 비밀번호는 {{ pwd }} 입니다.
      </b-modal>
      <b-modal ref="pwd-modal" title="비밀번호 찾기 실패" v-else>
        입력하신 정보와 일치하는 회원이 없습니다.
      </b-modal>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "SearchPassword",
  data() {
    return {
      user: {
        id: null,
        name: null,
        email: null,
      },
      pwd: "",
      isUser: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["password"]),
  },
  created() {},
  methods: {
    ...mapActions(memberStore, ["initPassword", "findPassword"]),
    async search() {
      this.pwd = "";
      await this.findPassword(this.user);
      if (this.password != null || this.password != "") {
        this.isUser = true;
        this.pwd = this.password;
      } else {
        this.isUser = false;
        this.pwd = "";
      }
      this.showModal();
    },
    showModal() {
      this.$refs["pwd-modal"].show();
    },
    handleOk() {
      // this.moveSignIn();
      this.$router.push({ name: "signIn" });
    },
    moveSignIn() {
      this.$router.push({ name: "signIn" });
    },
  },
};
</script>

<style></style>
