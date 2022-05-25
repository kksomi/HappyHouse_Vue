<template>
  <div>
    <b-row>
      <b-col v-if="articles.length">
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="검색"
              label-for="filter-input"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  placeholder="Search"
                ></b-form-input>

                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group
              v-model="sortDirection"
              label="검색 키워드"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-checkbox-group
                v-model="filterOn"
                :aria-describedby="ariaDescribedby"
                class="mt-1"
              >
                <b-form-checkbox value="subject">제목</b-form-checkbox>
                <b-form-checkbox value="userid">작성자</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>

          <b-col></b-col>
          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="Per page"
              label-for="per-page-select"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
            >
              <b-form-select
                id="per-page-select"
                v-model="perPage"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-table
            :items="articles"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            stacked="md"
            show-empty
            small
            hover="true"
            @filtered="onFiltered"
          >
            <template #cell(subject)="row">
              <router-link
                :to="{
                  name: 'boardDetail',
                  params: { articleno: row.item.articleno },
                }"
              >
                <p v-if="row.item.priority == 1" style="font-weight: bold">
                  <b-badge v-if="newArticle(row.item.regtime)" variant="info"
                    >NEW</b-badge
                  >
                  [필독] {{ row.item.subject }}
                </p>
                <p v-else>
                  <b-badge v-if="newArticle(row.item.regtime)" variant="info"
                    >NEW</b-badge
                  >
                  {{ row.item.subject }}
                </p>
              </router-link>
            </template>
            <template #cell(regtime)="row">
              {{ row.item.regtime | dateFormat }}
            </template>
          </b-table>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              size="sm"
              align="fill"
              class="my-0"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-col>

      <b-col v-else class="text-center">도서 목록이 없습니다.</b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
import { listArticle } from "@/api/board.js";

export default {
  name: "BoardListItem",
  data() {
    return {
      articles: [],
      sortDirection: "asc",
      fields: [
        {
          key: "articleno",
          label: "No",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
          thStyle: { width: "10%" },
        },
        {
          key: "subject",
          label: "제목",
          sortable: true,
          class: "text-left",
          sortDirection: "desc",
          thStyle: { width: "50%" },
        },
        {
          key: "hit",
          label: "조회수",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
          thStyle: { width: "10%" },
        },
        {
          key: "userid",
          label: "작성자",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
          thStyle: { width: "15%" },
        },
        {
          key: "regtime",
          label: "작성일",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
          thStyle: { width: "15%" },
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, 20],
      filter: null,
      filterOn: [],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    this.list(param);
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      if (filteredItems != "" || filteredItems != null) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      } else {
        this.totalRows = this.articles.length;
        this.currentPage = 1;
      }
    },
    async list(param) {
      await listArticle(
        param,
        (response) => {
          this.articles = response.data;
          this.totalRows = this.articles.length;
        },
        (error) => {
          console.log(error);
        },
      );
    },
    newArticle(regtime) {
      let today = new Date();
      let curYear = today.getFullYear();
      let curMonth = today.getMonth() + 1;
      let curDay = today.getDate();
      let artYear = regtime.substring(0, 4);
      let artMonth = regtime.substring(5, 7);
      let artDay = regtime.substring(8, 10);
      if (curYear == artYear) {
        if (curMonth == artMonth) {
          if (curDay <= parseInt(artDay) + 5) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
};
</script>

<style>
.page-item.active .page-link {
  background-color: #f0f8ff !important;
  border-color: lightgrey !important;
  color: #1e90ff !important;
}
.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  background-color: #f0f8ff;
}
</style>
