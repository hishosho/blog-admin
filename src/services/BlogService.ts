import axios from './index'

const BlogService: { [key: string]: any } = {
  getBlogDetailById: (id: number) => axios({ url: `blogs/blog/${id}`, params: {id} }),
  getBlogList: () => axios({ url: '/blogs' }),
  getBlogTagList: () => axios({ url: '/tags' }),
  getBlogsByTagId: (id: number) => axios({ url: '/', params: {id} }),
  updateBlogTagState: ({ id, state }: {id: number, state: boolean}) => axios({ url: '/', params: { id, state } }),
  delBlogById: (id: number) => axios({ url: `/blogs/blog/${id}`, method: 'delete' }),
  delBlogTagById: (id: number) => axios({ url: `tags/tag/${id}`, method: 'delete' }),
  createBlog: (data: any) => axios({ url: '/blogs/create', data, method: 'post' }),
  updateBlog: (data: any) => axios({ url: `/blogs/update/${data.id}`, data, method: 'put' }),
  createTag: (data: any) => axios({ url: '/tags/create', data, method: 'post' }),
  updateTag: (data: any) => axios({ url: '/tags/update', data, method: 'put' }),
}

export default BlogService