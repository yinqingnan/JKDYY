<!-- 品质服务信息折线1-->
<template>
  <!-- 品质服务信息折线2 -->
  <div>
    <div id="zxt2" class="ECHARTS"></div>

  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts


export default {
  data() {
    return {
      time: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11","12/月"],     
      bjData:[],
  
    };
  },
  watch: {
    Realestates: {
      handler(newVal) {
      
        this.bjData=newVal

        // 图表设置信息
        const option = {
             grid: {
        left: '0%',
        // right: '4%',
        // bottom: '3%',
        containLabel: false
    },
        tooltip: {
            tooltip: {
              trigger: "axis",
              
            },
              formatter:function(a){
                return a.seriesName +":"+a.value+"%"
            }
    },
    xAxis: [{
        // name:'时间',
        type: 'category',
        axisPointer: {
            type: "shadow",
            shadowStyle: {
                // color: "blue",
                opacity: 0.5
            }
        },
        boundaryGap: false,
        data: this.time,                //填入时间
        show: true,
        axisTick: {
            show: false,
        },
        axisLine: {
            lineStyle: {
                color: 'transparent',
            },
        },
        axisLabel: {
            show: true,
            interval:0,  //设置文字间距
            textStyle: {
                color: '#666',
            }
        }
    }],
    yAxis: [{
        // name:'(次)',
        // type: 'value',
        splitLine: {
            show: false,
        },
        show: false
    }],
    series: [{
            name: '其他',
            type: 'line',
            smooth: true,
            color: "#fff",
            symbol: 'circle',
            // hoverAnimation:true,
            lineStyle: {
                normal: {
                    color: '#55ae3a', //设置折线颜色
                    width: 3
                }
            },
            areaStyle: {
                opacity: 0.3,
                color: {
                    // type: "linear",
                    x: 1,
                    y: 0,
                    x1: 1,
                    y2: 1,
                    colorStops: [{ //改变折现区域的颜色
                            "offset": 0,
                            "color": "#55ae3a"
                        },
                        {
                            "offset": 1,
                            "color": "#fff"
                        }
                    ],
                    "globalCoord": false
                }
            },
            data: this.bjData      //数据入口
        },
     

    ]
          
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById("zxt2"));

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
  props: ["Realestates"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("zxt2"));
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
 /* margin: 0 auto; */
    min-width: 170px;
     height: 86px;
}
</style>