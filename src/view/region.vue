<template>
<!-- 区域公司项目页面 4.0 -->
    <div>
        <div class="container">
            <div class="Left">
                <div class="Downmenu">
                    <div class="select">
                        <el-select v-model="value" placeholder="请选择" class="selects" style="width:200px;border:0" @change="selectchange(value)">
                            <el-option
                            v-for="item in getProjectList"
                            :key="item.value"
                            :label="item.companyName"
                            :value="item.id"
                            >
                            </el-option>
                        </el-select>

                         <el-select v-model="value1" placeholder="请选择项目" class="selects" style="width:200px;border:0" @change="selectchange1(value1)" filterable>
                            <el-option
                            v-for="item in getregionList"
                            :key="item.projectName"
                            :label="item.projectName"
                            :value="item.projectId"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="Title">
                    <ul>
                        <li>
                            <img src="../assets/ima/home_node.png" alt="">
                        </li>
                        <li>
                            <h1>{{list1[0]}}</h1> 
                             <span v-for="(item,index) in titlename" :key="index" >{{item.nodeAchievingRate}}%</span>
                        </li>
                        <li>
                            <h1>{{list1[1]}}</h1> 
                            <span v-for="(item,index) in titlename " :key="index" >{{item.nodeCategory1Overdue}}个</span>

                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h1>{{list2[0]}}</h1>
                              <h2  v-for="(item,index) in titlename" :key="index" >{{item.totalIncome}}<span>万元</span></h2>
                        </li>
                        <li>
                            <h1>{{list2[1]}}</h1>
                            <h2  v-for="(item,index) in titlename" :key="index" >{{item.totalprofit}}<span>万元</span></h2>

                            
                        </li>
                    </ul>
                </div>

                <Timeaxis :xmid="xmid"></Timeaxis>

                <div class="Chart">
                    <div>
                        <h1>关键指标</h1>
                        <h2>更多 <span class="iconfont iconpub_right" ></span></h2>
                    </div>
                    <div>
                 
                           
<!-- 
                            <div class="yq">
                                    <ul v-for="(item,index) in zsryq" :key="index">
                                        <li style="width:20%">{{item.incomType}}</li>
                                        <li style="width:30%">{{(item.incomMoney/10000).toFixed(2)}} 万元</li>
                                        <li style="width:30%">
                                            <span :class="item.state==1? 'Green':'Red'" > <i :class="item.state==1? 'Greensj':'Redsj'"></i> 
                            {{item.changeRate.toFixed(1)}}%</span>
                                        </li>
                                     
                                    </ul>
                            </div> -->

                    <!-- 关键指标图表1 -->
                        <div>
                            <h1>综合收费率 <span class="Green"> <i class="Greensj"></i> 9%</span></h1>
                            <h2>81%</h2>
                            <div>
                             
                            </div>
                        </div>
                    <!-- 关键指标图表2 -->
                         <div>
                            <h1 v-for="(item,index) in bstitle" :key="index">报事完结率 <span :class="item.state==1? 'Green':'Red'" > <i :class="item.state==1? 'Greensj':'Redsj'"></i> 
                            {{item.changeRate.toFixed(1)}}%</span></h1>
                             <h2 v-for="(item,index) in bstitle" :key="index+1">
                                {{item.newRate.toFixed(2)}}
                                <span>%</span>
                            </h2>
                            <div>
                                <div style="width:100%">

                                    <xmbssxzzt  :bshxzzt="bshxzzt" :xsyf="xsyf" style="width:100%"></xmbssxzzt>
                                </div>
                                <div style="width:100%">
                                    <xmbshxzzt :bssxzzt="bssxzzt" style="width:80%"></xmbshxzzt>
                                </div>
                            </div>
                        </div>
                    <!-- 关键指标图表3 -->

                         <div>
                            <h1>现场品质  <span class="Green"> <i class="Greensj"></i> 9%</span></h1>
                            <h2>85%</h2>
                            <div>
                                <!-- <Histogram/>   
                                <Transversehistogram/> -->
                            </div>
                        </div>
                    </div>
                    <div class="Chart1">
                        <div>
                            <div>
                                <h1>品质服务信息</h1>
                                <h2>更多 <span class="iconfont iconpub_right" ></span></h2>
                            </div> 
                            <radar/>

                        </div>
                        <div>
                            <div>
                                <h1>项目能耗指标</h1>
                                <h2>更多 <span class="iconfont iconpub_right" ></span></h2>
                            </div> 
                            <div class="xmnh">
                                <div class="xmys">
                                    <ul >
                                        <li @click="btn(index)" :class="{active:index == num}" v-for="(item,index) in list3" :key="index">{{item}} </li></ul>
                                    <xmnhysqn :xmnhysqn="xmnhysqn" v-show="isshow"></xmnhysqn>
                                </div>
                                <div class="xmyd">
                                    <div class="xmyd">
                                    <ul >
                                        <li @click="btn1(index)" :class="{active:index == num1}" v-for="(item,index) in list4" :key="index">{{item}} </li></ul>
                                        <xmnhydqn :xmnhysqn="xmnhydqn" v-show="isshow1"></xmnhydqn>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

            </div>



            
            <div class="Right">
                <div class="table1">
                    <tab :xmid="xmid"></tab>
                </div>
                <div class="table1 table2 ">
                    <h1>常用报表</h1>
                     <ul>
                        <li v-for="(item,index) in Commonreports" :key="index">
                             <h2 :title="item.title">{{item.title}}</h2>
                            <h2>{{item.updatedate}}</h2>
                        </li>
                    </ul>
                </div>
                <div class="table1 table3">
                    <div class="table3_header">
                        <h1>登录其他系统</h1>
                        <h2>更多 <span class="iconfont iconpub_right" ></span></h2>
                    </div>
                    <div class="table3_footer">
                        <ul>
                            <li v-for="(item,index) in loginxt" :key="index">
                                <img :src="item.imagehref" >
                                <h2>{{item.name}}</h2>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>


// 引入时间轴组建
import Timeaxis from "../components/timeaxis"
// //引入雷达图图
import radar from '../components/radar'
// 重要提醒tab组件
import tab from '../components/tab'
// 用水全年图表
import xmnhysqn from '../components/echarts/xmnhysqn'
// 用电全年图表
import xmnhydqn from "../components/echarts/xmnhydqn"

//项目报事完结率横向柱状图
import xmbshxzzt from '../components/echarts/xmbshxzzt'
//项目报事完结率竖向柱状图
import xmbssxzzt from '../components/echarts/xmbssxzzt'



export default {
    components:{
        Timeaxis,
        xmnhysqn,
        xmnhydqn,
        tab,
        xmbshxzzt,
        xmbssxzzt,
        radar
    },
    data() {
        return {
            date:null,                                              //默认的月份
            num:0,
            num1:0,
            isshow:true,
            isshow1:true,
            getProjectList:[],                                                      //--------------区域公司列表
            getregionList:[],                                                       //--------------项目列表
            qyid:null,                                                              //---------------区域id
            xmid:null,                                                              //---------------项目id
            list1:["节点达成率","重大节点逾期"],                                      //--------------列表1
            list2:["总收入","总利润"],                                               //--------------列表2
            Commonreports:[],                                                       //--------------常用报表
            titlename:[],                                                           //项目详情 
            value: '' ,                                                              //区域下拉默认信息
            value1: "",                                                              //项目下拉默认信息
            loginxt:[]  ,                                                            //登录其他系统数据
            xmnhysqn:[],                                                            //项目能耗用水全年数据
            xmnhydqn:[],                                                            //项目能耗用电全年数据
            list3:["全年用水","当月用水"],
            list4:["全年用电","当月用电"],
            bshxzzt:[] ,                                      //报事  横向柱状图
            bssxzzt:[]  ,                                     //报事  竖向柱状图
            bstitle:[],                                       //报事title信息
            bsmsg:[]   ,                                       //报事提示信息
            xsyf:null                                           //显示月份

        }
    },
    methods: {
        selectchange(value){            //区域公司级下拉菜单选中监听  
            console.log(value)
            this.value=value            
            this.axios.get("api/projectBycId?companyId="+value)
            .then((res)=>{
                this.getregionList=res.data.data               //区域下拉菜单切换后赋值给项目下来菜单
                this.value1=res.data.data[0].projectName
            })
        },
        selectchange1(value){          //项目公司下拉菜单监听
            console.log(value)
            this.xmid=value
            
        },
        btn(index){
            this.num=index
            // console.log(index)
            if(index==1){
                this.isshow=false
            }else{
                this.isshow=true
            }
        },
        btn1(index){
            this.num1=index
            // console.log(index)
            if(index==1){
                this.isshow1=false
            }else{
                this.isshow1=true
            } 
        }

    },
    mounted() {
            var date=new Date();   
            this.date=date.getMonth()+1    //获取到当前的月份信息      
            // 通过获取的区域公司id和项目id来显示默认数据
            this.quid= window.location.href.split("=")[1].split("&")[0]         //区域公司id
            this.xmid=window.location.href.split("=")[2]                        //项目id
            this.axios.get("api/companIdOrName?companIdOrName="+this.quid).then((res)=>{
                this.value=res.data.data[0].companyName
                this.axios.get("api/projectBycId?companyId="+res.data.data[0].companyId)
                .then((res)=>{
                this.getregionList=res.data.data
                this.value1=res.data.data[0].projectName
            })
            })
        // 获取区域公司列表
        this.axios.get('/api/projectCompanyList').then((res)=>{
            // console.log(res.data.data)
            this.getProjectList=res.data.data
        })
        //获取登录其它系统的数据
        this.axios.get("/api/systemDocking01")
        .then((res)=>{
            this.loginxt=res.data.data
        })
        //获取常用报表数据
        this.axios.get("/api/commonReport").then((res)=>{
            this.Commonreports=res.data.data
        })
        // 获取项目详情数据（根据路由携带的项目id查询数据）                      需变更数据              
        this.axios.get("api/projectInfoById?projectId="+this.xmid).then((res)=>{
            // console.log(res.data.data)
            this.titlename=res.data.data
        })  
        // 获取项目能耗用水数据                                               需变更数据  
        this.axios.get("api/projectWaterrentM?projectId="+this.xmid).then((res)=>{
            // console.log(res.data.data[0])
            this.xmnhysqn.push(res.data.data[0].m1,res.data.data[0].m2,res.data.data[0].m3,res.data.data[0].m4,res.data.data[0].m5,res.data.data[0].m6,res.data.data[0].m7,res.data.data[0].m8,res.data.data[0].m9,res.data.data[0].m10,res.data.data[0].m11,res.data.data[0].m12)
            // console.log(this.xunhysqn)
        })
        // 获取项目能耗用电数据                                                需变更数据  
        this.axios.get("api/projectElectricityM?projectId="+this.xmid).then((res)=>{
            // console.log(res.data.data)
            this.xmnhydqn.push(res.data.data[0].m1,res.data.data[0].m2,res.data.data[0].m3,res.data.data[0].m4,res.data.data[0].m5,res.data.data[0].m6,res.data.data[0].m7,res.data.data[0].m8,res.data.data[0].m9,res.data.data[0].m10,res.data.data[0].m11,res.data.data[0].m12)
        })

        // 获取关键指标报事完成率数据 竖向柱状图数据            需变更数据  
        this.axios.get("/api/projectMNewPYear?projectId=1062").then((res)=>{
            // console.log(res.data.data)
            // 通过当前月份进行判断，大于7就取7到12月数据。   小于就取1到6月数据
            if(this.date>=7){
                this.bshxzzt.push((res.data.data[0].m7/10000).toFixed(0),(res.data.data[0].m8/10000).toFixed(0),(res.data.data[0].m9/10000).toFixed(0),(res.data.data[0].m10/10000).toFixed(0),(res.data.data[0].m11/10000).toFixed(0),(res.data.data[0].m12/10000).toFixed(0))
                // console.log(this.bshxzzt)
                this.xsyf=1
            }else{
                this.bshxzzt.push((res.data.data[0].m1/10000).toFixed(0),(res.data.data[0].m2/10000).toFixed(0),(res.data.data[0].m3/10000).toFixed(0),(res.data.data[0].m4/10000).toFixed(0),(res.data.data[0].m5/10000).toFixed(0),(res.data.data[0].m6/10000).toFixed(0))
                // console.log(this.bshxzzt)
                this.xsyf=0
            }
        })
        // 获取关键指标报事完成率     横向柱状图数据            需变更数据  
         this.axios.get("api/projectRateMaxMinVm").then((res)=>{
            // console.log(res.data.data)
            let arr=res.data.data
            this.bssxzzt=[]
            arr.forEach(element => {
                 this.bssxzzt.push(element.rate.toFixed(2))
            });
        })
        //获取报事完结率   title数据                                 需变更数据  
        this.axios.get("/api/projectTotalRate?projectId=1062").then((res)=>{
            // console.log(res.data.data)
            this.bstitle=res.data.data
        })
        // 获取报事完结率   提示信息                                需变更数据
        this.axios.get("/api/projectTypeRate?projectId=1021").then((res)=>{
            console.log(res.data.data)
            this.bsmsg=res.data.data
        })
      
    },
}
</script>


<style scoped>
.xmnh{
    padding: 18px 7px 0 14px
}
.xmnh>div{
    height: 148px;
    width: 100%
}
.xmys{
    position: relative;
}
.xmys>ul{
    position: absolute;
    display: flex;
    right :20px;
    z-index: 10;
}
.xmys>ul>li{
    cursor: pointer;
}
.xmys>ul>li:nth-of-type(2){
    margin-left: 20px
}
.xmyd{
    margin-top: 48px;
    position: relative;
}
.xmyd>ul{
    position: absolute;
    display: flex;
    right :20px;
    z-index: 10;
}
.xmyd>ul>li:nth-of-type(2){
    margin-left: 20px
}
.active{
        color: #49a4d9 !important ;
    border-bottom:2px solid #49a4d9
}





















.container{
    background: #eeeeee;
    padding :.75rem;
    display :flex;
    justify-content :space-between;
   
} 
   
.Left{
     border: 1px solid #e0dfe8;
    width :100%;
    background: #fff;
    /* height :1150px; */
}
.Right {
    width: 18.125rem;
    margin: 0 0 0 10px;
    background :#eee;
}   

.ModalFrame>ul{
    z-index: 10;
    width: 17.875rem;
    height: 17.5rem;
    overflow: auto;
    position: absolute;
    top: 36px;
    left: 62px;
    background: #fff;
    border: 1px solid #dfdfdf

}  
.Downmenu{
    border-bottom: 1px solid #e0dfe8;
    position: relative;
    height: 50px
}
.select{
    line-height: 50px;
}



.Downmenu>h1{
    font-size: 16px;
    line-height: 50px;
    margin: 0 0 20px 18px;
    font-weight: 100;
    width: 150px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
}   
.Downmenu>h1>span{
    font-size: .375rem;
    color: #a0a0a0
}    
.Title{
    padding: 16px 0;
    width: 100%;
    display: flex;
    border-bottom: 1px dashed #e0dfe8
}
.Title>ul:nth-of-type(1){
    width: 30%
}
.Title>ul:nth-of-type(1){
    display: flex;
    width: 40%;
    border-right: 1px dashed #e0dfe8
}
.Title>ul:nth-of-type(1)>li{
    width: 30%;
    position: relative;
    white-space: nowrap
}
.Title>ul:nth-of-type(1)>li:nth-of-type(3){
  margin-left: 28px;
  margin-right: 40px
}
.Title>ul:nth-of-type(1)>li>h1{
    font-size: 12px;
    color: #666;
    line-height: 1;
    font-weight: 100;
    margin-top: 14px;
    white-space: nowrap
}
.Title>ul:nth-of-type(1)>li:nth-of-type(1){
    margin: 8px 17px .5rem 24px;
}

.Title>ul:nth-of-type(1)>li>span{
    position: absolute;
    top: 36px;
    left: 0;
    line-height: 1;
    font-size: 20px;
    white-space: nowrap
}

.Title>ul:nth-of-type(2){
    width: 70%;
    display: flex;
    padding-top :14px; 
}
.Title>ul:nth-of-type(2)>li:nth-of-type(1){
    margin-left: 3.125rem
}
.Title>ul:nth-of-type(2)>li:nth-of-type(2){
    margin-left: 4.625rem
}
.Title>ul:nth-of-type(2)>li>h1{
    font-size: 12px;
    font-weight: 100;
    line-height: 1;
    white-space: nowrap 
}
.Title>ul:nth-of-type(2)>li>h2{
    font-size: 20px;
    font-weight: 600;
    line-height: 1;
    margin-top: 9px;
    white-space: nowrap
}
.Title>ul:nth-of-type(2)>li>h2>span{
    font-size: 12px
}
.Chart>div:nth-of-type(1){
    display: flex;
    justify-content: space-between;
    padding: 0 1.375rem;
    height: 40px;
   
}
.Chart>div:nth-of-type(1)>h1{
    font-size: 16px;
    line-height: 1;
    color: #333
}
.Chart>div:nth-of-type(1)>h2{
    font-size: .75rem;
    line-height: 1;
    color: #666;
    font-weight: 100;
    cursor: pointer;

}
.Chart>div:nth-of-type(1)>h2>span{
    color: #a7a7a7;
    font-size: .625rem;
    font-weight: 100
}
.Chart>div:nth-of-type(2){
    display: flex;
    justify-content: space-around;
}
.Chart>div:nth-of-type(2)>div{
    width: 30%;
    height: 340px;
    background: #f0eded;
}
.Chart>div:nth-of-type(2)>div>h1{
    font-size: 12px;
    color: #666;
    margin:16px 0 8px 33px;
    line-height: 1;
    font-weight: 100
}
.Chart>div:nth-of-type(2)>div>h1>span{
    line-height: 1;
    font-size: 11px;
    font-weight: 600;
    margin-left: 1.4375rem;
    position: relative;
}
.Chart>div:nth-of-type(2)>div>h2{
    font-weight: 600;
    color: #333333;
    margin-left: 33px;
    margin-bottom: 54px
}
.Chart>div:nth-of-type(2)>div>div{
   display: flex;
    justify-content: space-between;
    padding: 0 6px;
    height: 94px ;
    /* width:100% */
}
.Chart>div:nth-of-type(2)>div>div>div{
    flex:1
}






.table1{
    background: #fff;
    border: 1px solid #e0dfe8;
    height: 365px;

}
.table1>h1{
    font-size:16px;
    display:flex;
    height: 50px;
    /* justify-content: space-around; */
    border-bottom: 1px solid #f0f0f0;
    font-weight: 500;
    line-height: 50px;
    padding-left: 20px
    
}
.table1>ul{
    height: 310px;
    /*  当IE下溢出，仍然可以滚动*/ 
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:-moz-scrollbars-none;
}
/* 谷歌浏览器溢出滚动 */
.table1>ul::-webkit-scrollbar {display:none}
.table1>ul>li{
    font-size: 14px;
    max-width: 280px;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    cursor: pointer;
    margin-top: 20px
}
.table2{
    margin-top: 11px;
    height: 274px;

}
.table2>ul{
    height: 220px;
    overflow: hidden;
    overflow-y: auto;
     /*  当IE下溢出，仍然可以滚动*/ 
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:-moz-scrollbars-none;
}
/* 谷歌浏览器溢出滚动 */
.table2>ul::-webkit-scrollbar {display:none}
.table3{
    height: 210px;
    margin-top: 12px
}
.table2>ul>li>h2{
        font-size: 14px;
    text-decoration: underline;
    min-width: 170px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}
.table3_header{
    display: flex;
    justify-content: space-between;
    padding: 23px 16px 23px 20px
}
.table3_header>h1{
    font-size: 15px;
    font-weight: 500;
    color: #333
}
.table3_header>h2{
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    color: #666
}
.table3_header>h2>span{
    font-size: 12px;
    font-weight: 500;
    color: #a0a0a0
}
.table3_footer>ul{
    display: flex;
    justify-content: space-around
}
.table3_footer>ul>li{
    width: 64px;
    cursor: pointer;

}
.table3_footer>ul>li>img{
    width: 45px;
    height: 45px
}
.table3_footer>ul>li>h2{
    font-size: 12px;
    color: #666;
    line-height: 1;
    margin-top: 8px;
}


















.Chart1{
    display: flex;
    justify-content: space-between;
    padding: 0 1.375rem;
    margin-top: 20px;
    /* height:446px; */
    margin-bottom: 24px
    
}
.Chart1>div{
    border: 1px solid #e0dfe8
}
.Chart1>div:nth-of-type(1){
    width: 45%;
    /* min-width: 350px; */
    height: 417px;
}
.Chart1>div:nth-of-type(1)>div:nth-of-type(1){
    display: flex;
    justify-content: space-between;
    padding: 22px 18px 18px 18px;
    background: #fff;
    border-bottom: 1px solid #e0dfe8
    
}

.Chart1>div:nth-of-type(1)>div>h1{
    font-size: 14px;
    color: #333;
    line-height: 1;
    font-weight: 100
}
.Chart1>div:nth-of-type(1)>div>h2{
    font-size: 12px;
    color: #666;
    line-height: 1;
    cursor: pointer;

}
.Chart1>div:nth-of-type(1)>div>h2>span{
    font-size: 10px;
    color: #a0a0a0;
    line-height: 1;
    font-weight: 100
}


.Chart1>div:nth-of-type(2){
    width: 55%;
    margin-left: 16px;
    /* min-width: 396px; */
    height: 417px
}
.Chart1>div:nth-of-type(2)>div:nth-of-type(1){
    display: flex;
    justify-content: space-between;
    padding: 22px 18px 18px 18px;
    border-bottom: 1px solid #e0dfe8;
}

.Chart1>div:nth-of-type(2)>div>h1{
    font-size: 14px;
    color: #333;
    line-height: 1;
      font-weight: 100

}
.Chart1>div:nth-of-type(2)>div>h2{
    font-size: 12px;
    color: #666;
    line-height: 1;
    cursor: pointer;
}
.Chart1>div:nth-of-type(2)>div>h2>span{
    font-size: 10px;
    color: #a0a0a0;
    line-height: 1;
    font-weight: 100
}




.Red{
    color: #fc6077
}
.Green{
    color: #00c05a
}
/* 绿色三角形 */
.Greensj{
    width: 0;
    height: 0;
    display: inline-block;
    border: 6px solid;
    border-color:  transparent  transparent #80d8a8;
    position: absolute;
    top:-1px;
    left: -18px;
}
.Redsj{
    width: 0;
    height: 0;
    border: 6px solid;
    border-color:#fd566f transparent transparent ;
    position: absolute;
    top: 5px;
    left: -18px;
    display: inline-block;
}
</style>

<style>
/* 自己添加一个父类div来操作下面的需要修改的class样式 */
.selects>div>.el-input__inner{
    border: 0 ;
}
.selects .el-input__icon{
    width: 56px
}
</style>