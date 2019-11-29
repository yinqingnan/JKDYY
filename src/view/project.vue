<template>
<!-- 项目页面 -->
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
                            :value="item.companyName"
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
                            <span v-for="(item,index) in titlename" :key="index" >{{item.nodeRate}}%</span>
                        </li>
                        <li>
                            <h1>{{list1[1]}}</h1> 
                            <span v-for="(item,index) in titlename " :key="index"  style="font-size:20px">{{item.rowNum}}名</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h1>{{list2[0]}}</h1>
                            <h2  v-for="(item,index) in titlename" :key="index" >{{item.contractArea}}<span>万方</span></h2>
                        </li>
                        <li>
                            <h1>{{list2[1]}}</h1>
                            <h2 v-for="(item,index) in titlename " :key="index" > {{item.tubeArea}}<span>万方</span></h2>
                        </li>
                         <li>
                            <h1>{{list2[2]}}</h1>
                            <h2  v-for="(item,index) in titlename " :key="index" > {{item.chargingArea}}<span>万方</span></h2>
                        </li>
                    </ul>
                </div>


                <div class="Chart">
                    <div>
                        <h1>关键经营指标</h1>
                        <h2>更多 <span class="iconfont iconpub_right" ></span></h2>
                    </div>
                    <div>
                        <div>
                            <h1 v-for="(item,index) in zsr" :key="index" style="marginRight:30%;cursor: pointer;" @click="zrh">总收入 <span :class="item.state==1? 'Green':'Red'" ><i :class="item.state==1? 'Greensj':'Redsj'"></i> 
                            {{item.changeRate.toFixed(1)}}%</span></h1>
                            <h2 >
                                {{(zsrnumber/10000).toFixed(0)}}<span>万元</span>
                            </h2>
                            <div>
                                <div style="width:100%">
                                    <qugszsr1 :zsrsxzzt1="zsrsxzzt1" :zsrsxzztm="zsrsxzztm"></qugszsr1>
                                </div>
                                <div style="width:100%">
                                    <qugszsr2 :zsrhxzzttitle="zsrhxzzttitle" :zsrhxzzt2="zsrhxzzt2" style="width:80%"></qugszsr2>
                                </div>
                            </div>
                              <div class="yq">
                                    <ul v-for="(item,index) in zsryq" :key="index">
                                        <li style="width:20%">{{item.incomType}}</li>
                                        <li style="width:30%;font-weight:600">{{(item.incomMoney/10000).toFixed(2)}} 万元</li>
                                        <li style="width:30%">
                                            <span :class="item.state==1? 'Green':'Red'" > <i :class="item.state==1? 'Greensj':'Redsj'"></i> 
                            {{item.changeRate.toFixed(1)}}%</span>
                                        </li>
                                     
                                    </ul>
                                </div>
                        </div>
                         <div>
                            <h1>总利润</h1>  
                            
                            <img src="../assets/ima/development.png" alt="" style="margin:0 auto;display: block;marginTop: 66px;">
                            <h3 style="    text-align: center;fontWeight:500;fontSize:14px;marginTop: 14px;color:#666">即将上线</h3>
                            
                        <!-- </div> -->
                        </div>
                         <div>
                              <h1 @click="zhsfl" v-for="(item,index) in sfl" :key="index" style="marginRight:24%;cursor: pointer;">综合收缴率 <span :class="item.state==1? 'Green':'Red'" > <i :class="item.state==1? 'Greensj':'Redsj'"></i> 
                            {{item.changeRate.toFixed(1)}}%</span></h1>
                          
                            <h2 v-for="(item,index) in sfl " :key="index+1" >
                                {{(item.newRate).toFixed(0)}}%
                               
                            </h2>
                            <div >
                                  <div style="width:100%">
                                    <qygssfl1 :sflsxzzt1="sflsxzzt1" :zsrsxzztm="zsrsxzztm"></qygssfl1>
                                </div>
                                <div style="width:100%">
                                    <qygssfl2 :sflhxzzttitle="sflhxzzttitle" :sflhxzzt2="sflhxzzt2" style="width:80%"></qygssfl2>
                                </div>
                            </div>
                            <!-- dqsfl当前收费率 -->
                             <div class="yq yq1">
                                    <ul v-for="(item,index) in dqsfl" :key="index">
                                        <li style="width:40%">当前综合收费率</li>
                                        <li style="width:30%;font-weight:600">{{(item.changeRate/10000).toFixed(2)}} 万元</li>
                                        <li style="width:30%">
                                            <span :class="item.state==1? 'Green':'Red'" > <i :class="item.state==1? 'Greensj':'Redsj'"></i> 
                            {{item.changeRate.toFixed(1)}}%</span>
                                        </li>
                                     
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div class="Chart1">
                        <div>
                            <div class="Chart1_header">
                                <h1>品质服务信息</h1>
                                <h2>更多 <span class="iconfont iconpub_right" ></span></h2>
                            </div>
                            <div class="Chart1_footer">
                                <div class="Chart1_footer1">
                                    <Qualityservice :Realestates="Realestates"  style="width:70%"></Qualityservice>
                                    <h2 style="min-width:60px;text-align:center">{{Realestate}}</h2>
                                </div>
                                <div class="Chart1_footer1">
                                    <Qualityservice2 :Realestates="Others" style="width:70%"></Qualityservice2>
                                    <h2 style="min-width:60px;text-align:center">{{Other}}</h2>
                                </div>
                                <div class="Chart1_footer1 Chart1_footer2">
                                    <Qualityservice3 :Realestates="Propertycategorys" style="width:70%"></Qualityservice3>
                                    <h2 style="min-width:60px;text-align:center">{{Propertycategory}}</h2>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="Chart1_header">
                                <h1>外拓规模信息</h1>
                                <h2>更多 <span class="iconfont iconpub_right" ></span></h2>
                            </div>
                             <img src="../assets/ima/development.png" alt="" style="margin:0 auto;display: block;marginTop: 66px;">
                            <h3 style="    text-align: center;fontWeight:500;fontSize:12px;marginTop: 14px;color:#666">即将上线</h3>
                        </div>
                        <div>
                            <div class="Chart1_header">
                                <h1>人力资源信息</h1>
                                <h2>更多 <span class="iconfont iconpub_right" ></span></h2>
                            </div>
                             <img src="../assets/ima/development.png" alt="" style="margin:0 auto;display: block;marginTop: 66px;">
                            <h3 style="    text-align: center;fontWeight:500;fontSize:12px;marginTop: 14px;color:#666">即将上线</h3>
                        </div>
                    </div>
                    
                </div>

            </div>



            
            <div class="Right">
                <div class="table1">
                    <h1>重要提醒</h1>
                    <ul>
                        <li v-for="(item,index) in reminder" :key="index">
                            <h2 :title="item.remindTitle">{{item.remindTitle}}</h2>
                            <h2>{{item.remindTime.split(" ")[0]}}</h2>
                        </li>
                    </ul>
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
                      
                    </div>
                    <div class="table3_footer">
                        <ul>
                            <li v-for="(item,index) in loginxt" :key="index" >
                                <img :src="item.imagehref" >
                                <h2 :title="item.name">{{item.name}}</h2>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>


// 引入折线图
import Qualityservice from  "../components/echarts/Qualityservice"
import Qualityservice2 from "../components/echarts/Qualityservice2"
import Qualityservice3 from "../components/echarts/Qualityservice3"
// 引入总收入柱状图
import qugszsr1 from "../components/echarts/qugszsr1"
import qugszsr2 from "../components/echarts/qugszsr2"
// 引入综合收费率图表
import qygssfl1 from "../components/echarts/qygssfl1"
import qygssfl2 from "../components/echarts/qygssfl2"
export default {
    components:{
        Qualityservice,Qualityservice2,Qualityservice3,qugszsr2,qugszsr1,qygssfl1,qygssfl2
    },
    data() {
        return {
            id:null,                //---------------------------------请求数据统一的id
            date:null,              //---------------------------------当前的月份
            getProjectList:[],      //---------------------------------区域公司名称列表
            list1:["节点达成率","当前排名"],//---------------------------列表1
            list2:["合同面积","在管面积","收费面积"],//-------------------列表2
            value: '' ,             //---------------------------------下拉菜单1默认的选项
            loginxt:[],             //---------------------------------登录其他系统数据
            Realestate:"",          //---------------------------------地产类title
            Realestates:[],         //---------------------------------地产类数据
            Realestateid:"zxt1",    //---------------------------------地产类id
            Realestatecolor:"'#1bbdf2'",//-----------------------------地产类颜色
            Other:"",               //---------------------------------其他类title
            Others:[],              //---------------------------------其他类数据
            Propertycategory:"",    //---------------------------------物业类title
            Propertycategorys:[],   //---------------------------------物业类数据
            reminder:[],            //---------------------------------重要提醒数据      
            Commonreports:[],        //---------------------------------常用报表
            zsr:[],                 //---------------------------------关键指标总收入 data1
            zsrnumber:"",           //---------------------------------总收入的指数
            zsrsxzzt1:[],             //---------------------------------总收入竖向柱状图
            zsrsxzztm:null,            //--------------------------------显示月份
            zsrhxzzt2:[],            //---------------------------------总收入横向柱状图数据
            zsrhxzzttitle:[] ,         //-------------------------------横向柱状图X轴title
            zsryq:[]  ,        //---------------------------------------总收入园区
            sfl:[],                //-----------------------------------综合收费率data
            sflnumber:"",           //---------------------------------收费率的指数
            sflsxzzt1:[],             //-------------------------------收费率竖向柱状图
            sflsxzztm:null,            //------------------------------修改月份
            sflhxzzt2:[],            //--------------------------------收费率横向柱状图数据
            sflhxzzttitle:[] ,         //------------------------------收费率横向柱状图X轴title
            dqsfl:[]  ,        //--------------------------------------收费率当前收费率
            titlename:[],                   //-----------------------------节点达成率等数据




        }
    },
    methods: {
        selectchange(value){            //下拉菜单选中监听输出为该区域的名称
        // console.log(encodeURI(value))
            window.location.href=window.location.href.split("=")[0]+"="+encodeURI(value)
        },
            // 综合收费率跳转
        zrh(){
        // console.log(this.value)
            
        this.axios.get("/api/companIdOrName?companIdOrName="+encodeURI(this.value)).then((res)=>{
            // console.log(res.data.data)
            this.$router.push("zsr?qyid="+res.data.data[0].companyId)
        })
        },
        zhsfl(){
            this.axios.get("/api/companIdOrName?companIdOrName="+encodeURI(this.value)).then((res)=>{
                // console.log(res.data.data[0].companyId)
                this.$router.push("zhsjl?qyid="+res.data.data[0].companyId)
            })
        }
    },
    mounted() {
        this.value=this.$route.query.name       //获取到路由的参数
        var date=new Date();   
        this.date=date.getMonth()+1    //获取到当前的月份信息            
        // console.log(window.location.href)//获取当前的路由

        // 获取项目列表
        this.axios.get('/api/projectCompanyList').then((res)=>{
            // console.log(res.data.data)
            this.getProjectList=res.data.data
     
        // 获取当前区域公司的节点达成率等信息               this.value代表路由传进来的参数
           this.titlename= this.getProjectList.filter((item)=>{
                return   item.companyName==this.value      
           })
        //    console.log(this.titlename)
           this.id=this.titlename[0].id
           
            // 获取重要提醒数据
            this.axios.get("/api/importantReminder01?topcount=10&companyId="+this.id)                
            .then((res)=>{
                // console.log(res.data.data)
                this.reminder=res.data.data
            })
            // 获取关键指标总收入数据
            this.axios.get("http://222.180.200.126:9045/api/companyIncomtoOld?companyId="+this.id)        
            .then((res)=>{
                // console.log(res.data.data)
                this.zsr=res.data.data
                this.zsrnumber=res.data.data[0].newReceiptsAll
            })
            // 获取总收入竖向柱状图数据
            this.axios.get("http://222.180.200.126:9045/api/companyReceipts?year=2019&companyId="+this.id)        
            .then((res)=>{
                // 通过当前月份进行判断，大于7就取7到12月数据。   小于就取1到6月数据
                if(this.date>=7){
                    this.zsrsxzzt1.push((res.data.data[0].Receipts7/10000).toFixed(0),(res.data.data[0].Receipts8/10000).toFixed(0),(res.data.data[0].Receipts9/10000).toFixed(0),(res.data.data[0].Receipts10/10000).toFixed(0),(res.data.data[0].Receipts11/10000).toFixed(0),(res.data.data[0].Receipts12/10000).toFixed(0))
                    this.zsrsxzztm=1
                }else{
                    this.zsrsxzzt1.push((res.data.data[0].Receipts1/10000).toFixed(0),(res.data.data[0].Receipts2/10000).toFixed(0),(res.data.data[0].Receipts3/10000).toFixed(0),(res.data.data[0].Receipts4/10000).toFixed(0),(res.data.data[0].Receipts5/10000).toFixed(0),(res.data.data[0].Receipts6/10000).toFixed(0))
                    this.zsrsxzztm=0
                }
            })
              // 获取总收入横向柱状图数据
            this.axios.get("api/companyIncomeMaxMin")                                                      
            .then((res)=>{
                // console.log(res.data.data)
                let arr=res.data.data
                this.zsrhxzzttitle=[]
                this.zsrhxzzt2=[]
                arr.forEach(element => {
                    // console.log(element.ReceiptsAll)
                    this.zsrhxzzttitle.push(element.state)
                    this.zsrhxzzt2.push((element.ReceiptsAll/10000).toFixed(0))
                });
            })
            // 获取园区数据
            this.axios.get("http://222.180.200.126:9045/api/companyTypeMoney?companyId="+this.id)                
            .then((res)=>{
                // console.log(res.data.data)
                this.zsryq=res.data.data
            })
            
            // 获取综合收费率数据
            this.axios.get("http://222.180.200.126:9045/api/companyTotalRate?companyId="+this.id)                
            .then((res)=>{
                this.sfl=res.data.data
            })
            //综合收费率竖向柱状图
            this.axios.get("http://222.180.200.126:9045/api/companyRates?year=2019&companyId="+this.id)           
            .then((res)=>{  
                // console.log(res.data.data)
                if(this.date>=7){
                    this.sflsxzzt1.push((res.data.data[0].Rates7).toFixed(0),(res.data.data[0].Rates8).toFixed(0),(res.data.data[0].Rates9).toFixed(0),(res.data.data[0].Rates10).toFixed(0),(res.data.data[0].Rates11).toFixed(0),(res.data.data[0].Rates12).toFixed(0))
                    this.zsrsxzztm=1
                }else{
                    this.sflsxzzt1.push((res.data.data[0].Rates1).toFixed(0),(res.data.data[0].Rates2).toFixed(0),(res.data.data[0].Rates3).toFixed(0),(res.data.data[0].Rates4).toFixed(0),(res.data.data[0].Rates5).toFixed(0),(res.data.data[0].Rates6).toFixed(0))
                    this.zsrsxzztm=0
                }
            })
            // 综合收费率横向柱状图
            this.axios.get("http://222.180.200.126:9045/api/companyRateMaxMinVm").then((res)=>{                  
                let arr=res.data.data
                this.sflhxzzttitle=[];
                this.sflhxzzt2=[]
                arr.forEach(element=>{
                    this.sflhxzzttitle.push(element.state)
                    this.sflhxzzt2.push(element.rate.toFixed(2))
                })
            })
               //当前收费率
            this.axios.get("http://222.180.200.126:9045/api/companyCuMonthRate?companyId="+this.id)                    
            .then((res)=>{
                // console.log(res.data.data)
                this.dqsfl=res.data.data
            })
            // 获取品质服务信息数据
            this.axios.get("/api/companymonthrate?companyId="+this.id) //使用区域公司名称进行查询                      
            .then((res)=>{
                // console.log(res.data.data)
                this.Realestate=res.data.data[0].newspapersCateType         //地产title
                this.Other=res.data.data[1].newspapersCateType              //其他title
                this.Propertycategory=res.data.data[2].newspapersCateType   //物业title
                this.Realestates.push(res.data.data[0].m01.toFixed(2),res.data.data[0].m02.toFixed(2),res.data.data[0].m03.toFixed(2),res.data.data[0].m04.toFixed(2),res.data.data[0].m05.toFixed(2),res.data.data[0].m06.toFixed(2),res.data.data[0].m07.toFixed(2),res.data.data[0].m08.toFixed(2),res.data.data[0].m09.toFixed(2),res.data.data[0].m10.toFixed(2),res.data.data[0].m11.toFixed(2),res.data.data[0].m12.toFixed(2))          //地产赋值

                this.Others.push(res.data.data[1].m01.toFixed(2),res.data.data[1].m02.toFixed(2),res.data.data[1].m03.toFixed(2),res.data.data[1].m04.toFixed(2),res.data.data[1].m05.toFixed(2),res.data.data[1].m06.toFixed(2),res.data.data[1].m07.toFixed(2),res.data.data[1].m08.toFixed(2),res.data.data[1].m09.toFixed(2),res.data.data[1].m10.toFixed(2),res.data.data[0].m11.toFixed(2),res.data.data[0].m12.toFixed(2))            //其他赋值
                
                this.Propertycategorys.push(res.data.data[2].m01.toFixed(2),res.data.data[2].m02.toFixed(2),res.data.data[2].m03.toFixed(2),res.data.data[2].m04.toFixed(2),res.data.data[2].m05.toFixed(2),res.data.data[2].m06.toFixed(2),res.data.data[2].m07.toFixed(2),res.data.data[2].m08.toFixed(2),res.data.data[2].m09.toFixed(2),res.data.data[2].m10.toFixed(2),res.data.data[2].m11.toFixed(2),res.data.data[2].m12.toFixed(2))      //物业赋值

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
            
        })


     
    },
}
</script>


<style scoped>
.container{
    background: #eeeeee;
    padding :.75rem;
    display :flex;
    justify-content :space-between;
   
} 
   
.Left {
  border: 1px solid #e0dfe8;
  width: 70%;
  background: #fff;
  /* height :1150px; */
  flex-grow: 1;
}
.Right {
  /* width: 30%; */
  margin: 0 0 0 12px;
  background: #eee;
  width: 292px;
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
    height: 55px
}
.select{
    line-height: 55px;
    height: 55px;
    padding-bottom: 1px
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
    padding: 18px 0;
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
    font-size: 14px;
    color: #666;
    line-height: 1;
    font-weight: 500;
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
    font-size: 24px;
    white-space: nowrap;
    color: #333
}

.Title>ul:nth-of-type(2){
    width: 70%;
    display: flex;
    padding-top :14px; 
}
.Title>ul:nth-of-type(2)>li:nth-of-type(1){
    margin-left: 3.125rem
}
.Title>ul:nth-of-type(2)>li{
    margin-left: 4.625rem
}
.Title>ul:nth-of-type(2)>li>h1{
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap ;
    color: #666
}
.Title>ul:nth-of-type(2)>li>h2{
    font-size: 24px;
    font-weight: 500;
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
    padding: 0 20px;
    line-height: 56px;
   
}
.Chart>div:nth-of-type(1)>h1{
    font-size: 16px;
    line-height: 56px;
    color: #333;
    font-weight: 500;
}
.Chart>div:nth-of-type(1)>h2{
    font-size: .75rem;
    line-height: 56px;
    color: #666;
    font-weight: 100;
    cursor: pointer;

}
.Chart>div:nth-of-type(1)>h2>span{
    color: #a0a0a0;
    font-size: .625rem;
    font-weight: 100
}
.Chart>div:nth-of-type(2){
    display: flex;
    justify-content: space-around;
    padding: 0 20px
}
.Chart>div:nth-of-type(2)>div{
    /* width: 33%; */
    flex: 1;
    height: 324px;
    background: #f0eded;
    min-width: 238px;
}
.Chart>div:nth-of-type(2)>div:nth-of-type(2){
    margin: 0 23px

}
.Chart>div:nth-of-type(2)>div>h1{
    font-size: 14px;
    color: #666;
    margin:16px 0 8px 33px;
    line-height: 1;
    font-weight: 100
}
.Chart>div:nth-of-type(2)>div>h1>span{
    line-height: 1;
    font-size: 14px;
    font-weight: 600;
    margin-left: 1.4375rem;
    position: relative;
}
.Chart>div:nth-of-type(2)>div>h2{
    font-weight: 600;
    color: #333333 ;
    margin-left: 33px;
    margin-bottom: 42px;
    font-size: 24px;
    
}
.Chart>div:nth-of-type(2)>div>h2>span{
    font-size: 14px;
    color: #666
}


/* 总收入echarts */

.Chart>div:nth-of-type(2)>div>div:nth-of-type(1){
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    height: 94px ;
    /* width:100% */
}










.table1{
    background: #fff;
    border: 1px solid #e0dfe8;
    height: 362px;

}
.table1>h1{
    font-size:16px;
    display:flex;
    height: 55px;
    /* justify-content: space-around; */
    border-bottom: 1px solid #f0f0f0;
    font-weight: 500;
    line-height: 55px;
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
    /* font-size: 14px; */
    max-width: 280px;
    line-height: 34px;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    cursor: pointer;
    overflow: hidden;
    /* margin-top: 20px */
}
.table1>ul>li>h2{
    font-size: 14px;
    text-decoration: underline;
    min-width: 170px;
    font-weight: 500;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: normal
}
.table1>ul>li>h2:nth-of-type(2){
    text-decoration: none;
    text-indent: 5px
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
    font-size: 16px;
    font-weight: 500;
    color: #333
}

.table3_footer>ul{
    display: flex;
    justify-content: space-around
}
.table3_footer>ul>li{
    width: 64px;
    cursor: pointer;text-align: center
}
.table3_footer>ul>li>img{
    width: 45px;
    height: 45px
}
.table3_footer>ul>li>h2{
    font-size: 12px;
    color: #666;
    line-height: 1;
    overflow: hidden;
    margin-top: 8px;
    height: 12px
}



/* 尾部 */
.Chart1{
    margin-top: 20px;
    padding: 0 14px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px
}
.Chart1>div{
    width: 30%;
    height: 326px;
    border: 1px solid #e0dfe8
}
.Chart1>div:nth-of-type(2){
    width: 40%;
    margin-left: 10px;
    margin-right: 8px
}

.Chart1_header{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0dfe8;
    /* line-height: 55px */
}

.Chart1>div:nth-of-type(1) .Chart1_header{
    padding: 0 7px 0 23px
}
.Chart1>div:nth-of-type(2) .Chart1_header{
    padding: 0 23px 0 8px
}
.Chart1>div:nth-of-type(3) .Chart1_header{
    padding: 0 12px 0 20px
}
.Chart1_header>h1{
    line-height: 55px;
    font-size: 16px;
    font-weight: 500
}
.Chart1_header>h2{
    font-size: 12px;
    font-weight: 500;
    color: #666;
    line-height: 55px;
    cursor: pointer;
}

.Chart1_header>h2>span{
    color:#a0a0a0;
    font-weight: 100;
    font-size: 12px
}
.Chart1_footer1{
    height: 82px;
    border-bottom: 1px dashed #e0dfe8;
    margin-left: 8px;
     display: flex;
     width: 100%;
    
}
.Chart1_footer2{
    border: 0
}
.Chart1_footer1>h2{
    font-size: 12px;
    line-height: 82px;
    font-weight: 500;
    color: #333;
    width: 30%;
    overflow: hidden;
}


.yq{
    margin-left: 16px
}
.yq>ul{
    display: flex;
    margin-top: 26px;
    justify-content: space-around
}

/* 园区信息 */
.yq>ul>li{
    line-height: 14px;
    font-size: 14px;
    color: #666;

}
.yq>ul>li>span{
    font-size: 14px
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
    position: relative;
    top:-1px;
    left: 3px;
}
.Redsj{
    width: 0;
    height: 0;
    border: 6px solid;
    border-color:#fd566f transparent transparent ;
    position: relative;
    top: 5px;
    left: 3px;
    display: inline-block;
}
/* .yq1>ul{
    display: block
}
.yq1>ul>li{

} */
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