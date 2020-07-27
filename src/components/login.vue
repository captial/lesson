<template>
  <div class="login">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="img_box">
        <img src="@/assets/logo.png" alt />
      </div>
      <!-- 表单区域 -->
      <div class="form_box">
        <el-form ref="loginRef" :model="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入账户" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              prefix-icon="iconfont icon-lock"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-row>
              <el-button type="primary" size="small" @click="onSubmit()">登录</el-button>
              <el-button type="info" size="small" @click="resetLgoinForm()">重置</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      //登录form的绑定对象
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账户信息", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入账户密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.loginRef.validate(valid => {
          if(!valid) return;
          this.$http.post("login",this.loginForm)
          .then(res=>{
              if(res.data.meta.status!==200){
                  this.$message({
                      message:'用户登录失败，请检查登录信息',
                      type:'error'
                  })
              }
              window.sessionStorage.setItem("token",res.data.data.token)
              this.$router.push("/home")
          })
          .catch()
      });
    },
    resetLgoinForm() {
      this.$refs.loginRef.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>

.login {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  .form_box {
    padding: 0 20px;
    width: 100%;
    position: absolute;
    bottom: 0;
    // top: 30%;
    box-sizing: border-box;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
.img_box {
  width: 140px;
  height: 120px;
  border: 1px solid;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid #eee;
  position: absolute;
  left: 50%;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #eee;
    background-color: #eee;
  }
}
</style>