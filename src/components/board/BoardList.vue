<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1 text-right">
      <b-col class="text-right">
        <b-button
          variant="outline-secondary"
          @click="moveWrite()"
          v-if="userInfo.role === 1"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>

    <b-row style="clear: both"></b-row>
    <board-list-item />
  </b-container>
</template>

<script>
import BoardListItem from "@/components/board/item/BoardListItem";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {},
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardRegister" });
    },
  },
};
</script>
