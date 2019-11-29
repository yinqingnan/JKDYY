<template>
  <!-- 总收入 -->
  <div>
    <div id="12" class="ECHARTS"></div>
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
      generalIncome: [] //收入折线图
      //   barData: [] //柱状图
    };
  },
  watch: {
    ZSR: {
      handler(newVal) {
        // console.log(newVal)
        this.reportingYear = [];
        this.generalIncome = [];
        // this.barData = [];
        newVal.forEach(item => {
          this.reportingYear.push(item.reportingYear);
          this.generalIncome.push(item.generalIncome);
        });

        // 图表设置信息
        const option = {
          title: {
            top: 0,
            y: 20,
            text: "总收入",
            textStyle: {
              color: "#333",
              fontSize: "14",
              fontWeight: "500"
            }
          },
          postion: "200",
          backgroundColor: "#f0eded", //画布背景

          legend: {
            icon: "rect",
            top: 20,
            right: 0,
            textStyle: {
              color: "#333",
              fontSize: 12
            },
            data: ["总收入"],
            itemWidth: 20, // 设置宽度
            itemHeight: 4 // 设置高度
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          grid: {
               top: "20%",
              right: "4%",
              left: "8%",
              bottom: "10%"
          },
          tooltip: {
            trigger: "axis",
            formatter:function(a){
                return a[0].seriesName +":"+a[0].value+"百万元"
            },    
            axisPointer: {
                type: 'cross',           //设置为none为不显示线条，设为shadow为柱状图显示阴影   设为cross为 横向虚线基准线
                label: {
                    show: false,      //是否出现title提示文字
                    backgroundColor: '#7B7DDC'
                }
            }
            
          },
          xAxis: {
            //x轴
            show: true,
            data: this.reportingYear, //时间接口
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
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
          },
          series: [
            {
              name: "总收入",
              data: this.generalIncome,                         //收入数据入口
            //    markLine : {                             //基准线，当前最小值到最大值
            //     fontSize:1,
            //     lineStyle: {
            //         normal: {
            //             type: 'dashed'
            //         }
            //     },
            //     data : [
            //         [{type : 'min'}, {type : 'max'}]
            //     ]
            // },
              type: "line",
              smooth: true, //折线是否平滑
              areaStyle: {
                opacity: 0
              },
              itemStyle: {
                normal: {
                  label: { show: false }, //拐点显示数据
                  color: "#ec7d31", //小圆点的颜色
                  lineStyle: {
                    color: "#ec7d31", //折线的颜色
                    width: 3, //宽度
                    type: "solid" //'dotted'虚线 'solid'实线
                  }
                }
              }
            },
            {
              name: "线性（总收入）",
              // data: this.generalIncome, //收入数据入口
              
              type: "line",
              smooth: true, //是否平滑
              areaStyle: {
                opacity: 0
              },
              itemStyle: {
                normal: {
                  label: { show: true }, //拐点显示数据
                  color: "#2B9F50", //小圆点的颜色
                  lineStyle: {
                    color: "#2B9F50", //折线的颜色
                    width: 8, //宽度
                    type: "dotted" //'dotted'虚线 'solid'实线
                  }
                }
              }
            }
          ]
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById("12"));

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
  props: ["ZSR"],
  mounted(){
    const chartObj = echarts.init(document.getElementById("12"));
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