import React, { useState, useCallback, useEffect } from 'react'
import { useHistory } from "react-router-dom";
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
  let history = useHistory();
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
        order: data.order,
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
          label: location.state ? '??????' : '??????'
        }
        const { success }: any = await BlogService[`${fn.name}Blog`](Object.assign(values, {id: location.state && location.state.id }))
        setIsLoading(false)
        if (success) {
          message.success(`${fn.label}??????`)
        } else {
          message.error(`${fn.label}????????????????????????`)
        }
      })
      .then(() => { history.push('/blog/list') })
  }

  const goSubmit = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={submit}>??????</Button>
    );
    notification.open({
      message: '??????',
      description:
        '???????????????',
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
        <Form.Item name="title" label="????????????" rules={[{ required: true, message: '?????????????????????!' }]}>
          <Input
            placeholder="?????????????????????"
          />
        </Form.Item>
        <Form.Item name="order" label="????????????">
          <Input
            type="number"
            placeholder="?????????????????????"
          />
        </Form.Item>
        <Form.Item name="tags" label="????????????" rules={[{ required: true, message: '?????????????????????!' }]}>
          <Select
            mode="multiple"
            allowClear
            placeholder="?????????????????????"
          >
            {tagOptions}
          </Select>
        </Form.Item>
        <Form.Item name="desc" label="????????????">
          <Input.TextArea
            rows={4}
            placeholder="?????????????????????"
          />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item name="content" label="????????????" rules={[{ required: true, message: '?????????????????????!' }]}>
              <Input.TextArea
                placeholder="?????????????????????"
                rows={35}
                cols={100}
              />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item label="??????">
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
            ??????
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default BlogEdit 