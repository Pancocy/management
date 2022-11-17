import React from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
export default function Bar() {
  const options = {
    title: {
      text: '近三年药瓶和电子产品销售额对比',
      textStyle: {
        color: 'tomato',
      }
    },
    xAxis: {
      type: "category",
      name: "年度",
      data:
        ['2015', '2016', '2017']
    },
    yAxis: {
      type: 'value',
      name: "销售额/千万"
    },
    series: [
      {
        name: '电子产品',
        type: "bar",
        colorBy: 'series',
        data: [45, 60, 75],
        //标记最大值，最小值，平均值
        markPoint: {
          data: [
            { type: "max", name: "最高销售额" },
            { type: "min", name: "最低销售额" }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: "平均销售额" }
          ]
        },
      },
      {
        name: '药品',
        type: "bar",
        data: [68, 45, 55],
        colorBy: 'series',
        //标记最大值，最小值，平均值
        markPoint: {
          data: [
            { type: "max", name: "最高销售额" },
            { type: "min", name: "最低销售额" }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: "平均销售额" }
          ]
        },
      },  
            ],
    tooltip: {
      trigger: 'axis',//可选值有axis，item
      triggerOn: 'mousemove',
    },
    toolbox: {
      show: 'true',
      feature: {
        saveAsImage: {},
        dataView: {},
        restore: {},
        dataZoom: {},
        magicType: {
          type: ['bar', 'line']
        }
      }
    },
    legend: {
      data: ['电子产品', '药品']
    },
  }


  return (
    <div>
      <Card>
        <ReactEcharts option={options} style={{ width: 1000, height: 500 }} />
      </Card>

    </div>
  )
}
