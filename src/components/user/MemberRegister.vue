<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-card
        v-if="!isUserid"
        header="회원가입"
        header-tag="header"
        header-bg-variant="warning"
        style="width: 50%"
        class="mt-5 mb-5"
        align="center"
      >
        <div class="text-left">
          <b-form>
            <b-form-group id="id" label="아이디 :" label-for="id">
              <b-form-input
                id="id"
                v-model="user.id"
                type="text"
                placeholder="아이디 입력..."
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="password" label="비밀번호 :" label-for="password">
              <b-form-input
                id="password"
                v-model="user.password"
                type="password"
                placeholder="비밀번호 입력..."
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

            <b-form-group id="address" label="주소 :" label-for="address">
              <b-form-input
                id="address"
                v-model="user.address"
                type="text"
                placeholder="주소 입력..."
              ></b-form-input>
            </b-form-group>
            <div class="text-center">
              <b-button
                type="submit"
                variant="warning"
                class="m-1"
                @click="register"
                >회원가입</b-button
              >
            </div>
          </b-form>
        </div>
      </b-card>

      <b-card
        v-else
        header="회원정보 수정"
        header-tag="header"
        header-bg-variant="success"
        header-text-variant="light"
        style="width: 50%"
        class="mt-5 mb-5"
        align="center"
      >
        <div class="text-left">
          <b-form>
            <b-form-group id="id" label="아이디 :" label-for="id">
              <b-form-input
                id="id"
                v-model="user.id"
                type="text"
                readonly="readonly"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="password" label="비밀번호 :" label-for="password">
              <b-form-input
                id="password"
                v-model="user.password"
                type="password"
                placeholder="비밀번호 입력..."
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

            <b-form-group id="address" label="주소 :" label-for="address">
              <b-form-input
                id="address"
                v-model="user.address"
                type="text"
                placeholder="주소 입력..."
              ></b-form-input>
            </b-form-group>
            <div class="text-center">
              <b-button
                type="submit"
                variant="success"
                class="m-1"
                @click="register"
                >회원정보 수정</b-button
              >
            </div>
          </b-form>
        </div>
      </b-card>

      <!-- <b-row>
      <b-col>
        <b-alert variant="secondary" show v-if="!isUserid"
          ><h3>회원가입</h3></b-alert
        >
        <b-alert variant="secondary" show v-else
          ><h3>회원정보 수정</h3></b-alert
        >
      </b-col>
    </b-row>
    <div class="text-left">
      <b-form>
        <b-form-group id="id" label="아이디 :" label-for="id">
          <b-form-input
            id="id"
            v-model="user.id"
            type="text"
            placeholder="아이디 입력..."
            v-if="isUserid"
            readonly="readonly"
            required
          ></b-form-input>
          <b-form-input
            id="id"
            v-model="user.id"
            type="text"
            placeholder="아이디 입력..."
            v-else
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="password" label="비밀번호 :" label-for="password">
          <b-form-input
            id="password"
            v-model="user.password"
            type="password"
            placeholder="비밀번호 입력..."
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

        <b-form-group id="address" label="주소 :" label-for="address">
          <b-form-input
            id="address"
            v-model="user.address"
            type="text"
            placeholder="주소 입력..."
          ></b-form-input>
        </b-form-group>
        <div class="text-center">
          <b-button
            type="button"
            variant="primary"
            class="m-1"
            @click="register"
            v-if="!isUserid"
            >회원가입</b-button
          >
          <b-button
            type="button"
            variant="primary"
            class="m-1"
            @click="update"
            v-else
            >정보수정</b-button
          >
        </div>
      </b-form>
    </div> -->
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import apiInstance from "@/api/index.js";
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const api = apiInstance();

export default {
  name: "MemberRegister",
  data() {
    return {
      user: {
        id: "",
        password: "",
        name: "",
        email: "",
        address: "",
      },
      isUserid: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    if (this.userInfo === null) {
      this.isUserid = false;
    } else {
      this.user.id = this.userInfo.id;
      this.user.password = this.userInfo.password;
      this.user.name = this.userInfo.name;
      this.user.email = this.userInfo.email;
      this.user.address = this.userInfo.address;
      this.isUserid = true;
    }
  },
  methods: {
    ...mapActions(memberStore, ["getUserInfo"]),
    register() {
      this.inputValidation();
      api
        .post(`/user/register`, JSON.stringify(this.user))
        .then(alert("회원가입 성공"), this.$router.push({ name: "signIn" }));
    },
    update() {
      this.inputValidation();
      let token = sessionStorage.getItem("access-token");
      api
        .put(`user/update`, JSON.stringify(this.user))
        .then(
          alert("회원정보 수정 성공"),
          this.getUserInfo(token),
          this.$router.push({ name: "mypage" }),
        );
    },
    inputValidation() {
      let err = true;
      let msg = "";
      !this.user.id &&
        ((msg = "아이디 입력해주세요"), (err = false), this.$refs.id.focus());
      err &&
        !this.user.password &&
        ((msg = "비밀번호 입력해주세요"),
        (err = false),
        this.$refs.password.focus());
      err &&
        !this.user.name &&
        ((msg = "이름 입력해주세요"), (err = false), this.$refs.name.focus());
      err &&
        !this.user.email &&
        ((msg = "이메일 입력해주세요"),
        (err = false),
        this.$refs.email.focus());

      if (!err) alert(msg);
    },
  },
};
</script>

<style></style>
