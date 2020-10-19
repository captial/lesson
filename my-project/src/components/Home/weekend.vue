<template>
  <div class="hotGoods">
    <div class="hotGoodsSpan">周末去哪儿</div>
    <div class="goodsList">
      <ul>
        <li v-for="(item,index) of weekendList" :key="item.id">
          <img :src="item.imgUrl" />
          <div class="message">
            <p class="title">{{item.title}}</p>
            <p class="desc">{{item.desc}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // beforeMount() {
  //   this.changeData();
  // },
  data() {
    return {
      dataList: [],
      dataList2: [],
      showMesList: [],
      display: true
    };
  },
  props: {
    weekendList: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.hotGoods {
  .hotGoodsSpan {
    height: 0.75rem;
    background-color: rgb(244, 244, 244);
    line-height: 0.75rem;
    padding-left: 0.2rem;
  }
  .goodsList {
    ul {
      li {
        border-bottom: 1px solid rgb(240, 238, 238);
        img {
          height: 2rem;
          width: 100%;
          float: left;
        }
        .message {
          float: left;
          width: 100%;
          .title {
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 16px;
            color: black;
            font-weight: bold;
          }
          .desc {
            height: 0.6rem;
            line-height: 0.6rem;
            color: gray;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>