<template>
  <!-- 首页折线图 -->
  <div>
    <div id="zxt" ref="charts" class="zxt"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
import axios from "axios";
import vue from "../../main";

export default {
  data() {
    return {
      name:"净利率",      //记录每一次点击的图例名称
      srqk:[],                      //收入情况
      //   每一项单独的数据
      netProfitMarginOnSales: [], //销售净利率
      grossProfitMargin: [], //毛利率
      operatingProfitGrowthRate: [], //营业利润增长率
      returnonequity: [], //净资产收益率%（平均） ROE
      increaserateofbusinessrevenue: [], //营业收入增长率
      //  单独排名name
      companyName: [],                                //净利率排名
      grossProfitMarginname:[],                       //毛利率排名
      operatingProfitGrowthRatename:[],               //利润增长率排名
      returnonequityname:[],                          //净资产收益率排名  ROE
      increaserateofbusinessrevenuename:[],           //营业收入增长率排名
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
          .then((res) => {
            this.srqk=res.data.data
            this.companyName = [];
            this.netProfitMarginOnSales = []; //净利率
            this.grossProfitMargin = []; //毛利率
            this.operatingProfitGrowthRate = []; //利润增长率
            this.returnonequity = []; //ROE
            this.increaserateofbusinessrevenue = []; //营收增长率
            let obj = res.data.data;
            var yscompare = function(property) {
              return function(a, b) {
                let value1 = a[property];
                let value2 = b[property];
                return value2 - value1;
              };
            };
            let newobj = obj.sort(yscompare("netProfitMarginOnSales"));
            newobj.forEach((element) => {
              this.companyName.push(element.companyName);
              this.netProfitMarginOnSales.push(
                element.netProfitMarginOnSales.toFixed(2)
              ); //净利率
              this.grossProfitMargin.push(element.grossProfitMargin.toFixed(2)); //毛利率
              this.increaserateofbusinessrevenue.push(
                element.increaserateofbusinessrevenue.toFixed(2)
              ); //营收增长率
              this.operatingProfitGrowthRate.push(
                element.operatingProfitGrowthRate.toFixed(2)
              ); //利润增长率
              this.returnonequity.push(element.returnonequity.toFixed(2)); //ROE
            });

            // 柱状图表设置信息
            const option = {
              title: [
                {
                  text: "盈利能力",
                  x: 20,
                  // padding: [0, 0, 0, "20px"], //上右下左
                  y: 2,
                  textStyle: {
                    color: "#333",
                    fontSize: 14,
                    fontWeight: "600",
                  },
                },
                {
                  text: "单位：百分比",
                  x: 20,
                  // padding: [0, 0, 0, "20px"], //上右下左
                  y: 28,
                  textStyle: {
                    color: "#999",
                    fontSize: 12,
                    fontWeight: "600",
                  },
                },
              ],
              backgroundColor: "#fff",
              grid: {
                top: "20%",
                right: "8%",
                left: "10%",
                bottom: "26%",
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

                      if (that.name == "净利率") {
                        if (
                          options.series[0].data[
                            options.series[0].data.length - 1
                          ] > options.series[0].data[0]
                        ) {
                          options.series[0].data = that.netProfitMarginOnSales.reverse();
                          options.xAxis[0].data = that.companyName.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      } else if (that.name == "毛利率") {
                        if (
                          options.series[1].data[
                            options.series[1].data.length - 1
                          ] > options.series[1].data[0]
                        ) {
                          options.series[1].data = that.grossProfitMargin.reverse();
                          options.xAxis[0].data = that.grossProfitMarginname.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      }else if(that.name=="营收增长率"){
                        if (
                          options.series[2].data[
                            options.series[2].data.length - 1
                          ] > options.series[2].data[0]
                        ) {
                          options.series[2].data = that.increaserateofbusinessrevenue.reverse();
                          options.xAxis[0].data = that.increaserateofbusinessrevenuename.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      }else if(that.name=="利润增长率"){
                        if (
                          options.series[3].data[
                            options.series[3].data.length - 1
                          ] > options.series[3].data[0]
                        ) {
                          options.series[3].data = that.operatingProfitGrowthRate.reverse();
                          options.xAxis[0].data = that.operatingProfitGrowthRatename.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      }else if(that.name=="ROE"){
                           if (
                          options.series[4].data[
                            options.series[4].data.length - 1
                          ] > options.series[4].data[0]
                        ) {
                          options.series[4].data = that.returnonequity.reverse();
                          options.xAxis[0].data = that.returnonequityname.reverse();
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
                      if (that.name == "净利率") {
                        if (
                          options.series[0].data[
                            options.series[0].data.length - 1
                          ] < options.series[0].data[0]
                        ) {
                          options.series[0].data = that.netProfitMarginOnSales.reverse();
                          options.xAxis[0].data = that.companyName.reverse();
                          chartObj.setOption(options, true);
                        }
                      } else if (that.name == "毛利率") {
                        if (
                          options.series[1].data[
                            options.series[0].data.length - 1
                          ] < options.series[1].data[0]
                        ) {
                          options.series[1].data = that.grossProfitMargin.reverse();
                          options.xAxis[0].data = that.grossProfitMarginname.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      }else if(that.name=="营收增长率"){

                        if (
                          options.series[2].data[options.series[2].data.length - 1] < options.series[2].data[0]
                        ) {

                          options.series[2].data = that.increaserateofbusinessrevenue.reverse();
                          options.xAxis[0].data = that.increaserateofbusinessrevenuename.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      }else if(that.name=="利润增长率"){
                         if (
                          options.series[3].data[
                            options.series[0].data.length - 1
                          ] < options.series[3].data[0]
                        ) {
                          options.series[3].data = that.operatingProfitGrowthRate.reverse();
                          options.xAxis[0].data = that.operatingProfitGrowthRatename.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      }else if(that.name=="ROE"){
                           if (
                          options.series[4].data[
                            options.series[4].data.length - 1
                          ] < options.series[4].data[0]
                        ) {
                          options.series[4].data = that.returnonequity.reverse();
                          options.xAxis[0].data = that.returnonequityname.reverse();
                          chartObj.setOption(options, true);
                        } else {
                          return false;
                        }
                      }
                    }
                  }
                }
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
                  label: {
                    show: false, //是否出现title提示文字
                    backgroundColor: "#7B7DDC",
                  },
                },
              },
              legend: {
                // x: "8%",
                top: "2",
                right: "10",
                inactiveColor: "#999",
                textStyle: {
                  color: "#333",
                  fontSize: 12,
                },
                data: ["净利率", "毛利率", "营收增长率", "利润增长率", "ROE"],
                selectedMode: "single", //强制多选（multiple）或单选（single）
                itemWidth: 9, // 设置宽度
                itemHeight: 9, // 设置高度
                selected:{
                    '净利率':true,
                    '毛利率':false,
                    '营收增长率':false,
                    '利润增长率':false,
                    'ROE':false,
                }

              },
              xAxis: [
                {
                  type: "category",
                  color: "#59588D",
                  data: this.companyName, //X轴数据入口

                  axisLine: {
                    lineStyle: {
                      color: "#999", //X轴颜色
                    },
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
                      color: "#8f8f8f",
                    },
                  },
                  axisTick: {
                    show: false,
                  },
                  triggerEvent: true,
                },
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
                  end: 100, //数据窗口范围的结束百分比
                },
              ],
              yAxis: [
                {
                  show: true,
                  min: 0,
                  // max: 100,
                  axisLabel: {
                    // formatter: '{value}%',
                    color: "#999",
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#999", //X轴颜色
                    },
                  },
                  splitLine: {
                    show: true, //横向基准线
                    lineStyle: {
                      type: "dashed",

                      color: "#e3e3e3",
                    },
                  },
                  textStyle: {
                    fontSize: 12,
                    color: "#999",
                  },
                },
              ],

              series: [
                {
                  name: "净利率",
                  type: "bar",
                  barWidth: "14px", //宽度
                  stack: "总量",
                  symbol: "rect",

                  //  itemStyle : { normal: {label : {show: true}}},
                  itemStyle: {
                    normal: {
                      borderColor: "#fff", // 拐点边框颜色
                      // label : {show: true},
                      color: "#a889e9", //拐点颜色
                      lineStyle: {
                        color: "#a889e9", //折现颜色
                        width: 2,
                      },
                      // areaStyle: {
                      // 折线阴影
                      //     // color: '#94C9EC',
                      //     color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      //         offset: 0,
                      //         color: 'rgba(7,44,90,0.3)'
                      //     }, {
                      //         offset: 1,
                      //         color: 'rgba(0,146,246,0.9)'
                      //     }]),
                      // }
                    },
                  },
                  markPoint: {
                    itemStyle: {
                      normal: {
                        color: "red",
                      },
                    },
                  },
                  data: this.netProfitMarginOnSales, //净利润数据入口
                },
                {
                  name: "毛利率",
                  type: "bar",
                  barWidth: "14px", //宽度
                  stack: "总量",
                  symbol: "reat",
                  //  itemStyle : { normal: {label : {show: true}}},
                  itemStyle: {
                    normal: {
                      borderColor: "#fff", // 拐点边框颜色
                      // label : {show: true},
                      color: "#ff7676", //拐点颜色
                      lineStyle: {
                        color: "#ff7676", //折现颜色
                        width: 2,
                      },
                    },
                  },
                  markPoint: {
                    itemStyle: {
                      normal: {
                        color: "red",
                      },
                    },
                  },
                  data: this.grossProfitMargin, //毛利率数据入口
                },

                {
                  name: "营收增长率",
                  type: "bar",
                  barWidth: "14px", //宽度
                  stack: "总量",
                  symbol: "rect",
                  //  itemStyle : { normal: {label : {show: true}}},
                  itemStyle: {
                    normal: {
                      borderColor: "#fff", // 拐点边框颜色
                      // label : {show: true},
                      color: "#39c359", //拐点颜色
                      lineStyle: {
                        color: "#39c359", //折现颜色
                        width: 2,
                      },
                    },
                  },
                  markPoint: {
                    itemStyle: {
                      normal: {
                        color: "red",
                      },
                    },
                  },
                  data: this.increaserateofbusinessrevenue, //营收增长率数据入口
                },

                {
                  name: "利润增长率",
                  type: "bar",
                  barWidth: "14px", //宽度
                  stack: "总量",
                  symbol: "reat",
                  //  itemStyle : { normal: {label : {show: true}}},
                  itemStyle: {
                    normal: {
                      borderColor: "#fff", // 拐点边框颜色
                      // label : {show: true},
                      color: "#f594be", //拐点颜色
                      lineStyle: {
                        color: "#f594be", //折现颜色
                        width: 2,
                      },
                    },
                  },
                  markPoint: {
                    itemStyle: {
                      normal: {
                        color: "red",
                      },
                    },
                  },
                  data: this.operatingProfitGrowthRate, //利润增长率数据入口
                },
                {
                  name: "ROE",
                  type: "bar",
                  barWidth: "14px", //宽度
                  stack: "总量",
                  symbol: "reat",
                  //  itemStyle : { normal: {label : {show: true}}},
                  itemStyle: {
                    normal: {
                      borderColor: "#fff", // 拐点边框颜色
                      // label : {show: true},
                      color: "#56a8e7", //拐点颜色
                      lineStyle: {
                        color: "#56a8e7", //折现颜色
                        width: 2,
                      },
                    },
                  },
                  markPoint: {
                    itemStyle: {
                      normal: {
                        color: "red",
                      },
                    },
                  },
                  data: this.returnonequity, //ROC数据入口
                },
              ],
            };
            //初始化图表
            const chartObj = echarts.init(document.getElementById("zxt"));
            // X轴点击事件
            chartObj.on("click", function(params) {
              axios.get("/api/listedCompany01").then((res) => {
                var obj = res.data.data.filter((item) => {
                  return item.companyName == params.value;
                });
                vue.$router.push({
                  path: "/Listingoverview/companylist",
                  query: {
                    id: obj[0].id,
                  },
                });
              });
            });
            // 图例点击事件
            chartObj.on('legendselectchanged',obj=>{
                var options=chartObj.getOption();
                let data=that.srqk;
                that.name=obj.name;
                if(obj.name=="净利率"){
                  // that.name=obj.name
                }else if(obj.name=="毛利率"){
                let compare = function(val) {
                  return function(a, b) {
                    let value1 = a[val];
                    let value2 = b[val];
                    return value2 - value1;
                  };
                };
                that.grossProfitMargin=[];
                that.grossProfitMarginname=[];
                let newobj = data.sort(compare("grossProfitMargin"));
                 newobj.forEach(element => {
                  that.grossProfitMarginname.push(element.companyName);
                  that.grossProfitMargin.push(element.grossProfitMargin.toFixed(2));
                });
                options.series[1].data = that.grossProfitMargin;
                options.xAxis[0].data = that.grossProfitMarginname;
                chartObj.setOption(options, true);
                }else if(obj.name=="营收增长率"){
                  let compare = function(val) {
                  return function(a, b) {
                    let value1 = a[val];
                    let value2 = b[val];
                    return value2 - value1;
                  };
                };
                  that.increaserateofbusinessrevenue=[]
                  that.increaserateofbusinessrevenuename=[]
                  let newobj = data.sort(compare("increaserateofbusinessrevenue"));
                  newobj.forEach(element => {
                    that.increaserateofbusinessrevenuename.push(element.companyName);
                    that.increaserateofbusinessrevenue.push(element.increaserateofbusinessrevenue.toFixed(2));
                  });
                  options.series[2].data = that.increaserateofbusinessrevenue;
                  options.xAxis[0].data = that.increaserateofbusinessrevenuename;
                  chartObj.setOption(options, true);
                }else if(obj.name=="利润增长率"){
                    let compare = function(val) {
                  return function(a, b) {
                    let value1 = a[val];
                    let value2 = b[val];
                    return value2 - value1;
                  };
                };
                  that.operatingProfitGrowthRate=[]
                  that.operatingProfitGrowthRatename=[]
                  let newobj = data.sort(compare("operatingProfitGrowthRate"));
                  newobj.forEach(element => {
                    that.operatingProfitGrowthRatename.push(element.companyName);
                    that.operatingProfitGrowthRate.push(element.operatingProfitGrowthRate.toFixed(2));
                  });
                  options.series[3].data = that.operatingProfitGrowthRate;
                  options.xAxis[0].data = that.operatingProfitGrowthRatename;
                  chartObj.setOption(options, true);

                }else if(obj.name=="ROE"){
                  let compare = function(val) {
                  return function(a, b) {
                    let value1 = a[val];
                    let value2 = b[val];
                    return value2 - value1;
                  };
                };
                  that.returnonequity=[]
                  that.returnonequityname=[]
                  let newobj = data.sort(compare("returnonequity"));
                  newobj.forEach(element => {
                    that.returnonequityname.push(element.companyName);
                    that.returnonequity.push(element.returnonequity.toFixed(2));
                  });
                  options.series[4].data = that.returnonequity;
                  options.xAxis[0].data = that.returnonequityname;
                  chartObj.setOption(options, true);
                }
            })

            chartObj.setOption(option, true);
          });
      },
    },
    deep: true, //深度监测
    immediate: true, //将立即以表达式的当前值触发回调
  },
  props: ["region"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("zxt"));
    window.addEventListener("resize", () => {
      chartObj.resize();
    });
  },
  methods: {},
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
