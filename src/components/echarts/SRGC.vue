<template>
  <!-- 收入构成 -->
  <div>
    <div id="14" ref="charts" class="ECHARTS"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
export default {
  data() {
    return {
      incomeName: [], //类型名称
      reportingYear: [], //时间表
      data: [],
      data1: [],
      data2: []
    };
  },
  watch: {
    SRGC: {
      handler(newVal) {

        // console.log(newVal)
        var year = [];
        var name = [];
        newVal.forEach(item => {
          year.push(item.reportingYear);
          name.push(item.incomeName);
          // es6方法，ie不支持
          // this.reportingYear = new Set(year); //获取到公用的时间
          // var names = new Set(name); //保存公用的title名称
          // this.incomeName = [...names]; //因为使用set方法，所以必须在结构函数一下
        });

        function unique(year) {
          return year.filter(function(item, index, year) {
          return year.indexOf(item, 0) === index;
          });
        }
        this.reportingYear=unique(year)
        this.incomeName=unique(name)
  

        // 每一次都清空数组
        this.data = [];
        this.data1 = [];
        this.data2 = [];

        var ljf = newVal.filter(item => item.incomeName == "垃圾费");
        ljf.forEach(item => {
            this.data.push(item.incomeMoney);
        });
        var gtf = newVal.filter(item => item.incomeName == "公摊费");
        gtf.forEach(item => {
            this.data1.push(item.incomeMoney);
        });

        var qjf = newVal.filter(item => item.incomeName == "清洁费");
        qjf.forEach(item => {
            this.data2.push(item.incomeMoney);
        });
        var wyf = newVal.filter(item => item.incomeName == "物业费");
        wyf.forEach(item => {
            this.data.push(item.incomeMoney);
        });
        var gcf = newVal.filter(item => item.incomeName == "工程费");
        gcf.forEach(item => {
            this.data1.push(item.incomeMoney);
        });



        // 图表设置信息
        const option = {
          backgroundColor: "#f0eded",
          title: {
            text: "收入构成",
            x: "10",
            y: 20,
            textStyle: {
              color: "#333",
              fontSize: 16,
              fontWeight: "600"
            }
          },
          tooltip: {
            tooltip: {
              trigger: "axis",
              
            },
              formatter:function(a){
                return a.seriesName +":"+a.value+"%"
            }
          },
          //     toolbox: {
          //     feature: {
          //       saveAsImage: {}
          //     }
          //   },
          legend: {
            data: this.incomeName,
            textStyle: {
              color: "#3B53A2",
              fontSize: 12
            },
            itemWidth: 10, // 标志图形的长度
            itemHeight: 10, // 标志图形的宽度
            inactiveColor: "#CDD9F0",
            top: 20,
            icon: "circle", //点的形状
            right: 0 //点的位置
          },
          grid: {
            x: "0%",
            width: "100%",
            y: "30%",
            bottom: "10%"
            // containLabel: true
          },
          xAxis: {
            type: "category",
            // boundaryGap: false,
            data: this.reportingYear, //时间数据入口
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            show: false,
            type: "value",
            axisLabel: {
              color: "#3B53A2",
              fontSize: "30",
              interval: 0
              //   formatter: '{value}元'
            },
            axisLine: {
              lineStyle: {
                color: "#3B53A2",
                type: "solid" //'dotted'虚线 'solid'实线
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#CDD9F0"
              }
            }
          },
          series: [
            {
              symbolSize: 14, //拐点圆的大小
              name: this.incomeName[1],
              type: "line",

              lineStyle: {
                color: "#2cabe3", //连线颜色
                width: 3, //宽度
                type: "solid" //'dotted'虚线 'solid'实线
              },
              itemStyle: {
                color: "#2cabe3" //连线颜色
              },
              smooth: true,
              data: this.data
              //数据 入口
            },
            {
              symbolSize: 14, //拐点圆的大小
              name: this.incomeName[0],
              type: "line",
              lineStyle: {
                color: "#70ad47", //连线颜色
                width: 3 //宽度
              },
              itemStyle: {
                color: "#70ad47" //连线颜色
              },
              smooth: true,
              data: this.data1 //数据入口
            },
            {
              symbolSize: 14, //拐点圆的大小
              name: this.incomeName[2],
              type: "line",
              lineStyle: {
                color: "red", //连线颜色
                width: 3 //宽度
              },
              itemStyle: {
                color: "red" //连线颜色
              },
              smooth: true,
              data: this.data2 //数据入口
            }
          ]
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById("14"));
        chartObj.setOption(option, true);
        // 设置自适应
        window.addEventListener("resize", () => {
          chartObj.resize();
        });
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["SRGC"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("14"));
    window.addEventListener("resize", () => {
      chartObj.resize();
    });
  },
  methods: {}
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