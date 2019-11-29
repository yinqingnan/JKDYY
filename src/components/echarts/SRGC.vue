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
      data2: [],
      data3:[],
      data4:[],
      data5:[],
    };
  },
  watch: {
    SRGC: {
      handler(newVal) {

        // console.log(newVal)
        var year = [];
        var name = [];
        newVal.forEach(item => {
          // console.log(item.incomeMoney)
          year.push(item.reportingYear);
          name.push(item.incomeName.slice(0,4));    //限制只显示前4位

        });
        
        function unique(year) {
            return year.filter(function(item, index, year) {
                return year.indexOf(item, 0) === index;
            });
        }
        this.reportingYear=unique(year)
        this.incomeName=unique(name)
      // console.log(this.reportingYear)
    
        // 每一次都清空数组
        this.data = [];
        this.data1 = [];
        this.data2 = [];
        this.data3 = [];
        this.data4 = [];
        this.data5 = [];
        var list=newVal.filter(item=>item.incomeName==this.incomeName[0])
         list.forEach(item => {
            this.data.push(item.incomeMoney);
         });
        // console.log(this.data)
        var list1=newVal.filter(item=>item.incomeName==this.incomeName[1])
         list1.forEach(item => {
            this.data1.push(item.incomeMoney);
         });
        // console.log(this.data1)

        var list2=newVal.filter(item=>item.incomeName==this.incomeName[2])
         list2.forEach(item => {
            this.data2.push(item.incomeMoney);
         });
        // console.log(this.data2)
         var list3=newVal.filter(item=>item.incomeName==this.incomeName[3])
         list3.forEach(item => {
            this.data3.push(item.incomeMoney);
         });

          var list4=newVal.filter(item=>item.incomeName==this.incomeName[4])
         list4.forEach(item => {
            this.data4.push(item.incomeMoney);
         });
          var list5=newVal.filter(item=>item.incomeName==this.incomeName[5])
         list5.forEach(item => {
            this.data5.push(item.incomeMoney);
         });

        // 图表设置信息
        const option = {
          backgroundColor: "#f0eded",
          title: {
            text: "收入构成",
            top:0,
            y: 20,
            textStyle: {
              color: "#333",
              fontSize: 14,
              fontWeight: "500"
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
              fontSize: 10
            },
            itemWidth: 10, // 标志图形的长度
            itemHeight: 10, // 标志图形的宽度
            inactiveColor: "#CDD9F0",
            top: 20,
            icon: "circle", //点的形状
            right: 0 //点的位置
          },
          grid: {
              top: "28%",
              right: "4%",
              left: "8%",
              bottom: "10%"
          },
          xAxis: {
            type: "category",
            // boundaryGap: false,
            data: this.reportingYear, //时间数据入口
            axisLine: {
              lineStyle: {
                color: "#666"
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
             show: true,
              splitLine: {
                show: true
              },
              axisLine: {
                show:true,
                lineStyle: {
                  color: "#666"
                }
              },
              axisLabel: {
                // formatter: "{value} "
              }
          },
          series: [
            {
              symbolSize: 14, //拐点圆的大小
              name: this.incomeName[0],
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
              name: this.incomeName[1],
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
            },
            {
              symbolSize: 14, //拐点圆的大小
              name: this.incomeName[3],
              type: "line",
              lineStyle: {
                color: "yellow", //连线颜色
                width: 3 //宽度
              },
              itemStyle: {
                color: "yellow" //连线颜色
              },
              smooth: true,
              data: this.data3 //数据入口
            },
            {
              symbolSize: 14, //拐点圆的大小
              name: this.incomeName[4],
              type: "line",
              lineStyle: {
                color: "#F656B6", //连线颜色
                width: 3 //宽度
              },
              itemStyle: {
                color: "#F656B6" //连线颜色
              },
              smooth: true,
              data: this.data4 //数据入口
            },
                    {
              symbolSize: 14, //拐点圆的大小
              name: this.incomeName[5],
              type: "line",
              lineStyle: {
                color: "C5C99C", //连线颜色
                width: 3 //宽度
              },
              itemStyle: {
                color: "#C5C99C" //连线颜色
              },
              smooth: true,
              data: this.data5 //数据入口
            },
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
  mounted(){
    const chartObj = echarts.init(document.getElementById("14"));
    window.addEventListener("resize", () => { chartObj.resize();});
  }
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