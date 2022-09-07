import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 默认跳转登录页面
      path: '/',
      redirect: '/login',
      name: '首页',
      hidden: true,
      component: () => import('@/components/Login')// 路由懒加载（同步）
    },
    {
      // 哈希地址是登录页面
      path: '/login',
      name: 'Login',
      hidden: true,
      component: () => import('@/components/Login')
    },
    {
      // 哈希地址是除已经定义的哈希地址以外所有地址
      path: '*',
      name: 'NotFound',
      hidden: true,
      component: () => import('@/components/NotFound.vue')
    },
    // {
    //   path: '/home',
    //   component: () => import('@/components/Home.vue') // 路由懒加载（同步）
    //   // component: resolve => require(['@/components/Home.vue'], resolve)
    // },
    {
      path: '/home',
      name: '学生管理',
      iconClass: 'fa fa-users',
      redirect: '/home/student',
      component: () => import('@/components/Home.vue'), // 路由懒加载（同步）
      // component: resolve => require(['@/components/Home.vue'], resolve)
      children: [{
        path: '/home/student',
        name: '学生列表',
        iconClass: 'fa fa-list',
        component: () => import('@/components/students/StudentList.vue')
      },
      {
        path: '/home/info',
        name: '信息列表',
        iconClass: 'fa fa-list-alt',
        component: () => import('@/components/students/InfoList.vue')
      },
      {
        path: '/home/infos',
        name: '信息管理',
        iconClass: 'fa fa-list-alt',
        component: () => import('@/components/students/InfoLists.vue')
      },
      {
        path: '/home/work',
        name: '作业列表',
        iconClass: 'fa fa-list-ul',
        component: () => import('@/components/students/WorkList.vue')
      },
      {
        path: '/home/works',
        name: '作业管理',
        iconClass: 'fa fa-th-list',
        component: () => import('@/components/students/WorkMent.vue')
      }]
    },
    {
      path: '/home/dataview',
      name: '数据分析',
      iconClass: 'fa fa-bar-chart',
      component: () => import('@/components/Home.vue'), // 路由懒加载（同步）
      // component: resolve => require(['@/components/Home.vue'], resolve)
      children: [{
        path: '/home/dataview',
        name: '数据概览',
        iconClass: 'fa fa-line-chart',
        component: () => import('@/components/dataAnalysis/DataView.vue')
      },
      {
        path: '/home/mapview',
        name: '地图概览',
        iconClass: 'fa fa-line-chart',
        component: () => import('@/components/dataAnalysis/MapView.vue')
      },
      {
        path: '/home/travel',
        name: '地图概览',
        iconClass: 'fa fa-line-chart',
        component: () => import('@/components/dataAnalysis/TravelMap.vue')
      },
      {
        path: '/home/score',
        name: '分数地图',
        iconClass: 'fa fa-line-chart',
        component: () => import('@/components/dataAnalysis/ScoreMap.vue')
      }]
    },
    {
      path: '/home',
      name: '用户中心',
      iconClass: 'fa fa-user',
      component: () => import('@/components/Home.vue'), // 路由懒加载（同步）
      // component: resolve => require(['@/components/Home.vue'], resolve)
      children: [{
        path: '/home/user',
        name: '权限管理',
        iconClass: 'fa fa-user',
        component: () => import('@/components/users/User.vue')
      }
      ]
    }
  ],
  mode: 'history'
})
