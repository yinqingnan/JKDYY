<template>
<!-- 公司详情页面 -->
    <div>
        <!-- <div class="container" :style="style">
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
        </div> -->


        <div class="container" :style="style">
            <div>
                  <div class="container_header" >
                     <img :src="data.companyLogo" alt="">
                     <h1>{{data.companyName}}在中国大陆布局图</h1>
                  </div> 
                  <div class="container_body">
                      <div class="container_body_left">
                          <div class="container_body_left_header">
                              <h2>{{data.companyName}}</h2>
                              <div>
                                    <ul>
                                        <li>上市时间：</li>
                                        <li>{{data.timeToMarket}}</li>
                                    </ul>
                                    <ul>
                                        <li>官方地址：</li>
                                        <li><a :href="data.officialwebsite">{{data.officialwebsite}}</a></li>
                                    </ul>
                              </div>
                              <ul>
                                  <li>
                                      <h2>地址<span>:</span> </h2> <h2>{{data.listingPlace}}</h2>
                                  </li>
                                  <li>
                                      <h2>所在地<span>:</span> </h2> <h2>{{data.headquartersAddress}}</h2>
                                  </li>
                              </ul>
                          </div>
                          <div class="container_body_left_body">
                              <h2>公司简介</h2>
                              <!-- <p>碧桂园服务控股有限公司成立于1992年，股份代码：06098，经过26年的稳健发展,公司业务涵盖住宅、商业物业、写字楼、多功能综合楼、政府及其他公共设施、产业园、高速公路服务站、公园及学校等多种业态。截至目前服务版图遍布中国29个省（直辖市、自治区）260多个城市，管理536个物业项目，服务面积达386百万平方米。</p> -->
                              <p>{{data.companyprofile}}</p>
                          </div>
                          <div class="container_body_left_footer">
                              <img :src="data.nationwideMap" alt="">
                          </div>
                      </div>
                      <div class="container_body_right">
                            <div class="container_body_right_header">
                                <h1 v-for="(item,index) in qnbn " :key="index"  :class="{active:index==num}"  @click="btn(index)">{{item}}</h1>
                            </div>
                            <div class="container_body_right_body">
                                <GLGM :GLGM="GLGM" id="id11" class="boxpic" ></GLGM>
                                <ZSR :ZSR="ZSR" id="id12" class="boxpic" ></ZSR>
                              
                                <SRGC :SRGC="SRGC" id="id14" class="boxpic"></SRGC>
                            </div>
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

//收入构成模块
import SRGC from '../components/echarts/SRGC'

export default {
    components:{
        GLGM,
        ZSR,
        // CS,
    
        SRGC
    
    },
    data(){
        return {
            data:[],         //上市公司信息
            id:"",           //动态id
            qnbn:["半年数据","全年数据"],
            num:0,           //切换变量
            GLGM:[],         //上市公司管理规模数据
            glgmbn:[],       //管理规模半年
            glgmqn:[],       //管理规模全年
            ZSR:[],          //总收入
            zsrbn:[],        //总收入半年
            zsrqn:[],         //总收入全年
            // JLR:[],          //净利润
            jlrbn:[],        //规模构成半年
            jlrqn:[],        //规模构成全年


            
            SRGC:[],          //收入构成
            srgcgcf:[],        //收入构成工程费
            srgcwyf:[],        //收入构成物业费



            style:{
                height:""
            },
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
                    // console.log(res.data.data)
                    this.zsrbn=res.data.data.filter(item=>item.reportingType.indexOf("全年"))               //半年数据
                    this.zsrqn=res.data.data.filter(item=>item.reportingType.indexOf("半年"))               //全年数据
                     this.ZSR=this.zsrbn     //默认显示半年数据
                   
                })


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
        },
        getheight(){
            // console.log(window.innerHeight -44 + "px")
            this.style.height=window.innerHeight-64+"px"
        }
    },
    mounted() {
        this.getheight()
       
    },
    
}
</script>


<style scoped>
.container{
    /* height: 857px; */
    height: 100%;
    background: #eeeeee;
    padding: 9px;
}

.container>div{
    /* margin: 9px; */
    height: 857px;
    background: #fff;
    border: 1px solid #e0dfe8
}
.container_header{
    display: flex;
    justify-content: center;
    height: 55px;
    background: #fff;
}

.container_header>h1{
    font-weight: 500;
    font-size: 18px;
    color: #000;
    line-height: 55px
}
.container_header>img{
    width: 160px;
    height: 50px;
}
.container_body{
    display: flex;
    padding: 0 13px
}
.container_body_left{
    width: 49%;
background: #fff;
    padding-top: 18px;
    padding-left: 10px
}
.container_body_right{
    width: 51%;
    background: #fff;
    height: 780px;
    border: 1px solid #e5e5e5


}
.container_body_left_header>h2{
    font-size: 14px;
    font-weight: 600;
    color: #000;
    line-height: 1;
}
.container_body_left_header>div:nth-of-type(1){
    display: flex;
    margin: 10px 0;
    justify-content:space-around;

}
.container_body_left_header>div:nth-of-type(1)>ul{
    display: flex;
    line-height: 1;
    

}
.container_body_left_header{
    margin-bottom: 16px
}
.container_body_left_header>div:nth-of-type(1)>ul:nth-of-type(1){
    width: 40%;overflow: hidden;
}
.container_body_left_header>div:nth-of-type(1)>ul:nth-of-type(2){
    width: 60%;
    overflow: hidden;
}
.container_body_left_header>div:nth-of-type(1)>ul>li{
    font-size: 14px;
    color: #999;
    overflow: hidden;
    height: 14px;

}
.container_body_left_header>div:nth-of-type(1)>ul>li>a{
    color: #999
}
.container_body_left_header>ul>li{
    display: flex
}
.container_body_left_header>ul>li:nth-of-type(1){
    margin-bottom: 10px;
}
.container_body_left_header>ul>li>h2{
    font-size: 14px;
    color: #999;
    line-height: 1;
    font-weight: 500;
    width: 70px
}
.container_body_left_header>ul>li:nth-of-type(1)>h2>span{
    margin-left: 30px;
    font-size: 14px;
    font-weight: 500;
    display: inline-block
}
.container_body_left_header>ul>li:nth-of-type(2)>h2>span{
    margin-left: 16px;
    font-size: 14px;
    font-weight: 500;
    display: inline-block
}
.container_body_left_body{
    margin-bottom: 20px
}
.container_body_left_body>h2{
    font-weight: 600;
    font-size: 14px;
    color: #000;
    margin-bottom: 14px
}
.container_body_left_body>p{
    padding-right: 50px;
    font-size: 14px;
    height: 120px;
    color: #999;
    line-height: 25px;
    overflow-y: auto;
         /* 当IE下溢出，仍然可以滚动*/ 
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:-moz-scrollbars-none;
}
.container_body_left_body>p::-webkit-scrollbar {display:none}
.container_body_left_footer{
    text-align: center;
    width: 486px;
    height: 474px;
    /* background: red; */
    margin: 0 auto
}
.container_body_left_footer>img{
    
    width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
    display: block;
    margin: 0 auto;
    min-height: 380px
    
}
.active{
    border-bottom:2px solid #49a4d9;
    background: #fff;
    color: #49a4d9 !important
    
}
.container_body_right_header{
    display: flex;
    line-height: 37px;
    height: 37px;
    background: #7a879b;
    margin-bottom: 20px
}

.container_body_right_header>h1{
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    width: 97px;
    text-align: center;
    cursor: pointer;

}









/* .active{
    border-bottom:2px solid #49a4d9;
    
}
.container{
    display: flex;
    justify-content: center;
    box-sizing: border-box;

    background: #fff
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
    overflow: hidden;
    max-width: 700px;
    min-width: 500px;
    margin: 0 auto;
padding-top: 60px

}
.container_left_body>img{

    width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
    display: block;
    margin: 0 auto;
    min-height: 380px
    
}
.container_right_header{
    width: 100%;
    display: flex;
    justify-content: space-around
}
.container_right_header>div:nth-of-type(1){
    width: 48%;
    border: 1px solid #e5e5e5;
    margin: 10px 0;
}
.container_right_header>div:nth-of-type(1)>ul>li{
    display: flex;
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
        当IE下溢出，仍然可以滚动 
        -ms-overflow-style:none;
        火狐下隐藏滚动条
        overflow:-moz-scrollbars-none;
    
}
.container_right_header>div:nth-of-type(2)>p::-webkit-scrollbar {
        display: none;
    }
.container_right_body{
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
} */
</style>