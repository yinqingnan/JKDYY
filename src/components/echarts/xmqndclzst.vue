<template>
  <!-- 报事全年完结率 -->
  <div>
    <div id="zzt" class="zzt"></div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
export default {
  data() {
    return {
        xmid:"",
        companyName: [],
        generalIncome: [],
        netProfitMargin: [],
        title:[],         //图裂名称
        data1:[],
        data2:[],
        data3:[],

    };
  },
  mounted() {
    // 获取项目id查询数据
    this.xmid=this.$route.query.xmid
    // 获取图表数据
    this.axios.get("/api/proBs04?projectId="+this.xmid).then((res)=>{
        // console.log(res.data.data)
        this.title=[]
        this.data1=[]
        this.data2=[]
        this.data3=[]


        this.title.push(res.data.data[0].stateType,res.data.data[1].stateType,res.data.data[2].stateType)

        this.data1.push((res.data.data[0].m1*100).toFixed(2),(res.data.data[0].m2*100).toFixed(2),(res.data.data[0].m3*100).toFixed(2),(res.data.data[0].m4*100).toFixed(2),(res.data.data[0].m5*100).toFixed(2),(res.data.data[0].m6*100).toFixed(2),(res.data.data[0].m7*100).toFixed(2),(res.data.data[0].m8*100).toFixed(2),(res.data.data[0].m9*100).toFixed(2),(res.data.data[0].m10*100).toFixed(2),(res.data.data[0].m11*100).toFixed(2),(res.data.data[0].m12*100).toFixed(2),)

        this.data2.push((res.data.data[1].m1*100).toFixed(2),(res.data.data[1].m2*100).toFixed(2),(res.data.data[1].m3*100).toFixed(2),(res.data.data[1].m4*100).toFixed(2),(res.data.data[1].m5*100).toFixed(2),(res.data.data[1].m6*100).toFixed(2),(res.data.data[1].m7*100).toFixed(2),(res.data.data[1].m8*100).toFixed(2),(res.data.data[1].m9*100).toFixed(2),(res.data.data[1].m10*100).toFixed(2),(res.data.data[1].m11*100).toFixed(2),(res.data.data[1].m12*100).toFixed(2),)

        this.data3.push((res.data.data[2].m1*100).toFixed(2),(res.data.data[2].m2*100).toFixed(2),(res.data.data[2].m3*100).toFixed(2),(res.data.data[2].m4*100).toFixed(2),(res.data.data[2].m5*100).toFixed(2),(res.data.data[2].m6*100).toFixed(2),(res.data.data[2].m7*100).toFixed(2),(res.data.data[2].m8*100).toFixed(2),(res.data.data[2].m9*100).toFixed(2),(res.data.data[2].m10*100).toFixed(2),(res.data.data[2].m11*100).toFixed(2),(res.data.data[2].m12*100).toFixed(2),)
 

   



      let myChart = echarts.init(document.getElementById('zzt'));

      let option = {
       backgroundColor: "#fff",
        title: {
            text: '报事全年完结率',
            top:20,
            // left:14,
            left:"center",
            textStyle: {
                color: "#666",
                fontSize: 14,
                fontWeight: "600"
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
           
            
        },
        legend: {
        // top: "2",
        // right: "10",
        //  x: '70%',
        bottom:0,
        inactiveColor: "#999",
        textStyle: {
            color: "#333",
            fontSize: 12
        },
        data: this.title,
        selectedMode: "multiple",     //强制多选（ multiple ）或单选（ single ）
        align: 'left',
        itemWidth: 9, // 设置宽度
        itemHeight: 9 // 设置高度
        },
        grid: {
            left: '8%',
            right: '6%',
            bottom: '14%',
            top:'20%',
            containLabel: false
        },
        xAxis: [{
                type: 'category',
                data: ['1月', '2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }],
        yAxis : [
          {
             type: 'value',
            name: '单位(%)',
            axisLabel: {
                formatter: '{value}'
            }
          }
        ],
        series : [
            {
        name: this.title[0],
        type: 'bar',
        barWidth:16,
        itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                    offset: 0,
                    color: "#69b4e2" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#688ee5" // 100% 处的颜色
                  }
                ],
                false
              ),
              barBorderRadius: [0, 0, 0, 0] //轴的圆角度数
            }
      },
        data:this.data1
    }, {
        name: this.title[1],
        type: 'bar',
        barWidth:16,
        color:"#333",
        itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                    offset: 0,
                    color: "#ffc288" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fe961c" // 100% 处的颜色
                  }
                ],
                false
              ),
              barBorderRadius: [0, 0, 0, 0] //轴的圆角度数
            }
      },
        data:this.data2
    },
     {
        name: this.title[2],
        type: 'line',
        color:"#333",
        smooth:true,
        itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                    offset: 0,
                    color: "#39c359" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#39c359" // 100% 处的颜色
                  }
                ],
                false
              ),
              barBorderRadius: [0, 0, 0, 0] //轴的圆角度数
            }
      },
        data:this.data3
    }
        ]
      }
      myChart.setOption(option)
 
      //自适应屏幕
      window.addEventListener('resize',function() {
        myChart.resize()})
    })
  },
  methods: {


  }
};
</script>
<style  scoped>
.zzt {
  width: 100%;
  margin: 0 auto;
  min-width: 339px;
  height: 476px;
}
</style>