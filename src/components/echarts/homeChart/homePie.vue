<template>
    <div id="homePie">
        <header>收入构成</header>
        <div id="pie" class="pie" ref="pie"></div>
    </div>
</template>

<script>
    import echarts from "echarts";
    export default {
        props:['pieData'],
        name: "homePie",
        data() {
            return {
                dataList: this.pieData,
                list:[],
                all:[]
            };
        },
        created() {

        },
        mounted() {

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
                        // name: '访问来源',
                        type: 'pie',
                        radius: '76%',
                        center: ['50%', '50%'],
                        minAngle: 20,
                        color: [
                            '#c490bf',
                            '#ec4a4a',
                            '#1db7e5',
                            '#fd8d06',
                            '#18b78e',
                            '#88acff',
                            '#f6b37f',
                            '#0068b7',
                            '#92b838',
                            '#048e87',
                            '#8957a1'
                        ],
                        data: this.list.sort(function(a, b) {
                            return a.value - b.value
                        }),
                        // roseType: 'radius',

                        label: {
                            normal: {
                                formatter: ['{b|{b}}', '{c|{d}%}'].join('\n'),
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
                                        height: 20
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
        },
        watch:{
            'pieData':function(nVal,oVal){
                this.all = nVal.data.data;
                this.list = [];
                this.all.forEach(e => {
                    let obj = {
                        value:e.incomAmount,
                        name:e.incomType
                    };
                    this.list.push(obj);
                });
                this.setPie();
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