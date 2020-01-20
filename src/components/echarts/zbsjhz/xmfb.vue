<template>
    <!-- 项目分布 -->
    <div>
        <div class="box">
            <div id="dht" class="dht" ref="dht"></div>
            <ul>
                <li
                        v-for="(item,index) in list"
                        :key="index"
                        @click="tab1(index)"
                        :class="{active1:index == num}"
                >
                    <span :class=" item.name "></span>
                    <h2>{{item.title}}</h2>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import echarts from "echarts"; //引入echarts
    export default {
        data() {
            return {
                data: [],
                msglist: [],
                msgtitle: [],
                num: null,
                list: [
                    {title: "升序", name: "iconiconasc iconfont"},
                    {title: "降序", name: "iconiconsort iconfont"}
                ]
            };
        },
        mounted() {
        },
        methods: {
            tab1(index) {
                this.num = index
                if (index == 0) {
                    this.$parent.xmfbpxsx();
                    //项目分布数据升序

                } else {
                    //项目分布数据升序
                    this.$parent.xmfbpxjx();


                }
            }
        },
        watch: {
            msg: {
                handler(newval) {
                    this.data = newval;
                    this.msglist = [];
                    this.msgtitle = [];
                    newval.map(item => {
                        this.msglist.push(item.projectCount);
                        this.msgtitle.push(item.companyName);
                    });

                    var myChart = echarts.init(this.$refs.dht);
                    var option = {
                        color: ["#56a8e7"],
                        title: {
                            text: "项目分布",
                            x: 20,
                            // padding: [0, 0, 0, "20px"], //上右下左
                            y: 2,
                            textStyle: {
                                color: "#333",
                                fontSize: 14,
                                fontWeight: "500"
                            }
                        },
                        backgroundColor: "#fff",
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow"
                            },
                            formatter: function (objs) {
                                // console.log(objs)
                                let obj = objs[0];
                                return `${obj.name} </br> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${obj.value}个`;
                            }
                        },
                        grid: {
                            top: "10%",
                            left: "3%",
                            right: "4%",
                            bottom: "3%",
                            containLabel: true
                        },
                        xAxis: {
                            type: "value",
                            boundaryGap: [0, 0.01],
                            data: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180],
                            interval: 20,
                            splitLine: {
                                lineStyle: {
                                    type: "dashed"
                                }
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#909396"
                                }
                            },
                            axisLabel: {
                                formatter: function (value) {
                                    // console.log(value)
                                    return value;
                                },
                                color: "#303439"
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        yAxis: {
                            type: "category",
                            boundaryGap: true,
                            splitArea: {
                                areaStyle: {
                                    opacity: 0
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#909396"
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            data: this.msgtitle
                        },
                        series: [
                            {
                                // name: 'Scoring Attributes',
                                barWidth: 10,
                                type: "bar",
                                data: this.msglist
                            }
                        ]
                    };

                    myChart.setOption(option);
                    //自适应屏幕
                    window.addEventListener("resize", function () {
                        myChart.resize();
                    });
                }
            },
            deep: true, //深度监测
            immediate: true //将立即以表达式的当前值触发回调
        },
        props: ["msg"]
    };
</script>
<style scoped>
    .dht {
        width: 100%;
        margin: 0 auto;
        min-width: 380px;
        height: 100%;
        min-height: 300px;
    }

    .box {
        position: relative;
    }

    .box > ul {
        position: absolute;
        top: 0;
        z-index: 2;
        right: 10px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .box > ul > li {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 58px;
        height: 26px;
        line-height: 26px;
        cursor: pointer;
        color: #666;
        text-align: center;
    }

    .box > ul > li > h2 {
        font-size: 14px;
        font-weight: 500;
        margin-left: 6px;
    }

    .active1 {
        background: #01aeee;
        color: #fff !important;
    }

    .box > ul > li:hover {
        background: #01aeee;
        color: #fff !important;
    }

    .box > ul > li:nth-of-type(2) {
        margin-left: 6px
    }
</style>