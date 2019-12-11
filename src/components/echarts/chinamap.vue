
<!--地图图表-->
<template>
  <div>
    <div class="map">
      <div id="chartmainline" ref="myEchart"></div>
    </div>
  </div>
</template>

<script>
import vue from "../../main";
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据      (注意路径容易报错)
// import "../../assets/echarts/china.js"      //引入中国地图


export default {
  data() {
    return {
      // chart: null
      list: [],      //---------------------------------------------------------地图数据
      list1: [      //----------------------------------------------------------需要单独上色的城市，  value只可控制颜色
              {
                "businessFee": 9.43,
                "garageFee": 9.96,
                "highRiseFee": 9.64,
                "name": "四川",
                "value": "5",
                "villaFee": 9.38,
                "westernFee": 9.59,
              },
              {
                "businessFee": 2.5,
                "garageFee": 9.24,
                "highRiseFee": 9.52,
                "name": "重庆",
                "value": "2.5",
                "villaFee": 9.96,
                "westernFee": 9.72,
              },
        ]
    };
  },
  created() {
    this.axios.get("/api/cityData10").then(res => {
      // console.log(res.data.data)
      this.list = res.data.data;
      if (this.list.length == 0) {
        return false;
      } else {
        this.chinaConfigure();
      }
    });
  },

  mounted() {},
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    chinaConfigure() {
      let myChart = echarts.init(this.$refs.myEchart); //----------------------------这里是为了获得容器所在位置
      window.onresize = myChart.resize; // ------------------------------------------让图表自适应
      myChart.setOption({ // --------------------------------------------------------进行相关配置
       
        backgroundColor: "transparent", //图表背景图
        tooltip: {
          //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
          formatter: function(a) {
            if (a.data == undefined) {
              return "该区域暂无信息";
            } else {
              return (
                "高层：" +
                a.data.highRiseFee +
                "元/m²/月" +
                "<br/>" +
                "洋房：" +
                a.data.westernFee +
                "元/m²/月" +
                "<br/>" +
                "别墅：" +
                a.data.villaFee +
                "元/m²/月" +
                "<br/>" +
                "商业：" +
                a.data.businessFee +
                "元/m²/月" +
                "<br/>" +
                "车库：" +
                a.data.garageFee +"元/月/个"
              );
            }
          },

          backgroundColor: "#fff", //------------------------------------------------标题背景色
          borderColor: "#ccc", //----------------------------------------------------边框颜色
          borderWidth: 1, //---------------------------------------------------------边框线宽
        
          textStyle: {         //文本样式
                  color: "#333", //--------------------------------------------------字体颜色
                  fontSize: 14,   //-------------------------------------------------字体大小
                  fontWeight:500 //--------------------------------------------------字体加粗
                }                         
        },

        dataRange: {
          // color: ["#12c0ff"] , //--------------------------------------------------固定单色
          show: true,//-------------------------------------------------------------是否显示颜色提示条
          min: 0,
          max: 100,
          realtime: true,
          // 根据值显示不同的颜色， （值依据数据中的value）
          x: '100',
          y: 'center',
          splitList: [
          // {start: 194, label: '80%以上', color: '#FF6699'},
          {start: 4, end: 5, label: '4元以上', color: '#ff6f5b '},
          {start: 3.5, end: 4 ,label: '3.5元-4元', color: '#fa8737'},
          {start: 3.0, end: 3.5, label: '3.0元-3.5元', color: '#fba853'},
          {start: 0, end: 3, label: '3元以下', color: '#ffc188'},
          {start: 0, end: 0, label: '蓝色暂无数据信息', color: '#479fd2'},
          ],
        },   
          /*工具按钮组*/
        // toolbox: {
            // show: true,
            // orient: 'vertical',
            // left: 'right',
            // top: 'bottom',
            // feature: {

                // dataView: {      //------------------------------------------------数据详情按钮
                //     readOnly: false
                // },           
                // restore: {},   //--------------------------------------------------还原按钮
                // saveAsImage: {} //-------------------------------------------------下载按钮
            // }
        // },
        geo: {
          // 这个是重点配置区
          map: "china", 
          roam: false, //-------------------------------------------------------------是否允许放大或者拖拽
          label: {
            normal: {
              show: true, // ---------------------------------------------------------是否显示对应地名
              textStyle: {
                color: "#333", //-----------------------------------------------------默认字体颜色
                fontSize: 14,//-------------------------------------------------------默认字体大小

                // fontWeight:600//---------------------------------------------------字体加粗
              }
            },
            emphasis:{//--------------------------------------------------------------鼠标经过的样式
                textStyle: {
                color: "#fff", // ----------------------------------------------------鼠标经过字体颜色
                fontSize: 14,
                 fontWeight:600//-----------------------------------------------------字体加粗
              }
            }
          },
        // aspectScale:1,         //-----------------拉伸比例
        layoutCenter: ['50%', '50%'],       //----------------------------------------比列
          itemStyle: {
            normal: {
              borderColor: "#fff", //-------------------------------------------------省份边界线颜色
              borderWidth: 1,   //----------------------------------------------------边框宽度
              areaColor: "#479fd2" //-------------------------------------------------省份区域默认显示颜色
            },
            emphasis: {     //--------------------------------------------------------鼠标经过效过
              shadowOffsetX: 0,//-----------------------------------------------------阴影的X方向
              shadowOffsetY: 0,//-----------------------------------------------------阴影的Y方向
              shadowBlur: 20,//-------------------------------------------------------阴影的模糊度
              borderWidth: 0,   //----------------------------------------------------省份的边框宽度
              shadowColor: "rgba(0, 0, 0, 0.5)", //-----------------------------------鼠标经过的阴影颜色
              areaColor: "#3574c8", //------------------------------------------------鼠标经过显示的背景颜色
            }
          }
        },
        series: [
          { 
            name: '全国价格地图',
            type: "scatter",
            coordinateSystem: "geo", // 对应上方配置信息
     
     
          },
          {
            name: "中国地图", // ------------------------------------------------------浮动框的标题
            type: "map",
            geoIndex: 0,
            data: this.list,
            zoom: 1,  
            cursor:"not-allowed"
          }
        ]
      });

      //点击事件
      myChart.on("click", function(params) {
        //点击事件
        if(isNaN(params.value)){
          return false
        }else{
          let name = params.name; //当前点击的名称
          vue.$router.push({ path: "/city", query: { name: name } });
         
        }



      });
    }
  }
};
</script>



<style >
.map {
  height: 100%;
  /* background: pink */
}
#chartmainline {
  width: 100%;
  height: 100%;
}
#chartmainline>div:nth-of-type(2){
  /* width: 300px;
  height: 200px;
  background: red */
  padding: 20px !important
}
</style>



