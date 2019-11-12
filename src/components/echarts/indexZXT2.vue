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
              backgroundColor: "#fff",
              title:[
                {text: '面积：亿m²',
                    x: 'right',
                     padding: [0,58, 0, 0], //上右下左
                    y: 48,
                textStyle: {
                  color: "#666",
                  fontSize: 10,
                  // fontWeight: "600"
                }
                },
                {text: '收费单价：元/m²/月',
                    x: 'right',
                    padding: [0, 20, 0, 0], //上右下左
                    y: 64,
                    textStyle: {
                      color: "#666",
                      fontSize: 10,
                      // fontWeight: "600"
                    }
                
                },

                {text: '项目数量：个',
                   x: 'right',
                   padding: [0, 54, 0, 0], //上右下左
                    y: 82,
                    textStyle: {
                      color: "#666",
                      fontSize: 10,
                      // fontWeight: "600"
                    }
                
                
                }
                ],
              // "tooltip": {             //鼠标经过是否显示弹窗
              //     "trigger": "axis",
              //     "axisPointer": {
              //         "type": "shadow",
              //         textStyle: {
              //             color: "#fff"
              //         }

              //     },
              // },
              grid: {
                top: "20%",
                right: "10%",
                left: "10%",
                bottom: "14%",
                containLabel: true
              },
              legend: {
                x: "12%",
                top: "10%",
                inactiveColor:"#999",
                textStyle: {
                        color: "#333",
                        fontSize: 14
                },
                data: ["面积", "平均单价", ""],
                // orient: "vertical", //垂直显示
                selectedMode: "single" //强制多选（multiple）或单选（single）
              },

              "calculable": true,
              xAxis: [
                {
                  type: "category",
                  axisLine: {
                    lineStyle: {
                      color: "#333"
                    }
                  },
                  splitLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  },
                  splitArea: {
                    show: false
                  },
                  axisLabel: {
                      interval:0,  
                      color: '#333',
                      formatter: function (value) {               //X轴文字众向排列
                              return value.split("").join("\n")
                          }
                  },
                  data: this.companyName//X轴名称接口
                }
              ],
              yAxis: [
                {
                  show: false,
                  type: "value",
                  splitLine: {
                    show: false
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#90979c"
                    }
                  },
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    interval: 0
                  },
                  splitArea: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  name: "面积",
                  type: "line",
                  
                  // "stack": "总量",
                  barMaxWidth: 35,
                  barGap: "10%",
                  itemStyle: {
                    normal: {
                      color: "#666",
                      label: {
                        show: true,
                        textStyle: {
                          color: "#333"
                        },
                        position: "insideTop",
                        formatter: function(p) {
                          return p.value > 0 ? p.value : "";
                        }
                      }
                    }
                  },
                  data: this.contractArea
                },

                {
                  name: "平均单价",
                  type: "line",
                  barGap: "10%",
                  barMaxWidth: 35,
                  // "stack": "总量",
                  itemStyle: {
                    normal: {
                      color: "#666",
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
                  data: this.averageChargeUnitPrice
                },
                {
                  name: "项目",
                  type: "bar",
                  // "stack": "总量",
                  symbolSize: 4,           //拐点大小
                  symbol: "circle",
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
  height: 468px;
}
</style>