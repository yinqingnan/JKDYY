<template>
  <div>
    <div class="box">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="companyName" label="区域"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="isParkingBusiness" label="是否开展停车场经营业务" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="recordNumber" label="备案编号"></el-table-column>
        <el-table-column prop="parkingRecordValidity" label="有效期"></el-table-column>
        <el-table-column prop="noRecord" label="停车备案规定名称" ></el-table-column>
        <el-table-column prop="recordingOrgan" label="备案机关"></el-table-column>
        <el-table-column prop="supervisoryDocuments" label="是否取得监制文件"></el-table-column>
        <el-table-column prop="publicSigns" label="是否有价格公示牌"></el-table-column>
        <el-table-column prop="accessoryPark" label="相关附件"></el-table-column>

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
      currentPage: 1, //--------------------------------默认开始页面
    //   istag: true,
      pagesize: 8, //---------------------------------每页显示的数据条数
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


    }
  },
//   created: function() {
//     this.total = this.tableData.length;
//   }
};
</script>
<style scoped>
.box {
  /* width: 100%; */
  /* height: 100vh; */
  /* position: fixed; */
  /* height: 100%; */
  background: #eee;
  padding: 12px;
  /* height: 680px */
  /* position: relative; */
}
.box1{
  height: 50px;
  background: #fff
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