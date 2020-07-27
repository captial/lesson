<template>
  <div class="main">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索框 -->
      <el-input
        clearable
        class="search"
        @clear="getTableData"
        @change="searchData"
        placeholder="请输入内容"
        v-model="inputValue"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <!-- 页面表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="formCenter"
        :cell-style="formCenter"
      >
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status === 1" type="success">已付款</el-tag>
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column prop="create_time" label="下单时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="citySelect" circle></el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-location"
              @click="watchLoaction(scope.row)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 省市联动对话框 -->
      <el-dialog title="更改地址框" @close="restForm" :visible.sync="cityVisible" width="30%">
        <el-form :model="ruleForm" :rules="cityRules" ref="ruleFormRef" label-width="100px">
          <el-form-item label="请选择城市" prop="cityname">
            <el-cascader v-model="citySelectData" :options="cityData" :props="citySelctpros"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="personAddress">
            <el-input v-model="ruleForm.personAddress"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cityVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 物流信息的联动框 -->
      <el-dialog title="物流详细地址" :visible.sync="locationVisible" width="30%">
         <el-timeline>
        <el-timeline-item
          v-for="(item, i) in progressData"
          :key="i"
          color="#67C23A"
          icon="el-icon-chat-line-square"
          :timestamp="item.time"
        >{{item.context}}</el-timeline-item>
         </el-timeline>
        <span slot="footer" class="dialog-footer">
          <el-button @click="locationVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import cityData from "./city.js";
export default {
  created() {
    this.getTableData();
  },
  data() {
    return {
      inputValue: "",
      citySelectData: [],
      total: 0,
      ruleForm: {
        personAddress: ""
      },
      cityData: cityData,
      cityVisible: false, //省事联动框的visible
      tableData: [],
      locationVisible: false,
      progressData:[],
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      cityRules: {
        personAddress: [
          { required: true, message: "请输入个人地址", trigger: "blur" }
        ],
        cityname: [
          { required: true, message: "请选择活动区域", trigger: "blur" }
        ]
      },
      citySelctpros: {
        label: "label",
        value: "value",
        children: "children",
        expandTrigger: "hover"
      }
    };
  },
  methods: {
    getTableData() {
      this.$http
        .get(`orders`, {
          params: this.params
        })
        .then(res => {
          if (res.data.meta.status !== 200) return;
          this.tableData = res.data.data.goods;
          this.total = res.data.data.total;
          res.data.data.goods.forEach(item => {
            item.create_time = this.$moment(item.create_time).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          });
        });
    },
    // 分页方法
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.params.pagenum = val;
      this.getTableData();
    },
    // 设置表单字体样式居中
    formCenter() {
      return "text-align:center";
    },
    // 查询数据
    searchData() {
      this.params.query = this.inputValue;
      this.getTableData();
    },
    // 省市联动的方法
    citySelect() {
      this.cityVisible = true;
    },
    watchLoaction(row) {
      this.locationVisible = true;
      this.$http.get(`/kuaidi/${1106975712662}`).then(res => {
        if (res.data.meta.status !== 200)
          return this.$message.error("获取物流数据失败");
        this.progressData = res.data.data;
      });
    },
    restForm() {
      this.$refs.ruleFormRef.resetFields();
    },
    // 提交表单数据
    submitForm() {
      this.$refs.ruleForm.validate(res => {
        if (!res) return;
        this.$http.get().then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error("修改地址错误");
          this.$refs.ruleFormRef.resetFields();
          this.cityVisible = false;
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  text-align: left;
}
.search {
  width: 30%;
}
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
  text-align: right;
}
</style>