<template>
  <!-- 营业收入占比 -->
  <div>
    <div id="dht" class="dht" ref="dht"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
export default {
  data() {
    return {
      data: [],
      title: []
    };
  },
  mounted() {
    this.axios.get("/api/zb_004").then(res => {
      var aggregate = res.data.data;
      this.data = [];
      this.title = [];
      aggregate.map(item => {
        // console.log(item)
        this.data.push(item.projectCount);
        this.title.push(item.projectType);
      });

      var myChart = echarts.init(this.$refs.dht);

      var option = {
    backgroundColor: '#fff',
    title: {
        // text: '品质服务占比',
        //   x: 20,
        //   y: 2,
        //   textStyle: {
        //     color: "#333",
        //     fontSize: 14,
        //     fontWeight: "500"
        //   }
    },

    tooltip: {
        trigger: 'item',
        formatter: "{b} :  {d}%"
    },

    visualMap: {
        show: false,
        min: 0,
        max: 100,
        inRange: {
        }
    },
    series: [{
        name: '访问来源',
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        color: ['#18b78e', '#fd8d06', '#ec4a4a', '#1db7e5'], 
        data: [{
                value: 25,
                name: '家庭生活'
            },
            {
                value: 40,
                name: '金融资产'
            },
            {
                value: 15,
                name: '家居'
            },
            {
                value: 20,
                name: '园区资源'
            }
        ].sort(function(a, b) {
            return a.value - b.value
        }),
        roseType: 'radius',

        label: {
            normal: {
                formatter: ['{b|{b}}', '{c|{c}%}'].join('\n'),
                rich: {
                    
                    c: {
                        color: '#666',
                        fontSize: 20,
                        fontWeight:'bold',
                        lineHeight: 5
                    },
                    b: {
                        color: '#666',
                        fontSize: 15,
                        height: 40
                    },
                },
            }
        },
        labelLine: {
            normal: {
                lineStyle: {
                    color: 'rgb(98,137,169)',
                },
                smooth: 0.1,
                length: 5,
                length2: 5,

            }
        },
        itemStyle: {
            //阴影
            // normal: {
            //     shadowColor: 'rgba(0, 0, 0, 0.8)',
            //     shadowBlur: 50,
            // }
        }
    }]
};
      myChart.setOption(option);
      //自适应屏幕
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    });
  },
  methods: {}
};
</script>
<style  scoped>
.dht {
  width: 100%;
  margin: 0 auto;
  min-width: 328px;
  height: 100%;
  min-height: 300px;
}
</style>