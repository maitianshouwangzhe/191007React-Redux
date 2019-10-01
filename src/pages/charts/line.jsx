import React, {Component} from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react';



// 折线图
export default class Line extends Component{

    state ={
        // 销量
        sales: [5, 20, 36, 10, 10, 20],
        // 库存
        stores: [10, 2, 6, 1, 100, 20],
    }


    // 销量加1， 库存减1
    update = () => {
        this.setState(state => ({
            sales: state.sales.map(sale => {
                return sale + 1
            }),
            stores: state.stores.reduce((pre, store) => {
                pre.push( store - 1 )
                return pre
            },[])
        }))
    }

    // 返回折现图配置的对象
    getOption = (sales, stores) => {
        return {
            title: {
                text: 'ECharts入门教程之折线图'
            },
            tooltip: {},
            legend: {
                data:['销量', '库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'line',
                    data: sales
                },
                {
                    name: '库存',
                    type: 'line',
                    data: stores
                }]
        }
    }




    render() {
        const {sales, stores} = this.state
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.update}>更新</Button>
                </Card>
                <Card
                    title="折线图一"
                    style={{ width: '100%' }}>
                    <ReactEcharts option={this.getOption(sales, stores)} />        {/*  此时的定义，与以往不一样  */}
                </Card>
            </div>
        )
    }
}