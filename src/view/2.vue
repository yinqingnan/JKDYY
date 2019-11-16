<template>
    <div>
        <div class="nav">
            <i class="el-icon-d-arrow-left leftbtn" @click="leftbtn"></i>
             <ul class="tab" ref="tabs">
                <li v-for="(item,index) in list" :key="index" @click="btn(item.id,index) " 
                :class="{active:index == num}"
                :title="item.companyName"
                >{{item.companyName}}</li>
            </ul>
            <i class="el-icon-d-arrow-right rightbtn" @click="rightbtn"></i>
        </div>
       
        <div>
            <Listedcompany v-if="show" ></Listedcompany>
            <Companylist v-if="isshow" :nameid="nameid"></Companylist>


        </div>
    </div>
    
</template>

<script>

// 页面组建
import Listedcompany from '../view/Listedcompany'
import Companylist from '../view/Companylist'

// 引入vuex的数据
import {mapState,mapActions,mapMutations} from 'vuex'

// import axios from 'axios'
export default {
    components:{
        Listedcompany,Companylist
    },
       data() {
           return {
               show:true,    
               isshow:false,
               num: 0,
               list:[],  //公司列表数据
               index:
                    {id:0,
                    companyName:"上市公司数据查询"
                    },
                nameid:"",
                btnindex:null,
                number:0
           }
    },
    methods: {
        ...mapMutations(["display1"]),
        btn(id,index) {
            this.num = index;
           if(index==0){
               this.isshow=false
               this.show=true
                this.display1()
           }else{
               this.isshow=true
               this.show=false
               this.nameid=id 
               this.btnindex=index
           }
 
        },
        leftbtn(){
            // this.number++
            // if(this.number>=0){
            //       this.$refs.tabs.style="left:12px"
            // }else if(this.number<0){
            //     this.$refs.tabs.style.left=(this.number*80)+"px"
            // }
             this.number=0
            // this.$refs.tabs.style="left:12px"
            this.$refs.tabs.style.left=12+"px"
        },
        rightbtn(){
             this.number--
            if(this.number>=-8){
                this.$refs.tabs.style.left=(this.number*90)+"px"
            }else{
               this.number=-8
            }
        }
    },
    mounted() {
        // 获取上市公示列表数据
        this.axios.get('/api/listedCompany01')
        .then((res)=>{
            // console.log(res.data.data)
            this.list=res.data.data 
            res.data.data.unshift(this.index)
        })
    },
        computed: {
        ...mapState(["show0","show1"])
  },
}
</script>

<style  scoped>
.title{
    font-size:26px;
    display:flex;

}
.active{
    color: #49a4d9;
    border-bottom: 2px solid #49a4d9
}  
.tab{
    width: 100%;
    display: flex;
    background: #ececec;
    /* min-width: 1136px; */
    box-sizing: border-box;
    position: absolute;
    left:12px;
    transition: all 1s
    /*   最大412px */
}

.tab>li{
    line-height: 42px;
    font-size: 14px;
    cursor: pointer;
    margin-right: 16px;
    white-space:nowrap;
    /* min-width:64px; */
    /* overflow: hidden; */
    text-align: center;
    /* text-overflow:ellipsis; */
}
.nav{
    /* box-sizing: border-box; */
    background: #eee;
    height: 42px;
    overflow: hidden;
    min-width: 1136;
    padding: 0 30px;
    position: relative;
    border-bottom: 2px solid #ccc;
}
.leftbtn{
    position: absolute;
    top: 0;
    left: -30px;
    line-height: 42px;
    text-align: center;
    cursor: pointer;
    background: #eee;
    width: 30px;
    height: 100%;
    z-index: 2;
    transition: all 0.8s
    /* display: none */
}
.rightbtn{
    position: absolute;
    top: 0;
    right: -30px;
    line-height: 42px;
    text-align: center;
    cursor: pointer;
    z-index: 2;
    background: #eee;
    width: 30px;
    height: 100%;
    transition: all 0.8s

}
.nav:hover .leftbtn{
    left: 0;
}
.nav:hover .rightbtn{
    right: 0;
}
</style>