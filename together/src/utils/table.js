// import service from '@/service.js'
// 获取表格数据(数据增删改查模块)
import qs from 'qs'
export function getData (root, url, params) {
  root.service.get(url, { params: params || {} })
    .then(res => {
      if (res.data.status === 200) {
        root.tableData = res.data.data
        root.total = res.data.total
      }
    })
    .catch(err => {
      throw err
    })
}

// 新增和修改方法的封装
export function changeInfo (root, method, url, form, callback) {
  const data = qs.stringify(form)
  // method动态定义新增和修改请求方式,参数传递需要用qs进行解析
  root.service[method](url, data)
    .then(res => {
      if (res.data.status === 200) {
        callback(root, url)
        // 刷新数据
        root.$refs.form.resetFields()
        root.dialogFormVisible = false
        root.$message({ type: 'success', message: res.data.message })
      }
    })
    .catch(err => {
      throw err
    })
}

// 删除方法
export function delData (root, url, id, callFun) {
  root.$alert('你确定要删除吗', '提示', {
    confirmButtonText: '确定',
    // 点击确定之后调用回调函数
    callback: () => {
      root.service.delete(`${url}/${id}`).then(res => {
        if (res.data.status === 200) {
          callFun(root, url)
          root.$message({ message: res.data.message, type: 'success' })
        }
      })
        .catch(err => {
          throw err
        })
    }
  })
}

// 作业列表获取表格数据方法的封装(这里arr字段表示需要从获取来的数据进行转换的数据在这里是指完成情况)
export function getTableData (root, url, params, arr) {
  root.service.get(url, { params: params || {} })
    .then(res => {
      if (res.data.status === 200) {
        root.tableData = res.data.data
        root.total = res.data.total
        root.tableData.map(item => {
          arr.map(aItem => {
            // 这里给获取的数据拼接text字符串是防止直接修改到源数据
            item[aItem] ? item[aItem + '_text'] = '是' : item[aItem + '_text'] = '否'
          })
        })
        root.loading = false
      }
    })
    .catch(err => {
      throw err
    })
}
