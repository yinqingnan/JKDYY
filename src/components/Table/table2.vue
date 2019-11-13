<template>
  <div>
    <div class="box">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100% ;height:714px"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column label="序号" type="index" width="50" :show-overflow-tooltip="true" align="center" min-width="40px"></el-table-column>
        <el-table-column prop="companyName" label="区域" :show-overflow-tooltip="true" align="center" min-width="100px"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="isBidding" label="是否招投标" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="noTenderReason" label="未招投标原因" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="recordPrice" label="备案价格" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="actualPrice" label="实际收费价格" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="exceedRecordPrice" label="是否超出备案价格" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="exceedRecordPriceReason" label="若超出备案价格，说明原因 " :show-overflow-tooltip="true" align="center" min-width="120px"></el-table-column>
        <el-table-column prop="supervisoryReceipt" label="监制回执是否取得" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="accessoryTenderee" label="相关附件" :show-overflow-tooltip="true" align="center">
         <span  @click="download()" class="download">下载</span>
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
export default {
  data() {
    return {
      tableData: [],
      num:1,
      totalCount: null, //--------------------------------默认数据总数
      currentPage: 1, //----------------------------------默认开始页面
    //   istag: true,
      pagesize: 14, //------------------------------------每页显示的数据条数
      // istag: true,
    };
  },
  watch: {
    tablemsg: {
      handler(newVal) {
        //   console.log(newVal)
        this.num=1
        this.totalCount = newVal.length;
        this.tableData = newVal;
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["tablemsg"],
  methods: {
    // tableRowClassName({row, rowIndex}) {
    //     if (rowIndex === 0) {
    //     return 'th';
    //     }
    //     return '';
    // },
    switchChange() {
      this.istag = !this.istag;
    },

    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);


    },   
     download(val){
      console.log(val)
    },
  },
//   created: function() {
//     this.total = this.tableData.length;
//   }
};
</script>
<style scoped>
.box {

  background: #eee;
  padding: 12px;
  height: 764px
}
.box1{
  height: 50px;
  background: #fff
}
.download{
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
}
</style>
<style>
.el-pagination{
margin-top: 10px;
}
</style>