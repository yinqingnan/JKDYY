<!-- 项目能耗用水全年-->
<template>
  <div>
    <div id="zxt2" class="ECHARTS"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts

export default {
  data() {
    return {
      time: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      bjData: [],
      xmid1: null
    };
  },
  watch: {
    xmnhysqn: {
      handler(newVal) {
        //   console.log(newVal)
        this.bjData = newVal;

        // 图表设置信息
        const option = {
          grid: {
            left: "2%",
            right: "4%",
            bottom: "13%",
            containLabel: false
          },
          tooltip: {
            showContent: true,
            trigger: "axis",
            formatter: function(a) {
              return a[0].seriesName + ":" + a[0].value + "度";
              // console.log(a)
            },
            axisPointer: {
              type: "shadow", //设置为none为不显示线条，设为 shadow 为柱状图显示阴影   设为cross为 横向虚线基准线
              label: {
                show: false, //是否出现title提示文字
                backgroundColor: "#7B7DDC"
              }
            }
          },

          xAxis: [
            {
              // name:'时间',
              type: "category",
              axisPointer: {
                type: "shadow",
                shadowStyle: {
                  // color: "blue",
                  opacity: 0.5
                }
              },
              boundaryGap: false,
              data: this.time, //填入时间
              show: true,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: "transparent"
                }
              },
              axisLabel: {
                show: true,
                interval: 0, //设置文字间距
                textStyle: {
                  color: "#666"
                }
              }
            }
          ],
          yAxis: [
            {
              splitLine: {
                show: false
              },
              show: false
            }
          ],
          series: [
            {
              name: "当月",
              type: "line",
              smooth: true,
              color: "#fff",
              symbol: "circle", //折线拐点去掉圆点
              // hoverAnimation:true,

              lineStyle: {
                normal: {
                  color: "#59bbea", //设置折线颜色
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
                  colorStops: [
                    {
                      //改变折现区域的颜色
                      offset: 0,
                      color: "#59bbea"
                    },
                    {
                      offset: 1,
                      color: "#fff"
                    }
                  ],
                  globalCoord: false
                }
              },
              data: this.bjData //数据入口
            }
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
    num1: {
      handler() {
        const chartObj = echarts.init(document.getElementById("xmnhdyys"));
        chartObj.resize();
      }
    },

    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["xmnhysqn", "num1"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("xmnhdyys"));
    window.addEventListener("resize", () => {
      // console.log(chartObj)
      chartObj.resize();
    });
  }
};
</script>
<style  scoped>
.ECHARTS {
  width: 100%;
  min-width: 347px;
  height: 148px;
}
</style>