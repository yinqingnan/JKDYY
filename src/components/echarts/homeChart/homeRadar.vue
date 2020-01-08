<template>
    <div id="homeRadar">
        <div id="radar" class="radar" ref="radar"></div>
    </div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "homeRadar",
        props:['radarData'],
        data(){
            return{

            }
        },
        created() {
            // console.log(this.radarData);
        },
        methods:{
            setRadar(){
                let myRadar = echarts.init(this.$refs.radar);
                let option = {
                    backgroundColor: 'transparent',
                    tooltip: {},
                    legend: {
                        show: true,
                        icon: "circle",
                        bottom: 30,
                        center: 0,
                        itemWidth: 14,
                        itemHeight: 14,
                        shadowColor: 'rgba(0, 0, 0, 1)',
                        shadowBlur: 30,
                        shadowOffsetX: 10,
                        shadowOffsetY: 10,
                        // itemGap: 30,
                        orient: "horizontal",
                        data: ['一级权重分析d'],
                        textStyle: {
                            fontSize: 14,
                            color: '#fff'
                        },
                    },

                    radar: {
                        radius: '60%',
                        splitNumber: 3,
                        center: ['50%', '50%'],
                        startAngle: 0,
                        triggerEvent: true,
                        name: {
                            textStyle: {
                                color: '#fff',
                                fontSize: '12',
                                borderRadius: 3,
                                padding: [15, 15]
                            }
                        },
                        nameGap: '2',
                        indicator: [
                            {
                                name: '园区得分',
                                max: 100
                            },
                            {
                                name: '利润得分',
                                max: 100
                            },
                            {
                                name: '营收得分',
                                max: 100
                            },
                            {
                                name: '年度目标得分',
                                max: 100
                            },
                            {
                                name: '人均效能得分',
                                max: 100
                            },
                            {
                                name: '人员管理得分',
                                max: 100
                            },
                            {
                                name: '收费得分',
                                max: 100
                            },
                            {
                                name: '客服得分',
                                max: 100
                            },

                        ],
                        splitArea: {
                            areaStyle: {
                                color: '#203565',
                                shadowColor: '#203565',
                                shadowBlur: 30,
                                shadowOffsetX: 10,
                                shadowOffsetY: 10
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#817f30'
                            }
                        }
                    },
                    series: [{
                        name: '一级权重分析',
                        type: 'radar',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#817f30'
                                },
                                    {
                                        offset: 1,
                                        color: '#3e504f'
                                    }
                                ], false),
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 12,
                        itemStyle: {
                            normal:{
                                color: '#f9cf67',
                                borderWidth: 5,
                            },
                        },
                        lineStyle: {
                            normal: {
                                color: '#f9cf67',
                                lineStyle: {
                                    width: 1,
                                    color: '#f9cf67',
                                },
                            },
                            width: 2
                        },
                        label: {
                            show: true,
                            color: '#fff'
                        },
                        data: [this.radarData]
                    },
                    ]
                }

                myRadar.setOption(option);
                window.addEventListener("resize", function() {
                    myRadar.resize();
                });
            }
        },
        watch:{
            radarData:function (n,o) {
                this.setRadar();
            }
        }
    }
</script>

<style scoped>
    #homeRadar, #radar{
        width: 100%;
        height: 100%;
    }
</style>