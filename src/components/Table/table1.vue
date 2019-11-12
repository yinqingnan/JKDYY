<template>
  <div>
    <div class="box">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="companyName" label="区域" min-width="106px"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="partyA" label="甲方公司名称"></el-table-column>
        <el-table-column prop="appointCompany" label="合同约定的管理公司"></el-table-column>
        <el-table-column prop="actualCompany" label="实际管理公司"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="firsthand" label="项目首次交房时间"></el-table-column>
        <el-table-column prop="firstApproach" label="项目初次进场时间"></el-table-column>
        <el-table-column prop="ItemFormat" label="项目业务"></el-table-column>
        <el-table-column prop="accessoryBasic" label="相关附件"></el-table-column>
        <!-- <el-table-column label="操作"> -->
        <!-- <template slot-scope="scope">
            <el-button type="warning" icon="el-icon-star-off" circle></el-button>
            <el-button type="primary" icon="el-icon-star-on" v-if="istag" @click="switchChange"></el-button>
            <el-button type="primary" icon="el-icon-star-off" v-else="!istag" @click="switchChange"></el-button>
        </template>-->
        <!-- </el-table-column> -->
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
  float: right
}

</style>