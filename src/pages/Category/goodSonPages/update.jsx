import React from 'react'
import { nanoid } from 'nanoid';
import {
    Card,
    Form,
    Input,
    Button,
    message
} from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom';
//引入更新的api
import { UpdateGood } from '../../../api/goods/update';
const { TextArea } = Input;
const { useEffect, useState } = React
export default function Update() {
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location
    const [data, setData] = useState([])
    useEffect(() => {
        setData(state)
    }, [])
    const { name, desc, price, detail,pCategoryId,categoryId,_id } = data
    const onFinish=(values)=>{
        const {name,desc,price,detail} = values
        const obj ={
            name,
            desc,
            price,
            detail,
            _id,
            categoryId,
            pCategoryId,
            imgs:[nanoid(8)+'.jpg']
        }
        UpdateGood(obj).then(()=>{
            message.success('更新成功')
            setTimeout(()=>{
                navigate('/product')
            },1000)
        })
        // console.log(obj);
    }
    return (
        <Card
            title={<a style={{ color: '#9999FF' }} onClick={() => { navigate('/product', { replace: true }) }}><LeftOutlined />商品详情</a>}
            style={{ overflowX: 'scroll', height: 620 }}
        >
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                disabled={false}
                onFinish={onFinish}
            >
                <Form.Item label="商品名称" name='name'>
                    <Input type='text' placeholder={name} />
                </Form.Item>
                <Form.Item label="商品描述" name='desc'>
                    <Input type='text' placeholder={desc} />
                </Form.Item>
                <Form.Item label="商品价格" name='price'>
                    <Input type='text' placeholder={price} />
                </Form.Item>
                <Form.Item label="商品详情" name='detail'>
                    <TextArea rows={5} placeholder={detail} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 16,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        更新
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
