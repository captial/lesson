<template>
  <div class="app-header" v-on:click="deleteData">
      <h1>{{msg}}{{showtitle}}</h1>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  props:{
      showtitle:{
          type:String
      }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
      deleteData:function(){
          this.showtitle="changed"
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .app-header{
        background-color: aquamarine;
        margin: 0 auto;
        text-align: center;
    }
    h1{
        color: black;
        font-weight: bold;
    }
</style>
