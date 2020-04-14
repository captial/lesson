<template>
  <div class="app-footer" v-on:click="delzhi">
      <p>{{copyright}}{{showtitle}}</p>
  </div>
</template>

<script>
export default {
  name: 'app-footer',
  props:{
    showtitle:{
        type:String
    }
  },
  data () {
    return {
      copyright: 'copyright@2020.01.10'
    }
  },
  methods:{
      delzhi:function(){
          this.$emit("changet","子向父传值改变内容")
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .app-footer{
        background-color:pink;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    p{
        color: black;
        font-weight: bold;

    }
</style>
