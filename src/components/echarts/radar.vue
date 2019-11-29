    <!-- 项目雷达图、、、 -->
<template>
  <div>
    <div id="radart" class="ECHARTS"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts

export default {
  data() {
    return {
      bjData: [],
      title: [],
      data:[]
    };
  },
  watch: {
    radarmsg: {
      handler(newval) {
        // console.log(newval);
        this.data=newval

        const option = {
               backgroundColor: "#ffffff",
          color: ["#37A2DA"],
         grid:{
           left:5,
           right:5
         },
              tooltip: {
                    show: true,
                    trigger: 'item',
                    confine: true,
                    enterable: true, //鼠标是否可以移动到tooltip区域内
                    },
          radar: {
              shape: 'circle',
              name: {
                  textStyle: {
                      color: '#999999',
                  }
              },

              splitArea: {
                  areaStyle: {
                      color: ['#fff', '#fff', '#fff', '#fff'],
                      shadowColor: '#37A2DA'
                  }
              },
              indicator: 
              [{
                      name: '园区资源',
                      max: 10
                  },
                  {
                      name: '家居',
                      max: 10
                  },
                  {
                      name: '家庭生活',
                      max: 10
                  },
                  {
                      name: '金融资产',
                      max: 10
                  },

              ],
              center: ['50%', '50%'], // 位置
              radius: 96, //大小
          },
       
          series: [{
              type: 'radar',
              data: [{
                  value:this.data ,
                  name: '数据',
                  itemStyle: {
                      normal: {
                          color: 'rgba(5, 128, 242, 0.8)'
                      }
                  },
                  areaStyle: {
                      normal: {
                          color: '#37A2DA'
                      }
                  }
              }]
          }]
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById("radart"));
        chartObj.setOption(option, true);
        // 设置自适应
        window.addEventListener("resize", () => {
          chartObj.resize();
        });
      }
    },

  },
  props: ["xmid","radarmsg"],
  mounted() {
    const chartObj = echarts.init(document.getElementById("radart"));
    window.addEventListener("resize", () => {
      chartObj.resize();
    });
  },
  methods: {}
};
</script>
<style  scoped>
.ECHARTS {
  width: 98%;
  /* margin: 0 auto; */
  min-width: 327px;
  height: 360px;
}
</style>