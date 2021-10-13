import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BlogList from './blog/BlogList'
import BlogEdit from './blog/BlogEdit'
import BlogTag from './blog/BlogTag'
import { Layout, Menu, Breadcrumb } from 'antd';
import routes from '../router/index'
import {
  ReadOutlined
} from '@ant-design/icons';
import styles from './AdminLayout.module.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminLayout() {
  const [ collapsed, setCollapsed ] = useState<any>(false)
  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed)
  }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          >
          <div className={styles.logo}></div>
          
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              {
                routes.map((route: any) => {
                  if (route.children) {
                    return (
                      <SubMenu key={route.key} icon={<ReadOutlined/>} title={route.meta.title}>
                        {route.children.map((child: any) => (
                            <Menu.Item key={child.key}>
                              <Link to={child.path}>{child.meta.title}</Link>
                            </Menu.Item>
                        ))}
                      </SubMenu>
                    )
                  } else {
                    return (
                      <Menu.Item key={route.key}>
                        <Link to={route.path}>{route.meta.title}</Link>
                      </Menu.Item>
                    )
                  }
                })
              }
            </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>博客管理</Breadcrumb.Item>
              <Breadcrumb.Item>博客列表</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360, maxHeight: '80vh', overflow: 'auto' }}>
            <div>
              <Route path="/blog/list/" exact component={BlogList} />
              <Route path="/blog/edit/" component={BlogEdit} />
              <Route path="/blog/tag/" exact component={BlogTag} />
            </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>blog system</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default AdminLayout