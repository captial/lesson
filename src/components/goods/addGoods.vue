<template>
  <div class="main">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 提示条 -->
      <el-alert title="添加商品的信息" type="info" show-icon :center="true"></el-alert>
      <!--横向进度条 -->
      <el-steps :active="active-0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
      <!-- 左侧tabs标签 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          :tab-position="tabPosition"
          v-model="active"
          @tab-click="handleClick"
          :before-leave="tabsChange"
        >
          <!-- 基本信息页面结构 -->
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" type="number" prop="goods_number">
              <el-input v-model="ruleForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" type="number" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="ruleForm.goods_cat"
                :options="cascaderData"
                :props="cascadePros"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="(item,i) in goodsParsmData"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="checkList">
                <el-checkbox border :label="check" v-for="(check,i) in item.attr_vals" :key="i"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="(item,i) in goodsProData"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- aciton表示图片上传的api地址 -->
            <el-upload
              :action="uploadUrl"
              :headers="urlHeader"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-dialog class="imgDialog" title="文件预览" :visible.sync="imgVisible" width="30%">
              <img :src="imgUrl" />
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor
              class="editor"
              v-model="ruleForm.goods_introduce"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            ></quill-editor>
            <el-button class="addBtn" type="primary" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  created() {
    this.getCasecadeData();
  },
  data() {
    return {
      active: "0",
      tabPosition: "left",
      urlHeader: {
        Authorization: window.sessionStorage.getItem("token")
      },
      selectValue: [],
      editorOption: {},
      tabsStatus: true,
      cascaderData: [], //级联选择框数组
      goodsParsmData: [], //商品参数数组
      checkList: [], //多选框参数数组
      goodsProData: [],
      imgVisible: false, //图片放大对话框
      imgUrl: "", //对话框图片地址
      uploadUrl: "http://timemeetyou.com:8889/api/private/v1/upload",
      ruleForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: [],
        pics: [],
        attrs: [],
        goods_introduce: ""
      },
      fileList: [],
      rules: {
        goods_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "价格不能为空", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "商品数量不能为空", trigger: "blur" }
        ],
        goods_weight: [{ required: true, message: "商品重量不能为空" }],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ]
      },
      cascadePros: {
        label: "cat_name",
        value: "cat_id",
        expandTrigger: "hover",
        children: "children"
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      if (this.ruleForm.goods_cat.length !== 0) {
        const parmsid = this.ruleForm.goods_cat[2];
        if (tab.name === "1") {
          this.$http
            .get(`categories/${parmsid}/attributes`, {
              params: {
                sel: "many"
              }
            })
            .then(res => {
              res.data.data.forEach(item => {
                item.attr_vals =
                  item.attr_vals.length !== 0 ? item.attr_vals.split(" ") : [];
              });
              this.goodsParsmData = res.data.data;
            });
        } else if (tab.name === "2") {
          this.$http
            .get(`categories/${parmsid}/attributes`, {
              params: {
                sel: "only"
              }
            })
            .then(res => {
              this.goodsProData = res.data.data;
            });
        }
      }
    },
    tabsChange(activeName, oldActiveName) {
      if (this.ruleForm.goods_cat.length !== 3 && oldActiveName === "0") {
        this.$message.error("请选择商品分类内容");
        return false;
      }
    },
    handleChange(data) {
      // if (data.length !== 3) return (this.ruleForm.goods_cat = []);
    },
    // 获取下拉框内容值
    getCasecadeData() {
      this.$http.get(`categories`).then(res => {
        if (res.data.meta.status !== 200)
          return this.$message.error("获取数据失败");
        this.cascaderData = res.data.data;
      });
    },
    handleRemove(file, fileList) {
      const item = file.pic;
      const x = this.ruleForm.pics.findIndex(item => {
        item.pics = item;
      });
      this.ruleForm.pics.splice(x, 1);
    },
    handlePreview(file) {
      this.imgVisible = true;
      this.imgUrl = file.url;
    },
    handleSuccess(response, file, fileList) {
      if (response.meta.status !== 200) this.$message.error("图片上传失败");
      var data = {
        pic: response.data.tmp_path
      };
      this.ruleForm.pics.push(data);
      this.$message.success("图片上传成功");
    },
    // 富文本编辑器编辑器失去焦点事件
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    addGoods() {
      this.$refs.ruleFormRef.validate(valid => {
        if (!valid) return this.$message.error("请填写必要的表单项");
        // 使用loadsh的cloneDeep方法深拷贝goods_cat数据，防止篡改原数据
        const form = _.cloneDeep(this.ruleForm);
        form.goods_cat = form.goods_cat.join(",");
        this.goodsParsmData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(" ")
          };
          this.ruleForm.attrs.push(newInfo);
        });
        this.goodsProData.forEach(item => {
          const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals };
          this.ruleForm.attrs.push(newInfo);
        });

        form.attrs = this.ruleForm.attrs;
        this.$http.post(`goods`, form).then(res => {
          if(res.data.meta.status !== 201 ) this.$message.error('商品添加失败，请重试')
          this.$router.push('/goods')
          this.$message.success('添加商品成功')
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-steps {
  margin-top: 15px;
}
.main {
  text-align: left;
}
.el-tabs {
  margin-top: 15px;
}
.imgDialog {
  text-align: left;

  img {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
.editor {
  height: 300px;
}
.addBtn {
  margin-top: 55px;
}
</style>