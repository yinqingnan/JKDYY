<template>
<!-- 公司详情页面 -->
    <div>
        <div class="container">
            <div class="container_left">
                <div class="container_left_header ">
                    <img :src="data.companyLogo" alt="">
                    <h1>{{data.companyName}}在中国大陆布局图</h1>
                </div>
                <div class="container_left_body">
                    <img :src="data.nationwideMap" alt="">
                </div>
            </div>
            <div class="container_right">
                <div class="container_right_header">
                    <div>
                        <ul>
                            <li>
                                <h1>公司名称:</h1>
                                <h1 :title="data.companyName">{{data.companyName}}</h1>
                            </li>
                            <li>
                                <h1>上市时间:</h1>
                                <h1 :title="data.timeToMarket">{{data.timeToMarket}}</h1>
                            </li>
                            <li>
                                <h1>上市地址:</h1>
                                <h1 :title="data.listingPlace">{{data.listingPlace}}</h1>
                            </li>
                            <li>
                                <h1>总部所在地:</h1>
                                <h1 :title="data.headquartersAddress">{{data.headquartersAddress}}</h1>
                            </li>
                            <li>
                                <h1>官方网址:</h1>
                                <h1 :title="data.officialwebsite">{{data.officialwebsite}}</h1>
                            </li>
                           
                        </ul>
                    </div>
                    <div>
                        <h1>公司简介</h1>
                        <p>{{data.companyprofile}}</p>
                    </div>
                </div>
                <div class="container_right_body">
                    <div>
                        <h1 v-for="(item,index) in qnbn " :key="index"  :class="{active:index==num}"  @click="btn(index)">{{item}}</h1>
                    </div>
                    <div >
                        <GLGM :GLGM="GLGM" id="id11" class="boxpic" ></GLGM>
                        <JLR :JLR="JLR" id="id13" class="boxpic" ></JLR>
                        
                     </div >  
                    <div >  
                        <ZSR :ZSR="ZSR" id="id12" class="boxpic" ></ZSR>
                        <SRGC :SRGC="SRGC" id="id14" class="boxpic"></SRGC>
                    </div>

                    

                

                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
// 引入axios
import axios from 'axios'
// import CS from '../components/cs'
// 管理模块组件
import GLGM from '../components/echarts/GLGM'
//总收入组件
import ZSR from '../components/echarts/ZSR'
//净利润组件
import JLR from '../components/echarts/JLR'
//收入构成模块
import SRGC from '../components/echarts/SRGC'

export default {
    components:{
        GLGM,
        ZSR,
        // CS,
        JLR,
        SRGC
    
    },
    data(){
        return {
            data:[],         //上市公司信息
            id:"",           //动态id
            qnbn:["半年业绩","全年业绩"],
            num:0,           //切换变量
            GLGM:[],         //上市公司管理规模数据
            glgmbn:[],       //管理规模半年
            glgmqn:[],       //管理规模全年
            ZSR:[],          //总收入
            zsrbn:[],        //总收入半年
            zsrqn:[],         //总收入全年
            JLR:[],          //净利润
            jlrbn:[],        //规模构成半年
            jlrqn:[],        //规模构成全年


            
            SRGC:[],          //收入构成
            srgcgcf:[],        //收入构成工程费
            srgcwyf:[],        //收入构成物业费
            }
    },
    props:["nameid"],
    watch: {
 
        nameid:{
            handler(newVal){ // 实时更新的id
                // get公司信息数据
                // console.log(newVal)
                 axios.get("/api/listedCompany02?id="+newVal)
                .then((res=>{
                    // console.log(res.data.data[0])
                    this.id=res.data.data[0].id
                    this.data=res.data.data[0]
                }))


                // 请求管理模块图表数据
                axios.get("/api/listedCompany03?id="+newVal)
                .then((res=>{
                    //  console.log(res.data.data)   
                    this.glgmqn=res.data.data.filter(item => item.reportingType.indexOf('半年'))            //全年数据
                    this.glgmbn=res.data.data.filter(item => item.reportingType.indexOf('全年'))            //半年数据
                    this.GLGM=this.glgmbn     //默认显示半年数据
                    // console.log(this.glgmbn)
                }))

                // 请求总收入图表数据
                axios.get("/api/listedCompany05?id="+newVal)
                .then((res)=>{
                    this.zsrbn=res.data.data.filter(item=>item.reportingType.indexOf("全年"))               //半年数据
                    this.zsrqn=res.data.data.filter(item=>item.reportingType.indexOf("半年"))               //全年数据
                     this.ZSR=this.zsrbn     //默认显示半年数据
                   
                })
                // 请求净利润图表数据
                // /api/listedCompany13?id=889e290c-cbb4-11e8-ad85-00ffcec184a9
                axios.get("/api/listedCompany13?id="+newVal)
                .then((res=>{
                    // console.log(res.data.data)
                    this.jlrbn=res.data.data.filter(item=>item.reportingType.indexOf("全年"))               //半年数据
                    this.jlrqn=res.data.data.filter(item=>item.reportingType.indexOf("半年"))               //全年数据
                    this.JLR=this.jlrbn     //默认显示半年数据
                    // console.log(this.jlrbn)
                    // console.log(this.jlrqn)
                }))
                // 请求收入构成数据
                axios.get("/api/listedCompany06?id="+newVal)
                .then((res)=>{
                    this.SRGC=res.data.data
                })
            },
            deep:true,      //深度监测
            immediate: true     //将立即以表达式的当前值触发回调
    },
   
       
   
    },
      methods: {
        btn(index){
            this.num=index
            if(index==0){  //半年
                this.GLGM=this.glgmbn     //管理规模半年赋值
                this.ZSR=this.zsrbn       //总收入半年赋值
                this.JLR=this.jlrbn       //规模构成半年数据
                // this.SRGC=this.srgcbn       //收入构成半年数据
            }else{          //半年
                this.GLGM=this.glgmqn      //管理规模全年赋值
                this.ZSR=this.zsrqn       //总收入半年赋值
                this.JLR=this.jlrqn       //规模构成全年数据
                // this.SRGC=this.srgcqn       //收入构成全年数据

            }
        }
    },
    mounted() {
    //   const chartObj4 = document.getElementById("id14");
    //   const chartObj3 = document.getElementById("id13");
    //   const chartObj2 = document.getElementById("id12");
    //   const chartObj1 = document.getElementById("id11");
    //     // console.log(chartObj1)
    //     // console.log(chartObj2)
    //     // console.log(chartObj3)
    //     // console.log(chartObj4)
    // window.onresize = function () {
    //     chartObj1.resize();
    //     chartObj2.resize();
    //     chartObj3.resize();
    //     chartObj4.resize();
    // }
       
    },
    
}
</script>


<style scoped>
.active{
    border-bottom:2px solid #49a4d9;
    
}
.container{
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    /* min-width: 1136px; */

}
.container>div{
    width: 48%;
    height: auto;
    background: #fff;

}
.container>div:nth-of-type(1){
    width: 50%;
    background: #fff
}
.container>div:nth-of-type(2){
    width: 50%
}
.container_left{
    margin-right: 12px
}
.container_left_header{
    display: flex;
    width: 100%;
    max-height: 100px
}
.container_left_header>img{
    width: 160px;
    height: 50px;
    margin-top: 25px;
    margin-left: 44px
}
.container_left_header>h1{
    width: 100%;
    line-height: 100px;
    text-align: center;
    color:#666;
    font-size: 24px;
    font-weight: 500;
}
.container_left_body{
    /* padding :20px 20px 0 20px; */
    overflow: hidden;
    max-width: 700px;
    min-width: 500px;
    margin: 0 auto;
padding-top: 60px

}
.container_left_body>img{
    /* width: 100%; */
    /* max-height: 540px; */
    /* min-width: 290px; */
    /* height: auto */
    width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
    display: block;
    margin: 0 auto;
    /* max-width: 700px; */
    min-height: 380px
    
}
.container_right_header{
    width: 100%;
    display: flex;
    /* margin-bottom: 10px; */
    justify-content: space-around
}
.container_right_header>div:nth-of-type(1){
    width: 48%;
    border: 1px solid #e5e5e5;
    margin: 10px 0;
    /* min-width:312px ; */
}
.container_right_header>div:nth-of-type(1)>ul>li{
    display: flex;
    /* justify-content: space-between; */
    line-height: 20px;
    padding: 0 20px
}
.container_right_header>div:nth-of-type(1)>ul>li:nth-of-type(5){
    font-size: 12px
}
.container_right_header>div:nth-of-type(1)>ul>li>h1{
    font-size: 14px;
    min-width: 70px;
    color: #333; 
    white-space: nowrap;
}

.container_right_header>div:nth-of-type(1)>ul>li>h1:nth-of-type(2){
    margin-left: 20px;
    overflow: hidden;
    font-weight: 100;
    min-width: 150px;

}
.container_right_header>div:nth-of-type(2){
   width: 48%;
    border: 1px solid #e5e5e5;
    margin: 10px 0;
    display: flex;
    max-height: 170px

}
.container_right_header>div:nth-of-type(2)>h1{
    width: 20px;
    font-size: 14px;
    color: #333;
    margin:10px 5px;
   
}
.container_right_header>div:nth-of-type(2)>p{
    font-size: 10px;
    /* margin-top: 20px; */
    color: #333;
    line-height: 22px;
    text-indent: 32px;
    flex: 1;
    width: 50%;
    max-height: 150px;
    overflow: hidden;
    cursor: pointer;
    height: 90px;
    overflow-x: hidden;
    overflow-y: scroll;
        /* 当IE下溢出，仍然可以滚动*/ 
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:-moz-scrollbars-none;
    
}
.container_right_header>div:nth-of-type(2)>p::-webkit-scrollbar {
        display: none;
    }
.container_right_body{
    /* min-width: 660px; */
    overflow: hidden;
    width: 100%;
}
.container_right_body>div{
    display: flex;
    justify-content: space-around;
    margin-bottom:12px;
}
.container_right_body>div>h1{
    padding-bottom: 16;
    font-size: 16px;
    color: #333;
    line-height: 24px;
    cursor: pointer;
    font-weight: 500
}
.container_right_body>div:nth-of-type(2){
    display: flex;
    justify-content: space-around;
    width: 100%;
    box-sizing:border-box
}


.boxpic{
    width: 48%;
    height: 240px;
    min-width: 240px;
}
</style>