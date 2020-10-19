<template>
  <div>
    <!-- 头部区域 -->
    <home-header></home-header>
    <!-- 轮播图组件 -->
    <home-swiper></home-swiper>
    <!-- 图标展示区域 -->
    <home-Iconshow :iconList="dataList.iconList"></home-Iconshow>
    <!-- 热销推荐 -->
    <home-goods :recommendList="dataList.recommendList"></home-goods>
    <!-- 周末去哪儿 -->
    <home-weekend :weekendList="dataList.weekendList"></home-weekend>
  </div>
</template>

<script>
import homeHeader from "@/components/Home/header";
import homeSwiper from "@/components/Home/swiper";
import homeIconshow from "@/components/Home/iconShow";
import homeGoods from "@/components/Home/hotGoods";
import homeWeekend from "@/components/Home/weekend";
export default {
  components: { homeHeader, homeSwiper, homeIconshow, homeGoods, homeWeekend },
  mounted() {
    this.getIconList();
  },
  data() {
    return {
      dataList: {}
    };
  },
  methods: {
    getIconList() {
      this.$http.get("contentList").then(res => {
        if (res.status === 200) {
          this.dataList = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>