<!--柱状图-->

<template>
  <div id="Histogram" class="ECHARTS"  ref="myEchart"></div>
</template>

<script>
import echarts from "echarts"; //引入echarts

export default {
  data() {
    return {
    
    };
  },
  mounted() {
    this.chinaConfigure();
  },
   beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods:{
    chinaConfigure(){
       let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
        window.onresize = myChart.resize; // 让图表自适应
        myChart.setOption({
           //创建图表配置数据
      backgroundColor: "#eee",
      grid: {
        top: "0%",
        right: "3%",
        left: "0%",
        bottom: "20%"
      },
      xAxis: [
        {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月", "6月"], //月数，在data中修改
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          axisTick: false,
          axisLabel: {
            margin: 6,
            color: "#666",
            textStyle: {
              fontSize: 10
            }
          }
        }
      ],
      yAxis: [
        {
          axisLabel: false,
          axisTick: false,
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.12)"
            }
          }
        }
      ],
      series: [
        {
          type: "bar",
          data: [60, 80, 50, 40, 180, 90], //数据 在data中获取，或者父元素传值
          barWidth: "12px", //更改柱状图柱体宽度
          barGap: "0",
          itemStyle: {
            //更改颜色
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(113,182,227,1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0,77,167,1)" // 100% 处的颜色
                  }
                ],
                false
              ),
              barBorderRadius: [2, 2, 2, 2],
              shadowColor: "rgba(255,255,255,0)",
              shadowBlur: 4
            }
          }
        }
      ]
        })
    }
  }
};
</script>

<style scoped>
.ECHARTS {
  width: 40%;
  /* min-width: 150px; */
  height: 80px;
}
</style>