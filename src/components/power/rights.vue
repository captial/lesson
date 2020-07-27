<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <template>
        <el-table
          :data="listInfo"
          border
          stripe
          :header-cell-style="formCenter"
          :cell-style="formCenter"
        >
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="authName" label="名称"></el-table-column>
          <el-table-column prop="path" label="路径"></el-table-column>
          <el-table-column prop="level" label="级别">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level === '0'">级别一</el-tag>
              <el-tag v-else-if="scope.row.level === '1'" type="success">级别二</el-tag>
              <el-tag v-else-if="scope.row.level === '2'" type="danger">级别三</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>


<script>
export default {
  created() {
    this.getList();
  },
  data() {
    return {
      listInfo: []
    };
  },
  methods: {
    getList: function() {
      this.$http.get("rights/list", {}).then(res => {
        if (res.data.meta.status !== 200)
          return this.$message.error("获取列表数据失败");
        this.listInfo = res.data.data;
      });
    },
    formCenter:function(){
         return "text-align:center";
    }
  }
};
</script>


<style lang="less" scoped>
</style>