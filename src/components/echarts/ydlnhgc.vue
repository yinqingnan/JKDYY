<!-- 项目能耗用水全年-->
<template>
  <div>
    <div id="zzt1" class="ECHARTS"></div>
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
      nhgc: [], //能耗构成
      title: [], //title名称
      zb: [] //指标数值
    };
  },
  props: ["xmid", "num"],
  watch: {
    num(newVal, value) {
      const chartObj = echarts.init(document.getElementById("zzt1"));
      chartObj.resize();
    },
    xmid: {
      handler(newVal) {
        // console.log(newVal)
        this.axios
          .get("/api/projectElectMType3?projectId=" + newVal + "&topcount=6")
          .then(res => {
            this.nhgc = [];
            this.title = [];
            this.zb = [];
            res.data.data.forEach(element => {
              this.zb.push(element.companyDosage);
              this.title.push(element.itemName);
              this.nhgc.push(element.dosage);
            });
            const option = {
              title: [
                {
                  text: "单位：度",
                  top: "10%",
                  left: "12%",
                  textStyle: {
                    color: "#333",
                    fontSize: 14,
                    fontWeight: "500"
                  }
                }
              ],
              tooltip: {
                showContent: true,
                trigger: "axis",
                formatter: function(a) {
                  return '项 &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;目' + ":" + a[0].value + "度"+'<br/>' +'公司平均'+ ":" + a[1].value + "度";
                },
                axisPointer: {
                  type: "shadow", //设置为none为不显示线条，设为 shadow 为柱状图显示阴影   设为cross为 横向虚线基准线
                  label: {
                    show: false, //是否出现title提示文字
                    backgroundColor: "#fff"
                  }
                }
              },
              grid: {
                left: "12%",
                right: "10%",
                bottom: "20%",
                containLabel: false
              },
              legend: {
                data: this.title,
                align: "right",
                right: 10
              },
              xAxis: [
                {
                  type: "category",
                  data: this.title,
                  axisPointer: {
                    type: "shadow",
                    shadowStyle: {
                      // color: "blue",
                      opacity: 1
                    }
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    symbol: ["none", "arrow"],
                    lineStyle: {
                      color: "#666"
                    }
                  },
                  axisLabel: {
                    show: true,
                    interval: 0, //设置文字间距
                    rotate: 40,
                    textStyle: {
                      color: "#666"
                    }
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisLabel: {
                    formatter: "{value}"
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    symbol: ["none", "arrow"],
                    lineStyle: {
                      color: "#666"
                    }
                  }
                }
              ],
              series: [
                {
                  type: "bar",
                  barWidth: 16,
                  data: this.nhgc,
                  itemStyle: {
                    normal: {
                      color: "#49a4d9"
                    }
                  }
                },
                {
                  type: "bar",
                  barWidth: 16,
                  data: this.zb,
                  itemStyle: {
                    normal: {
                      color: "#4aa658"
                    }
                  }
                }
              ]
            };

            //初始化图表
            const chartObj = echarts.init(document.getElementById("zzt1"));
            chartObj.setOption(option, true);
            // 设置自适应
            window.onresize = function() {
              chartObj.resize();
            };
          });
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },

  mounted() {
    const chartObj = echarts.init(document.getElementById("zzt1"));
    window.addEventListener("resize", () => {
      // console.log(chartObj)
      chartObj.resize();
    });
  },
  methods: {}
};
</script>
<style scoped>
.ECHARTS {
  width: 100%;
  min-width: 420px;
  height: 420px;
}
</style>
