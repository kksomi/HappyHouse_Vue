<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit">
        <b-col>
          <b-form-group id="userid-group" label="작성자:" label-for="userid">
            <b-form-input
              id="userid"
              v-model="comment.userid"
              type="text"
              required
              placeholder="아이디 입력..."
            ></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="내용:" label-for="content">
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
import http from "@/api/http";

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
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.comment.userid &&
        ((msg = "작성자 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.comment.content &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());

      if (!err) alert(msg);
      else this.registComment();
    },
    registComment() {
      http
        .post(`/comment`, {
          articleno: this.$route.params.articleno,
          userid: this.comment.userid,
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
