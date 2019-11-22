<!-- 项目能耗用水当月-->
<template>
  <div>
    <div id="xmnhdyys" class="ECHARTS"></div>

  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts


export default {
  data() {
    return {
      time: [],     
      bjData:[],
  
    };
  },
  watch: {
    xmnhdyysname:{
      handler(newVal){
        // console.log(newVal)
        this.title=newVal
      }
    },
    xmnhdyys: {
      handler(newVal) {
      // console.log(newVal)
        this.bjData=newVal

        // 图表设置信息
        const option = {
        backgroundColor:'#fff',
    title:{
        show: false,
        text:'',
        textStyle:{
          color:'#FFFFFF'  
        },
        left:'300px',
        top: '500'
        
    },
    tooltip: {
        show: false,
        formatter: "{b} <br> {c}%"

    },
    legend: {
        icon: "circle", 
        bottom: '10%',
        left:'10%',
        itemWidth: 7,
        itemHeight: 7,
        itemGap: 40,
        textStyle:{
            color:'#89A7AF',
        },
        data:this.title
    },
    xAxis: [{
        type :'value',
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            show: false
        },
        splitLine: {
            show: false,
        }
    }],
    yAxis: [{
        //type: 'category',
        data: [''],
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            textStyle: {
                color: '#fff',
            }
        }

    }],
    series: [
        {
            name:this.title[0],
            type:'bar',
            barWidth:16,
            stack: '危货种类占比',
            label: {
                normal: {
                    borderWidth: 10,
                    distance: 20,
                    align: 'center',
                    verticalAlign: 'middle',
                    borderRadius: 1,
                    borderColor: '#E8A61F',
                    backgroundColor: '#E8A61F',
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    color: '#000'
                }
            },
            itemStyle: {
                color: '#E8A61F'
            },
            data:[{
                value:this.bjData[0],
                itemStyle: {
                normal: {
                    color: {
                        type: 'bar',
                        colorStops: [{
                            offset: 0,
                            color: '#E8A61F' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#E8A61F' // 100% 处的颜色
                        }],
                        globalCoord: false, // 缺省为 false

                    }
                }
            }
            }]
        },
        {
            name:'',
            type:'line',
            barWidth:0,
            markPoint: {
                symbol:'triangle',
                symbolRotate:'180',
                itemStyle:{
                  color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: '#E8A61F' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#E8A61F' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }  
                },
                symbolSize:[6,5],// 容器大小
                symbolOffset:[0,-15],//位置偏移
                data:[{
                    // coord: [53.11/2]
                }],
                label: {
                    normal: {
                        show: false
                    },
                    offset: [0, 0],
                }
            }
        },
        {
            name:this.title[1],
            type:'bar',
            barWidth:16,
            stack: '危货种类占比',
            itemStyle: {
                color: '#E67C26'
            },
            label: {
                normal: {
                    borderWidth: 10,
                    distance: 20,
                    align: 'center',
                    verticalAlign: 'middle',
                    borderRadius: 1,
                    borderColor: '#E67C26',
                    backgroundColor: '#E67C26',
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    color: '#000'
                }
            },
            data:[{
                value:this.bjData[1],
                itemStyle: {
                normal: {
                    color: {
                        type: 'bar',
                        colorStops: [{
                            offset: 0,
                            color: '#E67C26' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#E67C26' // 100% 处的颜色
                        }],
                        globalCoord: false, // 缺省为 false

                    }
                }
            }
            }]
        },
        {
            name:'',
            type:'line',
            barWidth:0,
            markPoint: {
                symbol:'triangle',
                symbolRotate:'180',
                itemStyle:{
                  color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: '#E67C26' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#E67C26' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }  
                },
                symbolSize:[6,5],// 容器大小
                symbolOffset:[0,-15],//位置偏移
                data:[{
                    // coord: [53.11 + 23/2]
                }],
                label: {
                    normal: {
                        show: false
                    },
                    offset: [0, 0],
                }
            }
        },
        {
            name:this.title[2],
            type:'bar',
            barWidth:16,
            stack: '危货种类占比',
            itemStyle: {
                color: '#0CD8A7'
            },
            label: {
                normal: {
                    borderWidth: 10,
                    distance: 20,
                    align: 'center',
                    verticalAlign: 'middle',
                    borderRadius: 1,
                    borderColor: '#39A8F7',
                    backgroundColor: '#39A8F7',
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    color: '#000'
                }
            },
            data:[{
                value:this.bjData[2],
                itemStyle: {
                normal: {
                    color: {
                        type: 'bar',
                        colorStops: [{
                            offset: 0,
                            color: '#39A8F7' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#39A8F7' // 100% 处的颜色
                        }],
                        globalCoord: false, // 缺省为 false

                    }
                }
            }
            }]
        },
        {
            name:'其他三角形',
            type:'line',
            barWidth:0,
            markPoint: {
                symbol:'triangle',
                symbolRotate:'180',
                itemStyle:{
                  color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: '#39A8F7' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#39A8F7' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }  
                },
                symbolSize:[6,5],// 容器大小
                symbolOffset:[0,-15],//位置偏移
                data:[{
                    // coord: [53.11 + 23 + 1/2]
                }],
                label: {
                    normal: {
                        show: false
                    },
                    offset: [0, 0],
                }
            }
        }
    ]
          
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById("xmnhdyys"));

        chartObj.setOption(option, true);
           // 设置自适应
        window.onresize = function() {
          chartObj.resize();
        // console.log(chartObj)

        };
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["xmnhdyys","xmnhdyysname"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("xmnhdyys"));
    window.addEventListener("resize", () => {
        // console.log(chartObj)
      chartObj.resize();
    });
  },
  methods: {

  }
};
</script>
<style  scoped>
.ECHARTS {
    width: 100%;
 margin: 0 auto;
    min-width: 347px;
     height: 148px;
     width: 347px
}
</style>