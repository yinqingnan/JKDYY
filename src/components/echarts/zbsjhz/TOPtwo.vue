<template>
  <!-- 项目分布 -->
  <div>
    <div class="box">
        <!-- sdsdsdsdasd -->
      <div id="dht" class="dht" ref="dht"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
export default {
  data() {
    return {
      data: [],
      msglist: [],
      msgtitle: [],
      num: null,
    };
  },
  mounted() {},
  methods: {

  },
  watch: {
    toptwo: {
      handler(newval) {
        //  console.log(newval)
        this.data = newval;
        this.msglist = [];
        this.msgtitle = [];
        newval.map(item => {
          this.msglist.push(item.rate);
          this.msgtitle.push(item.companyName);
        });
          
        var myChart = echarts.init(this.$refs.dht);
        var option = {
          color: ["#4096fd"],
          title: {
            // text: "节点达成率",
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
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: function(objs) {
              // console.log(objs)
              let obj = objs[0];
              return `${obj.name} </br> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${(obj.value).toFixed(2)}%`;
            }
          },
          grid: {
            top: "10%",
            left: "3%",
            right: "3%",
            bottom: "0",
            containLabel: true
          },
          xAxis: {
               show: false,
            type: "value",
            boundaryGap: [0, 0.01],
            data: [],
            interval: 20,
            splitLine: {
              lineStyle: {
                type: "dashed"
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#909396"
              }
            },
            axisLabel: {
              formatter: function(value) {
                // console.log(value)
                return value;
              },
              color: "#303439"
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: "category",
            boundaryGap: false,
            splitArea: {
              areaStyle: {
                opacity: 0
              }
            },
            axisLine: {
                show:false,
              lineStyle: {
                color: "#909396"
              }
            },
            axisTick: {
              show: false
            },
            data: this.msgtitle
          },
          series: [
            {
              // name: 'Scoring Attributes',
              barWidth: 10,
              type: "bar",
              data: this.msglist
            }
          ]
        };

        myChart.setOption(option);
        //自适应屏幕
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
    },
    num1:{
          handler(){
            //   console.log(newval)
            var myChart = echarts.init(this.$refs.dht);
            myChart.resize();
          }
      },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["toptwo","num1"]
};
</script>
<style  scoped>
.dht {
  width: 100%;
  margin: 0 auto;
  min-width: 380px;
  height: 100%;
  min-height: 320px;
}

</style>