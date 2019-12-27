<template>
  <!-- 营业收入占比 -->
  <div>
    <div id="dht" class="dht" ref="dht"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.axios.get("/api/zb_003").then(res => {
      this.data = res.data.data;
      var myChart = echarts.init(this.$refs.dht);

      var arrName = getArrayValue(this.data, "typeName");
      var arrValue = getArrayValue(this.data, "income");
      var sumValue = eval(arrValue.join("+"));
      var objData = array2obj(this.data, "typeName");
      var optionData = getData(this.data);

      function getArrayValue(array, key) {
        var key = key || "income";
        var res = [];
        if (array) {
          array.forEach(function(t) {
            res.push(t[key]);
          });
        }
        return res;
      }

      function array2obj(array, key) {
        var resObj = {};
        for (var i = 0; i < array.length; i++) {
          resObj[array[i][key]] = array[i];
        }
        return resObj;
      }

      function getData(data) {
        var res = {
          series: [],
          yAxis: []
        };
        for (let i = 0; i < data.length; i++) {
          res.series.push({
            name: "",
            type: "pie",
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [75 - i * 15 + "%", 67 - i * 15 + "%"],
            center: ["30%", "55%"],
            label: {
              show: false //是否显示名称
            },
            itemStyle: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              borderWidth: 5
            },
            data: [
              {
                value: data[i].income,
                name: data[i].typeName
              },
              {
                value: sumValue - data[i].income,
                name: "",
                itemStyle: {
                  color: "rgba(0,0,0,0)",
                  borderWidth: 0
                },
                tooltip: {
                  show: false
                },
                hoverAnimation: false
              }
            ]
          });
          res.series.push({
            // name: '',
            type: "pie",
            silent: true,
            z: 1,
            clockWise: false, //顺时加载
            hoverAnimation: true, //鼠标移入变大
            radius: [75 - i * 15 + "%", 67 - i * 15 + "%"],
            center: ["30%", "55%"],
            label: {
              show: false
            },
            itemStyle: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              borderWidth: 5
            },
            data: [
              {
                value: 7.5, //环形切口角度
                itemStyle: {
                  color: "#aaaaaa", //环形背景色
                  borderWidth: 0
                },
                tooltip: {
                  show: false
                },
                hoverAnimation: false
              },
              {
                value: 2.5, //环形切口角度
                // name: '',
                itemStyle: {
                  color: "rgba(0,0,0,0)",
                  borderWidth: 0
                },
                tooltip: {
                  show: false
                },
                hoverAnimation: false
              }
            ]
          });
          res.yAxis.push(((data[i].income / sumValue) * 100).toFixed(2));
        }
        return res;
      }

      let option = {
        title: {
          text: "营业收入及占比",
          x: 20,
          // padding: [0, 0, 0, "20px"], //上右下左
          y: 2,
          textStyle: {
            color: "#333",
            fontSize: 14,
            fontWeight: "500"
          }
        },
        backgroundColor: "#fff",
        legend: {
          show: true,
          top: "center",
          left: "60%",
          data: arrName,
          width: 100,
          itemWidth: 15,
          itemHeight: 15,

          // padding: [0, 5],
          itemGap: 30,
          formatter: function(name) {
            //   console.log(objData[name])
            return (
              name +
              "：" +
              ((objData[name].income / sumValue) * 100).toFixed(2) +
              "%"
            );
          },
          textStyle: {
            rich: {
              title: {
                fontSize: 14,
                color: "#666"
              }
            }
          }
        },
        tooltip: {
          show: true,
          // trigger: "item",
          formatter: "{b}:{c}元；占比：({d}%)<br>"
        },
        color: ["#18b78e", "#01b3ee", "#9c73ca", "#5d83b7", "#f19ec2"],
        grid: {
          top: "17%",
          bottom: "48%",
          left: "30%",
          containLabel: false
        },
        yAxis: [
          {
            //   x:50,
            //   y:1000,
            type: "category",
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              inside: true,
              textStyle: {
                color: "#666",
                fontSize: 14,
                rich: {
                  a: {
                    fontSize: 14
                  }
                }
              },
              formatter: function(params) {
                //   console.log(params)
                return params + "{a|%}";
              },
              show: true
            },
            data: optionData.yAxis
          }
        ],
        xAxis: [
          {
            show: false
          }
        ],
        series: optionData.series
      };
      myChart.setOption(option);
      //自适应屏幕
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    });
  },
  methods: {}
};
</script>
<style  scoped>
.dht {
  width: 100%;
  margin: 0 auto;
  min-width: 380px;
  height: 100%;
  min-height: 300px;
}
</style>