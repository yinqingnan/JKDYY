<template>
  <div>
    <div class="box">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100% ;height:714px"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
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
           <template slot-scope="scope">
                <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
            </template>
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
      pagesize: 11, //------------------------------------每页显示的数据条数
      // istag: true,
    };
  },
  watch: {
    tablemsg: {
      handler(newVal) {
        this.num=1
        this.currentPage=1
        this.totalCount = newVal.length;
        this.tableData = newVal;
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },
  props: ["tablemsg"],
   methods: {
    handleSizeChange(cpage) {
        this.pagesize=cpage
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    download(val){
      window.open(val.accessoryTenderee)
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
  height: 760px;
  margin-top: 3px

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
.box >>> .el-table__header-wrapper{
  height: 60px !important;
  line-height: 60px

}
</style>
<style>
.el-pagination{
margin-top: 10px;
}

</style>