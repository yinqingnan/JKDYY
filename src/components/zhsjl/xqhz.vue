<template>
    <div>
        <div class="box">
            <div class="box_header">
        <el-table
        :data="tablemsg"
        :default-sort="{prop: 'date', order: 'descending'}"
        class="table"
        :style="style"
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
          prop="companyName"
          label="所属公司"
          min-width="60px"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="incomAmountReceivable"
          label="应收金额"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="incomAmountReceipts"
          label="实收金额"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="Arrearage"
          label="欠费金额"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="rate"
          label="收缴率"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          :show-overflow-tooltip="true"
          align="center"
          min-width="40px"
        ></el-table-column>

      </el-table>
        </div>

        <div class="box_body">
            <div class="box_body_left">
                <sflfx></sflfx>
            </div>
            <div class="box_body_right">
                <div class="box_body_right_header">
                    <h1>项目对比分析</h1>
                </div>
                <div class="box_body_right_body">
                    <div class="box_body_right_body_left">
                        <div>
                           <h1>{{projectName}}</h1>
                           <ul>
                               <li>
                                   <h1>本月收费率</h1>
                                   <h2>50%</h2>
                               </li>
                               <li>
                                   <h1>本月排名</h1>
                                   <h2>10名</h2>
                               </li>
                           </ul>
                        </div>
                        <gsbg></gsbg>
                    </div>
                    <div class="box_body_right_body_right">
                         <div>
                              <h1>区域标杆</h1>
                           <ul>
                               <li>
                                   <h1>本月平均收费率</h1>
                                   <h2>50%</h2>
                               </li>
                               <li>
                                   <h1>全年平均收费率</h1>
                                   <h2>50%</h2>
                               </li>
                           </ul>
                        </div>
                        <qybg></qybg>
                    </div>

                </div>
            </div>
        </div>
        </div>
       

    </div>
</template>




<script>
import sflfx from '../echarts/sflfx'     //柱状图
import gsbg from "../echarts/gsbg"      //公司标杆图
import qybg from "../echarts/qybg"      //区域标杆图
export default {
    components:{
        sflfx,
        gsbg,
        qybg
    },
    data(){
        return {
            projectName:"",           //当前项目名称
            xmid:"",                //区域id
            tablemsg:[],           //小区表格数据
            style: {
            width: "100%",
            height: "158px",
            },
            echartsdata:[],           //图表数据
            msg:[1,5,2,6,5,4,32,3,1,2,43,1,321,31,321,31,32]

        }
    },
    mounted(){
        //    this.getheight();
        // console.log(this.$route.query.xmid)
        this.xmid=this.$route.query.xmid
        this.axios.get("/api/proChargeRate03?projectId="+this.xmid).then((res)=>{
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
    width: 55%;
    border: 1px solid #f0f0f0;
    margin-right: 12px;
    background: #fff
}
.box_body_right{
     width: 45%;
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
    height: 420px;
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

.box_body_right_body_right>div>h1{
    font-size: 14px;
    font-weight: 500;
    color: #73adce;
    text-indent: 20px
}
.box_body_right_body_right>div>ul{
    display: flex;
    margin-left: 20px;
    margin-top: 12px
}
.box_body_right_body_right>div>ul>li{
    color: #666
}
.box_body_right_body_right>div>ul>li>h1{
    font-size: 14px;
    font-weight: 500;
    line-height: 1
}
.box_body_right_body_right>div>ul>li>h2{
    color: #333;
    font-size: 14px;
    margin-top: 3px;
    line-height: 1;
    

}
.box_body_right_body_left>div>ul>li:nth-of-type(2){
    margin-left: 20px
}
</style>>
    
