<template>
  <b-container fluid>
    <b-row>
      <b-col> </b-col>
    </b-row>
    <!-- User Interface controls -->
    <div class="mt-4">
      <b-card class="mb-4 mt-4">
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
              label-cols-sm="4"
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
                <b-form-checkbox value="id">아이디</b-form-checkbox>
                <b-form-checkbox value="name">이름</b-form-checkbox>
                <b-form-checkbox value="email">이메일</b-form-checkbox>
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
      </b-card>
    </div>

    <!-- Main table element -->
    <b-table
      :items="users"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      stacked="md"
      show-empty
      @filtered="onFiltered"
    >
      <template #cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-1">
          {{ row.detailsShowing ? "Hide" : "Show" }}
        </b-button>
        <b-button
          size="sm"
          @click="info(row.item, row.item.id, $event.target)"
          style="background-color: white; color: #4682b4; border: none"
          class="mr-1"
        >
          수정
        </b-button>
        <b-button
          size="sm"
          @click="deleteUser(row.item.id)"
          style="background-color: white; color: #dc143c; border: none"
          class="mr-1"
        >
          삭제
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>아이디 :</b></b-col>
            <b-col class="text-left">{{ row.item.id }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>비밀번호 :</b></b-col>
            <b-col class="text-left">{{ row.item.password }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>이름 :</b></b-col>
            <b-col class="text-left">{{ row.item.name }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>이메일 :</b></b-col>
            <b-col class="text-left">{{ row.item.email }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>주소 :</b></b-col>
            <b-col class="text-left">{{ row.item.address }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>유형 :</b></b-col>
            <b-col class="text-left">{{
              row.item.role === 1 ? "관리자" : "일반회원"
            }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
    <b-row class="justify-content-md-center">
      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0 mt-4"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      @hide="resetInfoModal"
      @ok="handleOk"
    >
      <!--<pre>{{ infoModal.content }}</pre>-->
      <b-form class="text-left" @submit.stop.prevent="handleSubmit">
        <b-form-group label="아이디: " label-for="id">
          <b-form-input
            id="id"
            v-model="infoModal.user.id"
            readonly="readonly"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호: " label-for="password">
          <b-form-input
            id="password"
            v-model="infoModal.user.password"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="이름: " label-for="name">
          <b-form-input id="name" v-model="infoModal.user.name" required>
          </b-form-input>
        </b-form-group>
        <b-form-group label="이메일: " label-for="email">
          <b-form-input id="email" v-model="infoModal.user.email" required>
          </b-form-input>
        </b-form-group>
        <b-form-group label="주소: " label-for="address">
          <b-form-input id="address" v-model="infoModal.user.address">
          </b-form-input>
        </b-form-group>
        <b-form-group label="권한: " label-for="role">
          <b-form-select
            id="role-select"
            v-model="infoModal.user.role"
            :options="roleOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import apiInstance from "@/api/index.js";
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const api = apiInstance();

export default {
  data() {
    return {
      users: [],
      sortDirection: "asc",
      fields: [
        {
          key: "id",
          label: "아이디",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
        {
          key: "name",
          label: "이름",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
        {
          key: "email",
          label: "이메일",
          sortable: true,
          class: "text-center",
          sortDirection: "desc",
        },
        { key: "actions", label: "" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      roleOptions: [
        { value: 1, text: "관리자" },
        { value: 2, text: "일반회원" },
      ],
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        user: [],
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["userList"]),
  },
  created() {
    this.list();
  },
  mounted() {
    // Set the initial number of items
    // if (this.users != null) {
    //   this.totalRows = this.users.length;
    // }
  },
  methods: {
    ...mapActions(memberStore, ["getUserList"]),
    async list() {
      await this.getUserList();
      this.users = this.userList;
      this.totalRows = this.users.length;
    },
    info(item, id, button) {
      this.infoModal.title = `정보 수정 : ${id}`;
      this.infoModal.user = item;
      this.$root.$emit(
        "bv::show::modal",
        this.infoModal.id,
        this.infoModal.user,
        button,
      );
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.user = null;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();

      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      api
        .put(`user/update`, JSON.stringify(this.infoModal.user))
        .then(
          alert("회원정보 수정 성공"),
          this.list(),
          (this.users = this.userList),
          this.$router.go(this.$router.push()),
        );
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    deleteUser(id) {
      api
        .delete(`user/delete/${id}`)
        .then(
          alert("회원정보 삭제 성공"),
          this.list(),
          (this.users = this.userList),
          this.$router.go(this.$router.push()),
        );
    },
  },
};
</script>
