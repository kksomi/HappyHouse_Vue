<template>
  <div>
    <b-navbar toggleable="lg" style="background-color: #f0f8ff">
      <b-navbar-brand href="#">
        <router-link to="/">
          <img
            src="@/assets/HappyHouseLogo.png"
            class="d-inline-block align-middle"
            width="175px"
            alt="ssafy"
          />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"
            ><router-link :to="{ name: 'home' }" class="link"
              ><b-icon icon="house" font-scale="1.5"></b-icon> Home</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'board' }" class="link"
              ><b-icon icon="journal" font-scale="1.5"></b-icon>
              Notice</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'house' }" class="link"
              ><b-icon icon="house-fill" font-scale="1.5"></b-icon>
              House</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="people" font-scale="2" color="#1E90FF"></b-icon>
            </template>
            <b-dropdown-item href="#">
              <router-link
                :to="{ name: 'userList' }"
                class="link"
                v-if="role === 1"
                ><b-icon icon="person-lines-fill"></b-icon> User
                List</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#">
              <router-link
                :to="{ name: 'mypage' }"
                class="link"
                v-if="userid.length"
                ><b-icon icon="person-circle"></b-icon> My Page</router-link
              >
              <router-link :to="{ name: 'signUp' }" class="link" v-else
                ><b-icon icon="person-circle"></b-icon> Join</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link
                :to="{ name: 'signOut' }"
                class="link"
                v-if="userid.length"
                ><b-icon icon="power"></b-icon> Logout</router-link
              >
              <router-link :to="{ name: 'signIn' }" class="link" v-else
                ><b-icon icon="key"></b-icon> Login</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "HeaderNaviBar",
  data() {
    return {
      userid: "",
      role: 0,
      users: [],
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo", "isLogin"]),
  },
  created() {
    if (this.userInfo) {
      this.userid = this.userInfo.id;
      this.role = this.userInfo.role;
    }
  },
};
</script>

<style></style>
