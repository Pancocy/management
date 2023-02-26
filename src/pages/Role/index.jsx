import React from 'react'
import { Card, Button, Table, Modal, message, Input, Tree } from 'antd'
import { useEffect } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
//引入接口
import { getRoleList } from '../../api/role/getRoleList'
import { addRole } from '../../api/role/addRole'
import { UpdatePower } from '../../api/role/setPower'
//hooks
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

//存储与登录方法的文件
import memoryUtils from '../../utils/memoryUtils'
export default function Roles() {
  //获取登录用户的用户名作为当前修改权限的授权人
  const user = memoryUtils.user
  const { username } = user
  const navigate =useNavigate()
  //所有角色列表
  const [role, setRole] = useState()
  //选中角色列表
  const [currentRole, setCurrentRole] = useState({})
  useEffect(() => {
    getRoleList().then((res) => {
      setRole(res.data)
    })
  }, [])
  //选中一行的回调
  const selected = (role) => {
    return {
      onClick: () => {
        setCurrentRole(role)
      }
    }
  }  
  //定义弹窗开关标识的state
  const [open, setOpen] = useState(false)
  //定义打开弹窗的回调
  const openModal = () => {
    setOpen(true)
  }
  //添加角色取消按钮的回调
  const myRef = useRef()
  const handleCancel = () => {
    myRef.current.value = ''
    setOpen(false);
  };
  //ok加载状态
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    const { value } = myRef.current
    const obj = {
      roleName: value,
    }
    addRole(obj).then((res) => {
      setRole(0)
    })
    setConfirmLoading(true)

    setTimeout(() => {
      setConfirmLoading(false)
      message.success('添加成功')
      myRef.current.value = ''
      setOpen(false)
    }, 1500);
  }
  //选中树节点的回调
  //定义权限状态
  const [checked,setChecked] =useState([])
  //从当前选中的角色中解构出需要的数据
  const {_id,auth_time} =currentRole
  const onCheck =(menus)=>{
    setChecked(menus)
  }
  //定义点击设置权限按钮额回调
  const [powerOpen, setpowerOpen] = useState(false)
  const setPower = () => {
      setpowerOpen(true)
  }
  //定义权限确定和取消的按钮的回调
  const powerOk = () => {
    const obj ={
      _id,
      auth_name:username,
      auth_time,
      menus:checked
    }
    UpdatePower(obj).then(()=>{
    })
    message.success('更新权限成功')
    setCurrentRole([])
    setpowerOpen(false)
  }
  const powerCancel = () => {
    setCurrentRole({})
    setpowerOpen(false)
    navigate('/blank',{replace:true})
  }
  //定义树形控件的数据
  const treeData = [
    {
      title: '平台权限',
      key: 'all',
      children: [
        {
          title:'首页',
          key:'*',
        },
        {
          title: '商品',
          key: '/goods',
          children: [
            {
              title: '品类管理',
              key: '/category',
            },
            {
              title: '商品管理',
              key: '/product',
            },
          ],
        },
        {
          title:'用户管理',
          key:'/user'
        },
        {
          title:'角色管理',
          key:'/role'
        },
        {
          title: '图形图表',
          key: '/charts',
          children: [
            {
              title:'折线图',
              key: '/charts/line',
            },
            {
              title:'饼状图',
              key: '/charts/pie',
            },
            {
              title:'柱状图',
              key: '/charts/bar',
            }
          ],
        },
        {
          title:'订单管理',
          key:'/order'
        }
      ],
    },
  ]
  //定义卡片标题
  const title = (
    <span>
      <Button type='primary' onClick={openModal}>创建角色</Button>&nbsp;&nbsp;&nbsp;
      <Button type='primary' disabled={!currentRole._id} onClick={setPower}>设置角色权限</Button>
    </span>
  )
  //定义表格数据和列
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      // eslint-disable-next-line
      render: (text) => <a>{text}</a>,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    },
  ]
  return (
    <>
      <Card
        title={title}
      >
        <Table
          dataSource={role}
          columns={columns}
          rowKey='_id'
          onRow={selected}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [currentRole._id]
          }}
          pagination={{ pageSize: 5 }}
        >
        </Table>
        {/* 添加角色弹框 */}
        <Modal
          info={currentRole}
          title={
            (<span style={{ color: '#9999FF' }}>
              <ExclamationCircleOutlined />&nbsp;
              添加角色弹框
            </span>)
          }
          closable={false}
          maskClosable={false}
          okText='确认'
          cancelText='取消'
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <input type='text' placeholder='请输入角色名称' ref={myRef} className="cateIput"></input><br />
        </Modal>
      {/* 设置权限弹窗 */}
      <Modal
        title='设置权限'
        open={powerOpen}
        onOk={powerOk}
        closable={false}
        maskClosable={false}
        onCancel={powerCancel}
      >
        角色名称:<Input disabled value={currentRole.name} />
        <Tree
          checkable
          defaultExpandedKeys={['all','/goods', '/charts']}
          defaultCheckedKeys={currentRole.menus}
          // onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}

        />
      </Modal>
      </Card>
    </>
  )
}
