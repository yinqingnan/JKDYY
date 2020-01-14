<template>
<!-- 城市页面 -->
  <div>
    <div class="container" >
      <div class="container_left">
        <div class="container_left_header">
            <!-- <h2>查询日期</h2> -->
          <h2>关键财务数据</h2>
          <div>
            <h2>查询年份</h2>
              <el-select v-model="region" placeholder @change="chickvalue(region)" style="width:200px;" class="input1">
                  <el-option
                    :value="item.reporting"
                    v-for="(item,index) in time"
                    :key="index"
                    @click="getindex(item.reportingYear,item.reportingType)"
                  ></el-option>
              </el-select>
          </div>
      
        </div>
        <div class="container_left_title">
          <!-- <h2>关键财务数据</h2> -->
            <div>
              <div>
                <h3 title="总营收平均值">总营收平均值</h3>
                <h2>{{Finance.averageTotalRevenue}}<span>亿</span> </h2>
              </div>
              <div>
                <h3 title="净利润平均值">净利润平均值</h3>
                <h2>{{Finance.averageNetProfit}}<span>亿</span></h2>
              </div>
              <div>
                <h3 title="ROE平均值">ROE平均值</h3>
                <h2>{{Finance.averageReturnOnEquity}}<span>%</span></h2>
              </div>
              <div>
                <h3 title="营收增长率平均值">营收增长率平均值</h3>
                <h2>{{Finance.increaseRateOfBusinessRevenue}}<span>%</span></h2>
              </div>
              <div>
                <h3 title="净利润增长率平均值">净利润增长率平均值</h3>
                <h2>{{Finance.returnOnEquity}}<span>%</span></h2>
              </div>
              <div>
                <h3 title="净利润率平均值">净利润率平均值</h3>
                <h2>{{Finance.netProfitMarginOnSales}}<span>%</span></h2>
              </div>
          </div>
        </div>
        <div class="container_left_box"> 
            <indexZZT id="ZZT" :region="region"></indexZZT>
            <indexZXT1 id="ZXT" :region="region"></indexZXT1>
            <indexZXT2 id="ZXT1" :region="region"></indexZXT2>
       
        </div>
            
           
      </div>
      <div class="container_right">
        <div class="container_right_header"> 
          
          <div class="container_right_header_title">
            <h1>收并购信息</h1>
            <h2 @click="btn1">更多
                <span class="iconfont iconpub_right" style="font-size:12px;font-weight:500;"></span>
            </h2>
          </div>
           <div class="container_left_header_tab">
            <el-table :data="Merger" style="width: auto;height:312px" fit:true  border > 
              <el-table-column prop="acquiringfirm" label="收购方" min-width="80x" :show-overflow-tooltip="true" align="left" style="fontWeight:500"></el-table-column>
              <el-table-column prop="acquiree" label="被收购方" min-width="80px" :show-overflow-tooltip="true" align="left"></el-table-column>
              <el-table-column prop="acquisitiontime" label="日期" min-width="80px" :show-overflow-tooltip="true" align="left"></el-table-column>
              <el-table-column prop="capital" label="资金(亿)" min-width="70px" :show-overflow-tooltip="true" align="left"></el-table-column>
              <el-table-column prop="ratio" label="占比" min-width="40px" :show-overflow-tooltip="true" align="left"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="container_right_body">
          <industrydata></industrydata>

        </div>
        <div class="container_right_footer">
          <div class="timecharts">
            <Timetomarket></Timetomarket>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>



<script>


// 行业数据资料
import industrydata from "@/components/industrydata";
// // 引入vuex的数据
// import { mapState, mapMutations } from "vuex";
// 引入首页柱状图
import indexZZT from "@/components/echarts/indexZZT";
//引入首页折线图1
import indexZXT1 from "@/components/echarts/indexZXT1";
// 引入首页折线图2
import indexZXT2 from '@/components/echarts/indexZXT2'
//引入上市时间图
import Timetomarket from "@/components/Timetomarket"

export default {
  components: {
    // Acquisitiondetails,
    industrydata,
    indexZZT,
    indexZXT1,
    indexZXT2,
    Timetomarket
  },
  data() {
    return {
      option: {},
      time: [], //时间列表数据
      Merger: [], //首页显示并购信息数据
      region: "", //select默认显示数据
      Finance: [], //关键财务数据默认值
      year: "", //    请求数据默认时间
      id: "", //   请求数据默认id
      averageTotalRevenue:""



    };
  },
  methods: {
    btn1(){
        this.$router.push('/2/acquisition')
    },
    chickvalue(msg) {
      let year = msg.slice(0, 4);
      let id =encodeURI(msg.slice(4));
      // 点击后再次赋值关键财务数据
      this.axios.get("/api/listedCompany09?reportingType="+id+"&reportingYear="+year).then(res => {
        // console.log(res.data.data)
          // 再次赋值替换原数据
          this.Finance = res.data.data[0];
          
        });
    }
  },
  mounted() {
    // 获取收并购信息
    this.axios.get("/api/listedCompany07?topcount=7").then(res => {
      // console.log(res.data.data)
        this.Merger = res.data.data;
      });

    // 获取时间列表
    this.axios.get("/api/listedCompany10").then(res => {
      this.time = res.data.data;
      this.region = res.data.data[0].reporting; //获取数据第一条数据
      this.year = this.region.slice(0, 4); //获取到初始的时间
      this.id = encodeURI(this.region.slice(4)); //获取到初始的id
      // 获取关键财务数据
      this.axios.get("/api/listedCompany09?reportingType="+this.id +"&reportingYear=" +this.year).then(res => {
          this.Finance = res.data.data[0];
      });
    });

  },
};
</script>
<style scoped>
.container_left_header{
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  background: #7a879b;
  line-height: 57px;
  justify-content: space-between

}
.container_left_header>h2{
  font-size: 14px;
  font-weight:600;
  color: #fff;
  line-height: 57px;
  text-indent: 20px
}
.container_left_header>div>h2{
  font-size: 14px;
  color: #fff;
  margin-right: 7px
}
.container_left_header>div{
  display: flex;
  margin-right: 13px
}
.container{
  padding: 10px 10px;
  display: flex;
  background: #fff
}
.container_left{
  border: 1px solid #f0f0f0;
  width: 59%;
   background: #fff;   /*最后替换为白色 */
  padding:  10px
}
.container_left_title>h2{
  font-weight: 500;
  font-size: 16px;
  color: #333;
  text-align: center;
  border-bottom: 1px solid #f0f0f0
  
}
.container_left_title>div{
  display: flex;
  margin-top: 12px;
  justify-content: space-around;
  margin-bottom: 12px;
  border: 1px solid #f0f0f0;
  height: 97px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.container_left_title>div>div{
  width: 16%;
  /* border: 1px solid #f0f0f0; */
  text-align: center;
  border-radius: 5px;

}
.container_left_title>div>div>h3{
  font-size: 12px;
    line-height: 1;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 29px;
    font-weight: 500;
}
.container_left_title>div>div>h2{
    font-size: 20px;
    font-weight: 600;
    line-height: 1;
    color: #fd7858;
    margin-top: 10px
}
.container_left_title>div>div>h2>span{
  font-size: 14px
}
#ZXT{
  margin: 12px 0
}

.container_right{
  width: 40%;
  height: 100%;
   /* padding:  10px; */
  margin-left: 10px;
  /* border: 1px solid #f0f0f0; */
  background: #fff
}

.container_right_header_title{
  display: flex;
  justify-content: space-between;
  line-height: 39px;
  /* border-bottom: 1px solid #e0dfe8 ; */
  padding: 0 10px;
  border: 1px solid #f0f0f0;
  border-bottom-color: transparent
}
.container_right_header_title>h1{
  font-size: 14px;font-weight: 500;
  color: #333;

}

.container_right_header_title>h2{
  font-size: 12px;font-weight: 500;
  color: #2cabe3;
    cursor: pointer;
  /* text-decoration: underline */
}
.container_right_body{
  margin:12px 0
}
.container_left_header_tab >>> .el-table--border{
  border: 1px solid #f0f0f0
}
</style>


<style>
/* 改变emementUI的样式 */
/* .el-table td,.el-table th {
  padding: 0 !important;
} */
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  /* padding: 0 !important; */
}

.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
}
/* .cell {
  text-align: center;
} */
.el-table__header{
  width: 100% !important;
}
.el-table {
  width: 100%!important;
  min-width: 100%!important;

}
.container_left_header .el-table th>.cell{
  font-weight: 500;
  color: #333
}
.container_left_header .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
  padding: 5px
}
.container_left_header .input1 .el-input__inner{
  background: #7a879b;
  border-color: #adb5c1;
  color: #ebe8e8
}
.container_left_header_tab .el-table td{
  padding: 1.5px 0
}
</style>