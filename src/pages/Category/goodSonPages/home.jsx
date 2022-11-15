import React, { Fragment } from 'react'
import '../cate.css'
import { useNavigate } from 'react-router-dom';
import { Card, Select, Input, Button, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
//引入请求商品列表的接口 
import { getGoodList } from '../../../api/goods/goodlist';

//引入搜索商品的接口
import { searchGoodByName } from '../../../api/goods/search';
import { searchGoodByDesc } from '../../../api/goods/search';
//引入商品状态的混入判断
import statusFn from '../../../config/mixin';
const { Search } = Input

export default function Home() {
  // 定义路由导航实例
  const navigate = useNavigate()
  //select下拉栏该表的回调
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setselectType(value)
  };
  // 定义搜索框的回调
  const onSearch = (value) =>{
      if(selectType==='按名称搜索'){
        searchGoodByName(1,100,value).then((res)=>{
          // console.log(res);
          setData(res.data.list)
        })
      }
      else if(selectType==='按描述搜索'){
        searchGoodByDesc(1,100,value).then((res)=>{
          setData(res.data.list)
        })
      }
  }
  const selected = [
    { value: '按名称搜索', key: 1 },
    { value: '按描述搜索', key: 2 },
  ]
  //定义表格的数据
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
      width:500
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '状态',
      key: 'stastus',
      dataIndex: 'status',
      width: 150,
      render: (status) => (
        <Space style={{ display: 'flex', justifyContent: 'space-around' }}>
          <a>{statusFn(status)}</a>
          <Button type='primary'>{status === 1 ? '下架' : '上架'}</Button>
        </Space>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (data) => (
        <Space size="middle">
          <a className='actions' onClick={()=>{navigate(`/product/detail`,{state:data,replace:true},)}}>详情</a>
          <a className='actions' onClick={()=>{navigate('/product/update',{state:data,replace:true})}}>修改</a>
        </Space>
      ),
    },
  ];
  //声明hooks
  const { useEffect, useState ,useRef} = React
  //声明存储表格数据的state
  const [data, setData] = useState([])
  useEffect(() => {
    getGoodList(1, 100).then((res) => {
      const { list } = res.data
      setData(list)
    })
  }, [])
  //定义存储selected的state
  const [selectType,setselectType]=useState('按名称搜索')
  return (
    <Card
      title={
        (
          <Fragment>
            <Select
              defaultValue="按名称搜索"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={selected}
            />
            &nbsp;
            <Search
              placeholder="请输入关键字"
              allowClear
              enterButton="搜索"
              size="middle"
              style={{ width: 300 }}
              onSearch={onSearch}

            />
          </Fragment>
        )
      }
      extra={<Button type='primary' onClick={() => {  navigate('/product/add',{state:data}) }}><PlusOutlined />添加</Button>}
    >
      <Table
        rowKey='_id'
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </Card>
  )
}
