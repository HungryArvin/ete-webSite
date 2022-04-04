import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
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
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index/info'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    redirect: '/student',
    meta: { title: '学生信息管理', icon: 'peoples', affix: true ,roles: ['admin']},
    children: [
      {
        path: 'student-list',
        component: () => import('@/views/student/list'),
        name: 'list',
        meta: { title: '学生信息', icon: 'people', affix: true }
      },
      {
        path: 'upload-student',
        component: () => import('@/views/student/upload-student'),
        name: 'upload',
        meta: { title: '上传学生信息', icon: 'guide', affix: true }
      }

    ]
  },
  {
    path: '/classInfo',
    component: Layout,
    redirect: '/classInfo',
    meta: { title: '班级信息管理', icon: 'el-icon-s-home', affix: true ,roles: ['admin']},
    children: [
      {
        path: 'classList',
        component: () => import('@/views/classInfo/classList'),
        name: 'list',
        meta: { title: '班级列表', icon: 'el-icon-s-unfold', affix: true }
      },
      {
        path: 'saveClass',
        component: () => import('@/views/classInfo/save'),
        name: 'save',
        meta: { title: '添加班级信息', icon: 'guide', affix: true }
      }

    ]
  },
  {
    path: '/courseInfo',
    component: Layout,
    redirect: '/courseInfo',
    meta: { title: '英语课程管理', icon: 'el-icon-notebook-2', affix: true ,roles: ['admin']},
    children: [
      {
        path: 'courseList',
        component: () => import('@/views/courseInfo/courseList'),
        name: 'list',
        meta: { title: '课程列表', icon: 'el-icon-notebook-1', affix: true }
      },
      {
        path: 'coaurseSave/:courseId',
        component: () => import('@/views/courseInfo/save'),
        name: 'save',
        meta: { title: '添加课程', icon: 'el-icon-collection', affix: true }
      }

    ]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacherInfo',
    meta: { title: '教师管理', icon: 'el-icon-s-custom', affix: true ,roles: ['admin']},
    children: [
      {
        path: 'list',
        component: () => import('@/views/teacher/list'),
        name: 'list',
        meta: { title: '教师列表', icon: 'el-icon-s-unfold', affix: true }
      },
      {
        path: 'info/:id',
        component: () => import('@/views/teacher/info'),
        name: 'info',
        meta: { title: '教师添加', icon: 'el-icon-plus', affix: true }
      },
      {
        path: 'stduentList/:id',
        hidden: true,
        component: () => import('@/views/teacher/studentList'),
        name: '学生列表',
        meta: { title: '参评学生', icon: 'el-icon-sunny', affix: true }
      },
      {
        path: 'check/:id',
        hidden: true,
        component: () => import('@/views/teacher/check'),
        name: '学生答复',
        meta: { title: '学生答复', icon: 'el-icon-loading', affix: true }
      }


    ]
  },
  {
    path: '/question',
    component: Layout,
    redirect: '/question',
    meta: { title: '教评问卷管理', icon: 'el-icon-edit-outline', affix: true ,roles: ['admin']},
    children: [
      {
        path: 'create',
        component: () => import('@/views/question/create'),
        name: 'create',
        meta: { title: '问卷创建', icon: 'el-icon-edit', affix: true }
      },
      {
        path: 'list',
        component: () => import('@/views/question/list'),
        name: 'list',
        meta: { title: '问卷管理', icon: 'el-icon-tickets', affix: true }
      },
      {
        path: 'info/:id',
        component: () => import('@/views/question/info'),
        name: 'info',
        meta: { title: '浏览问卷', icon: 'el-icon-tickets', affix: true }
      }

    ]
  },
  {
    path: '/teacher-profile',
    component: Layout,
    redirect: '/profile',
    meta: { title: '主页', icon: 'el-icon-edit-outline', affix: true ,roles: ['teacher']},
    children: [
      {
        path: 'info',
        component: () => import('@/views/teacher-profile/info'),
        name: 'info',
        meta: { title: '个人主页', icon: 'el-icon-s-flag', affix: true ,roles: ['teacher']}
      }
    ]
  },
  {
    path: '/teacher-question',
    component: Layout,
    redirect: '/question',
    meta: { title: '个人问卷', icon: 'el-icon-edit', affix: true ,roles: ['teacher']},
    children: [
      {
        path: 'create',
        component: () => import('@/views/teacher-question/create'),
        name: 'create',
        meta: { title: '个人问卷', icon: 'el-icon-edit', affix: true }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content',
    meta: { title: '我的教评', icon: 'el-icon-s-order', affix: true ,roles: ['teacher']},
    children: [
      {
        path: 'list',
        component: () => import('@/views/content/list'),
        name: 'list',
        meta: { title: '我的教评', icon: 'el-icon-s-order', affix: true }
      },
      {
        path: 'check/:id',
        // hidden: true,
        component: () => import('@/views/content/check'),
        name: 'check',
        meta: { title: '个人问卷解答', icon: 'el-icon-s-order', affix: true }
      }
    ]
  },
  {
    path: '/student-answer',
    component: Layout,
    redirect: '/student-answer',
    meta: { title: '教评问卷', icon: 'el-icon-tickets', affix: true ,roles: ['student']},
    children: [
      {
        path: 'list',
        component: () => import('@/views/student-answer/list'),
        name: 'list',
        meta: { title: '待评问卷', icon: 'el-icon-tickets', affix: true ,roles: ['student']}
      },
      {
        path: 'answer/:id',
        hidden:true,
        component: () => import('@/views/student-answer/answer'),
        name: 'answer',
        meta: { title: '填写问卷', icon: 'el-icon-edit-outline', affix: true ,roles: ['student']}
      }

    ]
  },
  {
    path: '/student-present',
    component: Layout,
    redirect: '/student-present',
    meta: { title: '老师的个人问卷', icon: 'el-icon-tickets', affix: true ,roles: ['student']},
    children: [
      {
        path: 'info',
        component: () => import('@/views/student-present/info'),
        name: 'info',
        meta: { title: '老师的个人问卷', icon: 'el-icon-tickets', affix: true ,roles: ['student']}
      }

    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
