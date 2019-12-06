<template>
  <!-- 公司标杆 -->
  <div>
    <div id="qybg" class="zzt"></div>
  </div>
</template>



<script>
import echarts from "echarts"; //引入echarts
export default {
    data(){
        return {
            xmid:"",
            data1:[],
            title:[],

        }
    },
    mounted(){
        // 获取项目id查询数据
        this.xmid=this.$route.query.xmid
        this.axios.get("/api/prochargeRate08?projectId="+this.xmid+"&topCount=10").then((res)=>{
            // console.log(res.data.data)
            // this.data1=res.data.data
        
                this.title=[]
                this.data1=[]
                for (let key in res.data.data) {
                    this.title.push(res.data.data[key].projectName)
                    this.data1.push(res.data.data[key].Rate.toFixed(0))
                }
                  let myChart = echarts.init(document.getElementById('qybg'));
      var colorArray = [{
        top: '#69b3e2',
        bottom: '#688ee5'
    }, {
        top: '#69b3e2',
        bottom: '#688ee5'
    },
    {
        top: '#69b3e2',
        bottom: '#688ee5'
    }, {
        top: '#69b3e2',
        bottom: '#688ee5'
    },
    {
        top: '#69b3e2',
        bottom: '#688ee5'
    }
];
 let option = {
    title: {
        text: "全年排名",
        x:10,
        // padding: [0, 0, 0, "20px"], //上右下左
        y: 0,
        textStyle: {
            color: "#73adce",
            fontSize: 14,
            fontWeight: "600"
        }
    },
    backgroundColor: '#fff',
     tooltip: {
          show: true,
        //   formatter: "{b}:{c}%"
        },
    grid: {
         left: '0%',
        top: '10%',
        right: '10%',
        bottom: '8%',
        containLabel: true
    },

    xAxis: {

        type: 'value',
        show: false,
        position: 'top',
        axisTick: {
            show: false
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
    },
    yAxis: [{

            type: 'category',
            axisTick: {
                show: false,
                alignWithLabel: false,
                length: 5,

            },
            "splitLine": { //网格线
                "show": false
            },
            inverse: 'false', //排序
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#666',
                },

            },
            axisLabel: {
                         // margin:120,
                textStyle: {
                    // align: 'left',
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#666'
                },
            },

            data: this.title //["重庆半岛驿站", "重庆通用时代", "重庆信达国际", "重庆美的金科郡", "重庆比华利豪园"] //  Y轴title
        }

    ],
    series: [{
            name: '指标图',
            type: 'bar',
            barWidth:20,
            label: {
                normal: {
                    show: true,
                    formatter: '{c}%',
                    position: 'right',    //数值显示位置
                    textStyle: {
                        color: '#666', //color of value
                        fontSize: 12,
                        fontWeight: '400'
                    }
                }
            },
            itemStyle: {
                normal: {
                    show: true,
                    color: function(params) {
                        let num = colorArray.length;
                        return {
                            type: 'linear',
                            colorStops: [{ //渐变色设置
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                },
                                {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                },
                                {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                },
                                {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                },
                                {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                },
                                {
                                    offset: 0,
                                    color: colorArray[params.dataIndex % num].bottom
                                }, {
                                    offset: 1,
                                    color: colorArray[params.dataIndex % num].top
                                }
                            ],

                        }
                    },
                    // barBorderRadius: 0,
                    // borderWidth:20,
                    // borderColor: '#333',
                }
            },
            // barGap: '0%',
            // barCategoryGap: '80%', //柱状图宽度
            data:this.data1
        }

    ]
};

      myChart.setOption(option)
 
      //自适应屏幕
      window.addEventListener('resize',function() {myChart.resize()})
            
        })
       
    },
    methods:{

    }
}
</script>

<style scoped>
    .zzt {
        width: 100%;
        margin: 0 auto;
        min-width: 230px;
        height: 340px;
    }
</style>
