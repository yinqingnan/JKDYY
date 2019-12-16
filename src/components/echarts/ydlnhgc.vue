<!-- 项目能耗用水全年-->
<template>
  <div>
    <div id="zzt1" class="ECHARTS"></div>
      <!-- {{ydl}} -->
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts


export default {
  data() {
    return {
      time: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月","12月"],     
      bjData:[],
      nhgc:[]   , //能耗构成
      title:[]  ,   //title名称
    };
  },
  watch: {
    xmid:{
        handler(newVal){
          this.axios.get("/api/projectElectMType?projectId="+newVal+"&topcount=6").then((res)=>{
              this.nhgc=[]
              this.title=[]
                // console.log(res.data.data)
                res.data.data.forEach(element => {
                    // console.log(element.itemName)
                    // console.log(element.dosage)
                    this.title.push(element.itemName)
                    this.nhgc.push(element.dosage)
                });
            


   const option = {
    title: [
        //   {
        //     text: "单位：度",
        //     top:10,
        //     right: 10,
        //     textStyle: {
        //       color: "#333",
        //       fontSize: 14,
        //       fontWeight: "500"
        //     }
        //   }
    ],
    tooltip: {
        showContent: true,
        trigger: "axis",
        formatter: function(a) {
        return a[0].name + ":" + a[0].value+"度";
        // console.log(a)
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
    left: '10%',
    right: '10%',
    bottom: '13%',
    containLabel: false,
  
    }, 
    legend: {
        data:  this.title,     
        align: 'right',
        right: 10
    },
    xAxis: [{
        type: 'category',
        data:  this.title,
          axisPointer: {
                type: "shadow",
                shadowStyle: {
                    // color: "blue",
                    opacity: 1
                }
            },
             axisTick: {
                show: false,
            },
            axisLine: {
            symbol:['none','arrow'],
            lineStyle: {
                color: '#666',
            },
        },
        axisLabel: {
            show: true,
            interval:0,  //设置文字间距
            textStyle: {
                color: '#666',
            }
        }
    }],
    yAxis: [{
        type: 'value',
        // name: '总价(万元)',
        axisLabel: {
            formatter: '{value}'
        },
        axisTick: {
                show: false,
        },
        axisLine: {
            symbol:['none','arrow'],
                lineStyle: {
                    color: '#666',
            }
        }
            
    }],
    series: [{
        name: '包租费',
        type: 'bar',
        barWidth:16,
        data: this.nhgc,
     "itemStyle": {
            "normal": {
                "color":"#49a4d9"
            }
        },
    }, 

]
};
        //初始化图表
        const chartObj = echarts.init(document.getElementById("zzt1"));

          chartObj.setOption(option, true);
            // 设置自适应
          window.onresize = function() {
            chartObj.resize();
          };
         })

        }
    },
   
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["xmid"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("zzt1"));
    window.addEventListener("resize", () => {
        // console.log(chartObj)
      chartObj.resize();
    });
  },
  methods: {

  }
};
</script>
<style  scoped>
.ECHARTS {
    /* width: 100%; */
    /* min-width: 440px; */
    width: 420px;
     height: 420px;
}
</style>