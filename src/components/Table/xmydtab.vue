
<template>
<!-- 项目用电详情页面 -->
    <div>
          <div class="box">
              <div class="boxTitle ">
                    <button @click="TO" class="fhsj"><i class="el-icon-back"></i>返回</button>
                    
                    
                    <h3 style="margin:0 auto">{{projectName}}小区{{year}}年{{month}}月用电量明细表
                    </h3>
                    <div class="select">
                        <el-select v-model="yeardefaultdefault" placeholder="请选择年份" @change="yearchange(yeardefaultdefault)"  style="width:100px;text-align: center;margin-right:10px">
                            <el-option 
                            v-for="(item,index) in years" 
                            :key="index"
                            :value="item" 
                            >
                            </el-option>
                        </el-select>
           
                        <el-select v-model="monthdefaultdefault" placeholder="请选择月份" @change="monthchange(monthdefaultdefault)"  style="width:100px;text-align: center;">
                            <el-option 
                            v-for="(item,index) in number" 
                            :key="index"
                            :value="item" 
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <h2 @click="exportExcel" class="daochu">导出</h2>
              
              </div>
      <el-table
        :data="tablemsg.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :style="style"
        :default-sort="{prop: 'date', order: 'descending'}"
        :summary-method="getSummaries"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
         show-summary
      class="table"
      >
        <el-table-column label="序号" type="index" width="50" :show-overflow-tooltip="true" align="center" min-width="40px"></el-table-column>
        <el-table-column prop="itemName" label="名称" min-width="106px" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="electricityMeter" label="表号" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="beginNumber" label="起数" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="endNumber" label="止数" :show-overflow-tooltip="true" align="center" min-width="122px"></el-table-column>
        <el-table-column prop="dosage" label="用量（度）" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="unitPrice" label="单价" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="amount" label="金额" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="payer" label="缴费人" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="ascription" label="用电归属" :show-overflow-tooltip="true" align="center"></el-table-column>
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
    data(){
        return {
            projectName:null,
            xmid:null,
            year:null,
            month:null,
            monthdefaultdefault:"",         //------------------默认显示的月份信息
            yeardefaultdefault:"",         //------------------默认显示的年份信息
            number:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],        //-----------月份信息
            years:["2020年","2019年","2018年","2017年","2016年","2015年","2014年","2013年","2012年","2011年","2010年","2009年","2008年","2007年","2006年","2005年","2004年","2003年","2002年","2001年","2000年"] ,       //-------------------------------年份限制2001年到2020年
            tablemsg:[],
            num:1,
            totalCount: null, //--------------------------------默认数据总数
            currentPage: 1, //----------------------------------默认开始页面
            //   istag: true,
            pagesize: 12, //------------------------------------每页显示的数据条数
            style:{
                width:"100%",
                height:'',
            },


            number1: null, //总计的第一个值
            number2: null //总计的第二个值
        }
    },
    mounted(){
         var date=new Date();
        this.month=date.getMonth()+1;
        this.monthdefaultdefault=date.getMonth()+1+"月";
        this.yeardefaultdefault=date.getFullYear()+"年";
        this.year=date.getFullYear()
        this.xmid=this.$route.query.xmid    //获取到路由参数 （项目的id）
      

        if(this.$route.query.Month==""){
            this.axios.get("/api/projectElectricity01?projectId="+this.xmid+"&year="+this.year+"&month="+this.month).then((res)=>{
                this.tablemsg=res.data.data
                this.totalCount=res.data.data.length
                this.number1=0
                this.number2=0

                res.data.data.forEach(item=>{
                    this.number1+=item.dosage
                    this.number2+=item.amount
                })
            })
        }else{
            // console.log(this.$route.query.Month)
            this.month=this.$route.query.Month 
            this.monthdefaultdefault=this.$route.query.Month +"月"
            this.axios.get("/api/projectElectricity01?projectId="+this.xmid+"&year="+this.year+"&month="+this.month).then((res)=>{
                this.tablemsg=res.data.data
                this.totalCount=res.data.data.length
                this.number1=0
                this.number2=0

                
                res.data.data.forEach(item=>{
                this.number1+=item.dosage
                this.number2+=item.amount
                })
             
            
            })
        }
       
 
    
        // 通过项目ID查询项目名称信息
        this.axios.get("/api/projectInfoName?projectIdName="+this.xmid).then((res)=>{
            // console.log(res.data.data)
            this.projectName=res.data.data[0].projectName
        })
        this.getheight()
    },
    methods:{
        getheight(){
            // 获取当前浏览器的高度赋值给元素
            this.style.height=window.innerHeight-130+"px"
            // console.log(window.innerHeight)
        },
        // 选中的年
        yearchange(yeardefaultdefault){
            // console.log(yeardefaultdefault.slice(0,4))
            this.year=yeardefaultdefault.slice(0,4)
            this.axios.get("/api/projectElectricity01?projectId="+this.xmid+"&year="+this.year+"&month="+this.monthdefaultdefault.slice(0,-1)).then((res)=>{
                        this.tablemsg=res.data.data
                        this.totalCount=res.data.data.length
                        this.number1=0
                        this.number2=0
                        res.data.data.forEach(item=>{
                        this.number1+=item.dosage
                        this.number2+=item.amount
                    })
            })

        }, 
        // 选中的月
        monthchange(monthdefaultdefault){
          
            if(monthdefaultdefault.length==3){
                this.month=monthdefaultdefault.slice(0,2)
                this.axios.get("/api/projectElectricity01?projectId="+this.xmid+"&year="+this.year+"&month="+this.month).then((res)=>{
                    this.tablemsg=res.data.data
                    this.totalCount=res.data.data.length
                    this.number1=0
                    this.number2=0
                    
                      res.data.data.forEach(item=>{
                        this.number1+=item.dosage
                        this.number2+=item.amount
                    })
                
                })
            } else if (monthdefaultdefault.length==2){
                this.month=monthdefaultdefault.slice(0,1)
                  this.axios.get("/api/projectElectricity01?projectId="+this.xmid+"&year="+this.year+"&month="+this.month).then((res)=>{
                    this.tablemsg=res.data.data
                    this.totalCount=res.data.data.length
                    this.number1=0
                    this.number2=0

                    
                      res.data.data.forEach(item=>{
                        this.number1+=item.dosage
                        this.number2+=item.amount
                    })
                   
                })
            }    

        },  
        handleSizeChange(cpage) {
            this.pagesize=cpage
        },
        current_change: function(currentPage) {
        this.currentPage = currentPage;
        },
        TO(){
            this.$router.go(-1)
        },
         getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index ===4) {
            sums[index] = '汇总';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
               if (column.property == "dosage") {
                //  console.log(column.property)
                sums[index] = values.reduce(() => {
                    if(this.number1==0){
                    return 0
                    }else{
                    return this.number1.toFixed(2)
                    }
                }, 0);
                } 
                 if (column.property == "amount") {
                //  console.log(column.property)
                sums[index] = values.reduce(() => {
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
    
      exportExcel(){
        this.$confirm('即将下载该表格, 是否继续下载?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
            if(res=confirm){
                 this.$message({
                type: 'success',
                message: '下载成功!'})
                     this.axios.get("/api/projectInfoName?projectIdName="+this.xmid).then((res)=>{
            // console.log(res.data.data[0].projectName)       //当前的项目名称
            // console.log(this.year)                          //当前的年份
            // console.log(this.month)                         //当前的月份
            let name=res.data.data[0].projectName+this.year+"年"+this.month+"月"+"用电量明细表"
            var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
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
                if (typeof console !== "undefined") window.console.log(e, wbout);
            }
            return wbout;

        })    
                




            }

        }).catch(() => {
             this.$message({
                    type: 'info',
                    message: '已取消下载',
                
                });      
        });


      }
      

    }
    
}
</script>


<style scoped>
.box{
    background: #eeeeee;
    /* height: 100%; */
    padding: 10px;
    /* height: 838px; */
}
.boxTitle{
    display: flex;
    height:55px;
    line-height:55px;
    background: #fff;
    border-bottom: 1px solid #f5f5f5;
    padding: 0 12px;
    justify-content: space-between
  
}
.boxTitle >button{
    width:62px;
    border: 0;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    margin-top: 15px;
    background: #fff;
    font-size: 12px
}
.boxTitle>h3{
 font-size: 20px;
    color: #666;
    line-height: 50px;
    height: 50px;
    text-align: center;
    font-weight: 500;
}
.boxTitle>h2{
    font-size: 10px;
    color: #666;
    font-weight: 500;
    /* margin-left: 20px */
    cursor: pointer;
}
.select{
    margin-right: 80px
}
.box1{
    /* width: 100% */
    background: #fff;
    height: 50px;
}
.daochu{
    border: 1px solid #4ac48b;
    height: 26px;
    width: 50px;
    line-height: 26px;
    margin-top: 8px;
    padding: 0 5px;
    border-radius: 5px;
    background: #4ac48b;
    color: #fff !important;
    position: absolute;
    top: 14px;
    text-align: center;
    right: 20px;
    font-size: 14px;
    cursor: pointer;
    font-size: 12px;
}
.daochu:hover{
 border: 1px solid #3c8dbc;
    box-shadow: none;
}
.fhsj{
    border: 1px solid #4ac48b !important;
    background: #4ac48b !important;
    color: #fff !important;
    border-radius: 5px; 
}
</style>







<style>
.month .el-input__inner{
    text-align: center
}                   

</style>