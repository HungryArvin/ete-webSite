import Layout from '@/layout'
const studentRole = [
{
    path: '/student-answer',
    component: Layout,
    redirect: '/student-answer',
    meta: { title: '教评问卷', icon: 'el-icon-tickets', affix: true },
    children: [
      {
        path: 'list',
        component: () => import('@/views/student-answer/list'),
        name: 'list',
        meta: { title: '待评问卷', icon: 'el-icon-tickets', affix: true }
      },
      {
        path: 'answer/:id',
        hidden:true,
        component: () => import('@/views/student-answer/answer'),
        name: 'answer',
        meta: { title: '填写问卷', icon: 'el-icon-edit-outline', affix: true }
      }

    ]
  },
  {
    path: '/student-present',
    component: Layout,
    redirect: '/student-present',
    meta: { title: '老师的个人问卷', icon: 'el-icon-tickets', affix: true },
    children: [
      {
        path: 'info',
        component: () => import('@/views/student-present/info'),
        name: 'info',
        meta: { title: '老师的个人问卷', icon: 'el-icon-tickets', affix: true }
      }

    ]
  }
]
export default studentRole;