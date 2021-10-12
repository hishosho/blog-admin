import React, { useState, useCallback, useEffect } from 'react'
import marked from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { Form, Input, InputNumber, Button } from 'antd';

function BlogEdit () {
  const [markdownContent, setMarkdownContent] = useState<string>('');

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

  useEffect(() => {
    buildArticleContent()
  }, [buildArticleContent])
  return (
    <Form form={form} layout="vertical" name="userForm">
      <Form.Item name="name" label="User Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="age" label="User Age" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
    </Form>
  )
}

export default BlogEdit 