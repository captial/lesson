<template>
  <div class="main">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加商品按钮 -->
      <el-input clearable @clear="getTableData" @change="searchData" placeholder="请输入内容" v-model="inputValue" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button class="addBtn" type="primary" @click="addGoods">添加商品</el-button>
      <!-- 商品分类列表 -->
      <el-table :data="tableData" style="width: 100%" stripe border  :header-cell-style="formCenter"
          :cell-style="formCenter">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格"></el-table-column>
        <el-table-column prop="goods_number" label="数量"></el-table-column>
        <el-table-column prop="add_time" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteData(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
        :page-sizes="[10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getTableData();
  },
  data() {
    return {
      inputValue: "", //搜索输入框的值
      tableData: [],
      total:0,//分页总数
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  methods: {
    //    获取商品列表数据
    getTableData() {
      this.$http
        .get(`goods`, {
          params: this.params
        })
        .then(res => {
          if (res.data.meta.status !== 200) return this.$message.error("数据获取失败");
         this.total=res.data.data.total
         res.data.data.goods.forEach(item=>{
           item.add_time= this.$moment(item.add_time).format("YYYY-MM-DD HH:mm:ss")
         })
         this.tableData = res.data.data.goods;
        });
    },
       // 设置表单字体样式居中
    formCenter() {
      return "text-align:center";
    },
    // 分页方法
     handleSizeChange(val) {
        this.params.pagesize = val
        this.getTableData()
      },
      handleCurrentChange(val) {
        this.params.pagenum = val
        this.getTableData()
      },
    //   查询数据
    searchData(){
        this.params.query = this.inputValue
        this.getTableData()
    },
    // 添加商品
    addGoods(){
        this.$router.push('/goods/addGoods')
    },
    // 删除商品
    deleteData(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`goods/${row.goods_id}`)
          .then(res=>{
            if(res.data.meta.status !== 200) return this.$message.error('删除失败')
            this.$message.success('这条数据已成功删除')
            this.getTableData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
.addBtn {
  margin-bottom: 10px;
  margin-left: 5px;
}
.el-input {
  width: 30%;
}
</style>