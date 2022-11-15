import React from 'react';
import './cate.css'
import { Card, Button, Space, Table, Modal, Input } from 'antd';
import { PlusOutlined, RightOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
//引入获取一级分类的api
import { getFirstCat } from '../../api/category/category';
//引入添加分类的api
import { addCategory } from '../../api/category/addCategory';
//引入修改分类名的api
import { changeCateName } from '../../api/category/changName'; 
const { useEffect, useState, useRef } = React
export default function Category() {
  const [data, setdata] = useState([])
  //定义一级请求的标识
  const [parentId, setId] = useState(0)
  //定义二级标题名
  const [sectitle, setTitle] = useState('')
  //定义添加分类后的更新标识
  const [flag,setflag] = useState(0)
  //定义顶部的分级和添加按钮
  const title =
    parentId === 0 ?
      (<a style={{ color: '#99f' }}>一级分类</a>) :
      (
        <div>
          <a className='secTitle' style={{ color: '#99f' }} onClick={() => { setId(0) }}>一级分类</a>
          <RightOutlined style={{ color: '#99f' }} />
          <a style={{ color: '#99f' }}>{sectitle}</a>
        </div>
      )
  const extra = <Button type='primary' onClick={() => { showModal() }}><PlusOutlined />添加</Button>
  //定义表格的数据
  const columns = [
    {
      title: '分类名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '操作',
      key: 'action',
      width: 300,
      render: (data) => (
        <Space size="middle">
          <a className='actions' onClick={()=>{showName(data)}}>修改分类</a>
          {
            parentId === 0 ? (<a className='actions' onClick={() => { setId(data._id); setTitle(data.name) }}>查看子类</a>) : null
          }
        </Space>
      ),
    },
  ]
  useEffect(() => {
    getFirstCat(parentId).then((res) => {
      setdata(res.data)
    })
  }, [parentId,flag])
  //定义添加分类的回调  
  // //定义获取添加分类输入框的ref
  const myRef = useRef()
  const NameRef = useRef()
  //定义添加分类弹框的属性
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('输入分类名');
  const showModal = () => {
    setOpen(true);
  };
  //添加分类确认按钮的回调
  const handleOk = () => {
    setModalText('正在添加中.....');
    setConfirmLoading(true);
    setTimeout(() => {
      const {value}=myRef.current
      // console.log(value);
      addCategory(parentId,value).then((res)=>{
          // console.log(res);
          setflag(flag=>flag+1)
      })
      myRef.current.value=''
      setModalText('输入分类名')
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  //添加分类取消按钮的回调
  const handleCancel = () => {
    myRef.current.value=''
    setModalText('输入分类名')
    setOpen(false);
  };
  //修改分类名的回调
  const [Nameopen, setNameopen] = useState(false);
  const [currentRow,setcurrentRow] =useState('')
  const showName = (current) => {
    const {_id} =current
    // console.log(currentRow);
    setcurrentRow(_id)
    setNameopen(true);
  };
  const NameOk =()=>{
    setModalText('正在修改中.....');
    setConfirmLoading(true);
    setTimeout(() => {
      const {value}=NameRef.current
      // console.log(value);
      changeCateName(currentRow,value).then((res)=>{
          // console.log(res);
          setflag(flag=>flag+1)
      })
      NameRef.current.value=''
      setModalText('输入分类名')
      setNameopen(false);
      setConfirmLoading(false);
    }, 2000);
  }
  const NameCancel=()=>{
      NameRef.current.vlaue=''
      setModalText('输入分类名')
      setNameopen(false)

  }
  return (
    <Card
      title={title}
      extra={extra}
    >
      <Table
        rowKey='_id'
        bordered
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
      {/* 添加分类的对话框 */}
      <Modal
        title={
        (<span style={{color:'#9999FF'}}>
          <ExclamationCircleOutlined/>&nbsp;
          添加分类
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
        <input type='text' placeholder='请输入' ref={myRef} className="cateIput"></input><br/>
        <span className='loadingTxt'>
        {modalText}
        </span>
      </Modal>
      {/* 修改分类名的对话框 */}
      <Modal
        title={
          (<span style={{color:'#9999FF'}}>
          <ExclamationCircleOutlined/>&nbsp;
          修改种类名称
          </span>)
        }
        open={Nameopen}
        confirmLoading={confirmLoading}
        onOk={NameOk}
        onCancel={NameCancel}
      >
        <input type='text' placeholder='请输入' ref={NameRef} className="cateIput"></input><br/>
        <span className='loadingTxt'>
        {modalText}
        </span>
      </Modal>
    </Card>
  )
}
