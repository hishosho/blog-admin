import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import hljs from './highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import marked from 'marked';
import { Form, Input, notification, Button, Select, Row, Col, message, Spin } from 'antd';
import BlogService from '../../services/BlogService'
import styles from './BlogEdit.module.css'
import data from '../../mock/BlogTag'
import detail from '../../mock/BlogDetail'

interface Fn {
  name: string;
  label: string;
}

function BlogEdit () {
  const [tagOptions, setTagOptions] = useState<API.Tag[]>([])
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ form ] = Form.useForm()
  const location = useLocation<any>()

  const buildArticleContent = useCallback(() => {
    const renderer = new marked.Renderer()
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      breaks: false,
      smartLists: true,
      smartypants: false,
      highlight: (code) => {
        return hljs.highlightAuto(code).value
      }
    })
  }, [])

  const buildBlogTagOptions = async () => {
    const { success, data } = await BlogService.getBlogTagList()
    const tagOptions: any = []
    if (success) {
      data.map((tag: API.Tag) => {
        tagOptions.push(<Select.Option key={tag._id} value={tag._id}>{tag.name}</Select.Option>)
      })
      setTagOptions(tagOptions)
    }
  }

  const getBlogDetail = useCallback(async(id) => {
    const { success, data }: any = await BlogService.getBlogDetailById(id)
    const tagIds = data.tags.map((tagId: string) => {
      return parseInt(tagId)
    })
    if (success) {
      form.setFieldsValue({
        title: data.title,
        desc: data.desc,
        content: data.content,
        tags: tagIds
      })
      const html=marked(data.content)
      setMarkdownContent(html)
    }
  }, [])

  const submit = () => {
    form.validateFields()
      .then(async (values: any) => {
        setIsLoading(true)
        form.resetFields()
        form.setFieldsValue(values)
        const fn: Fn = {
          name: location.state ? 'update' : 'create',
          label: location.state ? '修改' : '创建'
        }
        const { success }: any = await BlogService[`${fn.name}Blog`](Object.assign(values, {id: location.state && location.state.id }))
        setIsLoading(false)
        success ? message.success(`${fn.label}成功`) : message.error(`${fn.label}失败，请稍后重试`)
      })
  }

  const goSubmit = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={submit}>提交</Button>
    );
    notification.open({
      message: '提交',
      description:
        '确定提交？',
      btn,
      key,
    });
    
  }

  useEffect(() => {
    buildBlogTagOptions()
    buildArticleContent()
    if (location.state) {
      getBlogDetail(location.state.id)
    }
  }, [getBlogDetail, buildArticleContent, location.state])
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <Form
        form={form} 
        layout="vertical" 
        name="blogDetailForm"
        onValuesChange={(_, values) => {
          console.log(values)
          if (values.content !== void 0 && values.content !== '') {
            const html=marked(values.content)
            setMarkdownContent(html)
          }
        }}
      >
        <Form.Item name="title" label="博客标题" rules={[{ required: true, message: '请填写博客标题!' }]}>
          <Input
            placeholder="请输入博客标题"
          />
        </Form.Item>
        <Form.Item name="tags" label="博客标签" rules={[{ required: true, message: '请填写博客标签!' }]}>
          <Select
            mode="multiple"
            allowClear
            placeholder="请选择博客标签"
          >
            {tagOptions}
          </Select>
        </Form.Item>
        <Form.Item name="desc" label="博客简介">
          <Input.TextArea
            rows={4}
            placeholder="请输入博客简介"
          />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item name="content" label="博客正文" rules={[{ required: true, message: '请填写博客正文!' }]}>
              <Input.TextArea
                placeholder="请输入博客正文"
                rows={35}
                cols={100}
              />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item label="预览">
              <div
                className={styles.content}
                style={{border: '1px', height: '80vh', overflow: 'auto'}}
                dangerouslySetInnerHTML = {{__html:markdownContent}} 
              />
          </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary" 
            htmlType="submit"
            onClick={goSubmit}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default BlogEdit 