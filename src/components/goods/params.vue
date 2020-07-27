<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 警示框 -->
      <el-alert title="注意只允许为第三级分类设置参数" type="warning" show-icon></el-alert>
      <!-- 级联选择框 -->
      <div class="block">
        <span>选择商品分类</span>
        <el-cascader
          v-model="cascadeModel"
          :options="cascadeData"
          :props="cascadeProps"
          @change="handleChange"
        ></el-cascader>
      </div>
      <!-- tabs标签 -->
      <el-tabs v-model="activeName" @tab-click="changeTabs">
        <el-tab-pane label="动态参数" name="many" :tree-props="tableProps">
          <!-- 添加动态参数按钮 -->
          <el-button type="primary" :disabled="btnDisable" @click="addParms">添加参数</el-button>

          <!-- 动态参数的表格 -->
          <el-table :data="TrendtableData" border stripe style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  closable
                  @close="handleClose(scope.row)"
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" @click="editBtn(scope.row)">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteData(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加静态参数按钮 -->
          <el-button type="primary" :disabled="btnDisable" @click="addParms">添加属性</el-button>
          <!-- 静态参数的表格 -->
        <el-table :data="TrendtableData" border stripe style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  closable
                  @close="handleClose(scope.row)"
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" @click="editBtn(scope.row)">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteData(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加和编辑动态参数或者静态属性 -->
    <el-dialog :title="dialogTitle" :visible.sync="Visible" width="30%" @close="resetForm">
      <el-form
        :model="addParmsDdata"
        :rules="addParmsRules"
        ref="addParmsDdataRef"
        label-width="100px"
      >
        <el-form-item :label="dialogLable" prop="attr_name">
          <el-input v-model="addParmsDdata.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="submitParmas">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getCascadeList();
  },
  data() {
    return {
      cascadeData: [], //级联选择框的绑定数据源
      cascadeModel: [],
      activeName: "many",
      cascadeProps: {
        value: "cat_id",
        label: "cat_name",
        expandTrigger: "hover",
        children: "children"
      }, //级联选择框里面的
      TrendtableData: [], //参数表格数据
      dialogTitle: "",
      dialogLable: "",
      addParmsDdata: {
        attr_name: ""
      }, //对话框输入框绑定值
      Visible: false,
      tabsType: 1, //
      inputVisible: false,
      inputValue: "",
      btnDisable: true,
      parmsId: [],
      dynamicTags: [], //tags标签集合
      editParamsId: [],
      inputVisible: false,
      inputValue: "",
      tableProps: {
        children: "children",
        hasChildren: "hasChildren"
      },
      addParmsRules: {
        attr_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ]
      } //添加动态参数和设置静态属性的参数
    };
  },
  methods: {
    // 获取级联选择框里面的数据
    getCascadeList() {
      this.$http.get(`categories`).then(res => {
        if (res.data.meta.status !== 200) return;
        this.cascadeData = res.data.data;
      });
    },
    // 级联选择框改变后的onchange事件
    handleChange(data) {
      // tabsLabel=动态参数为动态数据 id=静态参数为静态数据
      this.parmsId = data[data.length - 1];
      this.getTabledataList();
    },
    getTabledataList() {
      if (this.cascadeModel.length !== 3) return (this.cascadeModel = []);
      this.btnDisable = false;
      this.$http
        .get(`categories/${this.parmsId}/attributes`, {
          params: {
            sel: this.activeName
          }
        })
        .then(res => {
          if (res.data.meta.status !== 200) this.$message.error("获取失败");
          res.data.data.forEach(item => {
            item.attr_vals =
              item.attr_vals.length !== 0 ? item.attr_vals.split(" ") : [];
            //  控制文本框的显示隐藏
            item.inputVisible = false;
            // 文本框输入的值
            item.inputValue = "";
          });
          this.TrendtableData = res.data.data;
        });
    },
    // tabs的点击事件
    changeTabs() {
      if (this.parmsId.length < 0) return;
      this.getTabledataList();
    },
    // 添加参数或者属性的对话框
    addParms() {
      // 1代表添加动态属性对话框 2代表添加动态参数对话框
      if (this.activeName === "many") {
        this.dialogTitle = "添加动态参数";
        this.dialogLable = "参数名称";
      } else {
        this.dialogTitle = "添加静态属性";
        this.dialogLable = "属性名称";
      }
      this.Visible = true;
    },
    // 重置表单内容
    resetForm() {
      this.$refs.addParmsDdataRef.resetFields();
    },
    // 添加提交/编辑提交属性或者参数
    submitParmas() {
      this.$refs.addParmsDdataRef.validate(res => {
        if (!res) return;
        if (this.dialogTitle.indexOf("编辑") === -1) {
          this.$http
            .post(`categories/${this.parmsId}/attributes`, {
              attr_name: this.addParmsDdata.attr_name,
              attr_sel: this.activeName
            })
            .then(res => {
              if (res.data.meta.status !== 201)
                return this.$message.error("添加失败，请重试");
              this.$message.success("添加成功");
              this.Visible = false;
              this.$refs.addParmsDdataRef.resetFields();
              this.getTabledataList();
            });
        } else {
          this.$http
            .put(`categories/${this.parmsId}/attributes/${this.editParamsId}`, {
              attr_name: this.addParmsDdata.attr_name,
              attr_sel: this.activeName
            })
            .then(res => {
              if (res.data.meta.status !== 200)
                return this.$message.error(`数据跟新失败`);
              this.$message.success("数据更新成功");
              this.Visible = false;
              this.$refs.addParmsDdataRef.resetFields();
              this.getTabledataList();
            });
        }
      });
    },
    // 编辑模态框内容
    editBtn(data) {
      if (this.activeName === "many") {
        this.dialogTitle = "编辑动态参数";
        this.dialogLable = "参数名称";
      } else {
        this.dialogTitle = "编辑静态属性";
        this.dialogLable = "属性名称";
      }
      this.$http
        .get(`categories/${this.parmsId}/attributes/${data.attr_id}`, {
          params: {
            attr_sel: this.activeName
          }
        })
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error("获取失败");
          this.addParmsDdata.attr_name = res.data.data.attr_name;
          this.editParamsId = res.data.data.attr_id;
          this.Visible = true;
        });
    },
    // 删除数据
    deleteData(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete(`categories/${this.parmsId}/attributes/${data.attr_id}`)
            .then(res => {
              if (res.data.meta.status !== 200)
                return this.$message.error("数据删除失败");
              this.$message.success("数据删除成功");
              this.getTabledataList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClose(row) { 
       row.attr_vals.splice(this.dynamicTags.indexOf(row.inputValue), 1);
       this.$http.put(`categories/${this.parmsId}/attributes/${row.attr_id}`,{
          attr_name:row.attr_name,
          attr_sel:this.activeName,
          attr_vals:row.attr_vals.join(' ')
       })
       .then(res=>{
         if(res.data.meta.status !== 200 ) return this.$message.error('标签添加错误')
         this.$message.success("删除成功")
       })
   },

    showInput(row) {
      row.inputVisible = true;
      // 让文本框自动获得焦点
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
       if(row.inputValue.trim().length === 0){
         row.inputValue =''
         row.inputVisible=false
         return
       }
       row.attr_vals.push(row.inputValue.trim())
       
       this.$http.put(`categories/${this.parmsId}/attributes/${row.attr_id}`,{
          attr_name:row.attr_name,
          attr_sel:this.activeName,
          attr_vals:row.attr_vals.join(' ')
       })
       .then(res=>{
         if(res.data.meta.status !== 200 ) return this.$message.error('标签添加错误')
         this.$message.success("标签添加成功")
          row.inputValue=''    
          row.inputVisible=false
       })
    }
  }
};
</script>

<style lang="less" scoped>
.el-alert {
  span {
    font-size: 18px;
  }
}
.block {
  text-align: left;
  margin-top: 15px;
  span {
    font-weight: bolder;
  }
}
.el-tabs {
  margin-top: 15px;
  .el-tab-pane {
    text-align: left;
  }
}
.el-table {
  margin-top: 15px;
}
.el-cascader {
  width: 16%;
}
.el-dialog {
  text-align: left;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>