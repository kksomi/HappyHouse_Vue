<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1 text-right">
      <b-col class="text-right">
        <b-button variant="outline-secondary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1 text-right">
      <b-col class="text-right">
        <b-button
          style="float: right"
          variant="outline-secondary"
          @click="search()"
          >검색</b-button
        >
        <b-input
          style="
            margin-right: 10px;
            margin-left: 10px;
            width: 30%;
            float: right;
          "
          v-model="keyword"
        ></b-input>
      </b-col>
    </b-row>
    <b-row style="clear: both"></b-row>
    <board-list-item :articles="articles" />
  </b-container>
</template>

<script>
import http from "@/api/http";
import BoardListItem from "@/components/board/item/BoardListItem";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
  },
  data() {
    return {
      articles: [],
      keyword: "",
    };
  },
  created() {
    http.get(`/board`).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardRegister" });
    },
    search() {
      if (this.keyword != "") {
        http
          .get(`/board/search/` + this.keyword, {
            keyword: this.keyword,
          })
          .then(({ data }) => {
            this.articles = data;
          });
      } else {
        http.get(`/board`).then(({ data }) => {
          this.articles = data;
        });
      }
    },
  },
};
</script>
