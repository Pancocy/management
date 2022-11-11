import { Button, Checkbox, Form, Input ,message} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
//登录页路由组件
import React, { Fragment } from 'react'
import './login.css'
//引入api
import  {submitLogin} from '../../api/login/login'
//引入持久化存储
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    // console.log('Success:', values);
    const {username,password} = values
    submitLogin(username,password).then(res=>{
        if(res.status !==0){
          // console.log(res.msg);
          message.error({
            content:'your username or password is wrong',
            className:'errtip',
            duration:1.5,
          })
        }
        else{
          message.success({
            content:'login succeed',
            className:'truetip',
            duration:1.5
          }).then(()=>{
            const user =res.data
            memoryUtils.user = user
            storageUtils.saveUser(user)
            navigate(`/`,{replace:true})
          })
        }
    })
  };
  return (
    <Fragment>
      <div className='login'>
        <div className="drop-shadow">
          <div className="glass">
          </div>
        </div>
      </div>
      <div className="formgroup">
        <h2>登录后台管理系统</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true,message: 'Please input your Username!'},
              {min:4,message:'At least 4 characters'},
              {max:10,message:'Could not over 10 characters'},
              {pattern:/^[a-zA-Z0-9_]+$/ ,message:'username must is characters,number or underline'}
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {required: true,message: 'Please input your Password!' },
              {min:5,message:'At least 5 characters'},
              {max:12,message:'Could not over 12 characters'},
              {pattern:/^[a-zA-Z0-9@.]+$/ ,message:'username must is characters,number or underline'}
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>

  )
}
