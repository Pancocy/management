import React from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
export default function Line() {
  var xDataArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  var yDataArr = [3000, 2800, 900, 1000, 800, 700, 1400, 1300, 900, 1000, 800, 600]
  var yDataArr2 = [2000, 3800, 1900, 500, 900, 1700, 2400, 300, 1900, 1500, 1800, 200]
  const options = {
    title: {
      text: '生活百货月度销量走势及对比',
      textStyle: {
        color: 'tomato',
      }
    },
    xAxis: {
      name: '月份',
      type: 'category',
      data: xDataArr,
      boundaryGap: false //起始值贴着y轴显示
    },
    yAxis: {
      name: '销量/万',
      type: 'value'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'click'
    },
    series: [
      {
        type: 'line',
        naem:'食品',
        data: yDataArr,
        stack: 'all', // 堆叠图的设置
        areaStyle: {},
        markLine: {
          data: [{ type: 'average', name: '平均值' }]
        },
        markPoint: {
          data: [
            { type: 'max', name: '最大销量' },
            { type: 'min', name: '最低销量' }
          ]
        },
        //区域标记
        markArea: {
          data: [
            [{ xAxis: '1月' }, { xAxis: '3月' }],
            [{ xAxis: '9月' }, { xAxis: '12月' }],
          ],
        },
        smooth: true,
        lineStyle: {
          color: 'tomato',
          type: 'dashed'
        }
      },
      {
        type: 'line',
        name:'用品',
        data: yDataArr2,
        stack: 'all', // 堆叠图的设置
        areaStyle: {},
        markLine: {
            data: [{ type: 'average', name: '平均值' }]
        },
        markPoint: {
            data: [
                { type: 'max', name: '最大销量' },
                { type: 'min', name: '最低销量' }
            ]
        },
        //区域标记
        markArea: {
            data: [
                [{ xAxis: '1月' }, { xAxis: '3月' }],
                [{ xAxis: '9月' }, { xAxis: '12月' }],
            ],
        },
        smooth: true,
        lineStyle: {
            color: 'blue',
            type: 'dashed'
        }
      },
    ]
  }
  return (
    <div>
      <Card>
        <ReactEcharts option={options} style={{ width: 1000, height: 500 }} />
      </Card>
    </div>
  )
}