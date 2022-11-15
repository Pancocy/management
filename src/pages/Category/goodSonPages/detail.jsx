import React from 'react'
import {
  Card,
  Form,
  Input,
} from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate,useLocation } from 'react-router-dom';
const { TextArea } = Input;
const {useEffect,useState} =React
export default function Detail() {
  const navigate = useNavigate()
  const location =useLocation()
  const {state} =location
  const [data,setData] = useState([])
  useEffect(()=>{
    setData(state)
  },[])
  const {name,desc,price,imgs,detail} =data
  return (
    <Card
      title={<a style={{color:'#9999FF'}} onClick={()=>{navigate('/product',{replace:true})}}><LeftOutlined />商品详情</a>}
      style={{overflowX:'scroll',height:620}}
    >
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={ false}
      >
        <Form.Item label="商品名称">
          <Input  type='text' disabled value={name}/>
        </Form.Item>
        <Form.Item label="商品描述">
          <Input  type='text' disabled value={desc}/>
        </Form.Item>
        <Form.Item label="商品价格">
          <Input  type='text' disabled value={price}/>
        </Form.Item>
        <Form.Item label="商品详情">
          <TextArea rows={5}  disabled value={detail}/>
        </Form.Item>
      </Form>
    </Card>
  )
}
