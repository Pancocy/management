import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import { Routes, Route, useLocation } from 'react-router-dom'
//引入Content区域组件
import Home from '../../pages/Home/'
import Category from '../../pages/Category/category.jsx'
import Goods from '../../pages/Category/goods.jsx'
import User from '../../pages/User/'
import Role from '../../pages/Role/'
import Bar from '../../pages/Charts/bar.jsx'
import Pie from '../../pages/Charts/pie.jsx'
import Line from '../../pages/Charts/line.jsx'
import Order from '../../pages/Orders/'
import Blank from '../../pages/Role/blank';
//引入mune配置文件
import menuList from '../../config/menuConfig'
import NotFound from '../../pages/NotFound';
const { Content } = Layout
export default function Context() {
    //匹配当前地址显示面包屑
    const location = useLocation()
    const path = location.pathname
    let title
    menuList.forEach((item) => {
        if (item.key === path) {
            title = item.label
        } else if (item.children) {
            const k = item.children.find(k => k.key === path)
            if (k) {
                title = k.label
            }
        }
    })
    return (
        <Layout
            style={{
                padding: '0',
            }}
        >
            <Breadcrumb
                style={{
                    margin: '0',
                    height: '50px'
                }}
            >
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: '#fff',
                    overflowY:'scroll'
                }}
            >
                <Routes>
                    <Route path='/'  element={<Home />}></Route>
                    <Route path='/category' element={<Category />}></Route>
                    <Route path='/product/*' element={<Goods />}></Route>
                    <Route path='/user' element={<User />} ></Route>
                    <Route path='/role' element={<Role />}></Route>
                    <Route path='/charts/bar' element={<Bar />}></Route>
                    <Route path='/charts/line' element={<Line />}></Route>
                    <Route path='/charts/pie' element={<Pie />}></Route>
                    <Route path='/order' element={<Order />}></Route>
                    <Route path='/blank' element={<Blank />}></Route>
                    <Route path='/*' element={<NotFound />}></Route>
                </Routes>
            </Content>
        </Layout>
    )
}
