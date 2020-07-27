<template>
  <div class="goods">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加分类按钮 -->
    <el-button type="primary" class="addBtn" @click="addUserBtn">添加分类</el-button>
    <!-- 添加角色 -->
    <el-dialog @close="resetForm" title="添加分类" :visible.sync="addUserVis" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px">
        <el-form-item label="活动名称" prop="cat_name">
          <el-input v-model="ruleForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-cascader
            v-model="addTypeValue"
            :options="addType"
            :props="addTypeProps"
            :clearable="true"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserVis = false">取 消</el-button>
        <el-button type="primary" @click="addTypeList">确 定</el-button>
      </span>
    </el-dialog>

    <el-card>
      <!-- 商品分类列表 -->
      <template>
        <treeTable
          :data="tableData"
          :columns="columns"
          :selection-type="false"
          :expand-type="false"
          show-index
          index-text="#"
          border
        >
          <!-- 自定义插槽 slot绑定的columns当中自定义的模板名称 -->
          <template slot="isYouxiao" slot-scope="scope">
            <i
              v-if="scope.row.cat_deleted !== 'true'"
              class="el-icon-success"
              style="color:lightGreen"
            ></i>
            <i v-else class="el-icon-error" style="color:lightRed"></i>
          </template>
          <!--  自定义插槽 slot绑定的columns当中自定义的模板等级列  -->
          <template slot="isSort" slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0" type="primary">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
            <el-tag v-else-if="scope.row.cat_level === 2" type="danger">三级</el-tag>
          </template>
          <!--  自定义插槽 slot绑定的columns当中自定义的模板操作列  -->
          <template slot="btn" slot-scope="scope" style="line-height:10">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="eidtData(scope.row.cat_id)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="removeDta(scope.row.cat_id)"
              icon="el-icon-delete"
            >删除</el-button>
          </template>
        </treeTable>
      </template>
      <!-- 分页 -->
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
    this.getGoddsList();
  },
  data() {
    return {
      tableData: [],
      addTypeValue: [],
      total: 0,
      addUserVis: false,
      editUserVis: false,
      editId: 0,
      addType: [],
      paramsInfo: {
        pagenum: 1,
        pagesize: 10
      },

      ruleForm: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0
      },
      eidtDataObj: {},
      addTypeProps: {
        value: "cat_id",
        label: "cat_name",
        expandTrigger: "hover",
        children: "children",
        checkStrictly: true
      },

      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          prop: "sex",
          type: "template",
          template: "isYouxiao",
          align: "center",
          headerAlign: "center"
        },
        {
          label: "排序",
          prop: "cat_level",
          type: "template",
          template: "isSort",
          align: "center",
          headerAlign: "center"
        },
        {
          label: "操作",
          type: "template",
          template: "btn",
          align: "center",
          headerAlign: "center"
        }
      ],
      rules: {
        cat_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 获取商品分类列表
    getGoddsList: function() {
      this.$http
        .get(`categories`, {
          params: this.paramsInfo
        })
        .then(res => {
          if (res.data.meta.status !== 200) this.$message.error("获取数据失败");
          this.tableData = res.data.data.result;
          this.total = res.data.data.total;
        });
    },
    // 添加用户分类
    addUserBtn: function() {
      this.addUserVis = true;
      this.$http
        .get(`categories/`, {
          params: {
            type: 2
          }
        })
        .then(res => {
          if (res.data.meta.status !== 200) return;
          this.addType = res.data.data;
        });
    },
    // 改变表格数据显示数量
    handleSizeChange: function(val) {
      this.paramsInfo.pagesize = val;
      this.getGoddsList();
    },
    // 按页码跳转
    handleCurrentChange: function(val) {
      this.paramsInfo.pagenum = val;
      this.getGoddsList();
    },

    // 添加分类提交功能
    addTypeList() {
      this.$refs.ruleFormRef.validate(valid => {
        if (!valid) return;
        this.$http.post(`categories`, this.ruleForm).then(res => {
          if (res.data.meta.status !== 201)
            return this.$message.error("添加分类失败，请重试");
          this.$message.success("添加分类成功");
          this.addUserVis = false;
          this.getGoddsList();
        });
      });
    },
    //  删除数据
    removeDta(roleId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`categories/${roleId}`).then(res => {
            if (res.data.meta.status !== 200)
              return this.$message.error("删除失败");
            this.$message.success("数据删除成功");
            this.getGoddsList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //  编辑数据
    eidtData(roleid) {
      this.editUserVis = true;
      this.editId = roleid;
      this.$http.get(`categories/${roleid}`).then(res => {
        this.eidtDataObj = res.data.data;
      });
    },
    // 保存编辑的数据
    editGoodsInfo() {
      this.$http
        .put(`categories/${this.editId}`, {
          cat_name: this.eidtDataObj.cat_name
        })
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error("数据更新失败");
          this.$message.success("数据更新成功");
          this.editUserVis = false;
          this.getGoddsList();
        });
    },

    // 重置对话框内容、
    resetForm(formName) {
      this.$refs.ruleFormRef.resetFields();
      this.addUserVis = false;
      this.addTypeValue = [];
    },
    // 级联选择器
    handleChange(data) {
      if (this.addTypeValue.length > 0) {
        this.ruleForm.cat_pid = this.addTypeValue[this.addTypeValue.length - 1];
        this.ruleForm.cat_level = this.addTypeValue.length;
      } else {
        this.ruleForm.cat_pid = 0;
        this.ruleForm.cat_level = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.addBtn {
  margin-bottom: 10px;
}
.goods {
  text-align: left;
}
.block {
  text-align: right;
  margin: 15px;
}
.elInput {
  width: 44%;
  margin-left: 5px;
}
.el-cascader {
  width: 100%;
}
</style>