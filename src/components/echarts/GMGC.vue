<!-- 规模构成-->
<template>
  <!-- 规模构成 -->
  <div>
    <div id="13" class="ECHARTS"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
// import axios from 'axios'
export default {
  data() {
    return {
      data1: [],
      reportingYear: [], //年（时间）
      externalArea: [], //收入折线图
      selfBuiltArea: [] //柱状图
    };
  },
  watch: {
    GMGC: {
      handler(newVal) {
        // console.log(newVal);
        this.reportingYear = [];
        this.externalArea = [];
        this.selfBuiltArea = [];
        newVal.forEach(item => {
          this.reportingYear.push(item.reportingYear);
          this.externalArea.push(item.externalArea);
          this.selfBuiltArea.push(item.selfBuiltArea);
        });

        // 图表设置信息
        const option = {
          backgroundColor: "#f0eded",
          title: {
            text: "规模构成",
            x: "10",
            y: 20,
            textStyle: {
              color: "#333",
              fontSize: 16,
              fontWeight: "600"
            }
          },
          tooltip: {
            trigger: "axis",
            formatter:function(a){
                return a[0].seriesName +":"+a[0].value+"%"
            }
          },
          legend: [
            {
              data: ["自建占比"],
              icon: "rect",
              top: 20,
              right: 0,
              textStyle: {
                color: "#333",
                fontSize: 16
              },

              itemWidth: 30, // 设置宽度
              itemHeight: 8
            },
            // {
            //   data: ["线性（自建占比%）"],
            //   icon: "line",
            //   top: 20,
            //   right: 0,
            //   textStyle: {
            //     color: "#333",
            //     fontSize: 16
            //   },
            //   itemWidth: 30 // 设置宽度
            // }
          ],
          //   toolbox: {
          //     feature: {
          //       saveAsImage: {}
          //     }
          //   },
          grid: {
            x: "0%",
            width: "100%",
            y: "30%",
            bottom: "10%"
          },
          xAxis: [
            {
              type: "category",
              // boundaryGap : false,
              data: this.reportingYear, //时间数据入口
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4"
                }
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              show: false
            }
          ],
          series: [
            {
              smooth: true, //变平滑
              name: "自建占比",
              type: "line",
              stack: "总量",
              areaStyle: {
                normal: {     //折线一下的渐变色
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#2cabe3" // 0% 处的颜色
                    },
                    // {
                    //   offset: 0.7,
                    //   color: "#e4f2ff" // 100% 处的颜色
                    // },
                    {
                      offset: 1,
                      color: "#fff" // 100% 处的颜色
                    }
                  ])
                }
              },
              itemStyle: {
                normal: {
                  color: "#2cabe3" //折线颜色
                }
              },
              data: this.externalArea, //数据入口
              // markLine: {            //基准线
              //   lineStyle: {
              //     normal: {
              //       type: "dashed"
              //     }
              //   },
              //   data: [[{ type: "min" }, { type: "max" }]]
              // }
            },
            // {
              // smooth: true, //变平滑
              // name: "线性（自建占比%）",
              // type: "line",
              // stack: "总量",
              // areaStyle: {
              //   normal: {
              //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //       {
              //         offset: 0,
              //         color: "#81befd" // 0% 处的颜色
              //       },
              //       {
              //         offset: 0.4,
              //         color: "#e4f2ff" // 100% 处的颜色
              //       },
              //       {
              //         offset: 1,
              //         color: "#fff" // 100% 处的颜色
              //       }
              //     ])
              //   }
              // }
              // data:this.selfBuiltArea             //数据入口
            // }
          ]
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById("13"));

        chartObj.setOption(option, true);
        // 设置自适应
        window.onresize = function() {
          chartObj.resize();
        };
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["GMGC"],
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
  min-width: 270px;
  height: 240px;
}
</style>