<template>
<!-- 公司详情页面 -->
    <div>
      
        <div class="container" :style="style">
            <div>
                  <div class="container_header" >
                     <!-- <img :src="data.companyLogo" alt=""> -->
                     <h1>{{data.companyName}}在中国大陆布局图</h1>
                  </div> 
                  <div class="container_body">
                      <div class="container_body_left">
                          <div class="container_body_left_header">
                              <!-- <h2>{{data.companyName}}</h2> -->
                                <img :src="data.companyLogo"  
                                :onerror="defaultlogo"
                                >
                              <div>
                                    <ul>
                                        <li>上市时间：</li>
                                        <li>{{data.timeToMarket}}</li>
                                    </ul>
                                    <ul>
                                        <li>官方网址：</li>
                                        <li @click="open(data.officialwebsite)" style="cursor: pointer;">{{data.officialwebsite}}</li>
                                    </ul>
                              </div>
                              <ul>
                                  <li>
                                      <h2>上市地<span>:</span> </h2> <h2>{{data.listingPlace}}</h2>
                                  </li>
                                  <li>
                                      <h2>总部地址<span>:</span> </h2> <h2>{{data.headquartersAddress}}</h2>
                                  </li>
                              </ul>
                          </div>
                          <div class="container_body_left_body">
                              <h2>公司简介</h2>
                              <div v-html="html"></div>
                          </div>
                          <div class="container_body_left_footer">
                              <img :src="data.nationwideMap"  :onerror="defaultmap">
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
            luyouid:"",           //路由中获取的id
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


            
            SRGC:[],           //收入构成
            srgcbn:[],         //收入构成半年
            srgcqn:[],         //收入构成全年
            srgcgcf:[],        //收入构成工程费
            srgcwyf:[],        //收入构成物业费
            html:"",


            style:{
                height:""
            },
            }
    },
    props:["nameid"],
    watch: {
    $route:{
        handler(newVal){
             //获取公司信息数据
            axios.get("/api/listedCompany02?id="+newVal.query.id)
            .then((res=>{
                this.html= res.data.data[0].companyprofile.replace(/\n|\r\n/g,"<br/><p>")
                this.id=res.data.data[0].id
                this.data=res.data.data[0]
            }))


            // 请求管理模块图表数据
            axios.get("/api/listedCompany03?id="+newVal.query.id)
            .then((res=>{
                //  console.log(res.data.data)   
                this.glgmqn=res.data.data.filter(item => item.reportingType.indexOf('半年'))            //全年数据
                this.glgmbn=res.data.data.filter(item => item.reportingType.indexOf('全年'))            //半年数据
                this.GLGM=this.glgmbn     //默认显示半年数据
            }))

            // 请求总收入图表数据
            axios.get("/api/listedCompany05?id="+newVal.query.id)
            .then((res)=>{
             
                this.zsrbn=res.data.data.filter(item=>item.reportingType.indexOf("全年"))               //半年数据
                this.zsrqn=res.data.data.filter(item=>item.reportingType.indexOf("半年"))               //全年数据
                this.ZSR=this.zsrbn     //默认显示半年数据
                
            })


            // 请求收入构成数据
            axios.get("/api/listedCompany06?id="+newVal.query.id)
            .then((res)=>{
                this.srgcbn=res.data.data.filter(item=>item.reportingType.indexOf("全年"))               //半年数据
                this.srgcqn=res.data.data.filter(item=>item.reportingType.indexOf("半年"))               //全年数据
                this.SRGC=this.srgcbn       //默认显示到半年

             
            })
             
        }
    },
    deep:true,      //深度监测
    immediate: true     //将立即以表达式的当前值触发回调
   
       
   
    },
      methods: {
        open(url){
            window.open(url,"_blank")
        },
        btn(index){
            this.num=index
            if(index==0){  //半年
                this.GLGM=this.glgmbn     //管理规模半年赋值
                this.ZSR=this.zsrbn       //总收入半年赋值
                this.JLR=this.jlrbn       //规模构成半年数据
                this.SRGC=this.srgcbn       //收入构成半年数据
            }else{          //半年
                this.GLGM=this.glgmqn      //管理规模全年赋值
                this.ZSR=this.zsrqn       //总收入半年赋值
                this.JLR=this.jlrqn       //规模构成全年数据
                this.SRGC=this.srgcqn       //收入构成全年数据

            }
        },
        getheight(){
            this.style.height=window.innerHeight-64+"px"
        }
    },
    mounted() {
        this.getheight()
          axios.get("/api/listedCompany02?id="+this.$route.query.id)
            .then((res=>{
               this.html= res.data.data[0].companyprofile.replace(/\n|\r\n/g,"<br/><p>")
                this.id=res.data.data[0].id
                this.data=res.data.data[0]
            }))
            // 请求管理模块图表数据
            axios.get("/api/listedCompany03?id="+this.$route.query.id)
            .then((res=>{
                this.glgmqn=res.data.data.filter(item => item.reportingType.indexOf('半年'))            //全年数据
                this.glgmbn=res.data.data.filter(item => item.reportingType.indexOf('全年'))            //半年数据
                this.GLGM=this.glgmbn     //默认显示半年数据
                // console.log(this.glgmbn)
            }))

            // 请求总收入图表数据
            axios.get("/api/listedCompany05?id="+this.$route.query.id)
            .then((res)=>{
                this.zsrbn=res.data.data.filter(item=>item.reportingType.indexOf("全年"))               //半年数据
                this.zsrqn=res.data.data.filter(item=>item.reportingType.indexOf("半年"))               //全年数据
                    this.ZSR=this.zsrbn     //默认显示半年数据
            })
            // 请求收入构成数据
            axios.get("/api/listedCompany06?id="+this.$route.query.id)
            .then((res)=>{

                this.srgcbn=res.data.data.filter(item=>item.reportingType.indexOf("全年"))               //半年数据
                this.srgcqn=res.data.data.filter(item=>item.reportingType.indexOf("半年"))               //全年数据
                this.SRGC=this.srgcbn       //默认显示到半年
               
             
            })
            

       
    },
    computed:{
        defaultlogo(){
            return 'this.src="' + require ('../assets/ima/defaultlogo.png')+' " '
        },
        defaultmap(){
            return 'this.src="' + require ('../assets/ima/defaultmap.png')+' " '
        }
    }
 
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
    font-weight: 600;
    font-size: 24px;
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
    padding-left: 10px;
    padding-right: 10px
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
/* .container_body_left_header>div:nth-of-type(1)>ul>li>a{
    color: #999
} */
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
    margin-left: 15px;
    font-size: 14px;
    font-weight: 500;
    display: inline-block
}
.container_body_left_header>ul>li:nth-of-type(2)>h2>span{
    margin-left: 2px;
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
.container_body_left_body>div{
    padding-right: 50px;
    font-size: 14px;
    height: 120px;
    color: #999;
    line-height: 25px;
    text-indent: 2em;
    overflow-y: auto;
         /* 当IE下溢出，仍然可以滚动*/ 
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:-moz-scrollbars-none;
}
.container_body_left_body>div::-webkit-scrollbar {display:none}

.container_body_left_footer{
    text-align: center;
    /* width: 486px; */
   height: 468px;
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
.container_body_left_header>img{
    width: 160px;
    height: 50px;
    display: block;
}


</style>