<template>
  <!-- 首页柱状图 -->
  <div>
    <div id="zzt" class="zzt"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
import axios from "axios";
export default {
  data() {
    return {
      companyName: [],
      generalIncome: [],
      netProfitMargin: []
    };
  },
  watch: {
    region: {
      handler(newVal) {
        // console.log(newVal.slice(0,4))
        // console.log(newVal.slice(4))
        let year = newVal.slice(0, 4);
        let id = encodeURI(newVal.slice(4));
        axios
          .get(
            "/api/listedCompany11?reportingType=" +
              id +
              "&reportingYear=" +
              year
          ) //正式默认第一条数据
          .then(res => {
            // console.log(res)
            this.companyName = [];
            this.generalIncome = [];
            this.netProfitMargin = [];
            let array = res.data.data;
            array.forEach(element => {
              this.companyName.push(element.companyName);
              this.generalIncome.push(element.generalIncome.toFixed(2));
              this.netProfitMargin.push(element.netProfitMargin.toFixed(2));
            });

            // 柱状图表设置信息
            const option = {
              backgroundColor: " #fff",
              title: [
                {
                text: "单位：百万元",
                x: 20,
                // padding: [0, 0, 0, "20px"], //上右下左
                y: 28,
                textStyle: {
                  color: "#999",
                  fontSize: 12,
                  fontWeight: "600"
                }
              },
              {
                text: "收入情况",
                x: 20,
                // padding: [0, 0, 0, "20px"], //上右下左
                y: 2,
                textStyle: {
                  color: "#333",
                  fontSize: 14,
                  fontWeight: "600"
                }
              },
              ],
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
                  label: {
                    show: false, //是否出现title提示文字
                    backgroundColor: "#7B7DDC"
                  }
                }
              },
              legend: {
                // x: "8%",
                top: "2",
                right: "10",
                inactiveColor: "#999",
                textStyle: {
                  color: "#333",
                  fontSize: 12
                },
                data: ["总营收", "净利润"],
                selectedMode: "single", //强制多选（ multiple ）或单选（ single ）
                itemWidth: 9, // 设置宽度
                itemHeight: 9 // 设置高度
              },
              grid: {
                top: "20%",
                right: "8%",
                left: "10%",
                bottom: "26%"
              },
              xAxis: [
                {
                  type: "category",
                  color: "#59588D",
                  data: this.companyName, //X轴数据入口

                  axisLine: {
                    lineStyle: {
                      color: "#999" //X轴颜色
                    }
                  },
                  axisLabel: {
                    interval:0,
                    rotate:30,
                    color: "#333",
                    // formatter: function(value) { 
                    //   //X轴文字众向排列
                    //   return value.split("").join("\n");
                    // },
                    textStyle: {
                      fontSize: 12,
                      color: "#8f8f8f"
                    } 
                  },
                  axisTick: {
                    show: false
                  }
                }
              ],
                dataZoom: [        //滚动条功能
                  {
                      type: 'slider',
                      show: true,    //是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
                       backgroundColor:"rgba(47,69,84,0)",  //组件的背景颜色
                      //  dataBackground:{                        //数据阴影的样式。
                      //     lineStyle:mylineStyle,              //阴影的线条样式
                      //     areaStyle:myareaStyle,              //阴影的填充样式
                      // },
                      fillerColor:"rgba(167,183,204,0.4)",  //选中范围的填充颜色。
                      borderColor:"#ddd",                     //边框颜色。
                      xAxisIndex:[0],                            //设置 dataZoom-inside 组件控制的 x轴,可以用数组表示多个轴
                      height:20,
                      left: '9%',
                      bottom: 0,
                      start: 0,           //数据窗口范围的起始百分比
                      end: 100,             //数据窗口范围的结束百分比
                  }
              ],
              yAxis: [
                {
                  show: true,
                  min: 0,
                  // max: 100,
                  axisLabel: {
                    // formatter: '{value}%',
                    color: "#999"
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#999" //X轴颜色
                    }
                  },
                  splitLine: {
                    show: true, //横向基准线
                    lineStyle: {
                      color: "#999"
                    }
                  },
                  textStyle: {
                      fontSize: 12,
                      color: "#999"
                  }
                }
              ],
              series: [
                {
                  name: "总营收",
                  type: "bar",
                  data: this.generalIncome, //显示数据的接口
                  barWidth: "14px", //宽度
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#56a8e7" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#56a8e7" // 100% 处的颜色
                          }
                        ],
                        false
                      ),
                      barBorderRadius: [0, 0, 0, 0] //轴的圆角度数
                      // shadowColor: "rgba(0,255,225,1)",
                      // shadowBlur: 10     //阴影
                    }
                  }
                },
                {
                  name: "净利润",
                  type: "bar",
                  data: this.netProfitMargin, //显示数据的接口
                  barWidth: "14px", //宽度
                  
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                            offset: 0,
                            color: "#39c359" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#39c359" // 100% 处的颜色
                          }
                        ],
                        false
                      ),
                      barBorderRadius: [0, 0, 0, 0] //轴的圆角度数
                      // shadowColor: "rgba(0,255,225,1)",
                      // shadowBlur: 10     //阴影
                    }
                  }
                }
              ]
            };
            //初始化图表
            const chartObj = echarts.init(document.getElementById("zzt"));
            chartObj.setOption(option, true);
          });
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["region"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("zzt"));
    window.addEventListener("resize", () => {
      chartObj.resize();
    });
  },
  methods: {}
};
</script>
<style  scoped>
.zzt {
  width: 100%;
  margin: 0 auto;
  min-width: 339px;
  height: 270px;
}
</style>