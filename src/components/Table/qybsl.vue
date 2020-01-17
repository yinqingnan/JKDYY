
<template>
  <div>
    <div class="box" id="bsl">
      <div class="boxTitle">
        <button @click="TO" class="fhsj">
          <i class="el-icon-back"></i>返回
        </button>

        <h3 style="margin:0 auto">{{projectName}}报事率</h3>
        <div class="select">
          <el-select
            v-model="yeardefaultdefault"
            placeholder="请选择年份"
            @change="yearchange(yeardefaultdefault)"
            style="width:100px;text-align: center;margin-right:80px"
          >
            <el-option v-for="(item,index) in years" :key="index" :value="item"></el-option>
          </el-select>
        </div>
        <h2 @click="exportExcel" class="daochu">导出</h2>
      </div>
      <!-- 显示表格 -->
      <el-table
        :data="tablemsg.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :style="style"
        :default-sort="{prop: 'date', order: 'descending'}"
        class="table"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
      >
        <el-table-column
          label="序号"
          type="index"
          width="45"
          :show-overflow-tooltip="true"
          align="center"
          min-width="45px"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="所属公司"
          min-width="76px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          :show-overflow-tooltip="true"
          align="center"
          min-width="76px"
        >
          <template slot-scope="scope">
            <span
              size="mini"
              style="cursor:pointer;text-decoration: underline;"
              @click="handleEdit(scope.row)"
            >{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="综合" align="center">
          <el-table-column
            prop="synthesizeTotal"
            label="总件次"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="synthesizeComplete"
            label="完成件次"
            :show-overflow-tooltip="true"
            align="center"
            min-width="60px"
          ></el-table-column>
          <el-table-column
            prop="synthesizeFinishRate"
            label="完结率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="审核" align="center">
          <el-table-column
            prop="auditTotal"
            label="应审"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="auditPendingTrial"
            label="待审"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="auditRate"
            label="审核率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="派工" align="center">
          <el-table-column
            prop="jobTotal"
            label="应派"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="jobActual"
            label="实派"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="jobRate"
            label="派工率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="完成" align="center">
          <el-table-column
            prop="finishTotal"
            label="应完成"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="finishActual"
            label="实完成"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="finishRate"
            label="完成率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
        </el-table-column>
      </el-table>

      <!-- 下载表格 -->

      <el-table
        :data="tablemsgmsg"
        :style="style"
        :default-sort="{prop: 'date', order: 'descending'}"
        class="xiazai"
        v-show="show"
      >
        <el-table-column
          label="序号"
          type="index"
          width="45"
          :show-overflow-tooltip="true"
          align="center"
          min-width="45px"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="所属公司"
          min-width="76px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          :show-overflow-tooltip="true"
          align="center"
          min-width="76px"
        ></el-table-column>
        <el-table-column label="综合" align="center">
          <el-table-column
            prop="synthesizeTotal"
            label="总件次"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="synthesizeComplete"
            label="完成件次"
            :show-overflow-tooltip="true"
            align="center"
            min-width="60px"
          ></el-table-column>
          <el-table-column
            prop="synthesizeFinishRate"
            label="完结率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="审核" align="center">
          <el-table-column
            prop="auditTotal"
            label="应审"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="auditPendingTrial"
            label="待审"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="auditRate"
            label="审核率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="派工" align="center">
          <el-table-column
            prop="jobTotal"
            label="应派"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="jobActual"
            label="实派"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="jobRate"
            label="派工率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="完成" align="center">
          <el-table-column
            prop="finishTotal"
            label="应完成"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="finishActual"
            label="实完成"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
          <el-table-column
            prop="finishRate"
            label="完成率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="55px"
          ></el-table-column>
        </el-table-column>
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
      tablemsg: [], //显示的表格数据
      tablemsgmsg: [], //下载的表格数据

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
    this.axios
      .get("/api/companIdOrName?companIdOrName=" + this.qyid)
      .then(res => {
        // console.log(res.data.data[0])
        this.projectName = res.data.data[0].companyName;
      });

    // 通过区域公司id和当前的年份来查询数据
    this.axios
      .get("/api/proBs01?companyId=" + this.qyid + "&year=" + this.year)
      .then(res => {
        // console.log(res.data.data)
        this.tablemsgmsg = res.data.data; //下载数据的表格
        this.tablemsg = res.data.data; //展示数据的表格
        this.totalCount = res.data.data.length; //展示数据的总条数
      });

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
      this.axios
        .get("/api/proBs01?companyId=" + this.qyid + "&year=" + this.year)
        .then(res => {
          this.tablemsgmsg = res.data.data; //下载数据的表格
          this.tablemsg = res.data.data; //展示数据的表格
          this.totalCount = res.data.data.length; //展示数据的总条数
        });
    },
    handleSizeChange(cpage) {
      this.pagesize = cpage;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },

    TO() {
      this.$router.go(-1);
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
            this.axios
              .get("/api/companIdOrName?companIdOrName=" + this.qyid)
              .then(res => {
                // console.log(res.data.data[0].companyName)
                let name =
                  res.data.data[0].companyName +
                  this.year +
                  "年" +
                  "报事完成率";
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
                  if (typeof console !== "undefined")
                    window.console.log(e, wbout);
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
    handleEdit(row) {
      this.$router.push("bswjl?xmid=" + row.projectId);
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
  width: 60px;
  border: 0;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  margin-top: 15px;
  background: #fff;
  font-size: 12px;
}
.boxTitle > h3 {
  font-size: 20px;
  color: #666;
  line-height: 50px;
  text-align: center;
  font-weight: 600;
}
.boxTitle > h2 {
  font-size: 12px;
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
.daochu {
  border: 1px solid #4ac48b;
  height: 26px !important;
  width: 50px !important;
  line-height: 26px !important;
  margin-top: 8px;
  padding: 0 5px;
  border-radius: 5px;
  background: #4ac48b;
  color: #fff !important;
  position: absolute;
  top: 15px;
  text-align: center;
  right: 20px;
  font-size: 14px;
  cursor: pointer;
  font-size: 12px !important;
}
.daochu:hover {
  border: 1px solid #3c8dbc;
  box-shadow: none;
}
.fhsj {
  border: 1px solid #4ac48b !important;
  background: #4ac48b !important;
  color: #fff !important;
  border-radius: 5px;
}
.box >>> .el-table__header-wrapper {
  height: 118px !important;
  line-height: 60px !important;
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
#bsl .has-gutter > tr > th {
  padding: 0 !important;
}
</style>