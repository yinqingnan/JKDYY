<template>
    <!-- 首页折线图 -->
    <div>
        <div id="zxt" ref="charts" class="zxt"></div>
    </div>
</template>

<script>
    import echarts from "echarts"; //引入echarts
    import axios from "axios";

    export default {
        data() {
            return {
                companyName: [],
                netProfitMarginOnSales: [], //销售净利率
                grossProfitMargin: [], //毛利率
                operatingProfitGrowthRate: [], //营业利润增长率
                averagereturnonequity: [], //净资产收益率%（平均）
                increaserateofbusinessrevenue: [] //营业收入增长率
            };
        },
        watch: {
            region: {
                handler(newVal) {
                    let year = newVal.slice(0, 4);
                    let id = encodeURI(newVal.slice(4));
                    axios
                        .get(
                            "/api/listedCompany11?reportingType=" +
                            id +
                            "&reportingYear=" +
                            year
                        ) //正式默认第一条数据
                        .then(res => {
                                // netProfitMarginOnSales   --- 净利润
                                // grossProfitMargin        --- 毛利润
                                // increaserateofbusinessrevenue   --- 营收增长率
                                // operatingProfitGrowthRate       --- 利润增长率
                                // returnonequity                  ---- ROE
                            
                            this.companyName = [];
                            this.netProfitMarginOnSales = [];                //净利率
                            this.grossProfitMargin = [];                     //毛利率
                            this.operatingProfitGrowthRate = [];            //利润增长率
                            this.returnonequity = [];                //ROE
                            this.increaserateofbusinessrevenue = [];        //营收增长率
                            let array = res.data.data;
                            array.forEach(element => {
                                this.companyName.push(element.companyName);   
                                this.netProfitMarginOnSales.push(element.netProfitMarginOnSales.toFixed(2));                 //净利率
                                this.grossProfitMargin.push(element.grossProfitMargin.toFixed(2));                           //毛利率
                                this.increaserateofbusinessrevenue.push(element.increaserateofbusinessrevenue.toFixed(2));  //营收增长率
                                this.operatingProfitGrowthRate.push(element.operatingProfitGrowthRate.toFixed(2));           //利润增长率
                                this.averagereturnonequity.push(element.returnonequity.toFixed(2));                          //ROE
                               
                            });

                            // 柱状图表设置信息
                            const option = {
                                title: [{
                                    text: "收入情况百分比",
                                    x: 20,
                                    // padding: [0, 0, 0, "20px"], //上右下左
                                    y: 2,
                                    textStyle: {
                                        color: "#333",
                                        fontSize: 14,
                                        fontWeight: "600"
                                    }
                                },
                                    {
                                        text: "单位：百分比",
                                        x: 20,
                                        // padding: [0, 0, 0, "20px"], //上右下左
                                        y: 28,
                                        textStyle: {
                                            color: "#999",
                                            fontSize: 12,
                                            fontWeight: "600"
                                        }
                                    },],
                                backgroundColor: "#fff",
                                grid: {
                                    top: "20%",
                                    right: "8%",
                                    left: "10%",
                                    bottom: "26%"
                                },
                                tooltip: {
                                    trigger: "axis",
                                    axisPointer: {
                                        type: "shadow",
                                        label: {
                                            show: false, //是否出现title提示文字
                                            backgroundColor: "#7B7DDC"
                                        }
                                    }
                                },
                                legend: {
                                    // x: "8%",
                                    top: "2",
                                    right: "10",
                                    inactiveColor: "#999",
                                    textStyle: {
                                        color: "#333",
                                        fontSize: 12
                                    },
                                    data: ["净利率", "毛利率", "营收增长率", "利润增长率", "ROE"],
                                    selectedMode: "single", //强制多选（multiple）或单选（single）
                                    itemWidth: 9, // 设置宽度
                                    itemHeight: 9 // 设置高度
                                },
                                xAxis: [
                                    {
                                        type: "category",
                                        color: "#59588D",
                                        data: this.companyName, //X轴数据入口

                                        axisLine: {
                                            lineStyle: {
                                                color: "#999" //X轴颜色
                                            }
                                        },
                                        axisLabel: {
                                            interval: 0,
                                            rotate: 30,
                                            color: "#333",
                                            // formatter: function(value) {
                                            //   //X轴文字众向排列
                                            //   return value.split("").join("\n");
                                            // },
                                            textStyle: {
                                                fontSize: 12,
                                                color: "#8f8f8f"
                                            }
                                        },
                                        axisTick: {
                                            show: false
                                        }
                                    }
                                ],
                                dataZoom: [        //滚动条功能
                                    {
                                        type: 'slider',
                                        show: true,    //是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
                                        backgroundColor: "rgba(47,69,84,0)",  //组件的背景颜色
                                        //  dataBackground:{                        //数据阴影的样式。
                                        //     lineStyle:mylineStyle,              //阴影的线条样式
                                        //     areaStyle:myareaStyle,              //阴影的填充样式
                                        // },
                                        fillerColor: "rgba(167,183,204,0.4)",  //选中范围的填充颜色。
                                        borderColor: "#ddd",                     //边框颜色。
                                        xAxisIndex: [0],                            //设置 dataZoom-inside 组件控制的 x轴,可以用数组表示多个轴
                                        height: 20,
                                        left: '9%',
                                        bottom: 0,
                                        start: 0,           //数据窗口范围的起始百分比
                                        end: 100,             //数据窗口范围的结束百分比
                                    }
                                ],
                                yAxis: [
                                    {
                                        show: true,
                                        min: 0,
                                        // max: 100,
                                        axisLabel: {
                                            // formatter: '{value}%',
                                            color: "#999"
                                        },
                                        axisLine: {
                                            lineStyle: {
                                                color: "#999" //X轴颜色
                                            }
                                        },
                                        splitLine: {
                                            show: true, //横向基准线
                                            lineStyle: {
                                                color: "#999"
                                            }
                                        },
                                        textStyle: {
                                            fontSize: 12,
                                            color: "#999"
                                        }
                                    },

                                ],

                                series: [
                                    {
                                        name: "净利率",
                                        type: "bar",
                                        barWidth: "14px", //宽度
                                        stack: "总量",
                                        symbol: "rect",

                                        //  itemStyle : { normal: {label : {show: true}}},
                                        itemStyle: {
                                            normal: {
                                                borderColor: "#fff", // 拐点边框颜色
                                                // label : {show: true},
                                                color: "#a889e9", //拐点颜色
                                                lineStyle: {
                                                    color: "#a889e9", //折现颜色
                                                    width: 2
                                                }
                                                // areaStyle: {
                                                // 折线阴影
                                                //     // color: '#94C9EC',
                                                //     color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                                //         offset: 0,
                                                //         color: 'rgba(7,44,90,0.3)'
                                                //     }, {
                                                //         offset: 1,
                                                //         color: 'rgba(0,146,246,0.9)'
                                                //     }]),
                                                // }
                                            }
                                        },
                                        markPoint: {
                                            itemStyle: {
                                                normal: {
                                                    color: "red"
                                                }
                                            }
                                        },
                                        data: this.netProfitMarginOnSales //净利润数据入口
                                    },
                                    {
                                        name: "毛利率",
                                        type: "bar",
                                        barWidth: "14px", //宽度
                                        stack: "总量",
                                        symbol: "reat",
                                        //  itemStyle : { normal: {label : {show: true}}},
                                        itemStyle: {
                                            normal: {
                                                borderColor: "#fff", // 拐点边框颜色
                                                // label : {show: true},
                                                color: "#ff7676", //拐点颜色
                                                lineStyle: {
                                                    color: "#ff7676", //折现颜色
                                                    width: 2
                                                }
                                            }
                                        },
                                        markPoint: {
                                            itemStyle: {
                                                normal: {
                                                    color: "red"
                                                }
                                            }
                                        },
                                        data: this.grossProfitMargin //毛利率数据入口
                                    },

                                    {
                                        name: "营收增长率",
                                        type: "bar",
                                        barWidth: "14px", //宽度
                                        stack: "总量",
                                        symbol: "rect",
                                        //  itemStyle : { normal: {label : {show: true}}},
                                        itemStyle: {
                                            normal: {
                                                borderColor: "#fff", // 拐点边框颜色
                                                // label : {show: true},
                                                color: "#39c359", //拐点颜色
                                                lineStyle: {
                                                    color: "#39c359", //折现颜色
                                                    width: 2
                                                }
                                            }
                                        },
                                        markPoint: {
                                            itemStyle: {
                                                normal: {
                                                    color: "red"
                                                }
                                            }
                                        },
                                        data: this.increaserateofbusinessrevenue //营收增长率数据入口
                                    },

                                    {
                                        name: "利润增长率",
                                        type: "bar",
                                        barWidth: "14px", //宽度
                                        stack: "总量",
                                        symbol: "reat",
                                        //  itemStyle : { normal: {label : {show: true}}},
                                        itemStyle: {
                                            normal: {
                                                borderColor: "#fff", // 拐点边框颜色
                                                // label : {show: true},
                                                color: "#f594be", //拐点颜色
                                                lineStyle: {
                                                    color: "#f594be", //折现颜色
                                                    width: 2
                                                }
                                            }
                                        },
                                        markPoint: {
                                            itemStyle: {
                                                normal: {
                                                    color: "red"
                                                }
                                            }
                                        },
                                        data: this.operatingProfitGrowthRate //利润增长率数据入口
                                    },
                                    {
                                        name: "ROE",
                                        type: "bar",
                                        barWidth: "14px", //宽度
                                        stack: "总量",
                                        symbol: "reat",
                                        //  itemStyle : { normal: {label : {show: true}}},
                                        itemStyle: {
                                            normal: {
                                                borderColor: "#fff", // 拐点边框颜色
                                                // label : {show: true},
                                                color: "#56a8e7", //拐点颜色
                                                lineStyle: {
                                                    color: "#56a8e7", //折现颜色
                                                    width: 2
                                                }
                                            }
                                        },
                                        markPoint: {
                                            itemStyle: {
                                                normal: {
                                                    color: "red"
                                                }
                                            }
                                        },
                                        data: this.returnonequity //ROC数据入口
                                    }
                                ]
                            };
                            //初始化图表
                            const chartObj = echarts.init(document.getElementById("zxt"));
                            chartObj.setOption(option, true);
                        });
                }
            },
            deep: true, //深度监测
            immediate: true //将立即以表达式的当前值触发回调
        },
        props: ["region"],
        mounted() {
            const chartObj = echarts.init(document.getElementById("zxt"));
            window.addEventListener("resize", () => {
                chartObj.resize();
            });
        },
        methods: {}
    };
</script>
<style scoped>
    .zxt {
        width: 100%;
        margin: 0 auto;
        min-width: 310px;
        height: 270px;
    }
</style>