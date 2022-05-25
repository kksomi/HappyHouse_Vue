<template>
  <b-container class="bv-example-row mt-3" style="width: 70%">
    <b-row>
      <b-col></b-col>
      <b-card
        header="로그인"
        header-tag="header"
        header-text-variant="light"
        header-bg-variant="primary"
        style="width: 50%"
        class="mt-5 mb-5"
        align="center"
      >
        <b-form class="text-left">
          <b-alert show variant="danger" v-if="isLoginError"
            >아이디 또는 비밀번호를 확인하세요.</b-alert
          >
          <b-form-group label="아이디:" label-for="id" class="mt-3">
            <b-form-input
              id="id"
              v-model="user.id"
              required
              placeholder="아이디 입력...."
              @keyup.enter="confirm"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="비밀번호:" label-for="password">
            <b-form-input
              type="password"
              id="password"
              v-model="user.password"
              required
              placeholder="비밀번호 입력...."
              @keyup.enter="confirm"
            ></b-form-input>
          </b-form-group>
          <div class="text-right">
            <b-button
              type="button"
              style="
                background-color: white;
                border: none;
                color: #dc143c;
                font-weight: bolder;
              "
              class="m-1 mt-2"
              @click="moveSearchPassword"
              >비밀번호찾기</b-button
            >
          </div>
          <div class="text-center mt-2 mb-2">
            <b-button
              type="submit"
              variant="primary"
              class="m-1"
              @click="confirm"
              >로그인</b-button
            >
            <!-- <b-button
              type="button"
              style="
                background-color: white;
                border: none;
                color: #1e90ff;
                font-weight: bolder;
              "
              class="m-1"
              @click="moveRegistry"
              >회원가입</b-button
            > -->
          </div>
        </b-form>
      </b-card>
      <!-- <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group label="아이디:" label-for="id">
              <b-form-input
                id="id"
                v-model="user.id"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="password">
              <b-form-input
                type="password"
                id="password"
                v-model="user.password"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <div class="text-right">
              <b-button
                type="button"
                variant="danger"
                class="m-1"
                @click="moveSearchPassword"
                >비밀번호찾기</b-button
              >
            </div>
            <div class="text-center">
              <b-button
                type="button"
                variant="primary"
                class="m-1"
                @click="confirm"
                >로그인</b-button
              >
              <b-button
                type="button"
                variant="success"
                class="m-1"
                @click="moveRegistry"
                >회원가입</b-button
              >
            </div>
          </b-form>
        </b-card>
      </b-col> -->
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      user: {
        id: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      this.onSubmit();
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        //this.$router.push({ name: "home" });
        this.$router.go(this.$router.push({ name: "home" }));
      }
    },
    moveRegistry() {
      this.$router.push({ name: "signUp" });
    },
    moveSearchPassword() {
      this.$router.push({ name: "searchPassword" });
    },
    onSubmit() {
      let err = true;
      let msg = "";
      !this.user.id &&
        ((msg = "아이디 입력해주세요"), (err = false), this.$refs.id.focus());
      err &&
        !this.user.password &&
        ((msg = "비밀번호 입력해주세요"),
        (err = false),
        this.$refs.password.focus());

      if (!err) alert(msg);
    },
  },
};
</script>

<style>
.btn-vue {
  background: #53b985;
  color: #31485d;
  font-weight: bold;
}
</style>
