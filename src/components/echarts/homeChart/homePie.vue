<template>
    <div id="homePie">
        <header>利润水平</header>
        <div id="pie" class="pie" ref="pie"></div>
    </div>
</template>

<script>
    import echarts from "echarts";
    export default {
        name: "homePie",
        data() {
            return {

            };
        },
        mounted() {
            this.setPie();
        },
        methods: {
            setPie(){
                let myPie = echarts.init(this.$refs.pie);
                let option = {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} :  {d}%"
                    },

                    visualMap: {
                        show: false,
                        min: 0,
                        max: 100,
                        inRange: {
                        }
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '60%',
                        center: ['50%', '50%'],
                        color: ['#18b78e', '#fd8d06', '#ec4a4a', '#1db7e5'],
                        data: [{
                            value: 25,
                            name: '家庭生活'
                        },{
                            value: 40,
                            name: '金融资产'
                        },{
                            value: 15,
                            name: '家居'
                        },{
                            value: 20,
                            name: '园区资源'
                        }].sort(function(a, b) {
                            return a.value - b.value
                        }),
                        roseType: 'radius',

                        label: {
                            normal: {
                                formatter: ['{b|{b}}', '{c|{c}%}'].join('\n'),
                                rich: {

                                    c: {
                                        color: '#fff',
                                        fontSize: 15,
                                        fontWeight:'bold',
                                        lineHeight: 5
                                    },
                                    b: {
                                        color: '#b3c3e4',
                                        fontSize: 12,
                                        height: 40
                                    },
                                },
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgb(98,137,169)',
                                },
                                smooth: 0.1,
                                length: 5,
                                length2: 5,

                            }
                        },

                    }]
                };

                myPie.setOption(option);
                window.addEventListener("resize", function() {
                    myPie.resize();
                });
            }
        }
    }
</script>

<style scoped>
    header{
        width: 100%;
        height: 46px;
        line-height: 46px;
        color:#fff;
        font-weight: 500;
        text-indent: 20px;
        background: url("../../../assets/ima/chart_headr.png");
        background-size: cover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .pie{
        min-height: 300px;
        width: 100%;
    }
</style>