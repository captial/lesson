<template>
  <div>
    <!-- header -->
    <city-header :cities="dataList.cities"></city-header>
    <city-list :dataList="dataList" :letter="letter"></city-list>
    <city-letter :dataList="dataList" @handleParams="getVal"></city-letter>
  </div>
</template>

<script>
import cityHeader from "./components/header.vue";
import cityList from "./components/list.vue";
import cityLetter from "./components/letter.vue";
export default {
  components: { cityHeader, cityList, cityLetter },
  mounted() {
    this.getCityDatalist();
  },
  data() {
    return {
      dataList: {},
      letter: ""
    };
  },
  methods: {
    getCityDatalist() {
      this.$http.get(`cityData`).then(res => {
        if (res.status === 200) {
          this.dataList = res.data.data;
          console.log(this.dataList);
        }
      });
    },
    getVal(msg) {
      this.letter = msg;
    }
  }
};
</script>

<style lang="less" scoped>
</style>