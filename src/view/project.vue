<template>
<!-- 项目页面 -->
    <div>
        <div class="container">
            <div class="Left">
                <div class="Downmenu">
                    <h1 @click="Downmenu" >{{name==""? "华东区域公司":name}}  <span class="iconfont iconpub_down" ></span></h1>
                    <div class="ModalFrame" v-show="ModalFrame">
                        <ul>
                            <li 
                            v-for="(item,index) in getProjectList" :key="index" class="projectName"
                            @click="getid(item.id,item.projectName)"
                            >
                            {{item.projectName}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="Title">
                    <ul>
                        <li>
                            <img src="../assets/ima/home_node.png" alt="">
                        </li>
                        <li>
                            <h1>节点达成率</h1> 
                            <span>91%</span>
                        </li>
                        <li>
                            <h1>重大节点逾期  </h1> 
                            <span>3个</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h1>总收入</h1>
                            <h2>796<span>万元</span></h2>
                        </li>
                        <li>
                            <h1>总利润</h1>
                            <h2>36<span>万元</span></h2>
                        </li>
                    </ul>
                </div>
                <Timeaxis/>
                <div class="Chart">
                    <div>
                        <h1>关键指标</h1>
                        <h2>更多 <span class="iconfont iconpub_right" ></span></h2>
                    </div>
                    <div>
                        <div>
                            <h1>综合收费率 <span class="Green"> <i class="Greensj"></i> 9%</span></h1>
                            <h2>81%</h2>
                            <div>
                                <Histogram/>   
                                <Transversehistogram/>
                            </div>
                        </div>
                         <div>
                            <h1>报事完成率  <span class="Red"> <i class="Redsj"></i> 9%</span></h1>
                            <h2>55%</h2>
                        <div>
                            <Histogram/>   
                            <Transversehistogram/>
                        </div>
                        </div>
                         <div>
                            <h1>现场品质  <span class="Green"> <i class="Greensj"></i> 9%</span></h1>
                            <h2>85%</h2>
                            <div>
                                <Histogram/>   
                                <Transversehistogram/>
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
                            
                        </div>
                    </div>
                    
                </div>

            </div>



            
            <div class="Right">
                <tab class="tab1"></tab>
                <tab class="tab2"></tab>

            </div>
        </div>
    </div>
</template>

<script>
// 引入tab组建
import tab from '../components/tab'

// 引入axios
import axios from 'axios'

// 引入时间轴组建
import Timeaxis from "../components/timeaxis"
//引入雷达图图
import radar from '../components/radar'

// 测试重复使用
//引入柱状图
import Histogram from '../components/Histogram'
//引入横向柱状图
import Transversehistogram from '../components/Transversehistogram'


export default {
    components:{
        Timeaxis,
        Transversehistogram,
        Histogram,
        tab,
        radar
    },
    data() {
        return {
            name:"",
            getProjectList:[],
            ModalFrame:false,
            
        }
    },
    methods: {
        Downmenu(){
            this.ModalFrame= !this.ModalFrame
            // console.log(1)
        },
        getid(id,name){
            this.ModalFrame=false
            this.name=name
        }
    },
    mounted() {
        // http://localhost:8080/project?name=区域公司名称&?Fname=项目名称
        // http://localhost:8080/project?name=%E5%8C%BA%E5%9F%9F%E5%85%AC%E5%8F%B8%E5%90%8D%E7%A7%B0&%3FFname=%E9%A1%B9%E7%9B%AE%E5%90%8D%E7%A7%B0
        console.log(window.location.href)

        // 获取项目列表
        this.axios.get('/api/getProjectList').then((res)=>{
            // console.log(res.data.data)
            this.getProjectList=res.data.data
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
   
.Left{
     border: 1px solid #e0dfe8;
    width :100%;
    background: #fff;
    /* height :1150px; */
}
.Right {
    width: 18.125rem;
    margin: 0 15px 0 12px;
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
    min-width: 17.375rem;
    border-right: 1px dashed #e0dfe8
}
.Title>ul:nth-of-type(1)>li{
    width: 30%;
    position: relative;
    min-width: 72px;
    white-space: nowrap
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
    font-weight: 600;
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
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
    margin-top: 9px;
    white-space: nowrap

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
     min-width: 800px;
}
.Chart>div:nth-of-type(2)>div{
    width: 30%;
    height: 340px;
    min-width: 238px;
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
    justify-content: space-between
}
.Chart>div:nth-of-type(2)>div>div>div{
    flex:1
}
.tab1{

    /* padding-bottom: 20px */
}
.tab2{
    margin-top: 12px;
    /* padding-bottom: 40px */
}

.projectName{
    cursor: pointer;
    line-height: 30px;
    font-size: 16px;
    color: #333;
    margin-left: 30px
}

.Chart1{
    display: flex;
    justify-content: space-between;
    padding: 0 1.375rem;
    margin-top: 20px
    
}
.Chart1>div{
    border: 1px solid #e0dfe8
}
.Chart1>div:nth-of-type(1){
    width: 45%;
    min-width: 350px;
}
.Chart1>div:nth-of-type(1)>div:nth-of-type(1){
    display: flex;
    justify-content: space-between;
    padding: 22px 18px 18px 18px;
    background: #fff;
    border-bottom: 1px solid #e0dfe8
    
}

.Chart1>div:nth-of-type(1)>div>h1{
    font-size: 16px;
    color: #333;
    line-height: 1

}
.Chart1>div:nth-of-type(1)>div>h2{
    font-size: 12px;
    color: #666;
    line-height: 1
}
.Chart1>div:nth-of-type(1)>div>h2>span{
    font-size: 10px;
    color: #a0a0a0;
    line-height: 1
}


.Chart1>div:nth-of-type(2){
    width: 55%;
    margin-left: 16px;
    min-width: 396px;
}
.Chart1>div:nth-of-type(2)>div{
    display: flex;
    justify-content: space-between;
    padding: 22px 18px 18px 18px
}

.Chart1>div:nth-of-type(2)>div>h1{
    font-size: 16px;
    color: #333;
    line-height: 1

}
.Chart1>div:nth-of-type(2)>div>h2{
    font-size: 12px;
    color: #666;
    line-height: 1
}
.Chart1>div:nth-of-type(2)>div>h2>span{
    font-size: 10px;
    color: #a0a0a0;
    line-height: 1
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