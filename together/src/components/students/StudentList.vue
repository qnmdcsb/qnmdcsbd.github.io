<!-- 学生列表 -->
<template>
  <div class="studentlist">
    <!-- 查询表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
  <el-form-item label="姓名">
    <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
  </el-form-item>
  <el-form-item >
    <el-button type="primary" @click="reset">重置</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="find">查询</el-button>
  </el-form-item>
</el-form>
    <!-- 1:1-10 2:11-20 slice((当前页数-1)*每页条数*当前条数) -->
    <!-- <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width:100%"></el-table> -->
    <!-- 添加计算属性进行数据分页 -->
    <el-table :data="compData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="number" label="学号" align="center"></el-table-column>
      <el-table-column prop="class" label="班级" align="center"></el-table-column>
      <el-table-column prop="state_text" label="状态" align="center"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column lable="操作" align="center">
        <!-- slot-scope进行数据传参 -->
        <template slot-scope="scope">
          <!-- del函数里面传递的参数是每一行的参数 -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20,30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { students, studentDel } from '@/api/api.js'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页显示条数
      total: 0, // 总条数
      formInline: {
        name: ''
      }
    }
  },
  created () {
    this.getData()
  },
  computed: {
    compData () {
      // 这里currentPage等方法显示未定义，需要通过this调用
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  // 因为涉及到列表查询所以不建议直接引用数据
  methods: {
    find () {
      // console.log(this.formInline)
      this.getData(this.formInline)
    },
    reset () {
      this.formInline = {}
      this.getData(this.formInline)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    getData (params) {
      students(params).then((res) => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
          this.tableData.forEach((item) => {
            // 尽量不要修改原数据，否则会更改需要传递给后端的数据
            // item.sex===1?item.sex="男":item.sex="女"
            item.sex === 1 ? item.sex_text = '男' : item.sex_text = '女'
            item.state === '1'
              ? (item.state_text = '已入学')
              : item.state === '2'
                ? (item.state_text = '未入学')
                : (item.state_text = '休学中')
          })
        }
        console.log(res)
      })
    },
    del (row) {
      console.log(row)
      studentDel(row.id).then(res => {
        if (res.data.status === 200) {
          // 进行提示
          this.$message({ message: '删除数据成功', type: 'success' })
          // 底下的页面总数需要重新更新
          this.getData()
        }
      })
    }
  }
}
</script>

<style lang="less">
.studentlist{
  .demo-form-inline,.el-form-item{
    text-align:left;
    margin-top: 7px;
  }
  .el-pagination{
    text-align: left;
    margin-top: 20px;
  }
}
</style>
