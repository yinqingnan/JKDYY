<template>
  <div>
    <div class="box">
         <!-- 分类汇总表 -->
    <div class="box_header">
      <h1>{{projectName}}分类汇总表</h1>
      <h2 @click="exportExcel" class="daochu">导出表格</h2>
    </div>
    <div class="box_body">
      <!-- 显示表格 -->
      <el-table
        :data="tablemsg.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :style="style"
        :default-sort="{prop: 'date', order: 'descending'}"
        :summary-method="getSummaries"
        show-summary
        class="table"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
        element-loading-text="请稍后..."
       
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
          prop="projectName"
          label="项目名称"
          min-width="70px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="bsfl"
          label="报事分类"
          :show-overflow-tooltip="true"
          align="center"
          min-width="50px"
        ></el-table-column>
        <el-table-column
          prop="bstj"
          label="报事途径"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column label="综合" align="center">
          <el-table-column
            prop="synthesizeTotal"
            label="总件次"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="synthesizeComplete"
            label="完成件次"
            :show-overflow-tooltip="true"
            align="center"
            min-width="58px"
          ></el-table-column>
          <el-table-column
            prop="synthesizeFinishRate"
            label="完结率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="审核" align="center">
          <el-table-column
            prop="auditTotal"
            label="应审"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="auditPendingTrial"
            label="待审"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="auditRate"
            label="审核率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="派工" align="center">
          <el-table-column
            prop="jobTotal"
            label="应派"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="jobActual"
            label="实派"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="jobRate"
            label="派工率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="完成" align="center">
          <el-table-column
            prop="finishTotal"
            label="应完成"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="finishActual"
            label="实完成"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="finishRate"
            label="完成率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
        </el-table-column>
      </el-table>

      <!-- 下载表格 -->

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
          width="45"
          :show-overflow-tooltip="true"
          align="center"
          min-width="45px"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          min-width="70px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="bsfl"
          label="报事分类"
          :show-overflow-tooltip="true"
          align="center"
          min-width="50px"
        ></el-table-column>
        <el-table-column
          prop="bstj"
          label="报事途径"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column label="综合" align="center">
          <el-table-column
            prop="synthesizeTotal"
            label="总件次"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="synthesizeComplete"
            label="完成件次"
            :show-overflow-tooltip="true"
            align="center"
            min-width="58px"
          ></el-table-column>
          <el-table-column
            prop="synthesizeFinishRate"
            label="完结率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="审核" align="center">
          <el-table-column
            prop="auditTotal"
            label="应审"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="auditPendingTrial"
            label="待审"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="auditRate"
            label="审核率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="派工" align="center">
          <el-table-column
            prop="jobTotal"
            label="应派"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="jobActual"
            label="实派"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="jobRate"
            label="派工率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="完成" align="center">
          <el-table-column
            prop="finishTotal"
            label="应完成"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="finishActual"
            label="实完成"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
          <el-table-column
            prop="finishRate"
            label="完成率"
            :show-overflow-tooltip="true"
            align="center"
            min-width="50px"
          ></el-table-column>
        </el-table-column>
      </el-table>

      <!-- //分页器 -->
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
   
  </div>
</template>




<script>
// 引入导出excel图表的工具
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      
      xmid: "",
      num: 1,
      show: false,
      tablemsg: [], //显示的表格数据
      tablemsgmsg: [], //下载的表格数据
      totalCount: null, //--------------------------------默认数据总数
      currentPage: 1, //----------------------------------默认开始页面
      istag: true,
      pagesize: 11, //------------------------------------每页显示的数据条数
      style: {
        width: "100%",
        height: ""
        //  paddingLeft:"12px",
        // paddingRight:"12px",
      },
      yeardefaultdefault: "",
      year: "",
      number: 1,
      number1: 1,
      number2: 1,
      number3: 1,
      number4: 1,
      number5: 1,
      number6: 1,
      number7: 1,
      number8: 1,
      number9: 1,
      number10: 1,
      number11: 1,
      number12: 1,
      projectName:""
    };
  },
  mounted() {


   

    var date = new Date();
    this.yeardefaultdefault = date.getFullYear() + "年";
    this.year = date.getFullYear();
    this.xmid = this.$route.query.xmid;

      this.axios.get("/api/proBs03?projectId="+this.xmid+"&year="+ this.year).then((res)=>{
            this.projectName=res.data.data[0].projectName
        })



    //获取表格数据
    this.axios
      .get("/api/proBs02?projectId=" + this.xmid + "&year=" + this.year)
      .then(res => {
        // console.log(res.data.data)
        this.tablemsgmsg = res.data.data; //下载数据的表格
        this.tablemsg = res.data.data; //展示数据的表格
        this.totalCount = res.data.data.length; //展示数据的总条数
           // 提前计算好合计金额   （先进行清空）
        this.number=0  
        this.number1=0  
        this.number2=0
        this.number3=0
        this.number4=0
        this.number5=0
        this.number6=0
        this.number7=0
        this.number8=0
        this.number9=0
        this.number10=0
        this.number11=0
        this.number12=0

        res.data.data.forEach(item=>{
          // console.log(item)
          this.number+=item.synthesizeTotal
          this.number1+=item.synthesizeComplete
          this.number2+=item.synthesizeFinishRate

          this.number3+=item.auditTotal
          this.number4+=item.auditPendingTrial
          this.number5+=item.auditRate

          this.number6+=item.jobTotal
          this.number7+=item.jobActual
          this.number8+=item.jobRate

          this.number9+=item.finishTotal
          this.number10+=item.finishActual
          this.number11+=item.finishRate
       
        })


      });
    this.getheight();

  },
  methods: {
    getheight() {
      // 获取当前浏览器的高度赋值给元素
      this.style.height = window.innerHeight - 150-12 + "px";
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
              .get("/api/projectInfoName?projectIdName=" + this.xmid)
              .then(res => {
                // console.log(res.data.data)
                let name =
                  res.data.data[0].companyName +
                  this.year +
                  "年" +
                  "报事分类汇总表";
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
    handleSizeChange(cpage) {
      this.pagesize = cpage;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
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
        // console.log(values)   
        if (column.property == "synthesizeTotal") {
          //  console.log(column.property)
          sums[index] = values.reduce(() => {
              // return this.number
              if(this.number==0){
                // console.log(2)
                return 0
              }else{
                  return this.number.toFixed(0)+"件"
              }
          }, 0);
        } else if (column.property == "synthesizeComplete") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number1==0){
                return 0
              }else{
                return this.number1.toFixed(0)+"件"
              }
          }, 0);
        }
         else if (column.property == "synthesizeFinishRate") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number2==0){
                return 0
              }else{
                return this.number2.toFixed(0)+"%"
              }
          }, 0);
        }
        else if (column.property == "auditTotal") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number3==0){
                return 0
              }else{
                return this.number3.toFixed(0)+"件"
              }
          }, 0);
        }
        else if (column.property == "auditPendingTrial") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number4==0){
                return 0
              }else{
                return this.number4.toFixed(0)+"件"
              }
          }, 0);
        }
        else if (column.property == "auditRate") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number5==0){
                return 0
              }else{
                return this.number5.toFixed(0)+"%"
              }
          }, 0);
        }
        else if (column.property == "jobTotal") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number6==0){
                return 0
              }else{
                return this.number6.toFixed(0)+"件"
              }
          }, 0);
        }
        else if (column.property == "jobActual") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number7==0){
                return 0
              }else{
                return this.number7.toFixed(0)+"件"
              }
          }, 0);
        }
        else if (column.property == "jobRate") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number8==0){
                return 0
              }else{
                return this.number8.toFixed(0)+"%"
              }
          }, 0);
        }
                else if (column.property == "finishTotal") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number9==0){
                return 0
              }else{
                return this.number9.toFixed(0)+"件"
              }
          }, 0);
        }
        else if (column.property == "finishActual") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number10==0){
                return 0
              }else{
                return this.number10.toFixed(0)+"件"
              }
          }, 0);
        }
        else if (column.property == "finishRate") {
          sums[index] = values.reduce(() => {
              // return this.number2
              if(this.number11==0){
                return 0
              }else{
                return this.number11.toFixed(0)+"%"
              }
          }, 0);
        }
      });

      return sums;
    },
  }
};
</script>

<style scoped>
.daochu {
  border: 1px solid #4ac48b;
  height: 40px;
  line-height: 40px;
  padding: 0 5px;
  border-radius: 5px;
  background: #4ac48b;
  color: #fff !important;
  position: absolute;
  top: 4px;
  right: 12px;
  font-size: 14px;
  cursor: pointer;
}
.box_header {
  width: 100%;
  background: #fff;
  line-height: 50px;
  height: 50px;
  position: relative;
}
.box_header > h1 {
    font-size: 20px;
    color: #666;
    line-height: 50px;
    text-align: center;
    font-weight: 600;
}
.box {
  padding: 0 12px;
  background: #eee;
  padding-bottom: 12px
}
.box1{
  height: 50px;
  /* line-height: 50px; */
  background: #fff
}
</style>