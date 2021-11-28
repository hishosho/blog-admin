import { Table, Tag, Space, Button, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import BlogService from '../../services/BlogService'
import data from '../../mock/BlogList'


function BlogList () {
  let history = useHistory();
  const [ list, setList ] = useState<any>(null)
  const formatDate = (date: any) => {
    const time = new Date(date);
    const year = time.getFullYear()+'年';
    const month = time.getMonth()+1+'月';
    const day = time.getDate()+'日';
    return (
      <>
      <span>{[year,month,day].join('')}</span>
      </>
    )
  }
  const del = (record: API.BlogListItem) => {
    const { success }: any = BlogService.delBlogById(record.id)
    if (success) {
      message.success('删除成功！')
      getBlogList()
    }
  }
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
      key: 'publishDate',
      render: (date: any) => formatDate(date)
    },
    {
      dataIndex: 'updateDate',
      title: '更新日期',
      key: 'updateDate',
      render: (date: any) => formatDate(date)
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
          <Button
            onClick={() => edit(record)}
          >
            修改
          </Button>
          <Popconfirm
            placement="rightBottom"
            title='确定删除该数据？'
            onConfirm={() => del(record)}
            okText="Yes"
            cancelText="No"
            >
            <Button>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  const edit = (record?: any) => {
    if (record.id !== void 0) {
      history.push({pathname: '/blog/edit', state: { id: record.id }})
    } else {
      history.push('/blog/edit')
    }
    
  }

  const getBlogList = useCallback(async() => {
    const { success, data }: any = await BlogService.getBlogList()
    console.log('data-', data)
    if (success) {
      setList(data.rows)
    }
  }, [])

  useEffect(() => {
    getBlogList()
  }, [])

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ margin: '20px' }}
        onClick={edit}
        > 
        新建
      </Button>
      <Table 
        columns={columns} 
        dataSource={list} 
        />
    </>
  )
}

export default BlogList