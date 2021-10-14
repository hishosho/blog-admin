import Index from '../pages/Index'
import BlogList from '../pages/blog/BlogList'
import BlogEdit from '../pages/blog/BlogEdit'
import BlogTag from '../pages/blog/BlogTag'
const routes = [
  {
    key: 'sub1',
    name: 'blog',
    meta: {
      title: '博客管理',
    },
    path: '/index',
    component: Index,
    children: [
      {
        key: '11',
        name: 'blogList',
        meta: {
          title: '博客列表',
        },
        path: '/blog/list',
        component: BlogList,
      },
      {
        key: '12',
        name: 'blogEdit',
        meta: {
          hidden: true,
          title: '博客编辑',
        },
        path: '/blog/edit',
        component: BlogEdit,
      },
      {
        key: '13',
        name: 'blogTag',
        meta: {
          title: '博客标签管理',
        },
        path: '/blog/tag',
        component: BlogTag,
      },
    ]
  },
]

export default routes