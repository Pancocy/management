import React from 'react'
import ReactEcharts from 'echarts-for-react'
export default function Pie() {
    const options = {
        backgroundColor: '#fff',
        title: {
            text: '区域销售额比率图',
            left: 'center',
            top: 20,
            textStyle: {
                color: 'tomato'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '销售额',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    { value: 335, name: '北京' },
                    { value: 310, name: '上海' },
                    { value: 274, name: '武汉' },
                    { value: 235, name: '广州' },
                    { value: 400, name: '深圳' }
                ].sort(function (a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
    return (
        <ReactEcharts option={options} style={{height:500}} />
    )
}
