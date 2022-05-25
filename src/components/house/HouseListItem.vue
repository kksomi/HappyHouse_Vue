<template>
  <div>
    <!-- <b-row
      class="m-2"
      @click="selectHouse"
      @mouseover="colorChange(true)"
      @mouseout="colorChange(false)"
    >
      <b-col v-if="houses.length">
        <b-table-simple hover responsive>
          <tbody>
            <b-tr v-for="house in paginatedData" :key="house.aptName">
              <b-img
                id="img"
                thumbnail
                src="https://picsum.photos/250/250/?image=58"
                alt="Image 1"
              ></b-img>
              <b-td @click="getHouse(house)">{{ house.aptName }}</b-td>
            </b-tr>
          </tbody>
        </b-table-simple>
      </b-col>
    </b-row>

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
    -->

    <b-row>
      <b-table
        :items="houses"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filterObj"
        :filter-included-fields="filterOn"
        :filter-function="filterTable"
        :sort-by.sync="sortType"
        :sort-desc.sync="sortDsc"
        hover="true"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
        @row-clicked="selectHouse"
      >
        <template #cell(aptName)="row">
          <div @click="getHouse(row.item)">
            <b-img
              id="img"
              thumbnail
              src="https://picsum.photos/250/250/?image=58"
              alt="Image 1"
            ></b-img>
            {{ row.item.aptName }}
          </div>
        </template>
      </b-table>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HouseListItem",
  data() {
    return {
      isColor: false,
      pageNum: 0,
      house: [],
      //b-table 요소
      sortDirection: "asc",
      fields: [
        {
          key: "aptName",
          label: "",
          class: "text-left",
          sortDirection: "desc",
          // thStyle: { width: "10%" },
        },
      ],
      totalRows: 1,
      currentPage: 1,
      filterObj: {
        filter: "",
        min: 0,
        max: 100,
      },
      sortType: "",
      sortDsc: true,
    };
  },
  watch: {
    filter(newFilter) {
      this.filterObj.filter = newFilter;
    },
    value(newValue) {
      this.filterObj.min = newValue[0];
      this.filterObj.max = newValue[1];
    },
    sortBy() {
      this.sortType = this.sortBy;
    },
    sortDesc() {
      this.sortDsc = this.sortDesc;
    },
  },
  props: {
    houses: Array,
    value: Array,
    perPage: Number,
    filter: String,
    filterOn: Array,
    sortBy: String,
    sortDesc: Boolean,
    pageSize: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  created() {
    this.totalRows = this.houses.length;
  },
  methods: {
    ...mapActions(["detailHouse"]),
    selectHouse() {
      //console.log("listRow : ", this.house);
      // this.$store.dispatch("getHouse", this.house);
      this.detailHouse(this.house);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum += -1;
    },
    getHouse(house) {
      this.house = house;
    },
    filterTable(row, filter) {
      let recentPrice = row.recentPrice;
      if (recentPrice != null) {
        recentPrice = recentPrice.replace(",", "");
        recentPrice = recentPrice.replace(" ", "");
        if (
          row.aptName.includes(filter.filter) &&
          recentPrice >= filter.min * 10000 &&
          recentPrice <= filter.max * 10000
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      if (filteredItems != "" || filteredItems != null) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      }
      //  else {
      //   this.totalRows = this.houses.length;
      //   this.currentPage = 1;
      // }
    },
  },
  computed: {
    pageCount() {
      let listLeng = this.houses.length,
        listSize = this.pageSize,
        page = Math.floor(listLeng / listSize);

      if (listLeng % listSize > 0) page += 1;

      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;

      return this.houses.slice(start, end);
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
#img {
  width: 50px;
  height: 50px;
}
</style>
