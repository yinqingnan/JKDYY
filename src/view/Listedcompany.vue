<template>
<!-- 城市页面 -->
  <div>
    <div class="container" v-if="show0">
      <!-- left -->
      <div class="container_left">
        <div class="container_left_header">
          <h1>收并购信息</h1>
          <div class="container_left_header_tab">
            <el-table :data="Merger" style="width: auto" fit:true > 
              <el-table-column prop="acquiringfirm" label="收购方" min-width="80px" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="acquiree" label="被收购方" min-width="80px" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="acquisitiontime" label="日期" min-width="80px" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="capital" label="资金" min-width="60px" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="ratio" label="占股比例" min-width="60px" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
          </div>
          <div class="h2position">
            <h2 @click="btn1">查看更多</h2>
          </div>
        </div>
        <div class="timecharts">
            <Timetomarket></Timetomarket>
        </div>
      </div>
      <!-- center -->
      <div class="container_center">
        <div class="container_center_header">
          <h1>请点击右侧选择查询日期</h1>
          <el-select v-model="region" placeholder @change="chickvalue(region)">
            <el-option
              :value="item.reporting"
              v-for="(item,index) in time"
              :key="index"
              @click="getindex(item.reportingYear,item.reportingType)"
            ></el-option>
          </el-select>
        </div>
        <div class="container_center_body">
          <h1>关键财务数据</h1>
          <div>
            <div>
              <h3 title="总营收平均值">总营收平均值</h3>
              <h2>{{Finance.averageTotalRevenue}}亿</h2>
            </div>
            <div>
              <h3 title="净利润平均值">净利润平均值</h3>
              <h2>{{Finance.averageNetProfit}}亿</h2>
            </div>
            <div>
              <h3 title="ROE平均值">ROE平均值</h3>
              <h2>{{Finance.averageReturnOnEquity}}%</h2>
            </div>
            <div>
              <h3 title="营收增长率平均值">营收增长率平均值</h3>
              <h2>{{Finance.increaseRateOfBusinessRevenue}}%</h2>
            </div>
            <div>
              <h3 title="净利润增长率平均值">净利润增长率平均值</h3>
              <h2>{{Finance.netProfitMarginOnSales}}%</h2>
            </div>
            <div>
              <h3 title="净利润率平均值">净利润率平均值</h3>
              <h2>{{Finance.returnOnEquity}}%</h2>
            </div>

      
          </div>
          <div class="charts">
            <indexZZT id="ZZT" :region="region"></indexZZT>
            <indexZXT1 id="ZXT" :region="region"></indexZXT1>
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="container_right">
        <industrydata></industrydata>
        <div>
            <indexZXT2 id="ZXT1" :region="region"></indexZXT2>
        </div>
      </div>

    </div>

    <!-- 并购详情页面 -->
    <div v-show="show1">
      <Acquisitiondetails></Acquisitiondetails>
    </div>
  </div>
</template>



<script>

// 引入axios
import axios from "axios";
// 引入并购详情也
import Acquisitiondetails from "../components/Acquisitiondetails";
// 行业数据资料
import industrydata from "../components/industrydata";
// 引入vuex的数据
import { mapState, mapMutations } from "vuex";
// 引入首页柱状图
import indexZZT from "../components/echarts/indexZZT";
//引入首页折线图1
import indexZXT1 from "../components/echarts/indexZXT1";
// 引入首页折线图2
import indexZXT2 from '../components/echarts/indexZXT2'
//引入上市时间图
import Timetomarket from "../components/Timetomarket"

export default {
  components: {
    Acquisitiondetails,
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
    ...mapMutations(["display"]),
    btn1() {
      this.display();
    },
    chickvalue(msg) {
      let year = msg.slice(0, 4);
      let id =encodeURI(msg.slice(4));
      // 点击后再次赋值关键财务数据
      axios.get("/api/listedCompany09?reportingType="+id+"&reportingYear="+year).then(res => {
        // console.log(res.data.data)
          // 再次赋值替换原数据
          this.Finance = res.data.data[0];
          
        });
    }
  },
  mounted() {
    // 获取收并购信息
    axios.get("/api/listedCompany07?topcount=8").then(res => {
        this.Merger = res.data.data;
      });

    // 获取时间列表
    axios.get("/api/listedCompany10").then(res => {
      this.time = res.data.data;
        //  console.log(res.data.data[0].reporting )
      this.region = res.data.data[0].reporting; //获取数据第一条数据
      this.year = this.region.slice(0, 4); //获取到初始的时间
      this.id = encodeURI(this.region.slice(4)); //获取到初始的id
      // 获取关键财务数据
      axios.get("/api/listedCompany09?reportingType="+this.id +"&reportingYear=" +this.year).then(res => {
          this.Finance = res.data.data[0];
      });
    });

  },
  computed: {
    ...mapState(["show0", "show1"])
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #eee;
  box-sizing: border-box;
  /* min-width: 1136px; */
  /* position: fixed; */
  height: 893px
}
.container > div {
  width: 32%;
  margin-top: 8px;
background: #eee
}
/* .container > div:nth-of-type(2){
  border: 1px solid #e0dfe8
} */

.container_left_header_tab {
  overflow: hidden;
  text-align: center;
}
.el-table td,
.el-table th {
  padding: 0;
}
.el-table--enable-row-transition .el-table__body td {
  height: 100px;
}
.container_left_header {
  border: 1px solid #e5e5e5;
  position: relative;
  /* height: 510px; */
  background: #fff
}
.container_left_header > h1 {
  font-size: 16px;
  line-height: 50px;
  text-align: center;
  color: #333;
  background: #ffffff
}
.h2position > h2 {
  text-align: right;
  color: #2cabe3;
  font-size: 12px;
  cursor: pointer;
  line-height: 40px;
  width: 100px;
  margin-left: 72%;
  text-decoration: underline
}
.container_center_header {
  display: flex;
  /* justify-content: space-around; */
  line-height: 50px;
  white-space: nowrap;
  background: #fff;
  padding: 0 10px
}
.container_center_header > h1 {
  font-size: 16px;
  color: #333;
  margin-right: 10%
}
.container_center_body {
  line-height: 50px;
  /* padding-top: 12px; */
  color: #333;
  text-align: center;
  background: #fff
}
.container_center_body > h1 {
  font-size: 14px;
  background: #fff;
  line-height: 40px;
  text-align: left;
  margin-left:26px
}
.container_center_body > div:nth-of-type(1) {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 12px;
  padding: 0 10px;
}
.container_center_body > div:nth-of-type(1) > div {
  width: 30%;
  border: 1px solid #e5e5e5;
  margin-top: 12px;
  border-radius: 5px;
  /* min-width:  124px;  */
  height: 80px;
}

.container_center_body > div > div > h3 {
  font-size: 14px;
  line-height: 1;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 15px;
}
.container_center_body > div > div > h2 {
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  color: #333;
  margin-top: 15px;
}
#ZXT{
  margin-top: 12px
}
#ZXT1{
  margin-top: 20px;
  overflow: hidden;
  border: 1px solid #e5e5e5;
  padding-bottom: 22px;
  background: #fff
}
.h2position{
background: #ffffff
}
.charts{
  padding: 0 10px;
  box-sizing: border-box;
  padding-bottom: 12px
}
.timecharts{
  margin-top: 12px
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
  padding: 0 !important;
}

.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
}
.el-table .cell {
  text-align: center;
}
.el-table__header{
  width: 100% !important;
}
.el-table {
  width: 100%!important;
  min-width: 100%!important;

}
</style>