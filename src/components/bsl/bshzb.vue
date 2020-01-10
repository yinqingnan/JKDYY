<template>
<!-- 报事完结率 -->
    <div>
        <div class="box" id="bshzb">
             <div class="box_header">
      <h1>{{projectName}}报事汇总表</h1>
    </div>
            <div class="box_header">
        <el-table
        :data="tablemsg"
        :default-sort="{prop: 'date', order: 'descending'}"
        class="table"
        :style="style"
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
<el-table-column label="综合"  align="center">
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
<el-table-column label="完成" align="center" >
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
        </div>

        <div class="box_body">
            <div class="box_body_left">
                <xmqndclzst></xmqndclzst>
            </div>
            <div class="box_body_right">
                <div>
                    <img src="../../assets/ima/development.png" alt="">
                    <h1>即将上线</h1>
                </div>
               
            </div>
        </div>
        </div>
       

    </div>
</template>




<script>
import xmqndclzst from '../echarts/xmqndclzst'     //柱状图

export default {
    components:{
        xmqndclzst,
        // qybg
    },
    data(){
        return {
            projectName:"",           //当前项目名称
            xmid:"",                //区域id
            tablemsg:[],           //小区表格数据
            style: {
            width: "100%",
            height: "239px",
            },
            echartsdata:[],           //图表数据
            msg:[1,5,2,6,5,4,32,3,1,2,43,1,321,31,321,31,32],
            bysfl:"",  //本月收费率
            bypm:"",      //本月排名
            ypjsfl:""  ,    //本月平均收费率
            qnpjsfl:""  ,    //全年平均收费率
            rate:"",        //收费率
            ranking:""      //排名


        }
    },
    mounted(){
        //    this.getheight();
        // console.log(this.$route.query.xmid)
        // 获取到当前年份
    var myDate = new Date();
    var Year = myDate.getFullYear();
    // console.log(tYear)
        this.xmid=this.$route.query.xmid
        // 获取表格数据
        this.axios.get("/api/proBs03?projectId="+this.xmid+"&year="+Year).then((res)=>{
            // window.console.log(res.data.data)
            this.projectName=res.data.data[0].projectName
            this.tablemsg=res.data.data
        })


    },
    methods:{

    }
}
</script>

<style scoped>

.box{
    padding: 0 12px;
    padding-bottom: 12px;
    background: #eee
}
.box_header>h1{
    font-size: 16px;color: #666;
    line-height: 50px;
    text-align: center;
    font-weight: 500
}
.box_body{
    margin-top: 12px;
    height: 520px;
    display: flex;

}
.box_body_left{
    width: 45%;
    border: 1px solid #f0f0f0;
    margin-right: 12px;
    background: #fff
}
.box_body_right{
     width: 55%;
    border: 1px solid #f0f0f0;
    background: #fff

}
.box_header{
    border: 1px solid #f0f0f0
}
.box_body_right_header>h1{
    font-size: 14px;
    color: #666;
    text-align: center;
    margin: 22px 0 33px 0
}
.box_body_right_body{
    display: flex
}
.box_body_right_body_left{
    width: 50%;
    height: 320px;
    border-right: 1px dashed #f0f0f0;
}
.box_body_right_body_right{
    width: 50%;
    height: 100%;

    
}
.box_body_right_body_left>div{
    height: 78px
}
.box_body_right_body_right>div{
    height: 78px
}
.box_body_right_body_left>div>h1{
    font-size: 14px;
    font-weight: 500;
    color: #73adce;
    text-indent: 20px
}
.box_body_right_body_left>div>ul{
    display: flex;
    margin-left: 20px;
    margin-top: 12px
}
.box_body_right_body_left>div>ul>li{
    color: #666
}
.box_body_right_body_left>div>ul>li>h1{
    font-size: 14px;
    font-weight: 500;
    line-height: 1
}
.box_body_right_body_left>div>ul>li>h2{
    color: #333;
    font-size: 14px;
    margin-top: 3px;
    line-height: 1;
    

}
.box_body_right_body_right>div>ul>li:nth-of-type(2){
    margin-left: 20px
}
.box_body_right_div{
    height: 80px;
    width: 90px;
    /* padding: 0 10px */
}
.box_body_right>div{
    width: 120px;
    margin: 164px auto;


}
.box_body_right>div>h1{
    text-align: center;
    font-weight: 500;
    font-size: 12px;
    margin-top: 14px;
    color: rgb(102, 102, 102);
}
.box_header>h1{
    background: #fff;
    font-size: 20px;
    color: #666;
    line-height: 50px;
    text-align: center;
    font-weight: 600;

}
  .box >>> .el-table__header-wrapper{
  /* height: 118px !important; */
  line-height: 60px !important;
}
</style>
<style>
    #bshzb .has-gutter> tr>th{
  padding: 0 !important
}
</style>
    
