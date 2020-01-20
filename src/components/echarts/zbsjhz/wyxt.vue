<template>
    <!-- 物业形态 -->
    <div>
        <div id="dht" class="dht" ref="dht"></div>
    </div>
</template>

<script>
    import echarts from "echarts"; //引入echarts
    export default {
        data() {
            return {
                data: [],
                title: []
            };
        },
        mounted() {
            this.axios.get("/api/zb_004").then(res => {
                var aggregate = res.data.data;
                this.data = [];
                this.title = [];
                aggregate.map(item => {
                    // console.log(item)
                    this.data.push(item.projectCount);
                    this.title.push(item.projectType);
                });

                var myChart = echarts.init(this.$refs.dht);

                var option = {
                    backgroundColor: "#fff",
                    title: {
                        text: "物业形态",
                        x: 20,
                        y: 2,
                        textStyle: {
                            color: "#333",
                            fontSize: 14,
                            fontWeight: "500"
                        }
                    },
                    series: [
                        {
                            // name: '商业项目',
                            type: "pie",
                            radius: ["30%", "40%"],
                            center: ["18%", "50%"],
                            startAngle: 225,
                            color: [
                                new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "#f9c27f"
                                    },
                                    {
                                        offset: 1,
                                        color: "#fb9d2d"
                                    }
                                ]),
                                "transparent"
                            ],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            label: {
                                normal: {
                                    position: "center"
                                }
                            },
                            data: [
                                {
                                    value: 75,
                                    name: "商业项目",
                                    label: {
                                        normal: {
                                            formatter: this.title[0], //修改数据
                                            textStyle: {
                                                color: "#666",
                                                fontSize: 14
                                            }
                                        }
                                    }
                                },
                                {
                                    value: 25,
                                    name: this.data[0], //修改数据
                                    label: {
                                        normal: {
                                            formatter: "\n\n {b} 个", //使用{b}来获取数据

                                            textStyle: {
                                                color: "#666",
                                                fontSize: 16,
                                                fontWeight: 600
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            name: "写字楼项目",
                            type: "pie",
                            radius: ["30%", "40%"],
                            center: ["50%", "50%"],
                            startAngle: 225,
                            color: [
                                new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "#9FE6B8"
                                    },
                                    {
                                        offset: 1,
                                        color: "#56c9c8"
                                    }
                                ]),
                                "transparent"
                            ],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            label: {
                                normal: {
                                    position: "center"
                                }
                            },
                            data: [
                                {
                                    value: 75,
                                    name: "写字楼项目",
                                    label: {
                                        normal: {
                                            formatter: this.title[1], //更改数据
                                            textStyle: {
                                                color: "#666",
                                                fontSize: 14,
                                            }
                                        }
                                    }
                                },
                                {
                                    value: 25,
                                    name: this.data[1], //更改数据
                                    label: {
                                        normal: {
                                            formatter: "\n\n{b}个", //使用{b}来获取数据
                                            textStyle: {
                                                color: "#666",
                                                fontSize: 16,
                                                fontWeight: 600
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            name: "公建项目",
                            type: "pie",
                            radius: ["30%", "40%"],
                            center: ["82%", "50%"],
                            startAngle: 225,
                            color: [
                                new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "#c6c5f0"
                                    },
                                    {
                                        offset: 1,
                                        color: "#8785d7"
                                    }
                                ]),
                                "transparent"
                            ],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            label: {
                                normal: {
                                    position: "center"
                                }
                            },
                            data: [
                                {
                                    value: 75,
                                    // name: '公建项目',
                                    label: {
                                        normal: {
                                            formatter: this.title[2], //更改数据
                                            textStyle: {
                                                color: "#666",
                                                fontSize: 14
                                            }
                                        }
                                    }
                                },
                                {
                                    value: 25,
                                    name: this.data[2],
                                    label: {
                                        normal: {
                                            formatter: "\n\n{b}个", //使用{b}来获取数据
                                            textStyle: {
                                                color: "#666",
                                                fontSize: 16,
                                                fontWeight: 600
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                };
                myChart.setOption(option);
                //自适应屏幕
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            });
        },
        methods: {}
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
</style>