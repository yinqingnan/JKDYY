<template>
    <div id="histogram">
        <div id="bar" class="bar" ref="bar"></div>
    </div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "histogram",
        props: ["listData"],
        data() {
            return {
                title: this.listData
            };
        },
        mounted() {
            this.setBar();
        },
        methods: {
            setBar() {
                let myColor = ["#5cc3d2", "#fca852", "#57a8e8"];
                let dataAll = this.listData.arr;
                let yAxisData = [];
                let myBar = echarts.init(this.$refs.bar);
                let option = {
                    backgroundColor: "transparent",
                    title: [
                        {
                            text: this.listData.title,
                            x: "7%",
                            y: "3%",
                            textStyle: {color: "#fff", fontSize: "12"}
                        }
                    ],
                    grid: [{x: "10%", y: "7%", width: "45%", height: "90%"}],
                    tooltip: {
                        formatter: " {c}",
                        position: "right"
                    },
                    xAxis: [
                        {
                            // gridIndex: 0,
                            axisTick: {show: false},
                            axisLabel: {show: false},
                            splitLine: {show: false},
                            axisLine: {show: false}
                        }
                    ],
                    yAxis: [
                        {
                            gridIndex: 0,
                            interval: 0,
                            data: yAxisData,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            max: 3
                        }
                    ],
                    series: [
                        {
                            type: "bar",
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            barWidth: "45%",
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        return myColor[params.dataIndex];
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: "right",
                                    formatter: function (param) {
                                    }
                                }
                            },
                            data: dataAll
                        }
                    ]
                };
                myBar.setOption(option, true);
                window.addEventListener("resize", function () {
                    myBar.resize();
                });
            }
        },
        watch: {
            listData: function (n, o) {
                this.setBar();
            }
        }
    };
</script>

<style scoped>
    #histogram {
        min-width: 190px;
        height: 100px;
    }

    .bar {
        min-width: 150px;
        height: 100px;
    }

</style>