import './admin.less'
//后台管理主路由组件
import React, { Fragment } from 'react'
import { Layout } from 'antd';
//引入layout部件
import Top from '../Top/'
import MenuBar from '../menuBar/'
import Context from '../context/'

const { Header, Sider } = Layout;
export default function Admin() {

  return (
    <Fragment>
      <Layout style={{ height: '100%' }}>
        <Header className="header" style={{ background: '#c2c4ff78', display: 'flex' }}>
          <Top />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <MenuBar />
          </Sider>
          <Context/>
        </Layout>
      </Layout>
    </Fragment>
  )
}
