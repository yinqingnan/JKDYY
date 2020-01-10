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
      reportingYear: [],               //年（时间）
      generalIncome: [],               //总收入数据
      netProfitMarginOnSales:[] ,       //净利润数据
      SalesRale:[],                      //利润率
    };
  },
  watch: {
    ZSR: {
      handler(newVal) {
        // console.log(newVal)
        this.reportingYear = [];
        this.generalIncome = [];
        this.netProfitMarginOnSales=[]
         this.SalesRale=[]
        // this.barData = [];
        newVal.forEach(item => {
          this.reportingYear.push(item.reportingYear);
          this.generalIncome.push(item.generalIncome);
          this.netProfitMarginOnSales.push(item.netProfitMarginOnSales);
          this.SalesRale.push(item.SalesRale);
        });

        // 图表设置信息
        const option = {
          title: [ {
            top: 0,
            // y: 20,
            left:16,
            text: "总收入/净利润",
            textStyle: {
              color: "#333",
              fontSize: "14",
              fontWeight: "600"
            }
          },  {
            text: "单位：百万元",
            top:36,
            left:16,
            textStyle: {
              color: "#666",
              fontSize: 12,
              fontWeight: "500"
            }
          },
          ],
          postion: "200",
          backgroundColor: "#fff", //画布背景

          legend: {
            icon: "rect",
             top: 0,
            right: 34,
            
            textStyle: {
              color: "#333",
              fontSize: 12
            },
            selectedMode: "multiple", //强制多选（ multiple ）或单选（ single ）
            data: ["总收入","净利润"],
            itemWidth: 9, // 设置宽度
            itemHeight: 9 // 设置高度
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          grid: {
              top: "26%",
                right: "8%",
                left: "8%",
                bottom: "10%"
          },
          tooltip: {
            trigger: "axis",
            // formatter:function(a){
            //     return a[0].seriesName +":"+a[0].value+"百万元" +"<br/>"+a[1].seriesName +":"+ a[1].value+"百万元"+"<br/>"
            //     +a[2].seriesName +":"+ a[2].value+"%"
            //     // console.log(a)
            // },    
            axisPointer: {
            type: "shadow",
            label: {
              show: false, //是否出现title提示文字
              backgroundColor: "#7B7DDC"
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
    yAxis:  {
              show: true,
              splitLine: {
                show: true
              },
              axisLine: {
                show:true,
                lineStyle: {
                  color: "#999"
                }
              },
                axisLabel: {
                    interval:0,
                    color: "#999",
                    // formatter: function(value) {
                    //   //X轴文字众向排列
                    //   return value.split("").join("\n");
                    // },
                    textStyle: {
                      fontSize: 12,
                      color: "#8f8f8f"
                    }
                  },
            },
          series: [
            {
              name: "总收入",
              data: this.generalIncome,                         //收入数据入口
              type: "line",
              smooth: true, //折线是否平滑
              areaStyle: {
                opacity: 0
              },
              itemStyle: {
                normal: {
                  label: { show: false }, //拐点显示数据
                  color: "#ff7676", //小圆点的颜色
                  lineStyle: {
                    color: "#ff7676", //折线的颜色
                    width:2, //宽度
                    type: "solid" //'dotted'虚线 'solid'实线
                  }
                }
              }
            },
            {
              name: "净利润",
              data: this.netProfitMarginOnSales, //收入数据入口
              
              type: "line",
              smooth: true, //是否平滑
              areaStyle: {
                opacity: 0
              },
              itemStyle: {
                normal: {
                  label: { show: false }, //拐点显示数据
                  color: "#2cabe3", //小圆点的颜色
                  lineStyle: {
                    color: "#2cabe3", //折线的颜色
                    width: 2, //宽度
                    type: "solid" //'dotted'虚线 'solid'实线
                  }
                }
              }
            }, 
            {
              name: "销售净利率",
              data: this.SalesRale, //收入数据入口
              
              type: "line",
              smooth: true, //是否平滑
              areaStyle: {
                opacity: 0
              },
              itemStyle: {
                normal: {
                  label: { show: false }, //拐点显示数据
                  color: "#FFA500", //小圆点的颜色
                  lineStyle: {
                    color: "#FFA500", //折线的颜色
                    width: 0, //宽度
                    type: "solid" //'dotted'虚线 'solid'实线
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