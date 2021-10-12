import axios from './index'

const BlogService = {
  getBlogDetail: (id: number) => axios({ url: '/', params: {id} }),
  getBlogList: () => axios({ url: '/' }),
  getBlogTagList: () => axios({ url: '/' }),
  getBlogsByTagId: (id: number) => axios({ url: '/', params: {id} }),
  updateBlogTagState: ({ id, state }: {id: number, state: boolean}) => axios({ url: '/', params: { id, state } }),
  delBlogById: (id: number) => axios({ url: '/', params: {id} }),
}

export default BlogService