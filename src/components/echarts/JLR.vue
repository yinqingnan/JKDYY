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
      netProfitMarginOnSales: [], //净利润折线图
      // selfBuiltArea: [] //柱状图
    };
  },
  watch: {
    JLR: {
      handler(newVal) {
        // console.log(newVal);
        this.reportingYear = [];
        this.netProfitMarginOnSales = [];
        // this.selfBuiltArea = [];
        newVal.forEach(item => {
          this.reportingYear.push(item.reportingYear);
          this.netProfitMarginOnSales.push(item.netProfitMarginOnSales);
          // this.selfBuiltArea.push(item.selfBuiltArea);
           
        });

        // 图表设置信息
        const option = {
          backgroundColor: "#f0eded",
          title: {
            text: "净利润",
            top:0,
            y: 20,
            textStyle: {
              color: "#333",
              fontSize: 14,
              fontWeight: "500"
            }
          },
          tooltip: {
            trigger: "axis",
            formatter:function(a){
                return a[0].seriesName +":"+a[0].value+"百万元"
            },
            axisPointer: {
                type: 'cross',    //设置为none为不显示线条，设为shadow为柱状图显示阴影   设为cross为 横向虚线基准线
                label: {
                    show: false,      //是否出现title提示文字
                    backgroundColor: '#7B7DDC'
                }
            }
          },
          legend: [
            {
              data: ["净利润"],
              icon: "rect",
              top: 20,
              right: 0,
              textStyle: {
                color: "#333",
                fontSize: 12
              },

              itemWidth: 20, // 设置宽度
              itemHeight: 4
            },

          ],
  
          grid: {
              top: "20%",
              right: "4%",
              left: "8%",
              bottom: "10%"
          },
          xAxis: [
            {
              type: "category",
              // boundaryGap : false,
              data: this.reportingYear, //时间数据入口
              axisLine: {
                lineStyle: {
                  color: "#666"
                }
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              show: true,
              splitLine: {
                show: true
              },
              axisLine: {
                show:true,
                lineStyle: {
                  color: "#666"
                }
              },
              axisLabel: {
                // formatter: "{value} "
              }
            }
          ],
          series: [
            {
              smooth: true, //变平滑
              name: "净利润",
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
              data: this.netProfitMarginOnSales, //数据入口
              // markLine: {            //基准线
              //   lineStyle: {
              //     normal: {
              //       type: "dashed"
              //     }
              //   },
              //   data: [[{ type: "min" }, { type: "max" }]]
              // }
            },

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
  props: ["JLR"],
  mounted(){
    const chartObj = echarts.init(document.getElementById("13"));
    window.addEventListener("resize", () => { chartObj.resize();});
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