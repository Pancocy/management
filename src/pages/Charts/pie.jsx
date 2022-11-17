import React from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
export default function Pie() {
  const options = {
    title:{
      text:'各分类商品占比图',
      textStyle: {
        color: 'tomato',
      }
    },
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: '家用电器' },
          { value: 38, name: '服装' },
          { value: 32, name: '玩具' },
          { value: 30, name: '手机' },
          { value: 28, name: '医药' },
          { value: 26, name: '图书' },
          { value: 22, name: '果蔬' },
          { value: 18, name: '其他' }
        ]
      }
    ]
  };
  return (
    <div>
      <Card>
        <ReactEcharts option={options} style={{ width: 920, height: 500 }} />
      </Card>
    </div>
  )
}