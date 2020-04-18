<template>
  <!-- 首页柱状图 -->
  <div>
    <div id="zzt" class="zzt"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
import axios from "axios";
import vue from "../../main";
export default {
  data() {
    return {
      name:"总营收",
      arr:[],
      srqkdata:[],
      companyName: [],
      jlrName:[],
      generalIncomeSX: [],
      generalIncome: [],      
      netProfitMargin: [],
      netProfitMarginSX: [],

    };
  },created(){
    
  },

  watch: {
    region: {
      handler(val) {
        // console.log(val)
        const that = this;
        let year = val.slice(0, 4);
        let id = encodeURI(val.slice(4));
      this.axios
        .get(
          "/api/listedCompany11?reportingType=" + id + "&reportingYear=" + year
        )
        .then((res) => {
          
          // 总营收，净利润
          this.srqkdata = res.data.data;
          let obj = res.data.data;
           var  yscompare =function(property) {
            return function(a, b) {
              let value1 = a[property];
              let value2 = b[property];
              return value1 - value2;
            };
          }
         let newobj=obj.sort(yscompare("generalIncome"));   //总营收升序
          this.companyName = [];
          this.generalIncome = [];
          this.netProfitMargin = [];
            newobj.forEach((element) => {
              this.companyName.push(element.companyName);
              this.generalIncome.push(element.generalIncome.toFixed(2));
              this.netProfitMargin.push(element.netProfitMargin.toFixed(2))
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
                    fontWeight: "600",
                  },
                },
                {
                  text: "收入情况",
                  x: 20,
                  // padding: [0, 0, 0, "20px"], //上右下左
                  y: 2,
                  textStyle: {
                    color: "#333",
                    fontSize: 14,
                    fontWeight: "600",
                  },
                },
              ],
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
              toolbox: {
                      padding:30,
                      show : true,
                      feature : {
                          myTool:{//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字    
                                 show:true,//是否显示    
                                 title:'降序', //鼠标移动上去显示的文字    
                                 icon:'M279.15323 958.059228l217.110799-363.160177-141.539436 0L354.724593 63.957829l-151.123938 0 0 530.943021L62.057421 594.900849 279.15323 958.059228 279.15323 958.059228zM570.078783 64.464885l386.443791 0 0 108.976114L570.078583 173.440999 570.078783 64.464885 570.078783 64.464885zM570.078783 369.594007 878.364965 369.594007l0-108.974515L570.078783 260.619492 570.078783 369.594007zM570.078783 565.747016l230.128573 0 0-108.976114L570.078783 456.770901 570.078783 565.747016 570.078783 565.747016zM570.078783 761.904621l151.972163 0L722.050945 652.930305l-151.972163 0L570.078783 761.904621zM570.078783 958.059228l73.813355 0 0-108.974315-73.813355 0L570.078783 958.059228z', //图标    
                                onclick:function() {//点击事件,这里的option1是chart的option信息    
                                        var options = chartObj.getOption();
                                        if(that.name=="总营收"){
                                            if(options.series[0].data[options.series[0].data.length-1]>options.series[0].data[0]){
                                              options.series[0].data=that.generalIncome.reverse()
                                              options.xAxis[0].data=that.companyName.reverse()
                                              chartObj.setOption(options, true);
                                            }else{
                                              return false
                                            }
                                        }else if(that.name=="净利润"){
                                          if(options.series[1].data[options.series[0].data.length-1]>options.series[1].data[0]){
                                              options.series[1].data=that.netProfitMarginSX.reverse()
                                              options.xAxis[0].data=that.jlrName.reverse()
                                              chartObj.setOption(options, true);
                                          }else{
                                            return false
                                          }
                                        }
                                       }    
                          },
                          myTool2:{//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字    
                          show:true,//是否显示    
                          title:'升序', //鼠标移动上去显示的文字    
                          icon:'M569.508769 653.352619l151.594419 0 0 108.819221-151.594419 0L569.508769 653.352619zM569.508769 65.693452l385.479045 0 0 108.828814L569.508569 174.522266 569.508769 65.693452 569.508769 65.693452zM569.508769 261.583239l307.513506 0 0 108.819021L569.508769 370.402259 569.508769 261.583239 569.508769 261.583239zM569.508769 457.463032l229.552363 0 0 108.821019-229.552363 0C569.508769 566.284051 569.508769 457.463032 569.508769 457.463032zM569.508769 849.232612l73.62868 0 0 108.826815-73.62868 0L569.508769 849.232612zM354.693414 427.846912l0 530.212516L203.94622 958.059428 203.94622 427.846912 62.754748 427.846912 279.308125 65.187795 495.87849 427.846912 354.693414 427.846912z ', //图标    
                            onclick:function() {//点击事件,这里的option1是chart的option信息    
                              var options = chartObj.getOption();
                              if(that.name=="总营收"){
                                 if(options.series[0].data[options.series[0].data.length-1]<options.series[0].data[0]){
                                    options.series[0].data=that.generalIncome.reverse()
                                    options.xAxis[0].data=that.companyName.reverse()
                                    chartObj.setOption(options, true);
                                 }
                              }else if(that.name=="净利润"){
                                 if(options.series[1].data[options.series[0].data.length-1]<options.series[1].data[0]){
                                    options.series[1].data=that.netProfitMarginSX.reverse()
                                    options.xAxis[0].data=that.jlrName.reverse()
                                    chartObj.setOption(options, true);
                                 }else{
                                   return false 
                                 }
                              }
                            
                            }    
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
                  fontSize: 12,
                },
                data: ["总营收", "净利润"],
                selectedMode: "single", //强制多选（ multiple ）或单选（ single ）
                itemWidth: 9, // 设置宽度
                itemHeight: 9, // 设置高度
                selected:{
                    '总营收':true,
                    '净利润':false,
                }

              },
              grid: {
                top: "20%",
                right: "8%",
                left: "10%",
                bottom: "26%",
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
                      color: "#e3e3e3",
                      type: "dashed",
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
                            color: "#56a8e7", // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#56a8e7", // 100% 处的颜色
                          },
                        ],
                        false
                      ),
                      barBorderRadius: [0, 0, 0, 0], //轴的圆角度数
                      // shadowColor: "rgba(0,255,225,1)",
                      // shadowBlur: 10     //阴影
                    },
                  },
                },
                {
                  name: "净利润",
                  type: "bar",
                  data: this.netProfitMarginSX, //显示数据的接口
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
                            color: "#39c359", // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#39c359", // 100% 处的颜色
                          },
                        ],
                        false
                      ),
                      barBorderRadius: [0, 0, 0, 0], //轴的圆角度数
                      // shadowColor: "rgba(0,255,225,1)",
                      // shadowBlur: 10     //阴影
                    },
                  },
                },
              ],
            };
            //初始化图表
            const chartObj = echarts.init(document.getElementById("zzt"));
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
            chartObj.on("legendselectchanged",obj=>{
               var options = chartObj.getOption();
                  let data=that.srqkdata
                if(obj.name=="净利润"){
                  that.name=obj.name
                  let  compare =function(val) {
                    return function(a, b) {
                      let value1 = a[val];
                      let value2 = b[val];
                      return value1 - value2;
                    };
                  }
                  let newobj=data.sort(compare("netProfitMargin")); 
                  that.jlrName=[]
                  that.generalIncomeSX=[]
                  that.netProfitMarginSX=[]
                  newobj.forEach((element) => {
                      that.jlrName.push(element.companyName);
                      that.generalIncomeSX.push(element.generalIncome.toFixed(2));
                      that.netProfitMarginSX.push(element.netProfitMargin.toFixed(2))
                  });   
                  options.series[1].data=that.netProfitMarginSX
                  options.xAxis[0].data=that.jlrName
                  chartObj.setOption(options, true);
                }else if(obj.name=="总营收"){
                    that.name=obj.name
                    let  compare =function(val) {
                    return function(a, b) {
                      let value1 = a[val];
                      let value2 = b[val];
                      return value1 - value2;
                    };
                  }
                  let newobj=data.sort(compare("generalIncome")); 
                  that.companyName=[]
                  that.generalIncome=[]
                  that.netProfitMargin=[]
                  newobj.forEach((element) => {
                      that.companyName.push(element.companyName);
                      that.generalIncome.push(element.generalIncome.toFixed(2));
                      that.netProfitMargin.push(element.netProfitMargin.toFixed(2))
                  });   
                  options.series[1].data=that.netProfitMargin
                  options.xAxis[0].data=that.companyName
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
  props: ['region'],
  mounted() {
    const chartObj = echarts.init(document.getElementById("zzt"));
    window.addEventListener("resize", () => {
      chartObj.resize();  
    });
  },
  methods: {},
};
</script>
<style scoped>
.zzt {
  width: 100%;
  margin: 0 auto;
  min-width: 339px;
  height: 270px;
}
</style>
