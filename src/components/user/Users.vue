<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <div class="cardText">
        <div class="cardArea">
          <el-input
            placeholder="请输入用户Id"
            v-model="parmas.query"
            class="input-with-select"
            :clearable="true"
            @clear="getUsersList"
            @change="getUsersList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </div>
        <el-button type="primary" class="addUser" @click="dialogVisible = true">添加用户</el-button>
        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%" :destroy-on-close="true">
          <!-- 添加用户内容主题区域 -->
          <el-form :model="addUserform" :rules="rules" ref="addUserformRef" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="addUserform.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="addUserform.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addUserform.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="addUserform.mobile"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部主体区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handForm">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 给角色赋予权限的对话框 -->
        <el-dialog title="提示" :visible.sync="usersManage" width="30%">
          <div class="showUseobj">
            <span>
              用户名:
              <strong>{{userObj.username}}</strong>
            </span>
            <span>
              权限类型:
              <strong>{{userObj.role_name}}</strong>
            </span>
            <span>
              请选择角色类型:
              <el-select v-model="manageId" placeholder="请选择" size="mini" >
                <el-option
                  v-for="item in userSelectList"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </span>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="usersManage = false">取 消</el-button>
            <el-button type="primary" @click="subUserMange">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改用户内容 -->
        <el-dialog title="修改用户" :visible.sync="editVisible" width="40%" :destroy-on-close="true">
          <!-- 修改用户内容主题区域 -->
          <el-form :model="editUserform" :rules="rules" ref="editUserform" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="editUserform.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editUserform.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="editUserform.mobile"></el-input>
            </el-form-item>
          </el-form>
          <!-- 修改用户内容底部主体区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="editForm()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 页面表格内容 -->
      <template>
        <el-table
          border
          :data="tableData"
          style="width: 95%;margin-left:15px;"
          :header-cell-style="formCenter"
          :cell-style="formCenter"
        >
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="角色权限" prop="role_name"></el-table-column>
          <el-table-column label="邮箱地址" prop="email"></el-table-column>
          <el-table-column label="联系方式" prop="mobile"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="editText(scope.row)"
              ></el-button>

              <!-- 分配角色按钮 -->
              <el-tooltip content="分配权限" placement="top" :enterable="false">
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-star-off"
                  @click="editMange(scope.row)"
                ></el-button>
              </el-tooltip>

              <!-- 删除按钮 -->
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页功能 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getUsersList();
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      var phonenum = reg.test(value);
      if (!value) return callback(new Error("请输入电话号码"));
      if (!phonenum) return callback(new Error("电话号码格式不正确"));
      callback();
    };
    return {
      tableData: [],
      addUserform: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editUserform: {},
      total: 0,
      parmas: {
        query: "",
        pagenum: 1, //表格请求页码
        pagesize: 10 //表格请求数量
      },
      dialogVisible: false,
      editVisible: false,
      usersManage: false, //用户赋予权限的对话框
      userObj: {},
      userSelectList:[],
      manageId:'',//角色的id
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, max: 10, message: "密码在 6 到 10个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [{ validator: checkPhone, required: true, trigger: "blur" }]
      }
    };
  },
  methods: {
    getUsersList() {
      this.$http
        .get("users", {
          params: this.parmas
        })
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.console.error("获取数据失败");
          this.tableData = res.data.data.users;
          this.total = res.data.data.total;
        });
    },
    // 删除用户数据
    handleDelete(index, row) {
      this.$confirm("您确定要删除数据吗")
        .then(_ => {
          this.$http.delete(`users/${row.id}`).then(res => {
            if (res.data.meta.status !== 200)
              return this.$message.error("数据删除失败");
            this.$message.success("数据删除成功");
            this.getUsersList();
          });
        })
        .catch(() => {});
    },
    // 设置表单字体样式居中
    formCenter() {
      return "text-align:center";
    },
    // 改变显示内容数量
    handleSizeChange:function(val) {
      this.parmas.pagesize = val;
      this.getUsersList();
    },
    // 按页码跳转
    handleCurrentChange(val) {
      this.parmas.pagenum = val;
      this.getUsersList();
    },
    // 按用户id搜索用户
    searchUsr() {
      if (this.inputValue === "") return this.$message.error("请输入用户编号");
      let parmsId = parseInt(this.inputValue);
      this.$http
        .get("users/:id", {
          params: {
            id: 503
          }
        })
        .then(res => {
        });
    },
    // 添加用户
    handForm() {
      this.$refs.addUserformRef.validate(valid => {
        if (!valid) this.$message.error("请检查所填入信息");
        this.$http.post("users", this.addUserform).then(res => {
          if (res.data.meta.status == 201) {
            this.$message.success("用户添加成功");
            this.dialogVisible = false;
          }
        });
      });
    },
    // //确认关闭模态框前的回调函数
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       this.dialogVisible=false
    //       this.$refs.resetFields()
    //       done()
    //     })
    //     .catch(_ => {});
    // },
    // 修改状态
    switchChange(data) {
      this.$http.put(`users/${data.id}/state/${data.mg_state}`).then(res => {
        if (res.data.meta.status !== 200) {
          data.mg_state = !data.mg_state;
          this.$message.error("更新状态失败");
        }
        this.$message.success("更新用户状态成功");
      });
    },
    // 编辑文本
    editText(data) {
      this.$http.get(`users/${data.id}`, {}).then(res => {
        if (res.data.meta.status !== 200)
          return this.$message.error("该用户信息获取失败");
        this.editUserform = res.data.data;
        this.editVisible = true;
      });
    },
    //提交修改文本信息
    editForm() {
      this.$http
        .put(`users/` + this.editUserform.id, {
          email: this.editUserform.email,
          mobile: this.editUserform.mobile
        })
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error("更新个人信息失败");
          this.editVisible = false;
          this.$message.success("信息更新成功成功");
          this.getUsersList();
        });
    },
    // 赋予用户角色权限
    editMange: function(user) {
      this.usersManage = true;
      this.userObj = user;
      this.$http.get(`roles`)
      .then(res=>{
        if(res.data.meta.status !== 200) return this.$message.error("获取下拉列表内容失败")
        this.userSelectList=res.data.data
       })
    },
    // 更改用户角色权限提交
    subUserMange:function(){
        if(!this.manageId) return this.$message.error('请选择角色类型')
        this.$http.put(`users/${this.userObj.id}/role`,{
          rid:this.manageId
        })
        .then(res=>{
          if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
          this.$message.success('设置角色权限成功')
          this.usersManage=false
          this.manageId=""
          this.getUsersList()
        })
    }
  }
};
</script>
    
<style lang="less" scoped>
.cardText {
  .cardArea,
  .addUser {
    margin: 15px;
    float: left;
  }
  .cardArea {
    width: 30%;
  }
}
.block {
  text-align: right;
  margin: 15px;
}
.showUseobj {
  text-align: left;
  span {
    display: block;
    margin: 15px;
  }
}
</style>