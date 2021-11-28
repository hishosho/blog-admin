import axios from './index'

const BlogService = {
  getBlogDetailById: (id: number) => axios({ url: '/', params: {id} }),
  getBlogList: () => axios({ url: '/blogs' }),
  getBlogTagList: () => axios({ url: '/' }),
  getBlogsByTagId: (id: number) => axios({ url: '/', params: {id} }),
  updateBlogTagState: ({ id, state }: {id: number, state: boolean}) => axios({ url: '/', params: { id, state } }),
  delBlogById: (id: number) => axios({ url: `/blogs/blog/${id}`, method: 'delete' }),
  delBlogTagById: (id: number) => axios({ url: '/', params: {id} }),
}

export default BlogService