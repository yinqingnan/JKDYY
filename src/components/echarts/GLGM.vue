<template>
  <!-- 管理规模图 -->
  <div>
    <div id="11" class="ECHARTS"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
// import axios from 'axios'
export default {
  data() {
    return {
      data1: [],
      category: [], //年（时间）
      lineData: [], //折线图
      barData: [] //柱状图
    };
  },
  watch: {
    GLGM: {
      handler(newVal) {
        // console.log(newVal)
        this.category = [];
        this.lineData = [];
        this.barData = [];
        newVal.forEach(item => {
          this.category.push(item.reportingYear);
          this.lineData.push(item.contractProjectNumber);
          this.barData.push(item.contractArea);
        });

        // 图表设置信息
        const option = {
          title: {
            text: "管理规模",
            x: "10",
            y: 20,
            textStyle: {
              color: "#333",
              fontSize: 16,
              fontWeight: "600"
            }
          },
          backgroundColor: "#f0eded",
          tooltip: {
            trigger: "axis",
            // backgroundColor: 'rgba(255,255,255,0.1)',
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                backgroundColor: "#7B7DDC"
              }
            },
            formatter:function(a){
              if(a.length==1){
                if(a[0].seriesName=="面积"){
                  return a[0].seriesName +":"+ a[0].value+"万m²"
                }else{
                  return a[0].seriesName +":"+ a[0].value+"个"
                }
              }
              else{
                return a[0].seriesName +":"+ a[0].value+"万m²"+"<br/>"+a[1].seriesName +":"+ a[1].value+"个"
              }
            }
          },

          legend: {
            icon: "circle",
            top: 20,
            right: 0,
            textStyle: {
              color: "#333",
              fontSize: 16
            },
            data: ["面积", "项目数量"],
            itemWidth: 14, // 设置宽度
            itemHeight: 14 // 设置高度
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          grid: {
            x: "0%",
            width: "100%",
            y: "30%",
            bottom: "10%"
          },
          xAxis: {
            show: true,
            data: this.category, //时间接口
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: [
            {
              show: false,
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4"
                }
              },
              axisLabel: {
                formatter: "{value} "
              }
            },
            {
              splitLine: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                formatter: "{value} "
              }
            }
          ],
          series: [
            {
              name: "面积",
              type: "line",
              smooth: true,
              showAllSymbol: true,
              symbol: "emptyCircle",
              symbolSize: 4,
              yAxisIndex: 1,
              lineStyle: {
                color: "#2cabe3", //连线颜色
                width:2, //宽度
                type: "solid" //'dotted'虚线 'solid'实线
              },
              itemStyle: {
                normal: {
                  color: "#2cabe3" //折线颜色
                }
              },
              data: this.barData  //折线图数据接口
            },
            {
              name: "项目数量",
              type: "bar",
              barWidth: 10,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#688de5"
                    },
                    {
                      offset: 1,
                      color: "#69b4e2"
                    }
                  ])
                }
              },
              data: this.lineData //折线图数据接口
            }
          ]
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById("11"));

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
  props: ["GLGM", "newid"],
  mounted(){
     const chartObj = echarts.init(document.getElementById("11"));
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