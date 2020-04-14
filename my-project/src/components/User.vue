<template>
  <div class="users">
      <ul >
          <li v-for="item in userData" 
              v-on:click="item.show=!item.show">
            <h1>{{item.name}}</h1>
            <h2 v-show="item.show">{{item.poisiton}}</h2>
          </li>
          
      </ul>
      <button v-on:click="deleteData">删除</button>
  </div>
</template>

<script>
export default {
  name: 'users',
//   props:["users"],
 props:{
     userData:{
         type:Array,
         required:true
     }
 },
  data () {
    return {
      
    }
  },
  methods:{
      deleteData:function(){
          this.userData.pop()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .users{
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0;
        box-sizing: border-box;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    li{
        flex-grow: 1;
        flex-basis: 200px;
        text-align: center;
        padding: 30px;
        border: 1px solid red;
        margin: 10px;
    }
</style>
