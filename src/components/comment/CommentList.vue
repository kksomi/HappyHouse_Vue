<template>
  <b-row>
    <b-col>
      <b-table-simple>
        <colgroup>
          <col width="20%" />
          <col width="50%" />
          <col width="20%" />
          <col width="10%" />
        </colgroup>
        <b-thead>
          <b-th>작성자</b-th>
          <b-th>내용</b-th>
          <b-th class="text-right">작성일</b-th>
          <b-th>삭제</b-th>
        </b-thead>
        <tbody>
          <!-- 하위 component인 ListRow에 데이터 전달(props) -->
          <b-tr v-for="comment in comments" :key="comment.commentno">
            <b-td class="text-left" style="font-weight: bold">
              {{ comment.userid }}
            </b-td>
            <b-td>{{ comment.content }}</b-td>
            <b-td class="text-right">{{ comment.regtime }}</b-td>

            <b-td>
              <b-link
                style="color: #b82647"
                @click="deleteComment(comment.commentno)"
                v-if="comment.userid === userInfo.id || userInfo.role === 1"
                >삭제</b-link
              ></b-td
            >
          </b-tr>
        </tbody>
      </b-table-simple>
    </b-col>
  </b-row>
</template>

<script>
import apiInstance from "@/api/index.js";
import moment from "moment";
import { mapState } from "vuex";

const memberStore = "memberStore";

const api = apiInstance();
export default {
  name: "CommentList",
  data() {
    return {
      pageNum: 0,
      comments: [],
    };
  },
  created() {
    api.get(`/comment/${this.$route.params.articleno}`).then(({ data }) => {
      this.comments = data;
    });
  },

  props: {
    articleno: Number,
    pageSize: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum += -1;
    },
    deleteComment(commentno) {
      if (confirm("정말 삭제하시겠습니까?")) {
        api
          .delete(`comment/` + commentno)
          .then(this.moveList())
          .catch(console.log("comment delete err!"));
      }
    },
    moveList() {
      this.$router.go(this.$router.currentRoute);
    },
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    pageCount() {
      let listLeng = this.articles.length,
        listSize = this.pageSize,
        page = Math.floor(listLeng / listSize);

      if (listLeng % listSize > 0) page += 1;

      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;

      return this.articles.slice(start, end);
    },
  },
};
</script>

<style></style>
