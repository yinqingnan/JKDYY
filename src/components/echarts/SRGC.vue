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
          name.push(item.incomeName.slice(0,6));    //限制只显示前4位

        });
        
        function unique(year) {
            return year.filter(function(item, index, year) {
                return year.indexOf(item, 0) === index;
            });
        }
        this.reportingYear=unique(year)
        this.incomeName=unique(name)
      // console.log(this.incomeName)
    
        // 每一次都清空数组
        this.data = [];
        this.data1 = [];
        this.data2 = [];
        this.data3 = [];
        this.data4 = [];
        this.data5 = [];

        var list=newVal.filter(item=>item.incomeName.slice(0,6)==this.incomeName[0])
         list.forEach(item => {
            this.data.push(item.incomeMoney);
         });
        var list1=newVal.filter(item=>item.incomeName.slice(0,6)==this.incomeName[1])
         list1.forEach(item => {

            this.data1.push(item.incomeMoney);
         });
        var list2=newVal.filter(item=>item.incomeName.slice(0,6)==this.incomeName[2])
         list2.forEach(item => {
            this.data2.push(item.incomeMoney);
         });
         var list3=newVal.filter(item=>item.incomeName.slice(0,6)==this.incomeName[3])
         list3.forEach(item => {
            this.data3.push(item.incomeMoney);
         });
          var list4=newVal.filter(item=>item.incomeName.slice(0,6)==this.incomeName[4])
         list4.forEach(item => {
            this.data4.push(item.incomeMoney);
         });
          var list5=newVal.filter(item=>item.incomeName.slice(0,6)==this.incomeName[5])
         list5.forEach(item => {
            this.data5.push(item.incomeMoney);
         });
        // 图表设置信息
        const option = {
          backgroundColor: "#fff",
          title: [{
            text: "收入构成",
            top:0,
            y: 20,
            textStyle: {
              color: "#333",
              fontSize: 14,
              fontWeight: "600"
            }
          },{
            text: "单位：百分比",
            top:36,
            y: 20,
            textStyle: {
              color: "#666",
              fontSize: 12,
              fontWeight: "500"
            }
          },],
            tooltip: {
            trigger: "axis",
            // formatter:function(a){
            //     return a[0].seriesName +":"+a[0].value+"%" +"<br/>"+a[1].seriesName +":"+ a[1].value+"%"+"<br/>"
            //     +a[2].seriesName +":"+ a[2].value+"%"
            //     // console.log(a)
            // },    
                  axisPointer: {
                  type: "shadow",
                  label: {
                    show: false, //是否出现title提示文字
                    backgroundColor: "#7B7DDC"
                  }
                }
            
          },
          legend: {
            data: this.incomeName,
            textStyle: {
              color: "#3B53A2",
              fontSize: 10
            },
            itemWidth: 10, // 标志图形的长度
            itemHeight: 10, // 标志图形的宽度
            inactiveColor: "#CDD9F0",
            top: 0,
            icon: "ract", //点的形状
            right: 20 //点的位置
          },
          grid: {
            top: "26%",
            right: "8%",
            left: "8%",
            bottom: "10%"
          },
              xAxis: {
            //x轴
            show: true,
            data: this.reportingYear, //时间接口
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },
            axisTick: {
              show: false
            }
          },
 yAxis:  {
              show: true,
              splitLine: {
                show: true
              },
              axisLine: {
                show:true,
                lineStyle: {
                  color: "#999"
                }
              },
                axisLabel: {
                    interval:0,
                    color: "#999",
                    // formatter: function(value) {
                    //   //X轴文字众向排列
                    //   return value.split("").join("\n");
                    // },
                    textStyle: {
                      fontSize: 12,
                      color: "#8f8f8f"
                    }
                  },
            },
          series: [
            {
              // symbolSize: 4, //拐点圆的大小
              name: this.incomeName[0],
              data: this.data ,//数据 入口
              type: "line",
              smooth: true,//折线是否平滑
              areaStyle: {
                opacity: 0
              },
       
              itemStyle: {
                // color: "#2cabe3", //连线颜色
                  normal: {
                  label: { show: false }, //拐点显示数据
                  color: "#2cabe3", //小圆点的颜色
                  lineStyle: {
                    color: "#2cabe3", //折线的颜色
                    width:2, //宽度
                    type: "solid" //'dotted'虚线 'solid'实线
                  }
                }
              },
              
             
              
            },
            {
              // symbolSize: 4, //拐点圆的大小
              name: this.incomeName[1],
              type: "line",
              lineStyle: {
                color: "#39c359", //连线颜色
                width: 3 //宽度
              },
              itemStyle: {
                color: "#39c359" //连线颜色
              },
              smooth: true,
              data: this.data1 //数据入口
            },
            {
              // symbolSize: 4, //拐点圆的大小
              name: this.incomeName[2],
              type: "line",
              lineStyle: {
                color: "#f19ec2", //连线颜色
                width: 3 //宽度
              },
              itemStyle: {
                color: "#f19ec2" //连线颜色
              },
              smooth: true,
              data: this.data2 //数据入口
            },
            {
              // symbolSize: 4, //拐点圆的大小
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
              // symbolSize: 4, //拐点圆的大小
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
              // symbolSize: 4, //拐点圆的大小
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
height: 241px;
}
</style>