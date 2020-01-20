<!-- 项目能耗用水全年-->
<template>
    <div>
        <div id="zxt2" class="ECHARTS"></div>

    </div>
</template>

<script>
    import echarts from "echarts"; //引入echarts


    export default {
        data() {
            return {
                time: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                bjData: [],
                ydl: [],           //用电量
            };
        },
        watch: {
            num1() {
                const chartObj = echarts.init(document.getElementById("zxt2"));
                // console.log(chartObj)
                chartObj.resize();
            },
            xmid: {
                handler(newVal) {
                    this.axios.get("/api/projectWaterrentM?projectId=" + newVal).then((res) => {
                        this.ydl = []
                        this.ydl.push(res.data.data[0].m1, res.data.data[0].m2, res.data.data[0].m3, res.data.data[0].m4, res.data.data[0].m5, res.data.data[0].m6, res.data.data[0].m7, res.data.data[0].m8, res.data.data[0].m9, res.data.data[0].m10, res.data.data[0].m11, res.data.data[0].m12)
                        const option = {
                            title: [
                                {
                                    text: "单位：吨",
                                    top: "10%",
                                    left: "12%",
                                    textStyle: {
                                        color: "#333",
                                        fontSize: 14,
                                        fontWeight: "500"
                                    }
                                }
                            ],
                            grid: {
                                left: '14%',
                                right: '10%',
                                bottom: '13%',
                                containLabel: false,

                            },
                            tooltip: {
                                showContent: true,
                                trigger: "axis",
                                formatter: function (a) {
                                    return a[0].seriesName + ":" + a[0].value + "吨";
                                    // console.log(a)
                                },
                                axisPointer: {
                                    type: "shadow", //设置为none为不显示线条，设为 shadow 为柱状图显示阴影   设为cross为 横向虚线基准线
                                    label: {
                                        show: false, //是否出现title提示文字
                                        backgroundColor: "#fff"
                                    }
                                }
                            },
                            xAxis: [{
                                // name:'时间',
                                type: 'category',
                                axisPointer: {
                                    type: "shadow",
                                    shadowStyle: {
                                        // color: "blue",
                                        opacity: 1
                                    }
                                },
                                boundaryGap: false,
                                data: this.time,                //填入时间
                                show: true,
                                axisTick: {
                                    show: false,
                                },
                                axisLine: {
                                    symbol: ['none', 'arrow'],
                                    lineStyle: {
                                        color: '#666',
                                    },
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,  //设置文字间距
                                    textStyle: {
                                        color: '#666',
                                    }
                                }
                            }],
                            yAxis: [{
                                // name:'(次)',
                                // type: 'value',
                                splitLine: {
                                    show: true,
                                },
                                axisLabel: {
                                    formatter: '{value}'
                                },
                                show: true,
                                axisLine: {
                                    symbol: ['none', 'arrow'],
                                    lineStyle: {
                                        color: '#666',
                                    },
                                },
                            }],
                            series: [
                                {
                                    name: '当月',
                                    type: 'line',
                                    smooth: true,
                                    color: "#fff",
                                    symbol: 'circle',//折线拐点去掉圆点
                                    // hoverAnimation:true,

                                    lineStyle: {
                                        normal: {
                                            color: '#29ae3e', //设置折线颜色
                                            width: 3
                                        }
                                    },
                                    areaStyle: {
                                        opacity: 0.3,
                                        color: {
                                            // type: "linear",
                                            x: 1,
                                            y: 0,
                                            x1: 1,
                                            y2: 1,
                                            colorStops: [{ //改变折现区域的颜色
                                                "offset": 0,
                                                "color": "#29ae3e"
                                            },
                                                {
                                                    "offset": 1,
                                                    "color": "#fff"
                                                }
                                            ],
                                            "globalCoord": false
                                        }
                                    },
                                    data: this.ydl      //数据入口
                                },
                            ]

                        };
                        //初始化图表
                        const chartObj = echarts.init(document.getElementById("zxt2"));

                        chartObj.setOption(option, true);
                        // 设置自适应
                        window.onresize = function () {
                            chartObj.resize();
                        };
                    })

                }
            },

            deep: true, //深度监测
            immediate: true //将立即以表达式的当前值触发回调
        },
        props: ["xmid", "num1"],
        mounted() {
            const chartObj = echarts.init(document.getElementById("zxt2"));
            window.addEventListener("resize", () => {
                // console.log(chartObj)
                chartObj.resize();
            });
        },
        methods: {}
    };
</script>
<style scoped>
    .ECHARTS {
        /* width: 100%; */
        min-width: 420px;
        height: 420px;
    }
</style>