<template>
    <!-- 管理规模图 -->
    <div>
        <div id="11" ref="charts" class="ECHARTS"></div>
    </div>
</template>

<script>
    import echarts from "echarts"; //引入echarts
    // import axios from 'axios'
    export default {
        data() {
            return {
                data1: [],
                category: [], //年（时间）
                lineData: [], //折线图
                barData: [] //柱状图
            };
        },
        watch: {
            GLGM: {
                handler(newVal) {
                    // console.log(newVal)
                    this.category = [];
                    this.lineData = [];
                    this.barData = [];
                    newVal.forEach(item => {
                        this.category.push(item.reportingYear);
                        this.lineData.push(item.contractProjectNumber);
                        this.barData.push(item.contractArea);
                    });

                    // 图表设置信息
                    const option = {
                        title: [
                            {
                                text: "管理规模",
                                top: 0,
                                left: 16,
                                // y: 20,
                                textStyle: {
                                    color: "#333",
                                    fontSize: 14,
                                    fontWeight: "600"
                                }
                            },
                            {
                                text: "单位：个",
                                top: 36,
                                left: 16,
                                textStyle: {
                                    color: "#666",
                                    fontSize: 12,
                                    fontWeight: "500"
                                }
                            },
                            {
                                text: "单位：百万平方米",
                                top: 36,
                                right: 34,
                                // x: 20,
                                textStyle: {
                                    color: "#666",
                                    fontSize: 12,
                                    fontWeight: "500"
                                }
                            },
                        ],
                        backgroundColor: "#fff",
                        tooltip: {
                            trigger: "axis",
                            // backgroundColor: '#999',
                            axisPointer: {
                                type: "shadow",
                                label: {
                                    show: false, //是否出现title提示文字
                                    backgroundColor: "#7B7DDC"
                                }
                            },
                            // formatter:function(a){
                            //   if(a.length==1){
                            //     if(a[0].seriesName=="面积"){
                            //       return a[0].seriesName +":"+ a[0].value
                            //     }else{
                            //       return a[0].seriesName +":"+ a[0].value
                            //     }
                            //   }
                            //   else{
                            //     return a[0].seriesName +":"+ a[0].value+"<br/>"+a[1].seriesName +":"+ a[1].value+"个"
                            //   }
                            // }
                        },

                        legend: {
                            icon: "ract",
                            top: 0,
                            right: 34,
                            textStyle: {
                                color: "#333",
                                fontSize: 12
                            },
                            // selectedMode: false,
                            selectedMode: "multiple", //强制多选（ multiple ）或单选（ single ）
                            data: ["面积", "项目数量"],
                            itemWidth: 9, // 设置宽度
                            itemHeight: 9 // 设置高度
                        },
                        // toolbox: {
                        //   feature: {
                        //     saveAsImage: {}
                        //   }
                        // },
                        grid: {
                            top: "26%",
                            right: "8%",
                            left: "8%",
                            bottom: "10%"
                        },
                        xAxis: {
                            show: true,
                            data: this.category, //时间接口
                            axisLine: {
                                lineStyle: {
                                    color: "#999999"
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                interval: 0,
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
                        },
                        yAxis: [
                            {
                                show: true,
                                splitLine: {
                                    show: true
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "#999"
                                    }
                                },
                                axisLabel: {
                                    interval: 0,
                                    color: "#999",
                                    // formatter: function(value) {
                                    //   //X轴文字众向排列
                                    //   return value.split("").join("\n");
                                    // },
                                    textStyle: {
                                        fontSize: 12,
                                        color: "#8f8f8f"
                                    }
                                },
                            },
                            {
                                show: true,
                                splitLine: {
                                    show: false
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "#999"
                                    }
                                },
                                axisLabel: {
                                    interval: 0,
                                    color: "#999",
                                    textStyle: {
                                        fontSize: 12,
                                        color: "#8f8f8f"
                                    }
                                },
                            }
                        ],
                        series: [
                            {
                                name: "面积",
                                type: "bar",
                                smooth: true,
                                showAllSymbol: true,
                                symbol: "emptyCircle",
                                symbolSize: 4,
                                yAxisIndex: 1,
                                barWidth: 12,
                                lineStyle: {
                                    color: "#2cabe3", //连线颜色
                                    width: 2, //宽度
                                    type: "solid" //'dotted'虚线 'solid'实线
                                },
                                itemStyle: {
                                    normal: {
                                        color: "#2cabe3" //折线颜色
                                    }
                                },
                                data: this.barData  //折线图数据接口
                            },
                            {
                                name: "项目数量",
                                type: "line",
                                barWidth: 10,
                                itemStyle: {
                                    normal: {

                                        barBorderRadius: [30, 30, 0, 0], //轴的圆角度数
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: "#39c359"
                                            },
                                            {
                                                offset: 1,
                                                color: "#39c359"
                                            }
                                        ])
                                    }
                                },
                                data: this.lineData //折线图数据接口
                            }
                        ]
                    };
                    //初始化图表
                    const chartObj = echarts.init(document.getElementById("11"));
                    chartObj.setOption(option, true);
                }
            },

            deep: true, //深度监测
            immediate: true //将立即以表达式的当前值触发回调
        },
        props: ["GLGM", "newid"],
        mounted() {
            const chartObj = echarts.init(document.getElementById("11"));
            window.addEventListener("resize", () => {
                chartObj.resize();
            });
        }
    };
</script>
<style scoped>
    .ECHARTS {
        width: 100%;
        margin: 0 auto;
        min-width: 270px;
        height: 241px;

    }
</style>