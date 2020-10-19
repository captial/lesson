<template>
  <div>
    <div class="citySelect">
      <div class="showSpan">
        <div @click="goback">
          <i class="iconfont icon-leftarrow"></i>
        </div>
        <div>
          <span>城市选择</span>
        </div>
      </div>
      <div class="select">
        <input type="text" placeholder="请输入城市名或者拼音" v-model="keyword" />
      </div>
      <div class="searchContent" ref="search" v-show="keyword">
        <ul>
          <li v-for="(item,key) in list" @click="changeCity(item.name)">{{item.name}}</li>
          <li v-show="hasNoData">没有找到匹配数据</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  props: {
    cities: Object,
    defaults: () => {}
  },
  data() {
    return {
      keyword: "",
      list: []
    };
  },
  computed: {
    hasNoData() {
      return !this.list.length;
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    changeCity(city) {
      this.$store.commit("changeCity", city);
      this.$router.push("/");
    }
  },
  watch: {
    keyword() {
      const result = [];
      if (!this.keyword) {
        this.list = [];
        return;
      }
      for (let i in this.cities) {
        this.cities[i].forEach(element => {
          if (
            element.spell.indexOf(this.keyword) > -1 ||
            element.name.indexOf(this.keyword) > -1
          ) {
            result.push(element);
          }
        });
      }
      this.list = result;
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.search, {});
  }
};
</script>

<style lang="less" scoped>
.citySelect {
  background-color: rgb(6, 180, 210);
  height: 1.4rem;
  color: #fff;
  .showSpan {
    float: left;
    display: flex;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    :nth-child(1) {
      width: 0.64rem;
      text-align: center;
    }
    :nth-child(2) {
      flex: 0.9;
      text-align: center;
      font-size: 16px;
    }
  }
  .select {
    float: left;
    width: 100%;
    height: 0.6rem;
    input {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 95%;
      height: 85%;
      border-radius: 0.1rem;
      color: gray;
      text-align: center;
      font-size: 14px;
      box-sizing: border-box;
      padding: 0 0.1rem;
      &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #a5a5a5;
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #a5a5a5;
      }

      &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #a5a5a5;
      }
    }
  }
  .searchContent {
    position: absolute;
    overflow: hidden;
    top: 1.4rem;
    margin: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: #eee;
    ul li {
      height: 0.64rem;
      line-height: 0.64rem;
      padding-left: 0.2rem;
      border-bottom: 1px solid #c7c3c3;
      color: #666;
      background-color: #fff;
    }
  }
}
</style>