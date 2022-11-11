import React from 'react'
import { Menu } from 'antd'
import './index.css'
import { useNavigate } from 'react-router-dom'
//引入菜单的配置文件
import menuList from '../../config/menuConfig'

export default function MenuBar() {
    const navigate = useNavigate()
    const handleClick =(e)=>{
        navigate(e.key,{replace:true})
    }
    const current = window.location.pathname
    return (
        <Menu
            mode="inline"
            onClick={handleClick}
            defaultSelectedKeys={[current]}
            style={{
                height: '100%',
                borderRight: 0,
            }}
            items={menuList}
        />
    )
}
