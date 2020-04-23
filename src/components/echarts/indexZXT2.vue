<template>
  <!-- 首页折线图2 -->
  <div>
    <div id="zxt1" ref="charts" class="zxt"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
import axios from "axios";
import vue from "../../main";

export default {
  data() {
    return {
      name:"面积",    //初始的图例名称
      ssgsgm: [],
      companyName: [], //面积名称
      HTname: [], //合同名称
      contractArea: [], //面积
      contractAreaSX: [], //面积升序
      contractProjectNumber: [], //合同项目个数
      contractProjectNumberSX: [] //合同项目个数升序
    };
  },
  watch: {
    region: {
      handler(newVal) {
        const that = this;
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
            //面积  ，项目
            this.ssgsgm = res.data.data;
            let obj = res.data.data;
            var yscompare = function(property) {
              return function(a, b) {
                let value1 = a[property];
                let value2 = b[property];
                return value2 - value1;
              };
            };
            let newobj = obj.sort(yscompare("contractArea"));

            this.companyName = [];
            this.contractArea = [];
            this.contractProjectNumber = [];

            newobj.forEach(element => {
              this.companyName.push(element.companyName);
              this.contractArea.push(element.contractArea.toFixed(2));
              this.contractProjectNumber.push(
                element.contractProjectNumber.toFixed()
              );
            });

            // 柱状图表设置信息
            const option = {
              backgroundColor: "#fff",
              title: [
                {
                  text: "单位：面积（亿m²）| 项目（个）",
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
                  text: "管理规模",
                  x: 20,
                  // padding: [0, 0, 0, "20px"], //上右下左
                  y: 2,
                  textStyle: {
                    color: "#333",
                    fontSize: 14,
                    fontWeight: "600"
                  }
                }
              ],
              tooltip: {
                //鼠标经过是否显示弹窗
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
                  textStyle: {
                    color: "#fff"
                  }
                }
              },
              grid: {
                top: "20%",
                right: "8%",
                left: "10%",
                bottom: "26%"
              },
              toolbox: {
                padding: [50,30,0,0],
                show: true,
                feature: {
                  myTool: {
                    //自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                    show: true, //是否显示
                    title: "降序", //鼠标移动上去显示的文字
                    icon:
                      "M279.15323 958.059228l217.110799-363.160177-141.539436 0L354.724593 63.957829l-151.123938 0 0 530.943021L62.057421 594.900849 279.15323 958.059228 279.15323 958.059228zM570.078783 64.464885l386.443791 0 0 108.976114L570.078583 173.440999 570.078783 64.464885 570.078783 64.464885zM570.078783 369.594007 878.364965 369.594007l0-108.974515L570.078783 260.619492 570.078783 369.594007zM570.078783 565.747016l230.128573 0 0-108.976114L570.078783 456.770901 570.078783 565.747016 570.078783 565.747016zM570.078783 761.904621l151.972163 0L722.050945 652.930305l-151.972163 0L570.078783 761.904621zM570.078783 958.059228l73.813355 0 0-108.974315-73.813355 0L570.078783 958.059228z", //图标
                    onclick: function() {
                      //点击事件,这里的option1是chart的option信息

                      var options = chartObj.getOption();

                      if (that.name == "面积") {
                        
                        if (
                          options.series[0].data[
                            options.series[0].data.length - 1
                          ] > options.series[0].data[0]
                        ) {
                          options.series[0].data = that.contractArea.reverse();
                          options.xAxis[0].data = that.companyName.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      } else if (that.name == "项目") {
                        if (
                          options.series[1].data[
                            options.series[0].data.length - 1
                          ] > options.series[1].data[0]
                        ) {
                          // console.log(2)
                          options.series[1].data = that.contractProjectNumber.reverse();
                          options.xAxis[0].data = that.HTname.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      }
                    }
                  },
                  myTool2: {
                    //自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                    show: true, //是否显示
                    title: "升序", //鼠标移动上去显示的文字
                    icon:
                      "M569.508769 653.352619l151.594419 0 0 108.819221-151.594419 0L569.508769 653.352619zM569.508769 65.693452l385.479045 0 0 108.828814L569.508569 174.522266 569.508769 65.693452 569.508769 65.693452zM569.508769 261.583239l307.513506 0 0 108.819021L569.508769 370.402259 569.508769 261.583239 569.508769 261.583239zM569.508769 457.463032l229.552363 0 0 108.821019-229.552363 0C569.508769 566.284051 569.508769 457.463032 569.508769 457.463032zM569.508769 849.232612l73.62868 0 0 108.826815-73.62868 0L569.508769 849.232612zM354.693414 427.846912l0 530.212516L203.94622 958.059428 203.94622 427.846912 62.754748 427.846912 279.308125 65.187795 495.87849 427.846912 354.693414 427.846912z ", //图标
                    onclick: function() {
                      //点击事件,这里的option1是chart的option信息
                      var options = chartObj.getOption();
                      if (that.name == "面积") {
                        if (
                          options.series[0].data[
                            options.series[0].data.length - 1
                          ] < options.series[0].data[0]
                        ) {
                          options.series[0].data = that.contractArea.reverse();
                          options.xAxis[0].data = that.companyName.reverse();
                          chartObj.setOption(options, true);
                        }
                      } else if (that.name == "项目") {
                        if (
                          options.series[1].data[
                            options.series[0].data.length - 1
                          ] < options.series[1].data[0]
                        ) {
                          options.series[1].data = that.contractProjectNumber.reverse();
                          options.xAxis[0].data = that.HTname.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      }
                    }
                  }
                }
              },
              legend: {
                right: "10",
                top: "10%",
                icon: "react",
                inactiveColor: "#999",
                itemWidth: 9, // 设置宽度
                itemHeight: 9, // 设置高度
                textStyle: {
                  color: "#333",
                  fontSize: 12
                },
                data: ["面积", "项目"],
                // orient: "vertical", //垂直显示
                selectedMode: "single", //强制多选（multiple）或单选（single）
                selected: {
                  面积: true,
                  项目: false
                }
              },

              calculable: true,
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
                    interval: 0,
                    rotate: 30,
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
                  },
                  triggerEvent: true
                }
              ],
              dataZoom: [
                //滚动条功能
                {
                  type: "slider",
                  show: true, //是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
                  backgroundColor: "rgba(47,69,84,0)", //组件的背景颜色
                  //  dataBackground:{                        //数据阴影的样式。
                  //     lineStyle:mylineStyle,              //阴影的线条样式
                  //     areaStyle:myareaStyle,              //阴影的填充样式
                  // },
                  fillerColor: "rgba(167,183,204,0.4)", //选中范围的填充颜色。
                  borderColor: "#ddd", //边框颜色。
                  xAxisIndex: [0], //设置 dataZoom-inside 组件控制的 x轴,可以用数组表示多个轴
                  height: 20,
                  left: "9%",
                  bottom: 0,
                  start: 0, //数据窗口范围的起始百分比
                  end: 100 //数据窗口范围的结束百分比
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
                      type: "dashed",
                      color: "#e3e3e3"
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
                  type: "bar",
                  symbol: "rect",
                  barGap: "10%",
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
                            color: "#f594be" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#f594be" // 100% 处的颜色
                          }
                        ],
                        false
                      ),
                      barBorderRadius: [0, 0, 0, 0] //轴的圆角度数
                      // shadowColor: "rgba(0,255,225,1)",
                      // shadowBlur: 10     //阴影
                    }
                  },
                  data: this.contractArea
                },
                {
                  name: "项目",
                  type: "bar",
                  barWidth: "14px", //宽度
                  symbol: "rect",
                  itemStyle: {
                    normal: {
                      color: "#56a8e7",

                      barBorderRadius: 0
                      // label: {
                      //   show: true,
                      //   position: "top",
                      //   formatter: function(p) {
                      //     return p.value > 0 ? p.value : "";
                      //   }
                      // }
                    }
                  },
                  data: this.contractProjectNumber
                }
              ]
            };

            //初始化图表
            const chartObj = echarts.init(document.getElementById("zxt1"));
            // X轴点击事件
            chartObj.on("click", function(params) {
              axios.get("/api/listedCompany01").then(res => {
                var obj = res.data.data.filter(item => {
                  return item.companyName == params.value;
                });
                vue.$router.push({
                  path: "/Listingoverview/companylist",
                  query: {
                    id: obj[0].id
                  }
                });
              });
            });

            // X轴点击事件
            chartObj.on("click", function(params) {
              axios.get("/api/listedCompany01").then(res => {
                var obj = res.data.data.filter(item => {
                  return item.companyName == params.value;
                });
                vue.$router.push({
                  path: "/Listingoverview/companylist",
                  query: {
                    id: obj[0].id
                  }
                });
              });
            });
            // 图例点击事件
            chartObj.on("legendselectchanged", obj => {
              var options = chartObj.getOption();
              let data = that.ssgsgm;
              if (obj.name == "项目") {
                that.name = obj.name;
                let compare = function(val) {
                  return function(a, b) {
                    let value1 = a[val];
                    let value2 = b[val];
                    return value2 - value1;
                  };
                };
                let newobj = data.sort(compare("contractProjectNumber"));
                that.HTname = []; //合同名称升序
                that.contractArea = []; //合同数据升序
                that.contractProjectNumber = []; //项目个数
                newobj.forEach(element => {
                  that.HTname.push(element.companyName);
                  that.contractArea.push(element.contractArea.toFixed(2));
                  that.contractProjectNumber.push(
                    element.contractProjectNumber.toFixed(2)
                  );
                });

                options.series[1].data = that.contractProjectNumber;
                options.xAxis[0].data = that.HTname;
                chartObj.setOption(options, true);
              } else if (obj.name == "面积") {
                that.name = obj.name;
                let compare = function(val) {
                  return function(a, b) {
                    let value1 = a[val];
                    let value2 = b[val];
                    return value2 - value1;
                  };
                };
                let newobj = data.sort(compare("contractArea"));
                that.companyName = []; //合同名称升序
                that.contractArea = []; //合同数据升序
                that.contractProjectNumber = []; //项目个数
                newobj.forEach(element => {
                  that.companyName.push(element.companyName);
                  that.contractArea.push(element.contractArea.toFixed(2));
                  that.contractProjectNumber.push(
                    element.contractProjectNumber.toFixed(2)
                  );
                });

                options.series[0].data = that.contractArea;
                options.xAxis[0].data = that.companyName;
                chartObj.setOption(options, true);
              }
            });

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
<style scoped>
.zxt {
  width: 100%;
  margin: 0 auto;
  min-width: 310px;
  height: 270px;
}
</style>
