<template>
    <div id="homeLine">
        <div id="line" class="line" ref="line"></div>
    </div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "homeLine",
        props: ['lineData'],
        data() {
            return {}
        },
        methods: {
            setLine() {
                let myLine = echarts.init(this.$refs.line);
                let option = {
                    backgroundColor: "transparent",
                    color: ['#5dd4fa', '#39c359', '#ff7676'],
                    title: [{
                        text: '单位：%',
                        left: '14%',
                        top: '6%',
                        textStyle: {
                            color: '#fff',
                            fontSize: "12"
                        }
                    }],
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        icon: 'rect',
                        top: '4%',
                        right: '10%',
                        textStyle: {
                            color: '#becff3',
                        },
                        fontSize: 12,
                        selectedMode: 'single',
                        data: ['地产类', '物业类', '其他'],
                        itemWidth: 12,  // 设置宽度
                        itemHeight: 12, // 设置高度
                        itemGap: 15, // 设置间距
                    },
                    grid: {
                        top: "14%",
                        right: "10%",
                        left: "16%",
                        bottom: "14%"
                    },
                    toolbox: {
                        "show": false,
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        "axisLine": {
                            lineStyle: {
                                color: '#253151'
                            }
                        },
                        "axisTick": {
                            "show": false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        boundaryGap: false,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        interval: 0,
                    },
                    yAxis: {
                        "axisLine": {
                            lineStyle: {
                                color: '#253151'
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#253151'
                            }
                        },
                        "axisTick": {
                            "show": false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        type: 'value'
                    },
                    series: [{
                        name: '地产类',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        data: this.lineData.list1,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#57caf0'
                                },
                                    {
                                        offset: 1,
                                        color: 'transparent'
                                    }
                                ], false),
                            }
                        },
                    }, {
                        name: '物业类',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        data: this.lineData.list2,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#39c359'
                                },
                                    {
                                        offset: 1,
                                        color: 'transparent'
                                    }
                                ], false),
                            }
                        },
                    }, {
                        name: '其他',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        data: this.lineData.list3,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#ff7676'
                                },
                                    {
                                        offset: 1,
                                        color: 'transparent'
                                    }
                                ], false),
                            }
                        },
                    }],
                }

                myLine.setOption(option);
                window.addEventListener("resize", function () {
                    myLine.resize();
                });
            }
        },
        watch: {
            lineData: function (nVal, oVal) {
                this.setLine();
            }
        }
    }
</script>

<style scoped>
    #homeLine {
        width: 100%;
        /* height: calc(100% - 56px); */
        height: 302px
    }

    #line {
        width: 100%;
        height: 100%;
    }
</style>