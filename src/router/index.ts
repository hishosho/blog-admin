const routes = [
  {
    key: 'sub1',
    name: 'blog',
    meta: {
      title: '博客管理',
    },
    children: [
      {
        key: '11',
        name: 'blogList',
        meta: {
          title: '博客列表',
        },
        path: '/blog/list',
        component: () => import('../pages/blog/BlogList'),
      },
      {
        key: '12',
        name: 'blogEdit',
        meta: {
          hidden: true,
          title: '博客编辑',
        },
        path: '/blog/edit',
        component: () => import('../pages/blog/BlogEdit'),
      },
    ]
  },
]

export default routes