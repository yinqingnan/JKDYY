<template>

<!-- 地图页面城市首页 -->
    <div>
        <div class="box" @click="hide">
            <div class="left">
                <div class="cover"></div>
                <div class="positionbox">
                    <h1>金科服务在中国</h1>
                    <div>
                        <div>
                            <h1>省份</h1>
                            <h2>{{msg.provinceCount}}</h2>
                        </div>
                        <div>
                            <h1>地级市</h1>
                            <h2>{{msg.cityCount}}</h2>
                        </div>
                        <div>
                        <h1>县级市</h1>
                            <h2>{{msg.prefectureCount}}</h2>
                        </div>
                    </div>
                </div>
                <Chinamap class="echarts"></Chinamap>
            </div>
            <div class="btn" @click.stop="togglePanel">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="right" v-show="visible" ref="main">
                <div>   
                       <h1>行业资料</h1>
                <ul>
                    <li v-for="(item,index) in list" :key="index" class="list"  v-if="index<8" @click="btn(item.dataUrl)">        
                        {{index+1}}.{{item.dataName}}
                    </li>
                </ul>
                </div>
             
            </div>
          
        </div>
       
    </div>
</template>


<script>
import Chinamap from '../components/echarts/chinamap'


export default {
    data(){
        return{
            list:[],
            msg:[],
            visible:false
        }
    },
    components:{
        Chinamap
    },
    mounted() {

        // 获取到右侧数据报表数据
        this.axios.get("/api/cityData09").then((res)=>{
            // console.log(res.data.data)
            this.list=res.data.data

        })
        // 获取左侧服务展示数据
        this.axios.get("/api/cityData02").then((res)=>{
            // console.log(res.data.data[0])
            this.msg=res.data.data[0]
        })

        document.addEventListener('click',()=>{
            // console.log(document)
            if(this.visible==true){
                var togo =document.getElementsByClassName("right")[0]    
                this.visible=togo.contains(event.target)
            }
        })
    },
    methods: {
        btn(data){
            window.open(data)
        },
         togglePanel () {
            this.visible= true
        },
        hide(){
            this.visible=false
        }
    },   
  
}
</script>



<style scoped>
.cover{
    background: transparent;
    width: 20%;
    height: 100vh;
    position: absolute;
    left: 0;
    z-index: 10;
}
.box{
    height: 100%;
    width: 100%;
    background:url(../assets/ima/bj.png) no-repeat 0 0;
    background-size: 100% 100%;
    position: relative;
}
.left{
    width: 100%;
    height: 100%;
    position: relative;
}
.positionbox{
    position: absolute;
    right: 4%;
    top :50%;
    z-index:10;
    background: transparent;
    width: 260px;
    text-align: center;

}

.positionbox>h1{
    text-align: left;
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
    font-weight: 500
}
.positionbox>div{
    display: flex;
    justify-content: space-around

}
.right{
    width: 300px;
    padding: 12px;
    padding-left: 0;
    position: absolute;
    top: 20px;
    right: 10px;
    z-index: 10

}
.right>div{
    width: 100%;
    height: 90vh;
    border: 1px solid #e5e5e5;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    overflow-y: auto;
      /* 当IE下溢出，仍然可以滚动*/
  -ms-overflow-style: none;
  /*火狐下隐藏滚动条*/
  overflow: -moz-scrollbars-none;

}
.right>div::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}
.btn{
    position: absolute;
    top: 50%;
    right: 0;
    background: #ffb400;
    width: 20px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    transform: translate(0,-50%);
    color: #fff;
    z-index: 99
}
.right>div>ul{
    width: 100%;
    overflow-y: auto;
        /* 当IE下溢出，仍然可以滚动*/ 
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:-moz-scrollbars-none;
            scrollbar-width: none
}
.right>div>ul::-webkit-scrollbar {
    display: none;
}
.right>div>h1{
    font-size: 16px;
    color: #333;
    margin-bottom: 18px
    
}
.list{
    cursor: pointer;
    font-size: 16px;
    color: #666;
    line-height: 40px;
    text-decoration: underline;
    
}
.positionbox>div>div{
    border: 1px solid #a0a0a0;
    border-radius: 5px;
    /* width: 100px; */
    width: 80px;
    padding: 12px 0
}
.positionbox>div>div:nth-of-type(2){
    margin: 0 10px
}
.positionbox>div>div>h1{
    font-size: 14px;
    color: #666
}
.positionbox>div>div>h2{
    font-size: 18px;
    color: #333
}
.echarts{
    height: 100vh;
}
.el-icon-arrow-left{
    line-height: 40px
}

</style>