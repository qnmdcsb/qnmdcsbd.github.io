<template>
  <div class="user">
    <el-tree
      :data="menus"
      show-checkbox
      node-key="name"
      :props="dafaultProps"
      ref="tree"
      >
    </el-tree>
    <el-button @click="getCheckedNodes">通过node节点获取</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // menus存放路由的数据
      menus: [],
      dafaultProps: {
        // 表示要展示的字段
        label: 'name',
        children: 'children'
      }
    }
  },
  methods: {
    getCheckedNodes () {
      const arr = this.$refs.tree.getCheckedNodes()
      console.log(arr)
    }
  },
  created () {
    this.menus = [...this.$router.options.routes]
    // console.log(this.$router.options.routes)
    // 权限管理和动态路由的思路：
    // 根据不同用户登录上来，返回对应的路由权限菜单
    // 一般可以通过树形控件达到权限的精准控制，根据不同的角色，勾选不同的菜单权限，将菜单数据提交给后端进行保存
    // 后端保存之后，在用户进行登录的时候就会查询该用户或该角色所拥有的菜单数据，最终动态渲染展示
    // 动态添加路由使用router.addRoutes(vue-router3.x)方法,后续使用router.addRoute
  }
}
</script>

<style lang="less">

</style>
