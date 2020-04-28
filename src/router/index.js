import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    meta: { title: '订单管理', icon: 'documentation' },
    children: [
      {
        path: 'order',
        component: () => import('@/views/order/index'),
        name: 'Order',
        meta: { title: '订单管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/evaluate',
    component: Layout,
    redirect: '/evaluate',
    meta: { title: '评价管理', icon: 'documentation' },
    children: [
      {
        path: 'evaluate',
        component: () => import('@/views/evaluate/index'),
        name: 'Evaluate',
        meta: { title: '评价管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/commodity',
    component: Layout,
    redirect: '/commodity/list',
    meta: { title: '商品管理', icon: 'documentation' },
    children: [
      {
        path: '/commodity/list',
        component: () => import('@/views/commodity/list'),
        meta: { title: '商品列表', icon: 'edit' }
      },
      {
        path: '/commodity/create',
        component: () => import('@/views/commodity/create'),
        meta: { title: '商品新增', icon: 'edit' }
      }
    ]
  },
  {
    path: '/staff',
    component: Layout,
    redirect: '/staff/list',
    meta: { title: '员工管理', icon: 'documentation' },
    children: [
      {
        path: '/staff/list',
        component: () => import('@/views/staff/list'),
        meta: { title: '员工列表', icon: 'edit' }
      },
      {
        path: '/staff/create',
        component: () => import('@/views/staff/create'),
        meta: { title: '员工新增', icon: 'edit' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
