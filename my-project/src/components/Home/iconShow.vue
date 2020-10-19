<template>
  <div class="iconlist">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide v-for="(page,index) of pages" :key="index">
        <div class="icon" v-for="(item,index) of page" :key="item.id">
          <div class="icomShow">
            <img :src="item.imgUrl" />
            <p>{{item.desc}}</p>
          </div>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="infoMessage">
      <div class="mess">
        <i class="iconfont icon-icon-test"></i>
        <span>定位失败</span>
      </div>
      <div class="mess">
        <i class="iconfont icon-diqiu"></i>
        <span>五折泡泉</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
// import "swiper/dist/css/swiper.css";
export default {
  mounted() {},
  data() {
    return {
      notNextTick: true,
      swiperOption: {}
    };
  },
  props: {
    iconList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    pages() {
      const pages = [];
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  },
  methods: {},
  watch: {
    iconList: (newValue, oldValue) => {
      // console.log(newValue);
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-slide {
  // background-color: rosybrown;
  height: 0;
  padding-bottom: 50%;
  text-align: center;
  .icon {
    overflow: hidden;
    position: relative;
    float: left;
    padding-bottom: 25%;
    // background-color: gold;
    width: 25%;
    height: 0;
    .icomShow {
      position: absolute;
      display: block;
      margin: 0 auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0.44rem;
      box-sizing: border-box;
      padding: 0.2rem;
    }
    img {
      height: 100%;
      display: block;
      margin: 0 auto;
    }
    p {
      padding: 0.15rem;
      color: gray;
    }
  }
}
.infoMessage {
  height: 0;
  padding-bottom: 12%;
  text-align: center;
  .mess {
    float: left;
    width: 49.8%;
    height: 0.75rem;
    line-height: 0.75rem;
    border-bottom: 1px solid rgb(233, 230, 230);
    border-top: 1px solid rgb(233, 230, 230);
  }
  .mess:nth-child(1) {
    border-right: 1px solid rgb(233, 230, 230);
  }
}
</style>