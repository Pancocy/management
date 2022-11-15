import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { addGood } from '../../../api/goods/add';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import TextArea from 'antd/lib/input/TextArea';
export default function Add() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location
    const onFinish = (values) => {
        let arr = Math.floor(Math.random(0, state.length) * Math.floor(state.length))
        console.log(arr);
        const list = state[arr]
        console.log(list);
        const { pCategoryId, categoryId } = list
        setData({ ...values, pCategoryId, categoryId, imgs: nanoid(8) })
        message.success('添加成功')
        setTimeout(() => {
            navigate('/product')
        }, 1000);
    }
    useEffect(() => {
        console.log(data);
        addGood(data).then(() => {

        })
    }, [data])
    return (
        <Form
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="名字"
                name="name"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="描述"
                name="desc"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="价格"
                name="price"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="详情"
                name="detail"
            >
                <TextArea
                    rows={5}
                ></TextArea>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 10,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
