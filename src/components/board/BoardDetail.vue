<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-secondary" @click="listArticle"
          >목록</b-button
        >
      </b-col>
      <b-col class="text-right" v-if="article.userid === userid">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleno}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
            <div style="padding-top: 50px">
              <b-row>
                <b-col
                  ><h5 class="underline-pink" style="font-weight: bolder">
                    댓글
                  </h5></b-col
                >
              </b-row>
              <comment-write :articleno="articleno"></comment-write>
              <comment-list :articleno="articleno"></comment-list>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getArticle, deleteArticle, countArticle } from "@/api/board";
import CommentList from "@/components/comment/CommentList";
import CommentWrite from "@/components/comment/CommentWrite.vue";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
      userid: "",
    };
  },
  components: {
    CommentList,
    CommentWrite,
  },
  props: {
    articleno: { type: Number },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    countArticle(this.$route.params.articleno);
    getArticle(
      this.$route.params.articleno,
      (response) => {
        this.article = response.data;
      },
      (error) => {
        console.log("불러오기 에러발생!!", error);
        // eslint-disable-next-line
      },
    );
    this.userid = this.userInfo.id;
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "boardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "boardModify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "boardList" });
        });
      }
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style scoped>
.underline-pink {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(247, 28, 229, 0.26) 30%
  );
}
</style>
