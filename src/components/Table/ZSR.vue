<template>
  <!-- 项目用电详情页面 -->
  <div id="desc">
    <div class="box">
      <div class="boxTitle">
        <button @click="TO" class="fhsj">
          <i class="el-icon-back"></i>返回
        </button>

        <h3 style="margin:0 auto">{{projectName}}{{year}}年{{month}}收入情况表</h3>
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
        <h2 @click="exportExcel" class="daochu">导出</h2>
      </div>
      <el-table
        :data="tablemsg.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :style="style"
        :default-sort="{prop: 'date', order: 'descending'}"
        :summary-method="getSummaries"
        show-summary
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
        class="table"
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
          prop="projectName"
          label="项目"
          min-width="90px"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            <span
              size="mini"
              style="cursor:pointer;text-decoration: underline;"
              @click="handleEdit(scope.row)"
            >{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="target" label="目标值" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column
          prop="m1"
          label="1月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m2"
          label="2月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m3"
          label="3月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m4"
          label="4月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m5"
          label="5月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m6"
          label="6月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m7"
          label="7月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m8"
          label="8月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m9"
          label="9月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m10"
          label="10月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m11"
          label="11月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m12"
          label="12月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="projectCount"
          label="单项目合计"
          :show-overflow-tooltip="true"
          align="center"
          min-width="90px"
        ></el-table-column>
        <el-table-column prop="yieldRate" label="达成率" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.yieldRate">{{scope.row.yieldRate}}%</span>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="tablemsgmsg"
        :style="style"
        :default-sort="{prop: 'date', order: 'descending'}"
        :summary-method="getSummaries"
        show-summary
        class="xiazai"
        v-show="show">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目"
          min-width="90px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column prop="target" label="目标值" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column
          prop="m1"
          label="1月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m2"
          label="2月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m3"
          label="3月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m4"
          label="4月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m5"
          label="5月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m6"
          label="6月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m7"
          label="7月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m8"
          label="8月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m9"
          label="9月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m10"
          label="10月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m11"
          label="11月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="m12"
          label="12月"
          :show-overflow-tooltip="true"
          align="center"
          min-width="60px"
        ></el-table-column>
        <el-table-column
          prop="projectCount"
          label="单项目合计"
          :show-overflow-tooltip="true"
          align="center"
          min-width="90px"
        ></el-table-column>
        <el-table-column prop="yieldRate" label="达成率" :show-overflow-tooltip="true" align="center">
             <template slot-scope="scope" v-if="scope.row.yieldRate">{{ scope.row.yieldRate}} ﹪</template>
        </el-table-column>
      </el-table>
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
      tablemsgmsg: [],
      projectName: null,
      qyid: null,
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
      tablemsg: [],
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
      number: 100000 //总计的第一个值
    };
  },
  mounted() {
    // console.log(this.$route.query.qyid)
    var date = new Date();

    this.yeardefaultdefault = date.getFullYear() + "年";
    this.year = date.getFullYear();
    this.qyid = this.$route.query.qyid; //获取到路由参数 （项目的id）
    this.axios
      .get(
        "/api/monthTotalRevenue?year=" + this.year + "&companyID=" + this.qyid
      )
      .then(res => {
        this.tablemsg = res.data.data; //下载数据的表格
        this.tablemsgmsg = res.data.data; //展示数据的表格
        this.totalCount = res.data.data.length; //展示数据的总条数
        // 提前计算好合计金额   （先进行清空）
        this.number = 0;
        res.data.data.forEach(item => {
          this.number += item.projectCount;
        });
      });
    this.axios
      .get("/api/companIdOrName?companIdOrName=" + this.$route.query.qyid)
      .then(res => {
        // console.log(res.data.data[0].companyName)
        this.projectName = res.data.data[0].companyName;
      });

    this.getheight();
  },
  methods: {
    getheight() {
      // 获取当前浏览器的高度赋值给元素
      this.style.height = window.innerHeight - 130 + "px";
    },
    // 选中的年
    yearchange(yeardefaultdefault) {
      this.year = yeardefaultdefault.slice(0, 4);
      this.axios
        .get(
          "/api/monthTotalRevenue?year=" + this.year + "&companyID=" + this.qyid
        )
        .then(res => {
          this.tablemsg = res.data.data;
          this.tablemsgmsg = res.data.data;
          this.totalCount = res.data.data.length;
          // 切换后提前计算好合计金额   （先进行清空）
          this.number = 0;
          res.data.data.forEach(item => {
            this.number += item.projectCount;
          });
        });
    },

    handleSizeChange(cpage) {
      this.pagesize = cpage;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    TO() {
      this.axios
        .get("/api/companIdOrName?companIdOrName=" + this.qyid)
        .then(res => {
          this.$router.push({
            path: "/project",
            query: {
              name: res.data.data[0].companyName
            }
          });
        });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 14) {
          sums[index] = "汇总";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        //  判断字段，等于要求和的字段时才求和 其余的数据信息不求和
        if (column.property == "projectCount") {
          sums[index] = values.reduce(() => {
            if (this.number != 0) {
              return this.number.toFixed(2) + "元";
            }
          }, 0);
        }
      });

      return sums;
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
                let name =
                  res.data.data[0].companyName + this.year + "年" + "收入表";
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
                  if (typeof console !== "undefined") window.console.log(e, wbout);
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
      this.axios
        .get("/api/projectInfoName?projectIdName=" + encodeURI(row.projectName))
        .then(res => {
          this.$router.push("/xmzhsfl?xmid=" + res.data.data[0].projectId);
        });
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
  /* padding: 0 12px; */
  padding-left: 10px;
  justify-content: space-between;
}

.boxTitle > button {
  width: 62px;
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
  font-size: 14px;
  color: #666;
  font-weight: 500;
  /* margin-left: 20px */
  cursor: pointer;
  height: 35px;
  line-height: 35px;
}

.select {
  margin-right: 80px;
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
  margin-top: 8px !important;
  padding: 0 5px;
  border-radius: 5px;
  background: #4ac48b;
  color: #fff !important;
  position: absolute;
  top: 15px;
  text-align: center;
  right: 24px;
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
  height: 60px !important;
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

#desc .has-gutter > tr > th {
  padding: 0 !important;
}
</style>