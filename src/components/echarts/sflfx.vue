<template>
    <!-- 收费率分析 -->
    <div>
        <div id="zzt" class="zzt"></div>
    </div>
</template>

<script>
    import echarts from "echarts"; //引入echarts
    export default {
        data() {
            return {
                xmid: "",
                companyName: [],
                generalIncome: [],
                netProfitMargin: [],
                title: [],         //图裂名称
                data1: [],
                data2: [],

            };
        },
        mounted() {
            // 获取项目id查询数据
            this.xmid = this.$route.query.xmid
            this.axios.get("/api/proChargeRate04?projectId=" + this.xmid).then((res) => {
                // console.log(res.data.data)
                this.title = []
                this.title.push(res.data.data[0].TypeName, res.data.data[1].TypeName,)
                // this.echartsdata=res.data.data
                if (res.data.data != "") {
                    this.data1 = []
                    this.data2 = []
                    this.data1.push(res.data.data[0].Rate1.toFixed(2), res.data.data[0].Rate2.toFixed(2), res.data.data[0].Rate3.toFixed(2), res.data.data[0].Rate4.toFixed(2), res.data.data[0].Rate5.toFixed(2), res.data.data[0].Rate6.toFixed(2), res.data.data[0].Rate7.toFixed(2), res.data.data[0].Rate8.toFixed(2), res.data.data[0].Rate9.toFixed(2), res.data.data[0].Rate10.toFixed(2), res.data.data[0].Rate11.toFixed(2), res.data.data[0].Rate12.toFixed(2))
                    this.data2.push(res.data.data[1].Rate1.toFixed(2), res.data.data[1].Rate2.toFixed(2), res.data.data[1].Rate3.toFixed(2), res.data.data[1].Rate4.toFixed(2), res.data.data[1].Rate5.toFixed(2), res.data.data[1].Rate6.toFixed(2), res.data.data[1].Rate7.toFixed(2), res.data.data[1].Rate8.toFixed(2), res.data.data[1].Rate9.toFixed(2), res.data.data[1].Rate10.toFixed(2), res.data.data[1].Rate11.toFixed(2), res.data.data[1].Rate12.toFixed(2))

                } else {
                    // console.log("没有数据")
                }

                let myChart = echarts.init(document.getElementById('zzt'));

                let option = {
                    backgroundColor: "#fff",
                    title: {
                        text: '收费率分析',
                        top: 20,
                        // left:14,
                        left: "center",
                        textStyle: {
                            color: "#666",
                            fontSize: 14,
                            fontWeight: "600"
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },


                    },
                    legend: {
                        top: "13%",
                        right: "10",
                        inactiveColor: "#999",
                        textStyle: {
                            color: "#333",
                            fontSize: 12
                        },
                        data: this.title,
                        selectedMode: "multiple",     //强制多选（ multiple ）或单选（ single ）
                        align: 'left',
                        itemWidth: 9, // 设置宽度
                        itemHeight: 9 // 设置高度
                    },
                    grid: {
                        left: '8%',
                        right: '6%',
                        bottom: '8%',
                        top: '20%',
                        containLabel: false
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    }],
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位(%)',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '项目值',
                            type: 'bar',
                            barWidth: 16,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: "#56a8e7" // 0% 处的颜色
                                        },
                                            {
                                                offset: 1,
                                                color: "#56a8e7" // 100% 处的颜色
                                            }
                                        ],
                                        false
                                    ),
                                    barBorderRadius: [0, 0, 0, 0] //轴的圆角度数
                                }
                            },
                            data: this.data1
                        }, {
                            name: '公司平均',
                            type: 'bar',
                            barWidth: 16,
                            color: "#333",
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: "#39c359" // 0% 处的颜色
                                        },
                                            {
                                                offset: 1,
                                                color: "#39c359" // 100% 处的颜色
                                            }
                                        ],
                                        false
                                    ),
                                    barBorderRadius: [0, 0, 0, 0] //轴的圆角度数
                                }
                            },
                            data: this.data2
                        }
                    ]
                }
                myChart.setOption(option)

                //自适应屏幕
                window.addEventListener('resize', function () {
                    myChart.resize()
                })
            })
        },
        methods: {}
    };
</script>
<style scoped>
    .zzt {
        width: 100%;
        margin: 0 auto;
        min-width: 339px;
        height: 476px;
    }
</style>