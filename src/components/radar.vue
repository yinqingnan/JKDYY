<!--雷达图-->

<template>
  <div id="radar" class="ECHARTS" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts"; //引入echarts

export default {
  data() {
    return {
      list: [
        {
          text: "园区资源",
          max: 10
        },
        {
          text: "家庭生活",
          max: 10
        },
        {
          text: "家居",
          max: 10
        },
        {
          text: "金融资产",
          max: 10
        }
      ]
    };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  mounted() {
    this.chinaConfigure();
  },
  methods: {
    chinaConfigure() {
      let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      window.onresize = myChart.resize; // 让图表自适应
      myChart.setOption({
        //创建图表配置数据
        backgroundColor: "#fff",
        legend: {
          show: true,
          icon: "circle",
          top: "90%",
          bottom: 0, //圆点距离底部高度
          center: 0,
          itemWidth: 20, //圆点间距
          itemHeight: 8, //圆点的大小
          itemGap: 14, //圆点左右间距。
          textStyle: {
            fontSize: 12, //字体大小
            color: "#666" //字体颜色
          },
          data: ["最高", "最低", "平均"]
          //   selectedMode: 'single'  //    显示多个表或者单个
        },
        color: ["#22ac38", "#ff5d5d", "#82bcfc"], //小点的颜色
        radar: [
          {
            shape: "circle", //背景圆形

            indicator: this.list,
            center: ["50%", "50%"],
            radius: 90, //改变雷达图整体大小
            startAngle: 90,
            splitNumber: 3,
            orient: "vertical", // 图例列表的布局朝向,默认'horizontal'为横向,'vertical'为纵向.
            // shape: 'circle',
            // backgroundColor: {
            //     image:imgPath[0]
            // },
            name: {
              formatter: "{value}",
              textStyle: {
                fontSize: 12, //外圈标签字体大小
                color: "#333", //外圈标签字体颜色
                padding: [0, 8] //字体的距离
              }
            },
            splitArea: {
              // 坐标轴在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: {
                // 分隔区域的样式设置。
                color: ["#fff", "#fff"] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              }
            },
            // axisLabel:{//展示刻度
            //     show: true
            // },
            axisLine: {
              //指向外圈文本的分隔线样式
              lineStyle: {
                color: "transprend",
                width: 1
              }
            },
            splitLine: {
              lineStyle: {
                color: "#eee", // 分隔线颜色
                width: 2 // 分隔线线宽
              }
            }
          }
        ],
        series: [
          {
            name: "雷达图",
            type: "radar",
            itemStyle: {
              emphasis: {
                lineStyle: {
                  width: 1
                }
              }
            },
            data: [
              {
                name: "最高",
                value: [8, 6, 5, 6], //需要替换的数据
                areaStyle: {
                  normal: {
                    // 单项区域填充样式
                    color: {
                      type: "linear",
                      x: 0, //右
                      y: 0, //下
                      x2: 2, //左
                      y2: 2, //上
                      colorStops: [
                        {
                          offset: 0,
                          color: "#80c269"
                        },
                        {
                          offset: 0.5,
                          color: "rgba(128,194,105,.5)"
                        },
                        {
                          offset: 1,
                          color: "#80c269"
                        }
                      ],
                      globalCoord: false
                    },
                    opacity: 1 // 区域透明度
                  }
                },
                symbolSize: 0.5, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                label: {
                  // 单个拐点文本的样式设置
                  normal: {
                    show: false, // 单个拐点文本的样式设置。[ default: false ]
                    position: "top", // 标签的位置。[ default: top ]
                    distance: 5, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
                    color: "#6692e2", // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
                    fontSize: 14, // 文字的字体大小
                    formatter: function(params) {
                      return params.value;
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    //图形悬浮效果
                    borderColor: "#00c2ff",
                    borderWidth: 2.5
                  }
                }
                // lineStyle: {
                //     normal: {
                //         opacity: 0.5// 图形透明度
                //     }
                // }
              },
              {
                name: "最低",
                value: [5, 8, 7, 5, 6], //需要替换的数据
                symbolSize: 0.5,
                itemStyle: {
                  normal: {
                    borderColor: "#f9cf67",
                    borderWidth: 2.5
                  }
                },
                areaStyle: {
                  normal: {
                    // 单项区域填充样式
                    color: {
                      type: "linear",
                      x: 0, //右
                      y: 0, //下
                      x2: 1, //左
                      y2: 1, //上
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ff5d5d"
                        },
                        {
                          offset: 0.5,
                          color: "rgba(255,93,93,0.5)"
                        },
                        {
                          offset: 1,
                          color: "#ff5d5d"
                        }
                      ],
                      globalCoord: false
                    },
                    opacity: 1 // 区域透明度
                  }
                }
                // lineStyle: {
                //     normal: {
                //         opacity: 0.5// 图形透明度
                //     }
                // }
              },
              {
                name: "平均",
                value: [4, 8, 2, 8, 5], //需要替换的数据
                symbolSize: 0.5,
                itemStyle: {
                  normal: {
                    borderColor: "#e92b77",
                    borderWidth: 2.5
                  }
                },
                areaStyle: {
                  normal: {
                    // 单项区域填充样式
                    color: {
                      type: "linear",
                      x: 0, //右
                      y: 0, //下
                      x2: 1, //左
                      y2: 1, //上
                      colorStops: [
                        {
                          offset: 0,
                          color: "#82bcfc"
                        },
                        {
                          offset: 0.5,
                          color: "rgba(130,188,252,0.5)"
                        },
                        {
                          offset: 1,
                          color: "#82bcfc"
                        }
                      ],
                      globalCoord: false
                    },
                    opacity: 1 // 区域透明度
                  }
                }
              }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.ECHARTS {
  width: 100%;
  height: 288px;
  border-bottom: 1px dashed #d7d6de;
}
</style>