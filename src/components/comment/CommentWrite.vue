<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit">
        <b-col>
          작성자 : {{ this.userInfo.id }}

          <b-form-group id="content-group" label-for="content">
            <b-form-textarea
              id="content"
              v-model="comment.content"
              placeholder="내용 입력..."
              rows="3"
              max-rows="10"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col class="text-right">
          <b-button
            type="submit"
            variant="primary"
            class="m-1"
            :key="$route.fullPath"
            >작성</b-button
          >
        </b-col>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import apiInstance from "@/api/index.js";
import { mapState } from "vuex";

const memberStore = "memberStore";

const api = apiInstance();

export default {
  name: "CommentWrite",
  data() {
    return {
      comment: {
        articleno: 0,
        userid: "",
        content: "",
      },
      isUserid: false,
    };
  },
  created() {},

  props: {
    articleno: Number,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      !this.comment.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else this.registComment();
    },
    registComment() {
      api
        .post(`/comment`, {
          articleno: this.$route.params.articleno,
          userid: this.userInfo.id,
          content: this.comment.content,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        });
    },

    moveList() {
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style></style>
