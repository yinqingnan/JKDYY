<template>
<!-- 上市公司数据行业数据资料下载 -->
    <div class="box">
        <H1>行业数据资料</H1>
        <ul>
            <li v-for="(item,index) in list" :key="index" @click="btn(item.dataUrl)">{{item.dataName}}</li>
        </ul>
      
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    mounted() {
        this.axios.get("/api/listedCompany08?topcount=99")
        .then((res)=>{
            this.list=res.data.data
          
        })
    },
    methods: {
        btn(Url){
            // console.log(Url)
            window.open(Url)
         
        } 
    },
}
</script>
<style scoped>
.box{
    width: 100%;
    background: #fff;
    height: 265px;
    overflow: hidden;
    border: 1px solid #f0f0f0;
    box-sizing: border-box;
}
.box>ul::-webkit-scrollbar {display:none}

.box>h1{
    font-size: 14px;
    font-weight: 500;
    color: #333;
    line-height: 44px;
    text-indent:10px;
    /* margin-right: 100px; */
    text-indent: 10px;
    border-bottom: 1px solid #f0f0f0
}
.box>ul{
    width: 100%;
    height: 220px;
     overflow-y:auto;
     /* 当IE下溢出，仍然可以滚动*/ 
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:-moz-scrollbars-none;
            scrollbar-width: none
}
.box>ul>li{
    margin-left: 10px;
    font-size: 14px;
}
.box>ul>li:nth-of-type(1){
    display: flex
}
.box>ul>li:nth-of-type(1)>h2{
    width: 10%;
    /* text-align: center */
    font-size: 16px
}
.box>ul>li:nth-of-type(1)>h3{
    width: 80%;
    text-align: center;
    font-size: 16px
}
.box>ul>li{
    cursor: pointer;
   text-decoration: underline
    /* text-indent: 32px */
}
.box>ul>li{
    line-height: 40px;
    overflow: hidden;

}

</style>
