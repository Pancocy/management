import React, { useState } from 'react'
import { QuestionCircleFilled, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import {
  Card,
  Statistic,
  Col, Row, DatePicker, Divider, Steps
} from 'antd'
//引入chart1
import Grouped from './chart1'
import Pie from './chart2'
const { RangePicker } = DatePicker;
const description = 'This is a description.';
export default function Home() {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card
          title='实时数据'
          extra={<QuestionCircleFilled />}
          style={{ width: 350, height: 350, background: '#f0f2ff' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="销售额"
                  value={11.28}
                  precision={2}
                  valueStyle={{
                    color: '#3f8600',
                  }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="积压库存"
                  value={9.3}
                  precision={2}
                  valueStyle={{
                    color: '#cf1322',
                  }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </Card>
        <Card
          style={{ width: 800, background: '#f5f5f530', padding: 0 }}
        >
          <Grouped />
        </Card>
      </div>
      <Card>
        <Row gutter={16}>
          <Col span={12}>
            <Card title='地区销售额比例' style={{ height: 600 }}>
                <Pie/>
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ background: '#f0f2ff' }} title={<RangePicker style={{ width: 510 }} />}>
              <Steps
                current={current}
                onChange={onChange}
                items={[
                  {
                    title: '第一步',
                    description: '完成销售额统计',
                  },
                  {
                    title: '第二步',
                    description: '完成积压统计',
                  },
                  {
                    title: '第三步',
                    description: '统计数据差异,生成报告',
                  },
                ]}
              />
              <Divider />
              <Steps
                current={current}
                onChange={onChange}
                direction="vertical"
                items={[
                  {
                    title: '基本完成对所有分类销售额数据统计',
                    description: '根据报告绘制相关数据图表',
                  },
                  {
                    title: '基本完成对所有分类积压数据统计',
                    description: '根据报告绘制相关数据图表',
                  },
                  {
                    title: '基本完成对所有分类销压数据统计',
                    description: '根据报告绘制对比图表',
                  },
                ]}
              />
              <Row gutter={16} style={{height:160}}>
                <Col span={12} style={{textAlign:'center',alignItems:'center',display:'flex',justifyContent:'center'}}>
                  <Statistic title="Active Users" value={112893} />
                </Col>
                <Col span={12} style={{textAlign:'center',alignItems:'center',display:'flex',justifyContent:'center'}}>
                  <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                </Col>
                </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </>

  )
}
