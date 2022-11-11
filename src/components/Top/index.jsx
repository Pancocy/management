import React, { Fragment } from 'react'
import { UserOutlined ,ExclamationCircleOutlined,EnvironmentOutlined} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { Avatar, Modal } from 'antd';
import dayjs from 'dayjs';
//存储与登录方法的文件
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
//引入获取天气和位置的api
import {City,Weather} from '../../api/admin/weather'
const {useEffect,useState} = React
export default function Top() {
    //获取登录用户的用户名
    const user = memoryUtils.user
    const { username } = user
    //获取定位和天气信息
    const [info ,setWeather] =useState([])
    const {province,city,weather} =info
    useEffect(()=>{
        City().then((res)=>{
            if(res.status == 1){
                Weather(res.adcode).then((res)=>{
                    setWeather(res.lives[0])
                })
            }
        })
    },[])
    //退出登录
    const navigate = useNavigate()
    const loginOut = () => {
        Modal.confirm({
            title: '警告',
            icon: <ExclamationCircleOutlined style={{color:'#ff7875'}}/>,
            content: '确认退出登录吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                storageUtils.removeUser()
                navigate('/login')
            }
        });
    }
    //动态打印时间
    const [now, setNow] =useState('')
    setInterval(()=>{
        const date =dayjs(new Date())
        const now = date.format('YYYY-MM-DD HH:mm:ss ddd')
        setNow(now)
    },1000)
    return (
        <Fragment>
            <div className="logo">
                <Link to={'/'}>
                    <Avatar size={60} icon={<UserOutlined />} style={{ background: '#ee9696' }} />
                </Link>
                <span className='title'>欢迎,{username}</span>
                <span className='title' onClick={loginOut}>退出登录</span>
            </div>
            <div className="info">
                <span>{now}</span>
                <span><EnvironmentOutlined style={{color:'#ff7875'}} />{province} {city} {weather}</span>
            </div>
        </Fragment>
    )
}
