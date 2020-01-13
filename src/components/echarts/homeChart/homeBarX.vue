<template>
    <div id="homeBarX">
        <div id="bar" class="bar" ref="bar"></div>
    </div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "homeBarX",
        props:['barXData'],
        data(){
            return {

            }
        },
        methods:{
            setBar2(){
                let myBar = echarts.init(this.$refs.bar);
                let option = {
                    backgroundColor: 'transparent',
                    title: [{
                        text: '单位/百万元',
                        left: '16%',
                        top: '6%',
                        textStyle: {
                            color: '#fff',
                            fontSize:"12"
                        }
                    }],
                     grid: {
                            top: "14%",
                            right: "10%",
                            left: "16%",
                            bottom: "14%"
                    },
                    legend: {
                        top:'4%',
                        right:'10%',
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
                        trigger: "axis",
                        axisPointer: {
                        type: "shadow",
                        label: {
                            show: false, //是否出现title提示文字
                            backgroundColor: "#7B7DDC"
                        }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: this.barXData.list1,
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
                        data: this.barXData.list2,
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
        },
        watch:{
            barXData: function (n,o) {
                this.setBar2();
            }
        }

    }
</script>

<style scoped>
    #homeBarX{
         width: 100%;
         /* height: calc(100% - 56px);; */
         height: 302px
     }
    #bar{
        width: 100%;
        height: 100%;
    }
</style>