<template>
<!-- 上市公司数据行业数据资料 -->
    <div class="box">
        <H1>行业数据资料</H1>
        <ul>
            <li v-for="(item,index) in list" :key="index" @click="btn(item.dataUrl)">{{index+1}}.{{item.dataName}}</li>
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
            // window.location.href = Url;
        } 
    },
}
</script>
<style scoped>
.box{
    width: 100%;
    background: #fff;
    height: 364px;
    overflow: hidden;
    border: 1px solid #e5e5e5;
    padding: 0 20px;
    box-sizing: border-box;
    overflow-y:auto

}
.box::-webkit-scrollbar {display:none}
.box>h1{
    font-size: 16px;
    text-align: center;
    line-height: 50px;
    color: #333;
    margin-bottom: 12px;
}
.box>ul{
    width: 100%;
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
 

}

</style>
