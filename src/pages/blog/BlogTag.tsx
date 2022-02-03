import { Table, Space, Button, Popconfirm, message, Form, Modal, Input, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';
import BlogService from '../../services/BlogService'

interface Fn {
  name: string;
  label: string;
}

const dbIndex = {
  id: '_id',
  name: 'name',
  createDate: 'create_date',
  updateDate: 'update_date'
}
function BlogTag () {
  const [ list, setList ] = useState<any>(null)
  const [ visibleForm , setVisibleForm ] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ form ] = Form.useForm()
  const [ tagId, setTagId ] = useState<any>(null)
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
  const del = async (record: API.Tag) => {
    setIsLoading(true)
    const { success }: any = await BlogService.delBlogTagById(record.id)
    setIsLoading(false)
    if (success) {
      message.success('删除成功！')
      getBlogTagList()
    } else {
      message.error('删除失败，请稍后再试')
    }
    
  }
  const columns = [
    {
      dataIndex: dbIndex.id,
      title: '序号',
      key: 'id'
    },
    {
      dataIndex: dbIndex.name,
      title: '标签名称',
      key: 'name'
    },
    {
      dataIndex: dbIndex.createDate,
      title: '创建日期',
      key: 'createDate',
      render: (date: any) => formatDate(date)
    },
    {
      dataIndex: dbIndex.updateDate,
      title: '更新日期',
      key: 'updateDate',
      render: (date: any) => formatDate(date)
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
      setTimeout(() => form.setFieldsValue({
        id: record.id,
        name: record.name
      }))
      setTagId(record.id)
      setVisibleForm(true)
    } else {
      setTagId(void 0)
      form.resetFields()
      setVisibleForm(true)
    }
  }

  const submit = async (values: any) => {
    setIsLoading(true)
    const fn: Fn = {
      name: tagId !== void 0 ? 'update' : 'create',
      label: tagId !== void 0 ? '修改' : '创建'
    }
   
    const { success }: any = await BlogService[`${fn.name}Tag`](Object.assign(values, {id: tagId }))
    setIsLoading(false)
    success ? message.success(`${fn.label}成功`) : message.error(`${fn.label}失败，请稍后重试`)
    setVisibleForm(false)
    getBlogTagList()
  }
  
  const getBlogTagList = useCallback(async() => {
    const { success, data }:any = await BlogService.getBlogTagList()
    if (success) {
      setList(data)
    }
  }, [])

  useEffect(() => {
    getBlogTagList()
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
      <Modal
        visible={visibleForm}
        title='编辑标签'
        width={800}
        onCancel={() => setVisibleForm(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values: any) => {
              form.resetFields()
              form.setFieldsValue(values)
              setVisibleForm(false)
              submit(values)
            })
        }}
      >
        <Form
          form={form}
          name="tagDetail"
        >
          <Form.Item
            label='标签名称'
            name='name'
            rules={[{ required: true, message: '请输入标签名称' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      </Spin>
    </>
  )
}

export default BlogTag