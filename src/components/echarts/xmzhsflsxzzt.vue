<!-- 项目综合收费率竖向柱状图-->
<template>
  <div>
    <div id="zhsflsxzzt" class="ECHARTS"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts

export default {
  data() {
    return {
      bjData: [],
      date:[],
   
    };
  },
  watch: {
      xsyf:{
        handler(newVal){
            // console.log(newVal)
            if(newVal==1){
                this.date=["7月","8月","9月","10月","11月","12月",]
            }else{
                this.date=["1月","2月","3月","4月","5月","6月",]

            }
        }
      },
    zhsflsxzzt: {
      handler(newVal) {
        // console.log("竖向柱状图"+newVal)
        this.bjData = newVal;
        // 图表设置信息
        const option = {
          backgroundColor: "#eee",
          grid: {
            top: "0%",
            right: "3%",
            left: "0%",
            bottom: "20%"
          },
            tooltip: {
                showContent:true,  
                // trigger: "axis",
                formatter:function(a){
                    return a.name +":"+a.value
                }

            },
          xAxis: [
            {
              type: "category",
              data: this.date, //月数，在data中修改
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
              data: this.bjData, //数据 在data中获取，或者父元素传值
              barWidth: "10px", //更改柱状图柱体宽度
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
                        color: "#69b4e2" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#688ee5" // 100% 处的颜色
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
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById("zhsflsxzzt"));
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
  props: ["zhsflsxzzt","xsyf"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("zhsflsxzzt"));
    window.addEventListener("resize", () => {
      chartObj.resize();
    });
  },
  methods: {}
};
</script>
<style  scoped>
.ECHARTS {
  width: 100%;
  /* margin: 0 auto; */
  min-width: 132px;
  height: 94px;
}
</style>