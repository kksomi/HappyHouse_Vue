<template>
  <div>
    <b-row>
      <b-col v-if="articles.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <b-tr v-for="article in paginatedData" :key="article.articleno">
              <b-td>{{ article.articleno }}</b-td>
              <b-td class="text-left">
                <router-link
                  :to="{
                    name: 'boardDetail',
                    params: { articleno: article.articleno },
                  }"
                  ><p v-if="article.priority == 1" style="font-weight: bold">
                    [필독] {{ article.subject }}
                  </p>
                  <p v-else>{{ article.subject }}</p>
                </router-link>
              </b-td>
              <b-td>{{ article.hit }}</b-td>
              <b-td>{{ article.userid }}</b-td>
              <b-td>{{ article.regtime | dateFormat }}</b-td>
            </b-tr>
          </tbody>
        </b-table-simple>
      </b-col>
    </b-row>

    <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->

    <b-row class="text-center">
      <b-col class="text-center">
        <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
          이전
        </button>
        <span class="page-count"
          >{{ pageNum + 1 }} / {{ pageCount }} 페이지</span
        >
        <button
          :disabled="pageNum >= pageCount - 1"
          @click="nextPage"
          class="page-btn"
        >
          다음
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "BoardListItem",
  data() {
    return {
      pageNum: 0,
    };
  },

  props: {
    articles: Array,
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
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
  computed: {
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
