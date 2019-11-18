<template>
  <!-- 首页柱状图 -->
  <div>
    <div id="zzt" ref="charts" class="zzt"></div>
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
          .get("/api/listedCompany11?reportingType="+id +"&reportingYear=" +year) //正式默认第一条数据
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
              backgroundColor: " #f0eded",
              title: {
                text: "单位：百万元",
                x: "right",
                padding: [0, 20, 0, 0], //上右下左
                y: 30,
                textStyle: {
                  color: "#333",
                  fontSize: 14,
                  fontWeight: "600"
                }
              },
                    tooltip: {
                showContent:true,  
                // trigger: "axis",
                formatter:function(a){
                  // console.log(a)
                    return a.seriesName +":"+a.value
                }

            },
              legend: {
                // show:false,
                // icon: "circle",
                x: "8%",
                top: "10%",
                inactiveColor:"#999",
                textStyle: {
                  color: "#333",
                  fontSize: 14
                },
                data: ["总营收", "净利润"],
                selectedMode: "single", //强制多选（multiple）或单选（single）
                itemWidth: 14, // 设置宽度
                itemHeight: 14 // 设置高度
              },
              grid: {
                top: "40%",
                right: "4%",
                left: "4%",
                bottom: "50%"
              },
              xAxis: [
                {
                  type: "category",
                  color: "#59588D",
                  data:   this.companyName, //X轴数据入口
                  axisPointer: {
                    type: "line"
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#333" //X轴颜色
                    }
                  },
                  axisLabel: {
                    interval:0,  
                      color: '#333',
                      formatter: function (value) {               //X轴文字众向排列
                              return value.split("").join("\n")
                          },
                    textStyle: {
                      fontSize: 12
                    }
                  },
                  axisTick: {
                    show: false
                  }
                }
              ],
              yAxis: [
                {
                  show: false,
                  min: 0,
                  // max: 100,
                  axisLabel: {
                    // formatter: '{value}%',
                    color: "#59588D"
                  },
                  axisLine: {
                    show: false
                  },
                  splitLine: {
                    lineStyle: {
                      color: "#272456"
                    }
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
                        0,0,0,1,[
                          {
                            offset: 0,
                            color: "#69b4e2" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#688de5" // 100% 处的颜色
                          }
                        ],
                        false
                      ),
                      barBorderRadius: [30, 30, 0, 0], //轴的圆角度数
                      // shadowColor: "rgba(0,255,225,1)",
                      // shadowBlur: 10     //阴影
                    }
                  },
                 
                },
                {
                  name: "净利润",
                  type: "bar",
                  data: this.netProfitMargin, //显示数据的接口
                  barWidth: "14px", //宽度
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,0,0,1,[
                          {
                            offset: 0,
                            color: "#69b4e2" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#688de5" // 100% 处的颜色
                          }
                        ],
                        false
                      ),
                      barBorderRadius: [30, 30, 0, 0], //轴的圆角度数
                      // shadowColor: "rgba(0,255,225,1)",
                      // shadowBlur: 10     //阴影
                    }
                  },

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
  min-width: 340px;
  height: 280px;
}
</style>