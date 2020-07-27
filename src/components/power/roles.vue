<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加角色按钮 -->
      <div class="btnAddUser">
        <el-button type="primary">添加角色</el-button>
      </div>
      <!-- 表格主体区域 -->
      <template>
        <el-table
          :data="tableData"
          stripe
          border
          :header-cell-style="formCenter"
          :cell-style="formCenter"
        >
          <!-- <el-table-column type="index" label="#"></el-table-column> -->
          <!-- 角色列表树形结构 -->
          <el-table-column type="expand">
            <!-- 展开列内容 -->
            <template slot-scope="scope">
              <el-row
                v-for="(item1,i1) in scope.row.children"
                :key="item1.id"
                class="bdbootm elrow"
              >
                <!-- 一级权限菜单 -->
                <el-col :span="4">
                  <el-tag>{{item1.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 二级权限菜单 -->
                <el-col :span="20">
                  <!-- 渲染所有的二级权限 -->
                  <el-row
                    v-for="(item2,i2) in item1.children"
                    :key="item2.id"
                    :class="[i2===0?'':'botop','elrow']"
                  >
                    <el-col :span="5">
                      <el-tag type="success">{{item2.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="19">
                      <el-tag
                        @close="deleteData(scope.row,item3.id)"
                        closable
                        type="warning"
                        v-for="(item3,i3) in item2.children"
                        :key="item3.id"
                      >{{item3.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称"></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-star-off"
                @click="distributeRole(scope.row)"
              >分配权限</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleterowData(scope.row)">删除数据</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分配权限模态框的树结构 -->
        <el-dialog title="分配权限" :visible.sync="distrRole" width="30%" @close="clearPorpKeys">
          <el-tree
            show-checkbox
            :data="roleData"
            :props="defaultProps"
            node-key="id"
            :default-checked-keys="defKeys"
            :default-expand-all="true"
            ref="treeRef"
          ></el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="distrRole = false">取 消</el-button>
            <el-button type="primary" @click="subMitrole ">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getUserList();
  },
  data() {
    return {
      tableData: [],
      distrRole: false,
      roleData: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      // 默认选中的节点id数组
     defKeys:[],
     roleId:0,//点击赋予权限当前用户的id
    };
  },
  methods: {
    //   获取用户列表
    getUserList: function() {
      this.$http.get("roles").then(res => {
        if (res.data.meta.status !== 200)
          return this.$message.error("获取角色权限列表失败");
        this.tableData = res.data.data;
      });
    },
    // 设置表头居中
    formCenter: function() {
      return "text-align:center";
    },
    // 给角色分配权限
    distributeRole: function(node) {
      this.roleId=node.id
      this.$http.get(`rights/tree`).then(res => {
        if (res.data.meta.status !== 200) return this.$message.error("获取所有权限列表失败");
        this.roleData=res.data.data
        this.getLevelId(node,this.defKeys)
        this.distrRole=true
      });
    },
    // 递归调用将所有的三级节点存储在数组当中，为了显示打开对话框后默认显示已经飞配的权限
    getLevelId:function(node,arr){
        if(!node.children){
           return  arr.push(node.id)
        }
        node.children.forEach(item=>{
          this.getLevelId(item,arr)
        })
    },
    // // tree的树结构点击事件
    // handleNodeClick:function(data) {
    //     this.defKeys.push(data)
    // },
    // 关闭对话框情况数组
    clearPorpKeys:function(){
      this.defKeys=[]
    },
    // 提交分配的权限
    subMitrole:function(){
      const idKeys=[
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      const paramsKey=idKeys.join(',')
       this.$http.post(`roles/${this.roleId}/rights`,{
           rids:paramsKey
       })
       .then(res=>{
         if(res.data.meta.status !== 200)  return this.$message.error('数据更新失败')
         this.$message.success('数据更新成功')
         this.getUserList()
         this.distrRole=false
       })
    },
    // 删除每个标签内容
    deleteData: function(role, rightsId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`roles/${role.id}/rights/${rightsId}`).then(res => {
            if (res.data.meta.status !== 200)
              return this.$message.error("删除权限失败");
            this.$message.success("删除权限成功");
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除角色数据
    deleterowData:function(row){
        this.$http.delete(`roles/${row.id}`)
        .then(res=>{
          if(res.data.meta.status !== 200) return this.$message.error("数据删除失败")
          this.$message.success('删除成功')
          this.getUserList()
        })
    }
  }
};
</script>

<style lang="less">
.btnAddUser {
  text-align: left;
}
.el-table {
  margin-top: 10px;
}
.el-tag {
  margin: 10px;
}
.bdbootm {
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}
.botop {
  border-top: 1px solid #eee;
}
.elrow {
  display: flex;
  align-items: center;
}
</style>