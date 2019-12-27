<template>
  <!-- 报事全年完结率 -->
  <div>
    <div id="dht" class="dht" ref="dht"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
export default {
  data() {
    return {
        msglist:[],
        msgtitle:[]
    };
  },
  mounted() {
  },
  methods: {},
  watch:{
      topone:{
          handler(newval){
            //   console.log(newval)
     var myChart = echarts.init(this.$refs.dht);
    //  映射对象
        var keyMap ={
            companyName:"name",
            nodeAchievingRate:"value"
        }
       for(var i = 0;i < newval.length;i++){
            var obj = newval[i];
            for(var key in obj){
                        var newKey = keyMap[key];
                        if(newKey){
                                obj[newKey] = obj[key];
                                delete obj[key];
                            }
            }
        }
var data = newval
var average = data[0].value;


var yData = [];
var barData = [];

for (var k = 0; k < data.length; k++) {
    barData.push(data[k]);
    if (data[k].value < average) {
        yData.push(k + ',' + data[k].name + ',' + 'lower');
    } else {
        yData.push(k + ',' + data[k].name)
    }

}

var option = {
    backgroundColor:"#fff",
    tooltip: {
        show: true,
        formatter: function(params) {
            var value = (params.data['value'] * 100 ).toFixed(2);
            return params.name + '</br>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + value + '%'
        },
    },
      axisPointer: {
            type: 'shadow'
        },
    grid: {
        top: '4%',
        left: '50%',
        right: '20%',
        bottom: '2%',
        containLabel: false,
    },
    xAxis: {
        show: false,

    },
    yAxis: {
        
        type: 'category',
        inverse: true,
        nameGap: 16,
        axisLine: {
            show: false,
            lineStyle: {
                color: '#ddd'
            }
        },
        axisTick: {
            show: false,
            lineStyle: {
                color: '#ddd'
            }
        },
        axisLabel: {
            interval: 0,
            margin: 85,
            
            textStyle: {
                color: '#455A74',
                align: 'center',
                fontSize: 12
            },
            rich: {
                a: {
                    // padding:[10,0,10,0],
                    color: '#fff',
                    backgroundColor: '#6d8996',
                    width: 16,
                    height: 16,
                    align: 'center',
                    borderRadius: 2
                },
                b: {
                    color: '#fff',
                    backgroundColor: '#f39800',
                    width: 16,
                    height: 16,
                    align: 'center',
                    borderRadius: 2
                }
            },
            formatter: function(params) {
                var paramsArr = params.split(',');
                var index = paramsArr[0];
                var name = paramsArr[1];
                if (paramsArr[2]) {
                    return [
                        '{a|' + (parseInt(index) + 1) + '}' + '  ' + name
                    ].join('\n')
                } else {
                    return [
                        '{b|' + (parseInt(index) + 1) + '}' + '  ' + name
                    ].join('\n')
                }
            }
        },
        data: yData
    },

    series: [{
        // name: 'barSer',
        type: 'bar',
        roam: false,
        visualMap: false,
        zlevel: 2,
        barMaxWidth: 10,
        barGap:10,
        itemStyle: {
            normal: {
                color: function(params) {
                    // console.log(params);
                    var value = parseFloat(params.data['value']);
                    // build a color map as your need.
                    var colorList = [{
                            colorStops: [{
                                offset: 0,
                                color: '#4197FD' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#4197FD' // 100% 处的颜色
                            }]
                        },
                        {
                            colorStops: [{
                                offset: 0,
                                color: '#4197FD' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#4197FD' // 100% 处的颜色
                            }]
                        }
                    ];
                    if (value < average) {
                        return colorList[0]
                    } else {
                        return colorList[1]
                    }
                },
                barBorderRadius: 15
            }
        },
        data: barData,
        label: {
            normal: {
                show: true,
                textStyle: {
                    color: '#455A74',
                    fontSize: 14,
                },
                position: "right",
                offset: [0, 0],
                formatter: function(params) {
                    var value = (params.data['value'] * 100).toFixed(2);
                    return value + '%'
                }

            }
        }
    }]
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
  props:["topone","num1"]
};
</script>
<style  scoped>
.dht {
  width: 100%;
  margin: 0 auto;
  min-width: 326px;
  height: 100%;
  min-height: 320px;
}
</style>