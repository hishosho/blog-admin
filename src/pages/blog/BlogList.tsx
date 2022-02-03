import { Table, Tag, Space, Button, Popconfirm, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import BlogService from '../../services/BlogService'
import data from '../../mock/BlogList'

const dbIndex = {
  id: '_id',
  title: 'title',
  desc: 'desc',
  tags: 'tags',
  visitCount: 'visit_count',
  admireCount: 'admire_count',
  status: 'status',
  order: 'order',
  publishDate: 'publish_date',
  content: 'content',
  createDate: 'create_date',
  updateDate: 'update_date'
}

function BlogList () {
  let history = useHistory();
  const [ list, setList ] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const formatDate = (date: any) => {
    if (!date) return ''
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
  const del = async (record: API.Blog) => {
    setIsLoading(true)
    const { success }: any = await BlogService.delBlogById(record._id)
    setIsLoading(false)
    if (success) {
      message.success('删除成功！')
      getBlogList()
    }
  }
  const columns = [
    {
      dataIndex: dbIndex.id,
      title: '序号',
      key: 'id'
    },
    {
      dataIndex: dbIndex.title,
      title: '博客名称',
      key: 'title'
    },
    {
      dataIndex: dbIndex.status,
      title: '博客状态',
      key: 'status',
      render: (status: number) =>(
        <>
         <span style={{color: status === 2 ? '#1fd51f' : ''}}>{status === 2 ? '已上线' : '已下线' }</span>
        </>
      )
    },
    {
      dataIndex: dbIndex.order,
      title: '博客排序',
      key: 'order'
    },
    {
      dataIndex: dbIndex.publishDate,
      title: '发布日期',
      key: 'publishDate',
      render: (date: any) => formatDate(date)
    },
    {
      dataIndex: dbIndex.updateDate,
      title: '更新日期',
      key: 'updateDate',
      render: (date: any) => formatDate(date)
    },
    {
      dataIndex: dbIndex.tags,
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
          {record.status !== 2 && (<Button
            type="text"
            onClick={() => edit(record)}
          >
            修改
          </Button>)}
          <Popconfirm
            placement="rightBottom"
            title='确定上线该博客？'
            onConfirm={() => changeStatus(record, record.status === 2 ? 1 : 2).then(() => getBlogList())}
            okText="Yes"
            cancelText="No"
            >
            <Button type={record.status === 2 ? 'text' : 'link'}>{record.status === 2 ? '下线' : '上线'}</Button>
          </Popconfirm>
          <Popconfirm
            placement="rightBottom"
            title='确定删除该数据？'
            onConfirm={() => del(record)}
            okText="Yes"
            cancelText="No"
            >
            <Button type="text">删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  const edit = (record: any) => {
    if (record._id !== void 0) {
      history.push({pathname: '/blog/edit', state: { id: record._id }})
    } else {
      history.push('/blog/edit')
    }
  }

  const changeStatus = async (record: any, status: number) => {
    setIsLoading(true)
    const params: any = {
      id: record._id,
      status
    }
    if (status === 2) {
      params.publishDate = new Date()
    }
    const { success }: any = await BlogService.updateBlog(params)
    setIsLoading(false)
    if (success) {
      message.success('操作成功')
    } else {
      message.error('操作失败，请稍后重试')
    }
  }

  const getBlogList = useCallback(async() => {
    const { success, data }: any = await BlogService.getBlogList()
    if (success) {
      setList(data)
    }
  }, [])

  useEffect(() => {
    getBlogList()
  }, [])

  return (
    <>
      <Spin tip="Loading..." spinning={isLoading}>
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
      </Spin>
    </>
  )
}

export default BlogList