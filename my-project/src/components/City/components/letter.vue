<template>
  <div class="letter">
    <ul>
      <li v-for="(item,key) of dataList.cities" :key="key" @click="handle">{{key}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    dataList: Object,
    default: () => {}
  },
  data() {
    return {
      parmas: ""
    };
  },
  methods: {
    handle(e) {
      this.$emit("handleParams", e.target.innerText);
    }
  }
};
</script>

<style lang="less" scoped>
.letter {
  position: absolute;
  top: 3rem;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 0.3rem;
  color: rgb(6, 180, 210);
  li {
    margin-top: 0.1rem;
    text-align: center;
  }
}
</style>