import React from 'react'
import ReactEcharts from 'echarts-for-react'

export default function Grouped() {
    const options = {
        title:{
            text:'销量与积压趋势图',
            
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['积压', '销量', '趋势']
        },
        xAxis: [
            {
                type: 'category',
                name:'阶段',
                data: ['1-2月', '3-4月', '5-6月', '7-8月', '9-10月', '11-12月'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '销量/千万',
                min: 0,
                max: 200,
                interval: 15,
            },
            {
                type: 'value',
                name: '趋势',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series: [
            {
                name: '积压',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value + 'kw';
                    }
                },
                data: [
                    2.0,  29.6, 76.7, 135.6, 162.2,  6.3
                ]
            },
            {
                name: '销量',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' kw';
                    }
                },
                data: [
                    12.6,  28.7, 70.7, 175.6, 182.2, 15.3
                ]
            },
            {
                name: '趋势',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' %';
                    }
                },
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ]
    };
    return (
        <ReactEcharts option={options} style={{ }} />
    )
}