    <!-- 区域总收入横向柱状图 -->
<template>

  <div>
    <div id="zsr2" class="ECHARTS"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts

export default {
  data() {
    return {

      bjData: [],
      title:[]
    };
  },
  watch: {
      zsrhxzzttitle:{
          handler(newVal){
              this.title=newVal
          }
      },
    zsrhxzzt2: {
      handler(newVal) {
        // console.log(newVal)
        this.bjData = newVal;

        // 图表设置信息
        const option = {
        grid: {
        show: 'true',
        borderWidth: '0',
        height: "100%",
        width: "90%",
        x: "6%",
        y:"0%",
    },
    tooltip: {
        showContent:true,  
        // trigger: "axis",
        formatter:function(a){
            return a.name +":"+a.value
        }

    },
    backgroundColor: '', //背景色
    xAxis: {
        show: false, //是否显示x轴
        default: false,
           "axisTick":{       //y轴刻度线
          "show":false
        },
        // type: 'value'
    },
    yAxis: {
          "axisTick":{       //y轴刻度线
          "show":false
        },
        // type: 'category',
        show: true, //是否显示x轴
     
        inverse: true, //让y轴数据逆向
         axisLabel: {
        show: true,
        textStyle: {
            color: 'transparent'
        }
        },
    
        axisLine: {     //y轴的线
            show: true, //是否显示Y轴
            lineStyle:{ //设置Y轴颜色
                color:"#cecccc",
               
            }
        }, 
        data: this.title
    },
    series: [{
        name: '数据内框',
        type: 'bar',
        itemStyle: {
            normal: {
                barBorderRadius: 2, //园角度数
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#69b4e2' // 0% 处的颜色
                }, 
                {
                    offset: 1,
                    color: '#688ee5' // 100% 处的颜色
                }], false),
            }
        },

        barWidth: '10px',        //柱体宽度
        data:this.bjData         //数据源， 在父元素中接收
    },

    ]
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById("zsr2"));

        chartObj.setOption(option, true);
        // 设置自适应
        window.onresize = function() {
          chartObj.resize();
          // console.log(chartObj)
        };
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["zsrhxzzttitle","zsrhxzzt2"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("zsr2"));
    window.addEventListener("resize", () => {
      // console.log(chartObj)
      chartObj.resize();
    });
  },
  methods: {}
};
</script>
<style  scoped>
.ECHARTS {
  width: 100%;
  /* margin: 0 auto; */
  min-width: 80px;
  height: 90px;
}
</style>