<template>
  <div>
    <div class="box" id="box">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%;height:714px"
        :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
        :default-sort="{ prop: 'date', order: 'descending' }"
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
          label="区域"
          min-width="106px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="partyA"
          label="甲方公司名称"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="appointCompany"
          label="合同约定的管理公司"
          :show-overflow-tooltip="true"
          align="center"
          min-width="122px"
        ></el-table-column>
        <el-table-column
          prop="actualCompany"
          label="实际管理公司"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="firsthand"
          label="项目首次交房时间"
          :show-overflow-tooltip="true"
          align="center"
          :formatter="formatSex"
        >
        </el-table-column>
        <el-table-column
          prop="firstApproach"
          label="项目初次进场时间"
          :show-overflow-tooltip="true"
          align="center"
          :formatter="formatSex"
        >
        </el-table-column>
        <el-table-column
          prop="ItemFormat"
          label="项目业态"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="accessoryBasic"
          label="相关附件"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click="downloadbtn(scope.row)" type="text" size="small"
              >下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="box1">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="current_change"
          :current-page.sync="num"
          :page-sizes="[8, 16, 32, 64]"
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
      num: 1,
      totalCount: null, //--------------------------------默认数据总数
      currentPage: 1, //----------------------------------默认开始页面
      //   istag: true,
      pagesize: 11 //------------------------------------每页显示的数据条数
    };
  },
  watch: {
    tablemsg: {
      handler(newVal) {
        this.num = 1;
        this.currentPage = 1;
        this.totalCount = newVal.length;
        this.tableData = newVal;
      }
    },
    number: {
      handler(newVal) {
        this.num = newVal;
      }
    },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
  },

  props: ["tablemsg", "number"],
  methods: {
    handleSizeChange(cpage) {
      this.pagesize = cpage;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    downloadbtn(val) {
      // console.log(val.accessoryTenderee.split(".").pop())
      let ValType = val.accessoryTenderee.split(".").pop();

      if (ValType == "png" || ValType == "jpg" || ValType == "gif") {
        var a = document.createElement("a");
        a.download = name || "pic"; // 设置图片地址
        a.href = val.accessoryBasic;
        a.target = '_new';
        a.click();

        // this.downloadIamge(val.accessoryBasic, 'pic')
      } else {
        window.open(val.accessoryBasic);
      }
    },
    formatSex: function(row, colunmn, cellValue) {
      if (cellValue != null) {
        return cellValue.split(" ")[0];
      }
    },
    downloadIamge (imgsrc, name) { // 下载图片地址和图片名
    // var src = 'http://pic.c-ctrip.com/VacationH5Pic/mice/wechat/ewm01.png'; //链接地址
    //     var canvas = document.createElement('canvas');
    //     var img = document.createElement('img');
    //     img.onload = function(e) {
    //         canvas.width = img.width;
    //         canvas.height = img.height;
    //         var context = canvas.getContext('2d');
    //         context.drawImage(img, 0, 0, img.width, img.height);         
    //         canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    //         canvas.toBlob((blob)=>{
    //             let link = document.createElement('a');
    //             link.href = window.URL.createObjectURL(blob);
    //             link.download = 'aaa'; 
    //             link.click();  
    //         }, "image/jpeg");           
    //     }
    //     img.setAttribute("crossOrigin",'Anonymous');
    //     img.src = src;

    }


  }
};
</script>
<style scoped>
.box {
  background: #eee;
  padding: 12px;
  height: 760px;
  margin-top: 3px;
}

.box1 {
  height: 50px;
  background: #fff;
}

.download {
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
}

.box >>> .el-table__header-wrapper {
  height: 60px !important;
  line-height: 60px;
}
</style>
<style>
.el-pagination {
  float: right;
}

#box .has-gutter > tr > th {
  padding: 0 !important;
}
</style>
