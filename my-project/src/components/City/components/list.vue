<template>
  <div class="listArea" ref="listArea">
    <div>
      <div class="listPoint">
        <div class="listTitle">您的位置</div>
        <div class="listTag">
          <button class="btn">{{this.$store.state.city}}</button>
        </div>
      </div>
      <div class="listhotCity">
        <div class="listTitle">热门城市</div>
        <div class="listTag">
          <button
            v-for="(item,index) of dataList.hotCities"
            :key="item.id"
            @click="changeCity(item.name)"
          >{{item.name}}</button>
        </div>
      </div>
      <div class="listCity">
        <div v-for="(item,key) of dataList.cities" :key="key" :ref="key">
          <div class="listTitle">{{key}}</div>
          <ul>
            <li
              v-for="(city,index) of item"
              :key="city.id"
              @click="changeCity(city.name)"
            >{{city.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  props: {
    dataList: Object,
    default: () => {},
    letter: String,
    default: () => ""
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.listArea, {});
  },
  methods: {
    changeCity(city) {
      this.$store.commit("changeCity", city);
      this.$router.push("/");
    }
  },
  watch: {
    letter() {
      if (this.letter) {
        const el = this.$refs[this.letter][0];
        console.log(this.$refs);
        this.scroll.scrollToElement(el);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.listArea {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 1.4rem;
  overflow: hidden;

  .listTitle {
    height: 0.64rem;
    line-height: 0.64rem;
    padding-left: 0.2rem;
    background-color: rgb(244, 244, 244);
  }
  .listTag {
    margin: 0 auto;
    margin-bottom: 0.2rem;
    .btn {
      border: 1px solid rgb(6, 180, 210);
      background-color: white;
      color: rgb(6, 180, 210);
    }
    button {
      border-radius: 0.05rem;
      width: 30%;
      margin-top: 0.2rem;
      margin-left: 2%;
      border: 1px solid rgb(219, 217, 217);
      background-color: white;
    }
    .listPoint {
      ul li {
        height: 0.54rem;
        line-height: 0.54rem;
        padding-left: 0.2rem;
      }
    }
  }
  .listCity {
    ul li {
      height: 0.64rem;
      line-height: 0.64rem;
      padding-left: 0.2rem;
      border-bottom: 1px solid rgb(199, 195, 195);
      //   border-top: 1px solid gray;
    }
  }
}
</style>