<template>
  <div class="menu">
    <el-aside width="200px">
      <!-- router用于开启路由，点击改变哈希地址 -->
      <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#2578b5"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 遍历路由获取的数据，侧边栏 -->
      <template v-for="(item, index) in menus" >
      <!-- 这里报 -->
        <el-submenu :index="index + ''" :key="index" v-if="!item.hidden">
        <template slot="title">
          <!-- 动态绑定数据对应图标 -->
          <i :class="item.iconClass"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group v-for="(child,index) in item.children" :key="index">
          <el-menu-item :index="child.path">
          <i :class="child.iconClass"></i>
          {{child.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      </template>
    </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.menus = [...this.$router.options.routes]
    console.log(this.menus)
  }
}
</script>

<style lang="less">
.menu{
  .el-aside{
    // 解决组件高度不够
    height: 100%;
    .el-menu{
      height: 100%;
      .fa{
        margin-right: 10px;
      }
    }
    // 解决组件宽度不够
    .el-submenu .el-menu-item{
      min-width: 0;
    }
  }
}
</style>
