<!-- 信息管理 -->
<template>
  <div class="infoMent">
    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline" size="small">
  <el-form-item>
    <el-button type="primary" @click="addStudent">新增</el-button>
  </el-form-item>
</el-form>
    <!-- 1:1-10 2:11-20 slice((当前页数-1)*每页条数*当前条数) -->
    <!-- <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width:100%"></el-table> -->
    <!-- 添加计算属性进行数据分页 -->
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="father" label="父亲姓名" align="center"></el-table-column>
      <el-table-column prop="mother" label="母亲姓名" align="center"></el-table-column>
      <el-table-column prop="time" label="入校时间" align="center"></el-table-column>
      <el-table-column prop="address" label="家庭住址"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="cen ter"></el-table-column>
      <el-table-column lable="操作" align="center">
        <!-- slot-scope进行数据传参 -->
        <template slot-scope="scope">
          <!-- del函数里面传递的参数是每一行的参数 -->
          <el-button type="danger" size="mini" icon="el-icon-edit" @click="edit(scope.row)" ></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)" ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="state?'添加学生信息':'修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
    <!-- 定义model校验规则 -->
  <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
    <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
      <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
    </el-form-item>
    <el-form-item label="年龄" :label-width="formLabelWidth" prop="name">
      <el-input v-model="form.age" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="父亲姓名" :label-width="formLabelWidth" prop="father">
      <el-input v-model="form.father" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="母亲姓名" :label-width="formLabelWidth" prop="mother">
      <el-input v-model="form.mother" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="入校时间" :label-width="formLabelWidth" prop="time">
    <el-date-picker
      v-model="form.time"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
      <el-input v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeInfo('form')">取 消</el-button>
    <el-button type="primary" @click="sure('form')">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getData, changeInfo, delData } from '@/utils/table.js'
export default {
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        sex: '1',
        age: '',
        father: '',
        mother: '',
        time: '',
        address: '',
        phone: ''
      },
      formLabelWidth: '80px',
      rules: {
        name: [{ required: true, message: '请输入姓名' }],
        sex: [{ required: true }],
        age: [{ required: true, message: '请输入年龄' }],
        time: [{ required: true, message: '请输入入学时间' }],
        address: [{ required: true, message: '请输入家庭住址' }],
        phone: [{ required: true, message: '请输入联系方式' }]
      },
      state: true,
      total: 0
    }
  },
  created () {
    // this.getData()
    getData(this, '/info')
    // console.log(this)
  },
  methods: {
    edit (row) {
      // 尽量不要单行赋值修改，否则会出现边输入边渲染的情形
      // this.form = row
      this.form = { ...row }
      this.state = false
      this.dialogFormVisible = true
    },
    del (row) {
      delData(this, '/info', row.id, getData)
    },
    closeInfo (form) {
      this.$refs.form.reseteFields()
      this.dialogFormVisible = false
    },
    addStudent () {
      this.form = {
        name: '',
        sex: '1',
        age: '',
        father: '',
        mother: '',
        time: '',
        address: '',
        phone: ''
      }
      this.state = true
      this.dialogFormVisible = true
    },
    // getData () {
    //   // 调用getInfo方法
    //   getInfo().then(res => {
    //     if (res.data.status === 200) {
    //       this.tableData = res.data.data
    //       this.total = res.data.total
    //     }
    //   })
    // },
    sure (form) {
      console.log(this.form)
      // 校验规则，是否符合rules里面的规则
      this.$refs[form].validate(valid => {
        if (valid) {
          // 如果为新增则执行if
          //   changeInfo(this,'post','/info',this.form,getData())
          // } else {
          //   changeInfo(this,'put','/info',this.form,getData())
          // }
          // 通过method方法动态更新请求方式选择新增或者删除
          let methods = ''
          this.state ? methods = 'post' : methods = 'put'
          changeInfo(this, methods, '/info', this.form, getData)
        }
      })
    }
  }
}
</script>

<style lang="less">
.infoMent{
  .demo-form-inline,.el-form-item{
    text-align:left;
    margin-top: 7px;
  }
}
</style>
