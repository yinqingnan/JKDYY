<template>
  <!-- 首页折线图2 -->
  <div>
    <div id="zxt1" ref="charts" class="zxt"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
import axios from "axios";
export default {
  data() {
    return {
        companyName: [],
        contractArea:[] ,  //面积
        averageChargeUnitPrice:[], //平均收费单价
        contractProjectNumber:[],  //合同项目个数
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
            this.companyName = [];
            this.contractArea = [];
            this.averageChargeUnitPrice = [];
            this.contractProjectNumber = [];
            let array = res.data.data;
            array.forEach(element => {
              this.companyName.push(element.companyName);
              this.contractArea.push(element.contractArea.toFixed(2));
              this.averageChargeUnitPrice.push(element.averageChargeUnitPrice.toFixed(2));
              this.contractProjectNumber.push(element.contractProjectNumber.toFixed());

            });

            // 柱状图表设置信息
            const option = {
              backgroundColor: "#f0eded",
              title:[
                 {
                  text: "单位：亿m²",
                x: 20,
                // padding: [0, 0, 0, "20px"], //上右下左
                y: 28,
                textStyle: {
                  color: "#999",
                  fontSize: 12,
                  fontWeight: "600"
                }
                },

                ],
              tooltip: {             //鼠标经过是否显示弹窗
                  "trigger": "axis",
                  "axisPointer": {
                      "type": "shadow",
                      textStyle: {
                          color: "#fff"
                      }
                  },
              },
              grid: {
                 top: "20%",
                right: "8%",
                left: "10%",
                bottom: "20%"
              },
              legend: {
                right:"10",
                top: "10%",
                icon:"react",
                inactiveColor:"#999",
                 itemWidth: 9, // 设置宽度
                itemHeight: 9 ,// 设置高度
                textStyle: {
                        color: "#333",
                        fontSize: 12
                },
                data: ["面积", "项目"],
                // orient: "vertical", //垂直显示
                selectedMode: "single" //强制多选（multiple）或单选（single）
              },

              "calculable": true,
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
                    rotate:40,
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
                  name: "面积",
                  type: "line",
                  
                  // "stack": "总量",
                  barMaxWidth: 35,
                  symbol: "rect",
                  barGap: "10%",
                  itemStyle: {
                    normal: {
                      color: "#f594be",
                        lineStyle: {
                          color: "#f594be",       //折现颜色
                          width: 1
                        },
                      // label: {
                      //   show: true,
                      //   textStyle: {
                      //     color: "#f594be"
                      //   },
                      //   position: "insideTop",
                      //   formatter: function(p) {
                      //     return p.value > 0 ? p.value : "";
                      //   }
                      // }
                    }
                  },
                  data: this.contractArea
                },

                // {
                //   name: "平均单价",
                //   type: "line",
                //   barGap: "10%",
                //   barMaxWidth: 35,
                //   // "stack": "总量",
                //   itemStyle: {
                //     normal: {
                //       color: "#63B8FF",
                //        lineStyle: {
                //         color: "#63B8FF",       //折现颜色
                //         width: 1
                //       },
                //       barBorderRadius: 0,
                //       label: {
                //         show: true,
                //         position: "top",
                //         formatter: function(p) {
                //           return p.value > 0 ? p.value : "";
                //         }
                //       }
                //     }
                //   },
                //   data: this.averageChargeUnitPrice
                // },
                {
                  name: "项目",
                  type: "bar",
                  // "stack": "总量",
                  symbolSize: 4,           //拐点大小
                  symbol: "rect",
                  itemStyle: {
                    normal: {
                      color: "#2cabe3",
                     
                      barBorderRadius: 0,
                      label: {
                        show: true,
                        position: "top",
                        formatter: function(p) {
                          return p.value > 0 ? p.value : "";
                        }
                      }
                    }
                  },
                  data: this.contractProjectNumber
                }
              ]
            };

            //初始化图表
            const chartObj = echarts.init(document.getElementById("zxt1"));
            chartObj.setOption(option, true);
          });
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["region"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("zxt1"));
    window.addEventListener("resize", () => {
      chartObj.resize();
    });
  },
  methods: {}
};
</script>
<style  scoped>
.zxt {
  width: 100%;
  margin: 0 auto;
  min-width: 310px;
  height: 270px;
}
</style>