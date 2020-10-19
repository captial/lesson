<template>
  <div class="app">
    <div class="swiperImg">
      <van-swipe :autoplay="3000" :height="140">
        <van-swipe-item v-for="(item, index) in imgList" :key="index">
          <img v-lazy="item.imgUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload } from "vant";
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload);
export default {
  data() {
    return {
      imgList: [
        {
          imgUrl:
            "http://imgs.qunarzz.com/vs_ceph_vcimg/1cfbdaa2682ada2f854ea6114b3677c8.jpeg"
        },
        {
          imgUrl:
            "http://imgs.qunarzz.com/vs_ceph_vcimg/56ad7891af78b372fbe9dac94cb0ce54.jpeg"
        },
        {
          imgUrl:
            "http://imgs.qunarzz.com/vs_ceph_vcimg/933339c6e6675fe098846bd0a81c4d37.jpeg"
        },
        {
          imgUrl:
            "http://imgs.qunarzz.com/vs_ceph_vcimg/b8c4527c41649814cc4cf86880abba54.jpeg"
        },
        {
          imgUrl:
            "http://imgs.qunarzz.com/vs_ceph_vcimg/7176acd77332a433af9636eb9a2c338c.jpeg"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.swiperImg {
  transform: translateZ(0);
  .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>