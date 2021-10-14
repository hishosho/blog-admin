import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from 'antd';
import routes from '../router/index'
import {
  ReadOutlined
} from '@ant-design/icons';
import styles from './AdminLayout.module.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const routeList: any = []
const buildRouteMap = (p: any) => {
  for (const route of p) {
    if (route.children && route.children.length > 0) {
      buildRouteMap(route.children)
    }
    routeList.push({ key: route.path, val: route })
  }
}
buildRouteMap(routes)

function AdminLayout() {
  const [ collapsed, setCollapsed ] = useState<any>(false)
  const [ currentRoute, setCurrentRoute ] = useState<any>({
    path: '/',
    title: ''
  })

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed)
  }

  const changeMenu = (e: any) => {
    routeList.map((item: any) => {
      if (item.val.key === e.key) {
        setCurrentRoute({
          path: item.key,
          title: item.val.meta.title
        })
      }
    })
  }

  const buildRouteItem = () => {
    // 数组的map是有返回值的，forEach没有。这可以说是map和forEach最大的区别了，因为确实会踩坑。。。
    return routeList.map((route: any) => <Route key={route.key} path={route.key} component={route.val.component} />)
  }

  const buildMenuItem = (route: any) => {
    return (
      <Menu.Item key={route.key}>
        <Link to={route.path}>{route.meta.title}</Link>
      </Menu.Item>
    )
  }

  const buildSubMenu = (route: any) => {
    return (
      <SubMenu key={route.key} icon={<ReadOutlined/>} title={route.meta.title}>
        {route.children.map((child: any) => {
          if (!child.meta.hidden) {
            return buildMenuItem(child)
          }
        }
      )}
      </SubMenu>
    )
  }

  const buildMenu = () => {
    return (
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={(e) => changeMenu(e)}>
        {
          routes.map((route: any) => {
            if (!route.meta.hidden) {
              if (route.children) {
                return buildSubMenu(route)
              } else {
                return buildMenuItem(route)
              }
            }
          })
        }
      </Menu>
    )
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
          { buildMenu() }
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>博客管理</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={currentRoute.path}>{currentRoute.title}</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360, maxHeight: '80vh', overflow: 'auto' }}>
              <div>
                { buildRouteItem() }
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>website system</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default AdminLayout