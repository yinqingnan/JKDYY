<template>
  <div>
    <div class="box">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%;height:714px"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column label="序号" type="index" width="50" :show-overflow-tooltip="true" align="center" min-width="40px"></el-table-column>
        <el-table-column prop="companyName" label="区域" :show-overflow-tooltip="true" align="center" min-width="100px"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="isParkingBusiness" label="是否开展停车场经营业务" :show-overflow-tooltip="true" align="center" min-width="110px"></el-table-column>
        <el-table-column prop="recordNumber" label="备案编号" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="parkingRecordValidity" label="有效期" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="noRecord" label="停车备案规定名称" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="recordingOrgan" label="备案机关" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="supervisoryDocuments" label="是否取得监制文件" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="publicSigns" label="是否有价格公示牌" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="accessoryPark" label="相关附件" :show-overflow-tooltip="true" align="center">
          <span @click="download()" class="download">下载</span>
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
      pagesize: 10, //------------------------------------每页显示的数据条数
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
      // console.log(val)
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
    /* position: absolute;
    top: 700px;
    right: 50px */
    margin-top: 10px
    /* margin-top: 500px */
}
</style>