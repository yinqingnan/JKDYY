
<template>
  <!-- 项目用电详情页面 -->
  <div>
    <div class="box">
      <div class="boxTitle">
        <button @click="TO" class="fhsj">
          <i class="el-icon-back " ></i>返回上级
        </button>

        <h3 style="margin:0 auto">{{projectName}}综合收缴率</h3>
        <div class="select">
          <el-select
            v-model="yeardefaultdefault"
            placeholder="请选择年份"
            @change="yearchange(yeardefaultdefault)"
            style="width:100px;text-align: center;margin-right:10px"
          >
            <el-option v-for="(item,index) in years" :key="index" :value="item"></el-option>
          </el-select>
        </div>
        <h2 @click="exportExcel" class="daochu">导出表格</h2>
      </div>
      <!-- 显示表格 -->
      <el-table
        :data="tablemsg.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :style="style"
        :default-sort="{prop: 'date', order: 'descending'}"
        class="table"
        element-loading-text="请稍后..."
        @row-click="openDetails"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="所属公司"
          min-width="80px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="incomAmountReceivable"
          label="应收金额"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="incomAmountReceipts"
          label="实收金额"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="Arrearage"
          label="欠收金额"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="rate"
          label="收缴率"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
      </el-table>



        <!-- 下载表格 -->

        <el-table
        :data="tablemsgmsg"
        :style="style"
        :default-sort="{prop: 'date', order: 'descending'}"
        class="xiazai"
        v-show="show"
        element-loading-text="请稍后..."
      >
       <el-table-column
          label="序号"
          type="index"
          width="50"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="所属公司"
          min-width="80px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="incomAmountReceivable"
          label="应收金额"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="incomAmountReceipts"
          label="实收金额"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="Arrearage"
          label="欠收金额"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="rate"
          label="收缴率"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>

      </el-table>

        <!-- 分页器 -->
      <div class="box1">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="current_change"
          :current-page.sync="num"
          :page-sizes="[8,16,32,64]"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          background
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 引入导出excel图表的工具
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      show: false,
      projectName: null,
      xmid: null,
      year: null,
      month: null,
      yeardefaultdefault: "", //------------------默认显示的年份信息
      years: [
        "2020年",
        "2019年",
        "2018年",
        "2017年",
        "2016年",
        "2015年",
        "2014年",
        "2013年",
        "2012年",
        "2011年",
        "2010年",
        "2009年",
        "2008年",
        "2007年",
        "2006年",
        "2005年",
        "2004年",
        "2003年",
        "2002年",
        "2001年",
        "2000年"
      ], //-------------------------------年份限制2001年到2020年
      tablemsg: [],                 //显示的表格数据
      tablemsgmsg: [],                 //下载的表格数据

      num: 1,
      totalCount: null, //--------------------------------默认数据总数
      currentPage: 1, //----------------------------------默认开始页面
      istag: true,
      pagesize: 12, //------------------------------------每页显示的数据条数
      style: {
        width: "100%",
        height: ""
      },
      // height:""
      number: null, //总计的第一个值
      number2: null //总计的第二个值
    };
  },
  mounted() {
    // console.log(this.$route.query.qyid)
    var date = new Date();
    this.yeardefaultdefault = date.getFullYear() + "年";
    this.year = date.getFullYear();
    this.qyid = this.$route.query.qyid; //获取到路由参数 （区域公司的id）
    // 通过区域公司id来获取名称
    this.axios.get("/api/companIdOrName?companIdOrName="+this.qyid).then((res)=>{
      // console.log(res.data.data[0])
      this.projectName=res.data.data[0].companyName
    })

    // 通过区域公司id和当前的年份来查询数据
    this.axios.get("/api/proChargeRate10?companyId="+this.qyid+"&year="+this.year).then((res)=>{
        this.tablemsgmsg=res.data.data  //下载数据的表格
        this.tablemsg=res.data.data      //展示数据的表格
        this.totalCount=res.data.data.length    //展示数据的总条数
    })


    this.getheight();
  },
  methods: {
    getheight() {
      // console.log(window.innerHeight)
      // 获取当前浏览器的高度赋值给元素
      this.style.height = window.innerHeight - 130 + "px";
    },
    // 选中的年
    yearchange(yeardefaultdefault) {
      this.year = yeardefaultdefault.slice(0, 4);
      this.axios.get("/api/proChargeRate10?companyId="+this.qyid+"&year="+this.year).then((res)=>{
              this.tablemsgmsg=res.data.data  //下载数据的表格
              this.tablemsg=res.data.data      //展示数据的表格
              this.totalCount=res.data.data.length    //展示数据的总条数
          })
    },
    handleSizeChange(cpage) {
      this.pagesize = cpage;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },

    TO() {
    this.$router.go(-1)
    },
    exportExcel() {
      this.$confirm("即将下载该表格, 是否继续下载?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          if ((res = confirm)) {
            this.$message({
              type: "success",
              message: "下载成功!"
            });
            this.axios.get("/api/companIdOrName?companIdOrName=" + this.qyid)
              .then(res => {
                  // console.log(res.data.data[0].companyName)
                let name =res.data.data[0].companyName+ this.year + "年" + "综合收缴率";
                var wb = XLSX.utils.table_to_book(
                  document.querySelector(".xiazai")
                );
                var wbout = XLSX.write(wb, {
                  bookType: "xlsx",
                  bookSST: true,
                  type: "array"
                });
                try {
                  //  name+'.xlsx'表示导出的excel表格名字
                  FileSaver.saveAs(
                    new Blob([wbout], { type: "application/octet-stream" }),
                    name + ".xlsx"
                  );
                } catch (e) {
                  if (typeof console !== "undefined") console.log(e, wbout);
                }
                return wbout;
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下载"
          });
        });
    },
    openDetails(row){
      // console.log(row.projectId)
       this.$router.push("zhsjl?xmid="+row.projectId)
    }
  }
};
</script>


<style scoped>
.box {
  background: #eeeeee;
  padding: 10px;
}
.boxTitle {
  display: flex;
  height: 55px;
  line-height: 55px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 12px;
  justify-content: space-between;
}
.boxTitle > button {
  width: 100px;
  border: 0;
  cursor: pointer;
  height: 35px;
  line-height: 35px;
  margin-top: 10px;
  background: #fff;
}
.boxTitle > h3 {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}
.boxTitle > h2 {
  font-size: 10px;
  color: #666;
  font-weight: 500;
  /* margin-left: 20px */
  cursor: pointer;
      height: 35px;
    line-height: 35px;
}
.select {
  margin-right: 22px;
}
.box1 {
  /* width: 100% */
  background: #fff;
  height: 50px;
}

.daochu{
    border: 1px solid #4ac48b;
    height:40px;
    line-height:40px;
    margin-top: 7px;
    padding: 0 5px;
    border-radius: 5px;
    background: #4ac48b;
    color:#fff !important 
}
.fhsj{
    border: 1px solid #4ac48b !important;
    background: #4ac48b !important;
    color: #fff !important;
    border-radius: 5px; 
}
</style>







<style>
.month .el-input__inner {
  text-align: center;
}

.el-table--fit td.gutter,
.el-table--fit th.gutter {
  border-right-width: 1px;
  background: #f5f7fa;
}
.el-table__body-wrapper:-webkit-scrollbar {
  display: none;
}
.is-scrolling-right:-webkit-scrollbar {
  display: none;
}
</style>