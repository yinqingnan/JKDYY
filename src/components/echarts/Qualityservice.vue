<!-- 规模构成-->
<template>
  <!-- 规模构成 -->
  <div>
    <div id="13" class="ECHARTS"></div>
    <!-- {{Realestates}} -->
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts


export default {
  data() {
    return {
      time: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12/月"],     
      bjData:[]
    };
  },
  watch: {
    Realestates: {
      handler(newVal) {
        // console.log(newVal);
        this.bjData=newVal


        // 图表设置信息
        const option = {
             grid: {
        left: '0%',
        // right: '4%',
        // bottom: '3%',
        containLabel: false
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
            interval:1,  //设置文字间距
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
            id: 'y1',
            name: '工程报事完结率',
            type: 'line',
            smooth: true,
            color: "red",
            symbol: 'none',
            // hoverAnimation:true,
            lineStyle: {
                normal: {
                    color: '#1bbdf2', //设置折线颜色
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
                            "color": "#1bbdf2"
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
        {
            // name: '工程',
            type: 'effectScatter',
            coordinateSystem: 'cartesian2d',
            data: this.bjData, //2d坐标系
            symbol: 'circle',
            symbolSize: 10,
            showEffectOn: 'emphasis',
            rippleEffect: {
                brushType: 'stroke'
            },
            itemStyle: {
                normal: {
                    color: 'transparent', //改变折线点的颜色
                },
            },
            zlevel: 1,
            tooltip: {
                trigger: 'item',
                backgroundColor: 'white',
                textStyle: {
                    color: '#000'
                },
                // formatter:  '<span style="font-size:20px;color: #0a080b"><strong>{c0}</strong></span><span style="color: #0a080b">次&nbsp;&nbsp;&nbsp;</span><span style="color: green">2.85%</span><span class="test1" >&#9660<style>\n' +
                //   '.test1{color:green }\n' +
                //   '</style></span></br>' +
                //   '<span style="color: #0a080b">{b0}</span>'
            }
        },

    ]
          
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById("13"));

        chartObj.setOption(option, true);
     
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["Realestates"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("13"));
    window.addEventListener("resize", () => {
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
  min-width: 176px;
  height: 86px;
}
</style>