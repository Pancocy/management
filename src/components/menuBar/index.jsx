import React from 'react'
import { Menu } from 'antd'
import './index.css'
import { useNavigate, Link } from 'react-router-dom'
//引入菜单的配置文件
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
export default function MenuBar() {
    /*
判断当前登陆用户对item是否有权限
 */
    const hasAuth = (item) => {
        const { key } = item
        const menus = memoryUtils.user.role.menus
        const username = memoryUtils.user.username
        /*
        1. 如果当前用户是admin
        2. 如果当前item是公开的
        3. 当前用户有此item的权限: key有没有menus中
         */
        if (username === 'admin'  || menus.indexOf(key) !== -1) {
            return true
        } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }
        return false
    }


    const navigate = useNavigate()
    const handleClick = (e) => {
        navigate(e.key, { replace: true })
    }
    const current = window.location.pathname
    /*
根据menu的数据数组生成对应的标签数组
使用map() + 递归调用
*/
    const getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if(hasAuth(item)){
                if (!item.children) {
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    return (
                        <Menu.SubMenu
                            key={item.key}
                            title={
                                <span>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </span>
                            }
                        >
                            {getMenuNodes(item.children)}
                        </Menu.SubMenu>
                    )
                }
            }

        })
    }
    return (
        <Menu
            mode="inline"
            onClick={handleClick}
            defaultSelectedKeys={[current]}
            style={{
                height: '100%',
                borderRight: 0,
            }}
        // items={menuList}
        >
            {
                getMenuNodes(menuList)
            }
        </Menu>
    )
}
