import { Table, Space, Button, Popconfirm, message, Form, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';
import BlogService from '../../services/BlogService'
import data from '../../mock/BlogTag'


function BlogTag () {
  const [ list, setList ] = useState<any>(null)
  const [ visibleForm , setVisibleForm ] = useState<boolean>(false)
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
  const del = (record: API.Tag) => {
    // const { success, data } = BlogService.delBlogTagById(record.id)
    console.log('del=', record.id)
    message.success('删除成功！')
  }
  const columns = [
    {
      dataIndex: 'id',
      title: '序号',
      key: 'id'
    },
    {
      dataIndex: 'name',
      title: '标签名称',
      key: 'name'
    },
    {
      dataIndex: 'createDate',
      title: '创建日期',
      key: 'createDate',
      render: (date: any) => formatDate(date)
    },
    {
      dataIndex: 'updateDate',
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
    console.log('record=', record.id)
    if (record.id !== void 0) {
      setTimeout(() => form.setFieldsValue({
        id: record.id,
        name: record.name
      }))
      setTagId(record.id)
      setVisibleForm(true)
    } else {
      setTagId(null)
      form.resetFields()
      setVisibleForm(true)
    }
  }

  const submit = (values: any) => {
    console.log(tagId, values)
    message.success(`${tagId !== null ? '修改' : '创建'}成功！`)
    setVisibleForm(false)
  }
  

  const getBlogTagList = useCallback(async() => {
    // const { success, data } = await BlogService.getBlogList()
    setList(data.rows)
  }, [])

  useEffect(() => {
    getBlogTagList()
  })

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
    </>
  )
}

export default BlogTag