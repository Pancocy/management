import React from 'react'
import PubSub from 'pubsub-js'
import './index.css'
import 'dayjs'
import {
  Card,
  Button,
  Modal,
  Table,
  Form,
  Input,
  message,
  Select,
} from 'antd'
//引入api
import { getUser } from '../../api/user/getUser'
import { updateUser } from '../../api/user/updateUser'
import { addUsers } from '../../api/user/addUser'
import { delUser } from '../../api/user/delete'
import { useEffect, useState, useRef } from 'react'
export default function User() {
  //定义表格行和列的数据
  const [data, setData] = useState()
  //定义附带的角色数据
  const [role, setRole] = useState()
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      key: 'role_id',
      render: (_, data) => (
        <>
          {
            role.map((e) => {
              if (e._id === data.role_id) {
                return e.name
              }
            })
          }
        </>
      )
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, data) => (
        <>
          <span className='actions' onClick={() => { update(data) }}>修改</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span className='actions' onClick={()=>{deleteUser(data)}}>删除</span>
        </>
      )
    }
  ]
  //hooks
  useEffect(() => {
    getUser().then((res) => {
      setData(res.data.users)
      setRole(res.data.roles)
    })
  }, [data])
  /*修改弹框部分 */
  //定义修改用户按钮的回调
  const [open, setOpen] = useState(false)
  //定义当前操作的用户
  const [current, setCurrent] = useState([])
  const update = (data) => {
    setOpen(true)
    setCurrent(data)
  }
  //定义保存信息信息的回调
  const [obj, setObj] = useState({})
  const { _id } = current
  const saveinfo = (value) => {
    const obj = { ...value, _id }
    setObj(obj)
    message.success('保存成功')
  }
  //定义提交修改信息的回调
  const submit = () => {
    if (!obj._id) {
      message.error('请先保存后再提交')
    }
    else {
      updateUser(obj).then((res) => {
      })
      message.success('提交成功')
      setOpen(false)
      setData([])
    }
  }
  //定义取消的回调
  const cancel = () => {
    setOpen(false)

  }
  /* 添加用户弹框部分 */
  //定义ref
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()
  //定义存储用户输入的状态
  const [input, setInput] = useState({})
  //定义该弹框的标识
  const [addOpen, setAddOpen] = useState(false)
  //定义创建角色按钮的回调
  const addUser = () => {
    setAddOpen(true)
  }
  //定义选择角色的状态
  const [RoleId,setRoleId]=useState('')
  //定义提交创建的回调
  const submitAdd = () => {
    const username =ref1.current.input.value
    const password =ref2.current.input.value
    const phone =ref3.current.input.value
    const email =ref4.current.input.value
    setInput({username,password,phone,email,role_id:RoleId})
    addUsers(input).then((res)=>{
      console.log(res);
    })
    message.success('添加成功')
    setAddOpen(false)
  }
  //定义取消提交的回调
  const cancelAdd =()=>{
    setAddOpen(false)

  }
  //定义删除用户的回调
  const deleteUser =(data)=>{
    const id =data._id
    delUser({userId:id}).then((res)=>{
    })
  }
  return (
    <>
      <Card
        title={<Button type='primary' onClick={addUser}>创建用户</Button>}
      >
        <Table
          rowKey="_id"
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
        >
        </Table>
      </Card>
      {/* 修改用户的弹框 */}
      <Modal
        title='修改用户'
        open={open}
        okText='提交'
        cancelText='取消'
        onOk={submit}
        onCancel={cancel}
        destroyOnClose={true}
      >
        <Form
          onFinish={saveinfo}

        >
          <Form.Item label='用户名' name='username' rules={[{ required: true, message: '修改内容不能为空' }]}>
            <Input placeholder={current.username} />
          </Form.Item>
          <Form.Item label='邮箱' name='email' rules={[{ required: true, message: '修改内容不能为空' }]}>
            <Input placeholder={current.email} />
          </Form.Item>
          <Form.Item label='电话' name='phone' rules={[{ required: true, message: '修改内容不能为空' }]}>
            <Input placeholder={current.phone} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>保存</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加用户的弹框 */}
      <Modal
        title='添加用户'
        open={addOpen}
        onOk={submitAdd}
        onCancel={cancelAdd}
        destroyOnClose={true}
      >
        用户名:<Input type='text' ref={ref1} style={{ marginTop: 20 }} />
        密码：<Input.Password ref={ref2} style={{ marginTop: 15 }} />
        电话:<Input type='text' ref={ref3} style={{ marginTop: 15 }} />
        邮箱:<Input type='text' ref={ref4} style={{ marginTop: 15 }} />
        角色：<SelectedRole role={role} setRoleId={(id)=>{setRoleId(id)}}></SelectedRole>
      </Modal>
    </>
  )
}


function SelectedRole(props){
  const [roleArr,setroleArr]=useState([])
  useEffect(()=>{
    const {role} =props
    setroleArr(role)
  },[])
  const {setRoleId}=props
  const change =(value)=>{
    setRoleId(value)
  }
  return (
    <Select
    style={{width:473}}
    defaultValue=''
    placeholder='请选择角色'
    onChange={change}
    >
      {
        roleArr.map((e)=><Select.Option key={e._id} value={e._id}>{e.name}</Select.Option>)
      }
    </Select>
  )
}
