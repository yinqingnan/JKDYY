<!-- 项目报事完成率横向柱状图 -->
<template>

    <div>
        <div id="bswjlsxzzt" class="ECHARTS"></div>
    </div>
</template>

<script>
    import echarts from "echarts"; //引入echarts

    export default {
        data() {
            return {
                list: ["最大", "最小", "平均"],
                bjData: [],
                title: []
            };
        },
        watch: {

            bshxzzt: {
                handler(newVal) {

                    this.bjData = newVal;

                    // 图表设置信息
                    const option = {
                        grid: {
                            show: 'true',
                            borderWidth: '0',
                            height: "100%",
                            width: "90%",
                            x: "6%",
                            y: "0%",
                        },
                        tooltip: {
                            trigger: "axis",
                            formatter: function (a) {
                                return a[0].name + ":" + a[0].value
                                // console.log(a)
                            },
                            axisPointer: {
                                type: 'shadow',           //设置为none为不显示线条，设为 shadow 为柱状图显示阴影   设为cross为 横向虚线基准线
                                label: {
                                    show: false,      //是否出现title提示文字
                                    backgroundColor: '#7B7DDC'
                                }
                            }

                        },
                        backgroundColor: '', //背景色
                        xAxis: {
                            show: false, //是否显示x轴
                            default: false,
                            "axisTick": {       //y轴刻度线
                                "show": false
                            },
                            // type: 'value'
                        },
                        yAxis: {
                            "axisTick": {       //y轴刻度线
                                "show": false
                            },
                            // type: 'category',
                            show: true, //是否显示x轴

                            inverse: true, //让y轴数据逆向
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: 'transparent'
                                }
                            },

                            axisLine: {     //y轴的线
                                show: true, //是否显示Y轴
                                lineStyle: { //设置Y轴颜色
                                    color: "#cecccc",

                                }
                            },
                            data: this.list
                        },
                        series: [{
                            name: '数据内框',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 2, //园角度数
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#69b4e2' // 0% 处的颜色
                                    },
                                        {
                                            offset: 1,
                                            color: '#688ee5' // 100% 处的颜色
                                        }], false),
                                }
                            },

                            barWidth: '10px',        //柱体宽度
                            data: this.bjData         //数据源， 在父元素中接收
                        },

                        ]
                    };
                    //初始化图表
                    const chartObj = echarts.init(document.getElementById("bswjlsxzzt"));

                    chartObj.setOption(option, true);
                    // 设置自适应
                    window.onresize = function () {
                        chartObj.resize();
                    };
                }
            },
            deep: true, //深度监测
            immediate: true //将立即以表达式的当前值触发回调
        },
        props: ["bshxzzt"],
        mounted() {
            const chartObj = echarts.init(document.getElementById("bswjlsxzzt"));
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
        width: 100%;
        /* margin: 0 auto; */
        min-width: 80px;
        height: 90px;
    }
</style>