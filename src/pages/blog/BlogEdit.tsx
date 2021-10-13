import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import hljs from './highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import marked from 'marked';
import { Form, Input, InputNumber, Button, Select, Row, Col } from 'antd';
import BlogService from '../../services/BlogService'
import styles from './BlogEdit.module.css'
import data from '../../mock/BlogTag'
import detail from '../../mock/BlogDetail'

function BlogEdit () {
  const [markdownContent, setMarkdownContent] = useState<string>('');
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

  const buildBlogTagOptions = () => {
    // const { success, data } = await BlogService.getBlogList()
    const tagOptions: any = []
    data.rows.map((row: any) => {
      tagOptions.push(<Select.Option key={row.id} value={row.id}>{row.name}</Select.Option>)
    })
    return tagOptions
  }

  const getBlogDetail = useCallback(async() => {
    // const { success, data } = await BlogService.getBlogDetailById(location.state.id)
    form.setFieldsValue({
      title: detail.title,
      desc: detail.desc,
      content: detail.content,
      tags: [1, 2, 3]
    })
    const html=marked(detail.content)
    setMarkdownContent(html)
  }, [form])

  const submit = (values: any) => {
    if (location.state) {
      console.log(`修改${location.state.id}=`, values)
    } else {
      console.log(`创建=`, values)
    }
  }

  useEffect(() => {
    buildArticleContent()
    if (location.state) {
      getBlogDetail()
    }
  }, [getBlogDetail, buildArticleContent, location.state])
  return (
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
          {buildBlogTagOptions()}
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
          onClick={() => {
            form
            .validateFields()
            .then((values: any) => {
              form.resetFields()
              form.setFieldsValue(values)
              submit(values)
            })
          }}
        >
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BlogEdit 