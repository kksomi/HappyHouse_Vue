<template>
  <b-container>
    <!-- <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024px"
        img-height="480px"
        style="text-shadow: 1px 1px 2px #333"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        
        <a v-for="i in length" :key="i" :href="urlList[i]">
          <b-carousel-slide :caption-html="titleList[i]" :text="contentList[i]">
            <template #img>
              <img
                class="d-block img-fluid"
                :src="imgList[i]"
                alt="image blank"
              /> </template
          ></b-carousel-slide>
        </a>
      </b-carousel>
    </div> -->
    <!-- <div>
      <div v-for="i in length" :key="i">
        <p>
          url&title : <a :href="urlList[i]"> {{ titleList[i] }} </a>
        </p>
        <p>author : {{ authorList[i] }}</p>
        <p>img : <img :src="imgList[i]" /></p>
        <p>content : {{ contentList[i] }}</p>
        <hr />
      </div>
    </div> -->

    <h5 class="text-left" style="font-weight: bolder">
      <b-icon icon="newspaper"></b-icon> 부동산 최신기사
    </h5>
    <hr />
    <div v-for="i in length" :key="i" class="mt-4 mb-4">
      <b-row>
        <b-col><img :src="imgList[i]" /></b-col>
        <b-col cols="10" class="text-left"
          ><b-row
            ><a :href="urlList[i]" target="_blank">{{ titleList[i] }}</a></b-row
          >
          <b-row
            ><p>{{ contentList[i] }}</p></b-row
          ></b-col
        >
      </b-row>
      <hr />
    </div>
    <div class="text-right">
      <a
        href="https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=260"
        target="_blank"
        >[출처 : 네이버 기사]</a
      >
    </div>
  </b-container>
</template>

<script>
import newsList from "@/api/news.js";

export default {
  name: "NewsView",
  props: {
    msg: String,
  },
  data() {
    return {
      newsList: {
        authorList: [],
        contentList: [],
        imgList: [],
        titleList: [],
        urlList: [],
      },
      authorList: [],
      contentList: [],
      imgList: [],
      titleList: [],
      urlList: [],
      length: 0,
      slide: 0,
      sliding: null,
    };
  },
  created() {
    this.list();
  },
  methods: {
    async list() {
      await newsList(
        (response) => {
          this.newsList = response.data;
          this.authorList = this.newsList.authorList;
          this.contentList = this.newsList.contentList;
          this.imgList = this.newsList.imgList;
          this.titleList = this.newsList.titleList;
          this.urlList = this.newsList.urlList;
          this.length = this.titleList.length - 1;
        },
        (error) => {
          console.log(error);
        },
      );
    },
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}
.carousel-item img {
  height: 480px !important;
  width: 1024px !important;
}
</style>
