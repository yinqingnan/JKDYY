<template>
    <div>
        <!-- <h1>项目能耗指标</h1> -->
        <!-- <div class="box" :style="style"> -->
        <div class="box">

            <div class="header">
                <button @click="TO" class="fhsj"><i class="el-icon-back"></i>返回</button>
                <div>
                    <h2>所属机构 : {{companyName}} > <span>{{projectName}}</span> </h2>
                </div>
              
            </div>
            <div class="box_header">
                <div>
                    <h2>{{projectName}}用电详情</h2>
                </div>
                <div>
                    <div class="box_header_left">
                        <ul>
                        <li
                            @click="btnli(index)"
                            :class="{active:index == num}"
                            v-for="(item,index) in list1"
                            :key="index"
                            >{{item}}</li>
                        </ul> 
                    <div v-show="show" class="tubiao">
                            <ydlzxt :xmid="xmid" :num="this.num"></ydlzxt>
                        </div>
                        <div v-show="show1" class="tubiao">
                            <ydlnhgc :xmid="xmid"   :num="this.num"></ydlnhgc>
                        </div> 
                    </div>
                
                
                    <div class="box_header_right">
                        <div class="box_header_right_header">
                            <div>
                                <h2 >本月用量构成</h2>
                                <h5 @click="totable">更多 <span class="iconfont iconpub_right" ></span></h5>
                                <img src="@/assets/ima/alert.png" alt="" v-if="jbone">
                            </div>
                            
                            <el-table :data="tableData" style="width: 100%"  border    :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
                                <template v-for="(col ,index) in cols">
                                    <el-table-column  :prop="col.prop" :label="col.label" :key="index" :show-overflow-tooltip="true" align="center"></el-table-column>
                                </template>
                            </el-table>
                        </div>
                        <div class="box_header_right_header">
                            <div>
                                <h3>年度用量统计</h3>

                            </div>
                            <el-table
                                :data="table2"
                                border
                                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                                style="width: 100%"
                                :cell-style="cellStyle"
                                >
                                <el-table-column prop="stateType" label="分析项" :show-overflow-tooltip="true" align="center" min-width="58px" ></el-table-column>
                                <el-table-column prop="m1" label="1月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                    <template slot-scope="scope">
                                        <span 
                                        size="mini"
                                        @click="m1(scope.$index, scope.row)">{{scope.row.m1}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m2" label="2月" :show-overflow-tooltip="true" align="center" min-width="45px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m2(scope.$index, scope.row)">{{scope.row.m2}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m3" label="3月" :show-overflow-tooltip="true" align="center" min-width="45px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m3(scope.$index, scope.row)">{{scope.row.m3}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m4" label="4月" :show-overflow-tooltip="true" align="center" min-width="45px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m4(scope.$index, scope.row)">{{scope.row.m4}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m5" label="5月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m5(scope.$index, scope.row)">{{scope.row.m5}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m6" label="6月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m6(scope.$index, scope.row)">{{scope.row.m6}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m7" label="7月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m7(scope.$index, scope.row)">{{scope.row.m7}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m8" label="8月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m8(scope.$index, scope.row)">{{scope.row.m8}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m9" label="9月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m9(scope.$index, scope.row)">{{scope.row.m9}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m10" label="10月" :show-overflow-tooltip="true" align="center" min-width="52px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m10(scope.$index, scope.row)">{{scope.row.m10}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m11" label="11月" :show-overflow-tooltip="true" align="center" min-width="50px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m11(scope.$index, scope.row)">{{scope.row.m11}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="m12" label="12月" :show-overflow-tooltip="true" align="center" min-width="52px">
                                    <template slot-scope="scope">
                                        <span    
                                        size="mini"
                                        @click="m12(scope.$index, scope.row)">{{scope.row.m12}}</span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true" align="center" min-width="50px"></el-table-column> -->
                            </el-table>
                        </div>
                    </div>

                </div>
                
            </div>
            <!-- 下半部分 -->
            <div class="box_center">
                <div>
                    <h2>{{projectName}}用水详情</h2>
                </div>
                <div>
                       <div class="box_header_left">
                    <ul>
                       <li
                        @click="btnli1(index)"
                        :class="{active:index == num1}"
                        v-for="(item,index) in list"
                        :key="index"
                        >{{item}}</li>
                    </ul>
                    <div v-show="show3" class="tubiao">
                        <yslzxt :xmid="xmid" :num1="num1"></yslzxt>
                    </div>
                    <div v-show="show4" class="tubiao">
                        <yslnhgc :xmid="xmid" :num1="num1"></yslnhgc>
                    </div>
                </div> 
               <div class="box_header_right">
                    <div class="box_header_right_header">
                        <div>
                            <h2 >本月用量构成</h2>
                            <h5 @click="totable1">更多 <span class="iconfont iconpub_right" ></span></h5>
                             <img src="@/assets/ima/alert.png" alt="" v-if="jbtwo">
                        </div>
                            <el-table :data="tableData1" style="width: 100%"  border    :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
                            <template v-for="(col ,index) in cols1">
                                <el-table-column  :prop="col.prop" :label="col.label" :key="index" :show-overflow-tooltip="true" align="center"></el-table-column>
                            </template>
                        </el-table>
                    </div>
                    <div class="box_header_right_header">
                        <div>
                            <h3>年度用量统计</h3>
                        </div>
                        
                          <el-table
                            :data="table1"
                            border
                            :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                            :cell-style="cellStyle"
                            style="width: 100%">
                            <el-table-column prop="stateType" label="分析项" :show-overflow-tooltip="true" align="center" min-width="58px" ></el-table-column>
                            <el-table-column prop="m1" label="1月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm1(scope.$index, scope.row)">{{scope.row.m1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m2" label="2月" :show-overflow-tooltip="true" align="center" min-width="45px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm2(scope.$index, scope.row)">{{scope.row.m2}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m3" label="3月" :show-overflow-tooltip="true" align="center" min-width="45px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm3(scope.$index, scope.row)">{{scope.row.m3}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m4" label="4月" :show-overflow-tooltip="true" align="center" min-width="45px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm4(scope.$index, scope.row)">{{scope.row.m4}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m5" label="5月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm5(scope.$index, scope.row)">{{scope.row.m5}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m6" label="6月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm6(scope.$index, scope.row)">{{scope.row.m6}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m7" label="7月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm7(scope.$index, scope.row)">{{scope.row.m7}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m8" label="8月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm8(scope.$index, scope.row)">{{scope.row.m8}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m9" label="9月" :show-overflow-tooltip="true" align="center" min-width="46px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm9(scope.$index, scope.row)">{{scope.row.m9}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m10" label="10月" :show-overflow-tooltip="true" align="center" min-width="52px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm10(scope.$index, scope.row)">{{scope.row.m10}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m11" label="11月" :show-overflow-tooltip="true" align="center" min-width="50px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm11(scope.$index, scope.row)">{{scope.row.m11}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="m12" label="12月" :show-overflow-tooltip="true" align="center" min-width="52px">
                                <template slot-scope="scope">
                                    <span    
                                    size="mini"
                                    @click="mm12(scope.$index, scope.row)">{{scope.row.m12}}</span>
                                </template>
                            </el-table-column>
                             <!-- <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true" align="center" min-width="50px"></el-table-column> -->
                        </el-table>
                    </div>
                </div>
                </div>
                

            </div>
        </div>
    </div>
</template>


<script>
import ydlzxt from "@/components/echarts/ydlzxt"   //用电量折线图
import ydlnhgc from "@/components/echarts/ydlnhgc"   //用电量能耗构成
import yslzxt from "@/components/echarts/yslzxt"   //用水量折线图
import yslnhgc from "@/components/echarts/yslnhgc"   //用水量能耗构成

export default {
    components:{
        ydlzxt,ydlnhgc,yslzxt,yslnhgc
    },
    data(){
        return{
           
            num:0,
            num1:0,
            show:true,
            show1:false,
            show3:true,
            show4:false,
            list:["用水量","能耗构成"],
            list1:["用电量","能耗构成"],
            style:{
                height:""
            },
            xmid:"",
            projectName:"",  //项目名称
            companyName:"",  //区域公司名称
            table1:[],
            table2:[],                                    //年度用量统计
            cols: [],           //用电当月构成title
            tableData: [],       //用电当月构成数据
             cols1: [],           //用水当月构成title
            tableData1: [] ,      //用水当月构成数据
            jbone:"",
            jbtwo:""
        }
    },
    mounted(){
        this.getheight()

        this.xmid=this.$route.query.xmid    //获取到路由参数 （项目的id）
        // 通过项目id来获取项目归属区域和项目名称
        this.axios.get("/api/projectInfoName?projectIdName="+this.xmid).then((res)=>{
            this.companyName=res.data.data[0].companyName
            this.projectName=res.data.data[0].projectName
        })
        // 获取到年度用电表格数据
        this.axios.get("/api/projectElectricityM2?projectId="+this.xmid).then((res)=>{
            // console.log(res.data.data)
            this.table2=res.data.data
        })
          this.axios.get("/api/projectWaterrentM2?projectId="+this.xmid).then((res)=>{
            // console.log(res.data.data)
            this.table1=res.data.data
        })
        // 获取到本月用电   构成表格数据   动态表头
        this.axios.get("/api/projectElectMType2?projectId="+this.xmid+"&topcount=10").then((res)=>{
            // console.log(res.data.data[0])

            this.cols=[]
            var list=res.data.data[0]
            var arr=[]
            var arr1=[]
            arr1.push(res.data.data[1],res.data.data[2])
            // var obj={}
             for(var item in list){
              var obj={
                     label:list[item],
                     prop:item
                }
                arr.push(obj)
             }
             for(var i=0;i<arr.length;i++){
                if(arr[i].prop=="type"){
                    var type=arr.splice(i,1)[0]
                }
             } 
             for(var k=0;k<arr.length;k++){
             
                if(arr[k].prop=="total"){
                    var total=arr.splice(k,1)[0]
                }
             } 


            //排序函数
            function compare(pro) { 
                return function (obj1, obj2) { 
                    var val1 = obj1[pro]; 
                    var val2 = obj2[pro]; 
                    if (val1 > val2 ) { //正序
                        return 1; 
                    } else if (val1 < val2 ) { 
                        return -1; 
                    } else { 
                        return 0; 
                    } 
                } 
            } 
            //使用排序方法 
            arr.sort(compare("prop")); 
            arr.unshift(type,total)

                this.cols=arr
                this.tableData=arr1

          
        })
        // 获取到本月用水    构成表格数据   动态表头
        this.axios.get("/api/projectWaterMType2?projectId="+this.xmid+"&topcount=6").then((res)=>{
            // console.log(res.data.data[0])
            this.cols1=[]
            var list=res.data.data[0]
            var arr=[]
            var arr1=[]
            arr1.push(res.data.data[1],res.data.data[2])
            // var obj={}
             for(var item in list){
              var obj={
                     label:list[item],
                     prop:item
                }
                arr.push(obj)
             }
             for(var i=0;i<arr.length;i++){
                if(arr[i].prop=="type"){
                    var type=arr.splice(i,1)[0]
                }
             } 
             for(var k=0;k<arr.length;k++){
             
                if(arr[k].prop=="total"){
                    var total=arr.splice(k,1)[0]
                }
             } 


            //排序函数
            function compare(pro) { 
                return function (obj1, obj2) { 
                    var val1 = obj1[pro]; 
                    var val2 = obj2[pro]; 
                    if (val1 > val2 ) { //正序
                        return 1; 
                    } else if (val1 < val2 ) { 
                        return -1; 
                    } else { 
                        return 0; 
                    } 
                } 
            } 
            //使用排序方法 
            arr.sort(compare("prop")); 
            arr.unshift(type,total)

                this.cols1=arr
                this.tableData1=arr1
        })
        this.axios.get("/api/projectWaterrentWar?projectId="+this.xmid).then((res)=>{
            if(res.data.data[0].WaterrentState==0){
                this.jbone=false
            }else{
                this.jbone=true
            }
            if(res.data.data[0].ElectricityState==0){
                this.jbone=false
            }else{
                this.jbone=true
            }
        })

   },
   methods:{
        getheight() {
        // 获取当前浏览器的高度赋值给元素
        // console.log(window.innerHeight + "px")
        this.style.height = window.innerHeight-4 + "px";

        },
        TO(){
            this.axios.get("/api/projectInfoName?projectIdName="+this.xmid).then((res)=>{
                // 跳转回上级
                this.$router.push({
                    path:'/region',
                    query:{
                        quid:res.data.data[0].companyId,
                        xmid:res.data.data[0].projectId
                    }
                })
            })
            // this.$router.go(-1)
          
        },
        totable(){          //跳转用电表格
            //   this.$router.push('/dyyd?xmid='+this.xmid)
            this.$router.push({
                path: '/dyyd',
                query: {
                    xmid: this.xmid,
                    Month:""
                }
            })
        },
        totable1(){         //跳转用水表格
              this.$router.push({
                path: '/dyys',
                query: {
                    xmid: this.xmid,
                    Month:""
                }
            })
        },
        btnli(index){
            this.num=index
            if(index==0){
                this.show=true
                this.show1=false
            }else{
                 this.show=false
                 this.show1=true
                //  this.num=index
            }
        },
        btnli1(index){
            this.num1=index
            if(index==0){
                this.show3=true
                this.show4=false  
                // this.num1=index
            }else{
                this.show3=false
                this.show4=true
                // this.num1=index

            }
        },
        m1(row){
            if(row==0){
                this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"1"
                    }
                })
            }
        },
        m2(row){
            if(row==0){
                  this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"2"
                    }
                })
            }
        },
        m3(row){
             if(row==0){
                  this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"3"
                    }
                })
            }
        },
        m4(row){
             if(row==0){
                  this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"4"
                    }
                })
            }
        },
        m5(row){
             if(row==0){
                  this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"5"
                    }
                })
            }
        },
        m6(row){
             if(row==0){
                  this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"6"
                    }
                })
            }
        },
        m7(row){
             if(row==0){
                  this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"7"
                    }
                })
            }
        },  
        m8(row){
            if(row==0){
                  this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"8"
                    }
                })
            }
        },
        m9(row){
             if(row==0){
                  this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"9"
                    }
                })
            }
        },
        m10(row){
            if(row==0){
                  this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"10"
                    }
                })
            }
        },
        m11(row){
             if(row==0){
                     this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"11"
                    }
                })
            }
        },
        m12(row){
            if(row==0){
                   this.$router.push({
                    path: '/dyyd',
                    query: {
                        xmid: this.xmid,
                        Month:"12"
                    }
                })
            }          
        },
        mm1(row){
            if(row==0){
                  this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"1"
                    }
                })
            }
        },
        mm2(row){
            if(row==0){
                     this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"2"
                    }
                })
            }
        },
        mm3(row){
             if(row==0){
                      this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"3"
                    }
                })
            }
        },
        mm4(row){
             if(row==0){
                      this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"4"
                    }
                })
            }
        },
        mm5(row){
             if(row==0){
                      this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"5"
                    }
                })
            }
        },
        mm6(row){
             if(row==0){
                      this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"6"
                    }
                })
            }
        },
        mm7(row){
             if(row==0){
                      this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"7"
                    }
                })
            }
        },  
        mm8(row){
            if(row==0){
                      this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"8"
                    }
                })
            }
        },
        mm9(row){
             if(row==0){
                      this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"9"
                    }
                })
            }
        },
        mm10(row){
            if(row==0){
                      this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"10"
                    }
                })
            }
        },
        mm11(row){
             if(row==0){
                     this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"11"
                    }
                })
            }
        },
        mm12(row){
            if(row==0){
                      this.$router.push({
                    path: '/dyys',
                    query: {
                        xmid: this.xmid,
                        Month:"12"
                    }
                })
            }          
        },
        cellStyle({row, column, rowIndex, columnIndex}){
            if(rowIndex === 0 && columnIndex === 1){ //指定坐标
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex === 2){
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex === 3){
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex === 4){
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex ===5){
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex ===6){
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex ===7){
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex ===8){
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex ===9){
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex ===10){
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex ===11){
                return 'cursor: pointer'
            }else if(rowIndex === 0 && columnIndex ===12){
                return 'cursor: pointer'
            }
        }

   }
}
</script>


<style scoped>
.box{
    background: #eeeeee;
    min-height: 768px;
    padding-bottom:14px;
    

}
.header{
    height: 55px;
    line-height: 55px;
    background: #ffffff;
    padding: 0 12px;
    display: flex
}
.header>button{
        width: 62px;
    border: 0;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    margin-top: 15px;
    font-size: 12px
}
.header>div{
    display: flex;
    margin-left: 20px
}
.header>div>h2{
    font-weight: 500;
    font-size: 14px;
    color: #666

}
.header>div>h2>span{
    text-decoration: underline
}
.box_header{
    height: 45%;
    min-height: 420px;
    /* background: #eeeeee; */
    margin: 0 12px;
    margin-bottom: 12px;
    border: 1px solid #e5e5e5;
    margin-top: 12px
}
.box_center{
    height: 45%;
    background: #fff;
    margin: 0 12px;
    border: 1px solid #e5e5e5;
    /* display: flex; */
    min-height: 420px;

}
.box_center>div:nth-of-type(2){
    display: flex
}
.box_center>div:nth-of-type(1)>h2{
    font-size: 20px;
    color: #666;
    line-height: 50px;
    height: 50px;
    text-align: center;
    font-weight: 500;
    border: 1px solid #f0f0f0
}
.box_header_left{
    width: 40%;
    background: #fff
}
.box_header_right{
    width: 60%;
    background: #fff;
    padding:0 10px;
    border-left: 1px solid #f0f0f0
}
.box_header>div:nth-of-type(2){display: flex}
.fhsj{
    border: 1px solid #4ac48b !important;
    background: #4ac48b !important;
    color: #fff !important;
    border-radius: 5px; 
}
.box_header_left{
    position: relative;
}
.box_header_left>ul{
    display: flex;
    position: absolute;
    top: 9px;
    left: 9px;
    z-index: 10
}
.box_header>div:nth-of-type(1){
    background: #fff;
    border-bottom: 1px solid #f0f0f0
}
.box_header>div:nth-of-type(1)>h2{
    font-size: 20px;
    color:#666;
    line-height: 50px;
    height:50px;
    text-align: center;
    font-weight: 500
}
.box_header_left>ul>li{
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    width: 60px;
    background: #a1a1a1;
    text-align: center;

}
.box_header_left>ul>li:hover{
    background: #49a4d9
}
.box_header_left>ul>li:nth-of-type(1){
    margin-right: 2px
}
.active{
    background: #49a4d9 !important
}
.box_header_left>div{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.box_header_right_header{
    height: 200px;
}
.box_header_right_header>div>h2{
    font-size: 16px;color: #666;
    width: 120px;
    height: 44px;
    line-height: 44px;
    background: #eee;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
    font-weight: 500
}
/* .box_header_right_header>div>h2:hover{
    background: #49a4d9;
    color: #fff
} */
.box_header_right_header>div>h3{
    font-size: 16px;
    color: #666;
    width: 120px;
    height: 44px;
    line-height: 44px;
    background: #eee;
    text-align: center;
    /* cursor: pointer; */
    margin-bottom: 10px;
    margin-top: 10px;
    font-weight: 500
}  
.tubiao {
    min-height: 420px;
    min-width: 420px;
    width: 100%
}
.box_header_right_header>div:nth-of-type(1){
    display: flex;
    justify-content: space-between;
    position: relative;
}
.box_header_right_header>div:nth-of-type(1)>img{
    position: absolute;
    right: 60px;
    top: 10px;
}
.box_header_right_header>div>h5{
    font-size: 12px;
    font-weight: 500;
    line-height: 55px;
    cursor: pointer;
    color:#49b8ea
}
.box_header_right_header>div>h5>span{
    font-weight: 500;
    font-size: 12px
}
.box_header_right_header>div>h5:hover{
    color: #49a4d9
}
.el-table .cell, .el-table th div {
    padding-right: 0;
}
.box>>> .el-table .cell, .el-table th div {
    padding-right: 0;
}
</style>

<style>
.box_header_right_header .el-table td, .el-table th{
    padding: 0
}

.box_header_right_header  .has-gutter{
    font-weight: 600;
    font-size: 20px
}
.box_header_right_header .container_left_header .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    padding: 4px
}


</style>