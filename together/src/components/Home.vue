<template>
   <div class="home">
    <Header />
    <el-container class="content">
      <Menu />
      <el-container>
        <el-main>
          <Bread></Bread>
          <div class="cont">
            <!-- 路由出口用于路由渲染页面 -->
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer><Footer /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './common/Header.vue'
import Footer from './common/Footer.vue'
import Menu from './common/Menu.vue'
import Bread from './common/Breadrumb.vue'
export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Menu,
    Bread
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home{
  width: 100%;
  height: 100%;
  .content{
    position: absolute;
    width: 100%;
    top:60px;
    bottom: 0;
  }
}
</style>
