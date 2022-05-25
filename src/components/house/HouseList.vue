/* eslint-disable */
<template>
  <b-container fluid>
    <div class="mt-4">
      <b-card>
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Sort"
              label-for="sort-by-select"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
              v-slot="{ ariaDescribedby }"
            >
              <b-input-group size="sm">
                <b-form-select
                  id="sort-by-select"
                  v-model="sortBy"
                  :options="sortOptions"
                  :aria-describedby="ariaDescribedby"
                  class="w-75"
                >
                  <template #first>
                    <option value="">-- none --</option>
                  </template>
                </b-form-select>

                <b-form-select
                  v-model="sortDesc"
                  :disabled="!sortBy"
                  :aria-describedby="ariaDescribedby"
                  size="sm"
                  class="w-25"
                >
                  <option :value="false">Asc</option>
                  <option :value="true">Desc</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col></b-col>
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
                <b-form-checkbox value="dongName">동</b-form-checkbox>
                <b-form-checkbox value="aptName">아파트</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col lg="6" class="my-1 text-left">
            <b-form-group
              label="거래금액(억)"
              label-for="money"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
              ><vue-range-slider
                ref="slider"
                v-model="value"
                :enableCross="false"
              ></vue-range-slider>
            </b-form-group>
          </b-col>

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
      </b-card>
    </div>

    <div class="mt-4">
      <b-row>
        <b-col cols="6" float="left">
          <b-container
            v-if="houses && houses.length != 0"
            class="bv-example-row mt-3"
          >
            <!-- <kakao-map></kakao-map> -->
            <house-list-item
              :houses="houses"
              :value="value"
              :perPage="perPage"
              :filter="filter"
              :filterOn="filterOn"
              :sortDirection="sortDirection"
              :sortBy="sortBy"
              :sortDesc="sortDesc"
            />
          </b-container>
          <b-container v-else class="bv-example-row mt-3">
            <b-row>
              <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
            </b-row>
          </b-container>
        </b-col>
        <b-col cols="6">
          <house-detail></house-detail>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import HouseListItem from "@/components/house/HouseListItem.vue";
// import KakaoMap from "@/components/house/KakaoMap.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";
import "vue-range-component/dist/vue-range-slider.css";
import VueRangeSlider from "vue-range-component";
import { mapState } from "vuex";

export default {
  name: "HouseList",
  components: {
    HouseListItem,
    HouseDetail,
    VueRangeSlider,
    // KakaoMap,
  },
  data() {
    return {
      sortOpt: [
        {
          key: "aptName",
          label: "아파트",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "dongName",
          label: "법정동",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "buildYear",
          label: "건축연도",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "recentPrice",
          label: "거래금액",
          sortable: true,
          sortDirection: "desc",
        },
      ],
      value: [0, 100],
      perPage: 10,
      pageOptions: [5, 10, 15, 20],
      filter: null,
      filterOn: [],
      sortDirection: "asc",
      sortBy: "",
      sortDesc: false,
      //houses: [],
    };
  },
  computed: {
    ...mapState(["houses", "house"]),
    sortOptions() {
      // Create an options list from our fields
      return this.sortOpt
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
};
</script>

<style></style>
/* eslint-enable */
