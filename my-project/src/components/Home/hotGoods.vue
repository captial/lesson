<template>
  <div class="hotGoods">
    <div class="hotGoodsSpan">热销推荐</div>
    <div class="goodsList">
      <ul>
        <router-link
          tag="li"
          v-for="(item,index) of recommendList"
          :key="item.id"
          :to="'/detail/'+item.id"
        >
          <img :src="item.imgUrl" />
          <div class="message">
            <p class="title">{{item.title}}</p>
            <p class="desc">{{item.desc}}</p>
            <button>查看详情</button>
          </div>
        </router-link>
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
      showBtnText: "点击展开更多",
      display: true
    };
  },
  props: {
    recommendList: {
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
        display: flex;
        height: 1.9rem;
        border-bottom: 1px solid rgb(240, 238, 238);

        img {
          height: 1.6rem;
          width: 1.6rem;
          padding: 0.2rem;
        }
        .message {
          flex: 1;
          height: 1.6rem;
          padding: 0.2rem;
          min-width: 0;
          .title {
            height: 0.5rem;
            font-size: 16px;
          }
          .desc {
            display: block;
            font-size: 14px;
            height: 0.6rem;
            line-height: 0.6rem;
            color: gray;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          button {
            margin-top: 0.1rem;
            background-color: #ff9300;
            border-radius: 0.06rem;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>