import { Table, Tag, Space } from 'antd';
import { useEffect } from 'react';
import BlogService from '../../services/BlogService'

function BlogList () {
  const columns = [
    {
      dataIndex: 'id',
      title: '序号',
      key: 'id'
    },
    {
      dataIndex: 'title',
      title: '博客名称',
      key: 'title'
    },
    {
      dataIndex: 'state',
      title: '博客状态',
      key: 'state'
    },
    {
      dataIndex: 'order',
      title: '博客排序',
      key: 'order'
    },
    {
      dataIndex: 'publishDate',
      title: '发布日期',
      key: 'publishDate'
    },
    {
      dataIndex: 'updateDate',
      title: '更新日期',
      key: 'updateDate'
    },
    {
      dataIndex: 'tags',
      title: '博客标签',
      key: 'tags',
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            return (
              <Tag color='green' key={tag.id}>
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <a>修改</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      id: 1,
      title: `blog1`,
      state: 'pubilshed',
      order: 1,
      tags: [{
        id: 0,
        name: 'vue'
      }],
      admireCount: 1,
      visitCount: 1,
      publishDate: Date.now(),
      updateDate: Date.now(),
    },
    {
      id: 2,
      title: `blog2`,
      state: 'pubilshed',
      order: 2,
      tags: [{
        id: 0,
        name: 'vue'
      }],
      admireCount: 1,
      visitCount: 1,
      publishDate: Date.now(),
      updateDate: Date.now(),
    },
    {
      id: 3,
      title: `blog3`,
      state: 'pubilshed',
      order: 3,
      tags: [{
        id: 0,
        name: 'vue'
      }],
      admireCount: 1,
      visitCount: 1,
      publishDate: Date.now(),
      updateDate: Date.now(),
    },
  ];

  useEffect(() => {
    getBlogList()
  })

  return <Table columns={columns} dataSource={data} />
}

export default BlogList