<template>
  <div class="header">
    <div class="header-left">
      <i class="iconfont icon-leftarrow"></i>
    </div>
    <div class="header-input">
      <i class="iconfont icon-search"></i>输入城市景点/游玩主题
    </div>
    <router-link to="/city">
      <div class="header-right">
        {{this.city}}
        <i class="iconfont icon-triangledownfill"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["city"])
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 0.86rem;
  display: flex;
  background-color: rgb(6, 180, 210);
  color: #ffffff;
  line-height: 0.86rem;
  .header-left {
    width: 0.64rem;
    float: left;
    text-align: center;
  }
  .header-input {
    flex: 1; //表示自适应撑开整个容器剩下的内容
    background-color: #ffffff;
    border-radius: 5px;
    height: 0.64rem;
    margin-top: 0.12rem;
    margin-left: 0.12rem;
    line-height: 0.64rem;
    color: #ccc;
    i {
      padding-left: 0.1rem;
    }
  }
  .header-right {
    min-width: 1.24rem;
    float: right;
    text-align: center;
    color: #fff;
    padding-left: 0.1rem;
  }
}
</style>