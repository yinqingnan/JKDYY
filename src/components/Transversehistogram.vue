<!--横向柱状图-->

<template>
  <div id="Transverse_histogram" class="ECHARTS" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts"; //引入echarts

export default {
  data() {
    return {

    };
  },
  mounted() {
     this.chinaConfigure();
    //  console.log(this.$echarts)
  },
  methods: {
    chinaConfigure(){
        let myChart = this.$echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
        window.onresize = myChart.resize; // 让图表自适应
          myChart.setOption({
                 //创建图表配置数据
      grid: {
        show: 'true',
        borderWidth: '0',
        height: "100%",
        width: "90%",
        x: "6%",
        y:"0%",
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: function(params) {
            var result = '';
            params.forEach(function (item) {
                result +="最大" + item.value;
            });
            return result;
        }
    },
    backgroundColor: '', //背景色
    xAxis: {
        show: false, //是否显示x轴
        type: 'value'
    },
    yAxis: {
        type: 'category',
     
        inverse: true, //让y轴数据逆向
        // axisLabel: {
        //     show: true,
        //     textStyle: {
        //         // color: '#red' //y轴字体颜色
        //     },
        // },
    
        axisLine: {     //y轴的线
            show: true, //是否显示Y轴
            lineStyle:{ //设置Y轴颜色
                color:"#cecccc",
                margin:""
            }
        }, 
        // data: ['最大']
    },
    series: [{
        name: '数据内框',
        type: 'bar',
        itemStyle: {
            normal: {
                barBorderRadius: 2, //园角度数
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(113,182,227,1)' // 0% 处的颜色
                }, 
                {
                    offset: 1,
                    color: 'rgba(0,77,167,1)' // 100% 处的颜色
                }], false),
            }
        },

        barWidth: '12px',  //柱体宽度
        data: [500, 500, 400]           //数据源， 在父元素中接收
    },

    ]
          })
    }
  },
};
</script>

<style scoped>
.ECHARTS {
  width: 40%;
  min-width: 100px;
  height: 80px;
}
</style>