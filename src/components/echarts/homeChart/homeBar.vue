<template>
    <div id="histogram">
        <div id="bar" class="bar" ref="bar"></div>
    </div>
</template>

<script>
    import echarts from "echarts";
    export default {
        name: "histogram",
        props:['listData'],
        data() {
            return {
                title:this.listData
            }
        },
        mounted() {
            this.setBar();
        },
        methods: {
            setBar() {
                let myColor = ['#5cc3d2','#fca852','#57a8e8'];
                let dataAll = this.listData.arr;
                let yAxisData = [];
                let myBar = echarts.init(this.$refs.bar);
                let option = {
                    backgroundColor: 'transparent',
                    title:[
                        {text:this.title.title,x: '7%', y: '3%',textStyle:{color:"#fff",fontSize:"12"}},
                    ],
                    grid: [
                        {x: '10%', y: '7%', width: '45%', height: '90%'},
                    ],
                    tooltip: {
                        formatter: '{b} ({c})',
                        position: 'right'
                    },
                    xAxis: [
                        {
                            gridIndex: 0,
                            axisTick: {show:false},
                            axisLabel: {show:false},
                            splitLine: {show:false},
                            axisLine: {show:false },
                        },

                    ],
                    yAxis: [
                        {  gridIndex: 0, 
                            interval:0,
                            data:yAxisData.reverse(),
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false
                            },
                            max:3

                        }
                    ],
                    series: [
                        {
                            type: 'bar',xAxisIndex: 0,yAxisIndex: 0,barWidth:'45%',
                            itemStyle:{
                                normal: {
                                    color: function(params) {
                                        return myColor[params.dataIndex]
                                    },
                                }
                            },
                            label:{
                                normal:{
                                    show:true,
                                    position:"right",
                                    formatter:function(param){
                                        let all = 0;
                                        for(let i = 0 ; i < dataAll.length ; i++){
                                            all += dataAll[i]
                                        }
                                        all = param.value / all *100
                                        return all.toFixed(2) + '%';
                                    },
                                }
                            },
                            data: dataAll.sort(),
                        },

                    ]
                };
                myBar.setOption(option);
                window.addEventListener("resize", function () {
                    myBar.resize();
                });
            }
        }
    }
</script>

<style scoped>
    #histogram{
        width: 190px;
        height: 100px;
    }
    .bar{
        width: 150px;
        height: 100px;
    }
</style>