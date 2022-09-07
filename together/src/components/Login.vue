<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通用后台管理系统</span>
      </div>
        <el-form
        label-width="80px"
        :model="form"
        ref="form">
        <el-form-item label="用户名" prop="username"
        :rules="rules">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"
        :rules="rules">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { nameRule, passRule } from '../utils/vaildata'
import { setToken } from '../utils/setToken'
import { login } from '@/api/api.js'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      // data里面写上名字和密码的正则验证规则
      rules: {
        username: [{ validator: nameRule, trigger: 'blur' }],
        password: [{ validator: passRule, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // login (form) {
    //   this.$refs[form].validate((valid) => {
    //     if (valid) {
    //       console.log(this.form)
    //       this.axios
    //         .post('http://1.116.64.64:5004/api2/login', this.form)
    //         .then((res) => {
    //           console.log(res)
    //           // 接口测试如果返回的状态码是200则请求成功返回对应数据
    //           if (res.data.status === 200) {
    //             // localStorage.setItem('username', res.data.username)
    //             setToken('username', res.data.username)
    //             this.$message({ message: res.data.message, type: 'success' })
    //             this.$router.push('/home')
    //           }
    //         })
    //         .catch((err) => {
    //           console.error(err)
    //         })
    //     } else {
    //       console.error(this.form)
    //     }
    //   })
    // }
    login (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.form)
          // this.service.post('/login', this.form)
          //   .then((res) => {
          //     if (res.data.status === 200) {
          //       setToken(username: res.data.username),
          //       setToken(token: res.data.token),
          //       this.$message({ message: res.data.message, type: 'success' })
          //       this.$router.push('/home')
          //     }
          //   })
          login(this.form).then(res => {
            if (res.data.status === 200) {
              setToken('username', res.data.username)
              setToken('token', res.data.token)
              this.$message({ message: res.data.message, type: 'success' })
              this.$router.push('/home')
            }
          })
        } else {
          console.error(this.form)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: skyblue;
  .el-card {
      background: #65768557;
  }
  .box-card {
    width: 450px;
    margin: 200px auto;
    color: #fff;
    .el-form .el-form-item__label {
        color: #fff;
    }
    .el-card__header {
      font-size: 34px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
