<template>
    <div id="homeBarX">
        <div id="bar" class="bar" ref="bar"></div>
    </div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "homeBarX",
        data(){
            return {

            }
        },
        mounted() {
            this.setBar2();
        },
        methods:{
            setBar2(){
                let myBar = echarts.init(this.$refs.bar);
                let option = {
                    backgroundColor: 'transparent',
                    title: [{
                        text: '单位/百万元',
                        left: '1%',
                        top: '6%',
                        textStyle: {
                            color: '#fff',
                            fontSize:"12"
                        }
                    }],
                    legend: {
                        top:'4%',
                        right:15,
                        textStyle: {
                            color: '#becff3',
                        },
                        fontSize:12,
                        selectedMode: 'single',
                        data: ['项目成本分析'],
                        itemWidth: 12,  // 设置宽度
                        itemHeight: 12,
                    },
                    tooltip: {
                        backgroundColor:'rgba(0,104,183,0.8)',
                        formatter: '{b}'+"<br>"+'{c}百万元',
                    },
                    xAxis: {
                        type: 'category',
                        data: ['工资', '小区运行费', '维修费用', '保洁费用', '电梯维修费', '垃圾消防费', '垃圾消费费','绿化费','住房公积金'],
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            },
                            interval:0,
                            rotate:40
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#253151'
                            }
                        },
                    },
                    series: [{
                        name:'项目成本分析',
                        data: [120, 200, 150, 80, 70, 110, 130,20,87],
                        type: 'bar',
                        barWidth:'30%',
                        itemStyle: {
                            normal: {
                                color: '#56a8e7'
                            }
                        },
                    }]
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
    #homeBarX{
         width: 100%;
         height: calc(100% - 56px);;
     }
    #bar{
        width: 100%;
        height: 100%;
    }
</style>