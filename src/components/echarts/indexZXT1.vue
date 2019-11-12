<template>
  <!-- 首页折线图 -->
  <div>
   
      <div id="zxt" ref="charts"  class="zxt"></div>
     
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
import axios from 'axios'
export default {
  data() {
    return {
        companyName:[],         
        netProfitMarginOnSales:[],      //销售净利率
        grossProfitMargin:[],            //毛利率 
        operatingProfitGrowthRate:[],   //营业利润增长率
        averagereturnonequity:[],       //净资产收益率%（平均）
        increaserateofbusinessrevenue:[],//营业收入增长率

    };
  },
  watch: {
      region:{
          handler(newVal){
            // console.log(newVal.slice(0,4))
            // console.log(newVal.slice(4))
            let year=newVal.slice(0,4)
            let id=encodeURI(newVal.slice(4));
            // console.log(year)
            // console.log(id)
            axios.get("/api/listedCompany11?reportingType="+id+"&reportingYear="+year)    //正式默认第一条数据
            .then((res)=>{
                this.companyName=[]
                this.netProfitMarginOnSales=[]
                this.grossProfitMargin=[]
                this.operatingProfitGrowthRate=[]
                this.averagereturnonequity=[]
                this.increaserateofbusinessrevenue=[]
                let array=res.data.data
                array.forEach(element => {
                    this.companyName.push(element.companyName)
                    this.netProfitMarginOnSales.push(element.netProfitMarginOnSales.toFixed(2))
                    this.grossProfitMargin.push(element.grossProfitMargin.toFixed(2))
                    this.operatingProfitGrowthRate.push(element.operatingProfitGrowthRate.toFixed(2))
                    this.averagereturnonequity.push(element.averagereturnonequity.toFixed(2))
                    this.increaserateofbusinessrevenue.push(element.increaserateofbusinessrevenue.toFixed(2))
                });




                // 柱状图表设置信息
                const option = {
                    backgroundColor: '#f0eded',
                     grid: {
                        top: "40%",
                        right: "10%",
                        left: "10%",
                        bottom: "14%",
                        containLabel: true, 
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter:function(a){
                            return  a.seriesName+":"+a.value+"%"
                        }
                    },
                    legend: {
                        // show:false,
                        // icon: "circle",
                        inactiveColor:"#999",
                         x: "10%",
                        top: "10%",
                        textStyle: {
                        color: "#333",
                        fontSize: 14
                        },
                        data: ["净利润", "毛利率", "营收增长率", "利润增长率", "ROE"],
                        selectedMode: "single", //强制多选（multiple）或单选（single）
                        itemWidth: 14, // 设置宽度
                        itemHeight: 14 // 设置高度
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            color: '#333',
                            interval:0,  
                            formatter: function (value) {               //X轴文字众向排列
                                return value.split("").join("\n")
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        axisTick: {
                            show: false,
                        },
                        data:this.companyName               //时间入口
                    }],
                    yAxis: [{
                            show: false,
                            // min: 0,
                            // max: 1000,
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#2ad1d2'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#27b4c2'
                                }
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#11366e'
                                }
                            }
                        },

                    ],

                    series: [
                         {   
                            name:"净利润",
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            symbolSize: 14,     //拐点大小
                            //  itemStyle : { normal: {label : {show: true}}},
                            itemStyle: {
                                normal: {
                                    borderColor:'#fff',  // 拐点边框颜色
                                    // label : {show: true},
                                    color: '#0092f6',              //拐点颜色
                                    lineStyle: {
                                        color: "#0092f6",       //折现颜色
                                        width: 4
                                    },
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
                                        color: 'red'
                                    }
                                }
                            },
                            data: this.netProfitMarginOnSales,      //净利润数据入口
                            // label: {
                            //     normal: {
                            //     show: true,
                            //     lineHeight: 24,                            
                            //     backgroundColor: "transparent",
                            //     position: ["0", "0"],
                            //     distance: 1,
                            //     formatter: [
                            //         " {a|{c}%}     \n",
                            //     ].join(""),
                            //     rich: {
                            //         a: {
                            //         color: "#333",
                            //         align: "center",
                            //         fontSize:20
                            //         },
                            //     }
                            //     }
                            // }
                        },
                         {   
                            name:"毛利率",
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            symbolSize: 14,     //拐点大小
                            //  itemStyle : { normal: {label : {show: true}}},
                            itemStyle: {
                                normal: {
                                    borderColor:'#fff',  // 拐点边框颜色
                                    // label : {show: true},
                                    color: '#0092f6',              //拐点颜色
                                    lineStyle: {
                                        color: "#0092f6",       //折现颜色
                                        width: 4
                                    },
                                }
                            },
                            markPoint: {
                                itemStyle: {
                                    normal: {
                                        color: 'red'
                                    }
                                }
                            },
                            data: this.grossProfitMargin,      //毛利率数据入口
                            // label: {
                            //     normal: {
                            //     show: true,
                            //     lineHeight: 24,                            
                            //     backgroundColor: "transparent",
                            //     position: ["0", "0"],
                            //     distance: 1,
                            //     formatter: [
                            //         " {a|{c}%}     \n",
                            //     ].join(""),
                            //     rich: {
                            //         a: {
                            //         color: "#333",
                            //         align: "center",
                            //         fontSize:20
                            //         },
                            //     }
                            //     }
                            // }
                        },
                        
                          {  
                            name:"营收增长率",
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            symbolSize: 14,     //拐点大小
                            //  itemStyle : { normal: {label : {show: true}}},
                            itemStyle: {
                                normal: {
                                    borderColor:'#fff',  // 拐点边框颜色
                                    // label : {show: true},
                                    color: '#0092f6',              //拐点颜色
                                    lineStyle: {
                                        color: "#0092f6",       //折现颜色
                                        width: 4
                                    },
                                }
                            },
                            markPoint: {
                                itemStyle: {
                                    normal: {
                                        color: 'red'
                                    }
                                }
                            },
                            data:this.operatingProfitGrowthRate,      //营收增长率数据入口
                            // label: {
                            //     normal: {
                            //     show: true,
                            //     lineHeight: 24,                            
                            //     backgroundColor: "transparent",
                            //     position: ["0", "0"],
                            //     distance: 1,
                            //     formatter: [
                            //         " {a|{c}%}     \n",
                            //     ].join(""),
                            //     rich: {
                            //         a: {
                            //         color: "#333",
                            //         align: "center",
                            //         fontSize:20
                            //         },
                            //     }
                            //     }
                            // }
                        },
                       
                        {   
                            name:"利润增长率",
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            symbolSize: 14,     //拐点大小
                            //  itemStyle : { normal: {label : {show: true}}},
                            itemStyle: {
                                normal: {
                                    borderColor:'#fff',  // 拐点边框颜色
                                    // label : {show: true},
                                    color: '#0092f6',              //拐点颜色
                                    lineStyle: {
                                        color: "#0092f6",       //折现颜色
                                        width: 4
                                    },
                                    // areaStyle: {
                                    //     // color: '#94C9EC',
                                        // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        //     offset: 0,
                                        //     color: 'rgba(7,44,90,0.3)'
                                        // }, {
                                        //     offset: 1,
                                        //     color: 'rgba(0,146,246,0.9)'
                                        // }]),
                                    // }
                                }
                            },
                            markPoint: {
                                itemStyle: {
                                    normal: {
                                        color: 'red'
                                    }
                                }
                            },
                            data: this.averagereturnonequity,       //利润增长率数据入口
                            // label: {
                            //     normal: {
                            //     show: true,
                            //     lineHeight: 24,                            
                            //     backgroundColor: "transparent",
                            //     position: ["0", "0"],
                            //     distance: 1,
                            //     formatter: [
                            //         " {a|{c}%}     \n",
                            //     ].join(""),
                            //     rich: {
                            //         a: {
                            //         color: "#333",
                            //         align: "center",
                            //         fontSize:20
                            //         },
                            //     }
                            //     }
                            // }
                        },
                        {   
                            name:"ROE",
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            symbolSize: 14,     //拐点大小
                            //  itemStyle : { normal: {label : {show: true}}},
                            itemStyle: {
                                normal: {
                                    borderColor:'#fff',  // 拐点边框颜色
                                    // label : {show: true},
                                    color: '#0092f6',              //拐点颜色
                                    lineStyle: {
                                        color: "#0092f6",       //折现颜色
                                        width: 4
                                    },
                                }
                            },
                            markPoint: {
                                itemStyle: {
                                    normal: {
                                        color: 'red'
                                    }
                                }
                            },
                            data:this.increaserateofbusinessrevenue,      //ROC数据入口
                            // label: {
                            //     normal: {
                            //     show: true,
                            //     lineHeight: 24,                            
                            //     backgroundColor: "transparent",
                            //     position: ["0", "0"],
                            //     distance: 1,
                            //     formatter: [
                            //         " {a|{c}%}     \n",
                            //     ].join(""),
                            //     rich: {
                            //         a: {
                            //         color: "#333",
                            //         align: "center",
                            //         fontSize:20
                            //         },
                            //     }
                            //     }
                            // }
                        }
                        
                          

                    ]
                };
                //初始化图表
                const chartObj = echarts.init(document.getElementById("zxt"));
                chartObj.setOption(option, true);
                
            })
                            

                                






          }
        },
        deep: true, //深度监测
        immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["region"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("zxt"));
    window.addEventListener("resize", () => { chartObj.resize();});
  },
  methods: {

  },
};
</script>
<style  scoped>
.zxt {
 width: 100%;
 margin: 0 auto;
  min-width: 310px;
  height: 280px;

}
</style>