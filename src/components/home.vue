<template>
  <el-container>
    <!-- 头部导航区域 -->
    <el-header>
      <div>
        <img src="@/assets/logo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="loginOut()">退出</el-button>
    </el-header>
    <el-container >
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toogleBtn" @click="showMenu()">|||</div>
        <el-menu :default-active="activepath" background-color="#545c64" text-color="#fff" active-text-color="#409EFF"
         :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" router>
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单区域模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 一级菜单下的子菜单 -->
            <el-menu-item-group>
              <el-menu-item :index="'/'+list.path+''" v-for="list in item.children" :key="list.id" @click="savePath('/'+list.path)">
                <i class="el-icon-menu"></i>
                <span>{{list.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 页面主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 尾部导航区域 -->
    <el-footer>@1095406151@qq.com---lpx学习项目</el-footer>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      menulist:[],
      iconObj:{
        "125":'iconfont  icon-user',
        "103":'iconfont  icon-quanxian',
        "101":'iconfont  icon-shangpin',
        "102":'iconfont  icon-weibiaoti--',
        "145":'iconfont  icon-iconfontpaixingbang'
      },
      // 是否展示
      isCollapse:false,
      activepath:''
    };
  },
  created(){
    this.getMenuList()
    this.activepath=window.sessionStorage.getItem('activePath')
  },
  methods: {
    loginOut: function() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    getMenuList:function(){
      this.$http.get("menus")
      .then(res=>{

        if(res.status!==200) return this.$message.error("数据获取失败")
        this.menulist=res.data.data
      })
    },
    showMenu:function(){
        this.isCollapse=!this.isCollapse
    },
    // 将路由path存入sessionStorge
    savePath:function(index){
      window.sessionStorage.setItem('activePath',index)
      this.activepath=index
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-footer {
  background-color: black;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.el-header {
  background-color: black;
  color: #fff;
  text-align: right;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  img {
    width: 40px;
    height: 40px;
    position: relative;
    top: 10px;
  }
  span {
    position: relative;
    top: -3px;
    font-size: 20px;
  }
}
.el-menu{
  height: 100%;
  border-right: none;
}
.el-aside {
  color: white;
  text-align: center;
  height: 100%;
  .toogleBtn{
    background-color: rgb(84, 92, 100);
    cursor: pointer;
  }
  .el-submenu {
    text-align: left;
    
    i{
      padding-right: 10px;
    }
  }
}

.el-main {
  background-color:rgb(238, 235, 235);
  color: #333;
  text-align: center;
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

</style>