import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'
import home from '@/components/home'
import welcome from '@/components/welcome'
import users from '@/components/user/Users'
import powerList from '@/components/power/rights'
import userList from '@/components/power/roles'
import goods from '@/components/goods/goods'
import params from '@/components/goods/params'
import categories from '@/components/goods/categories'
import addGoods from '@/components/goods/addGoods'
import orders from '@/components/orders/orders'
import reports from '@/components/reports/reports'

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const routerNav = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: home,
      redirect: "/Welcome",
      children: [
        { path: '/Welcome', component: welcome },
        { path: '/users', component: users },
        { path: '/rights', component: powerList },
        { path: '/roles', component: userList },
        { path: '/goods', component: goods },
        { path: '/orders', component: orders
       },
        { path: '/params', component: params },
        { path: '/categories', component: categories },
        { path: '/goods/addGoods', component: addGoods },
        { path: '/reports', component: reports }
      ]
    }
  ]
})
//beforeEach 路由挂载守卫 根据token控制要去的路径
routerNav.beforeEach((to, from, next) => {
  //to用户要去的路径
  //from来的路径
  //next放行要去的路径

  if (to.path === "/login") return next()
  const token = window.sessionStorage.getItem("token")
  if (!token) return next("/login")
  next()
})
export default routerNav