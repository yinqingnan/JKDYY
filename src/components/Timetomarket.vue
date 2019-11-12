
<!--上市时间图 -->

<template>
    <div>
        <div class="box">
            <h1>上市时间图</h1>
                <div class="line">
                    <div class="sjx" @click="rightbtn"></div> 
                    <div class="box_header">
                        <div  ref="tabs">
                            <ul v-for="(item,index) in list" :key="index"  >
                                <li class="year">{{item.year}}</li>
                                <li>{{item.companyName.split(",")[0]}}</li>
                                <li>{{item.companyName.split(",")[1]}}</li>
                            </ul>
                        </div>
                      
                    </div>
                    <div class="sjx1" @click="leftbtn"></div>
                </div>
        </div>
               

    </div>
</template>



<script>
export default {
    data(){
        return{
           list:[],
           number:0

        }
    },
    mounted(){
        //获取上市公司列表数据

        this.axios.get("/api/listedCompany12").then((res)=>{
            // console.log(res.data.data)   
            // res.data.data.shift()
            this.list=res.data.data

           
        })
    },
    methods:{
        leftbtn(){
            this.number++
             this.number++
            if(this.number>=0){
                  this.$refs.tabs.style="left:0px"
            }else if(this.number<0){
                this.$refs.tabs.style.left=(this.number*80)+"px"
            }
        },
        rightbtn(){
            this.number--
           if(this.number>=-7){
                this.$refs.tabs.style.left=(this.number*80)+"px"
            }else{
               this.number=-7
            }
        }
    }
}
</script>
<style scoped>
.box{
    width: 100%;
    background:#fff;
    position: relative;
    height: 438px;
    border: 1px solid #e5e5e5;
    padding-bottom: 29px
}
.line{
    position: absolute;
    width: 80%;
    border: 1px dashed #666;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.sjx{
    border: 10px solid #999;
    position: absolute;
    border-top-color: transparent;
    border-right: transparent;
    border-bottom-color: transparent;
    right: -14px;
    top: -10px
}
.sjx1{
    border: 10px solid #999;
    position: absolute;
    border-top-color: transparent;
    border-left: transparent;
    border-bottom-color: transparent;
    left: -14px;
    top: -10px
}
.box_header{
    position: absolute;
    top: -15px;
    width: 100%;
    height: 90px;
    overflow-y: hidden;
}
.box_header::-webkit-scrollbar{
      display: none;
  }
.box_header>div{
    display: flex;
    width: 100%;
    height: 90px;
    position: absolute;
    top: 0px;
    left: 0
}
.box_header>div>ul{
    display: flex;
    justify-content: space-between;
    width: 60%;
    text-align: center;
    flex-wrap: wrap;
    text-align: center;
    position: relative;
    margin:0 20px;
}
.box_header>div>ul>li{
    font-size: 12px;
    white-space: nowrap;
    line-height:20px;
    margin: 0 auto
}
.year{
    width: 30px !important;
    height: 30px;
    text-indent: 0px !important;
    background: #2cabe3;
    border-radius: 50%;
    line-height: 30px;
    color :#fff;
    font-weight: 600;
    line-height: 30px !important;
}
.box>h1{
  font-size: 16px;
  line-height: 50px;
  text-align: center;
  background: #fff;
  color:#333
}

/* :nth-child(even)     偶数行
:nth-child(add)       奇数行*/
</style>