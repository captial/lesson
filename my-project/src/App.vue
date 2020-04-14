<template>
  <div id="app">
      <app-header  v-bind:showtitle="titles"></app-header>
      <users v-bind:userData="users"></users>
      <app-footer v-on:changet="changeedTitle($event)" v-bind:showtitle="titles"></app-footer>
    <router-view/>
  </div>
</template>

<script>
import Header from "./components/Header"
import User from "./components/User"
import Footer from "./components/Footer"
export default {
  name: 'app',
  data(){
    return{
      users:[
          {name:'李鹏祥',poisiton:'web开发',show:false},
          {name:'李鹏祥',poisiton:'web开发',show:false},
          {name:'李鹏祥',poisiton:'web开发',show:false},
          {name:'李鹏祥',poisiton:'web开发',show:false},
      ],
      titles:"传的是string number Boolen"
    }
  },
  components:{
      "app-header":Header,
      "users":User,
      "app-footer":Footer
  },
  methods:{
    changeedTitle(params) {
      console.log(params)
        this.titles=params
    }
  }
}
</script>

<style>

</style>
