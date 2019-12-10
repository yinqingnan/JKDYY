
<template>
  <!-- 项目用电详情页面 -->
  <div>
    <div class="box">
      <div class="boxTitle">
        <button @click="TO" class="fhsj">
          <i class="el-icon-back"></i>返回区域公司
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
        <h2 @click="exportExcel" class="daochu">导出表格</h2>
      </div>

      <el-table
        :data="tablemsg.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :style="style"
        :default-sort="{prop: 'date', order: 'descending'}"
        :summary-method="getSummaries"
        show-summary
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
        <el-table-column prop="yieldRate" label="达成率" :show-overflow-tooltip="true" align="center"></el-table-column>
      </el-table>

      <el-table
        :data="tablemsgmsg"
        :style="style"
        :default-sort="{prop: 'date', order: 'descending'}"
        :summary-method="getSummaries"
        show-summary
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
        <el-table-column prop="yieldRate" label="达成率" :show-overflow-tooltip="true" align="center"></el-table-column>
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
      number: 100000, //总计的第一个值
      number2: 584520 //总计的第二个值
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
        // console.log(res.data.data)
        this.tablemsg = res.data.data;
        this.tablemsgmsg = res.data.data;
        this.totalCount = res.data.data.length;
        // 提前计算好合计金额   （先进行清空）
        this.number=0
        this.number2=0
        res.data.data.forEach(item=>{
          this.number+=item.projectCount
          this.number2+=item.yieldRate
        
        })
     


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
      // console.log(window.innerHeight)
      // 获取当前浏览器的高度赋值给元素
      this.style.height = window.innerHeight - 130 + "px";
    },
    // 选中的年
    yearchange(yeardefaultdefault) {
      
      this.year = yeardefaultdefault.slice(0, 4);
        this.axios.get(
        "/api/monthTotalRevenue?year=" + this.year + "&companyID=" + this.qyid
      ).then((res)=>{
        // console.log(res.data.data)
        this.tablemsg = res.data.data;
        this.tablemsgmsg = res.data.data;
        this.totalCount = res.data.data.length;
        // 切换后提前计算好合计金额   （先进行清空）
        this.number=0
        this.number2=0
         res.data.data.forEach(item=>{
          this.number+=item.projectCount
          this.number2+=item.yieldRate

        })
    

      })
    },

    handleSizeChange(cpage) {
      this.pagesize = cpage;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },

    TO() {
      this.axios.get("/api/companIdOrName?companIdOrName=" + this.qyid)
        .then(res => {
          //   console.log(res.data.data[0].companyName)
          this.$router.push({
            path: "/project",
            query: {
              name: res.data.data[0].companyName
            }
          });
        });
    },
    getSummaries(param) {
      //  console.log(param)
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = "汇总";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        //   判断字段，等于要求和的字段时才求和 其余的数据信息不求和
        // console.log(values)    ||
        if (column.property == "projectCount") {
          //  console.log(column.property)
          sums[index] = values.reduce(() => {
              // return this.number
              if(this.number==0){
                // console.log(2)
                return 0
              }else{
                  return this.number.toFixed(2)
              }



          }, 0);
        } else if (column.property == "yieldRate") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number2==0){
                return 0
              }else{
                return this.number2.toFixed(2)
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
      this.axios.get("/api/projectInfoName?projectIdName="+encodeURI(row.projectName)).then((res)=>{
         this.$router.push('/xmzhsfl?xmid='+res.data.data[0].projectId)
      })
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