<template>
    <div>
        
       
        <div class="box">
            <div class="box1">
                <button @click="TO" class="fhsj">
                    <i class="el-icon-back"></i>返回区域公司
                </button>
                <!-- <h2>综合收缴率统计</h2> -->
            </div>
            <div class="box2">
                    <router-link :to="{path:'/zhsjl/xqhz',query:{qyid:qyid}}">小区汇总表</router-link>
                    <router-link :to="{path:'/zhsjl/sfkhz',query:{qyid:qyid}}">收费科汇总表</router-link>
                    <router-link :to="{path:'/zhsjl/khzymx',query:{qyid:qyid}}">客户资源明细表</router-link>
            </div>

           
            
        </div>
        <router-view></router-view>
    </div>
</template>


<script>
export default {
    data(){
        return{
            qyid:""
        }
    },
     mounted(){
        // console.log(this.$route.query.qyid)
        this.qyid=this.$route.query.qyid
    },
    methods:{
        TO() {
            this.axios.get("/api/companIdOrName?companIdOrName=" + this.qyid)
            .then(res => {
                //   console.log(res.data.data[0].companyName)
                this.$router.push({
                path: "/project",
                query: {
                    name: res.data.data[0].companyName
                }
                });
            });
        },
    }
}
</script>




<style scoped>
.box{
    padding-left: 10px
}
.box>div>a{
    text-decoration: none;
    color: #666;
    width: 120px;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    font-size: 16px;
    padding-bottom: 4px
}
.router-link-active{
    border-bottom:2px solid #49a4d9
}
.box1>button{
    border: 1px solid #4ac48b!important;
    background: #4ac48b!important;
    color: #fff!important;
    border-radius: 5px;
    outline: none;
    width: 100px;
    line-height: 40px;
    cursor: pointer;
    height: 40px;
    margin-top: 7px
}
.box1{
    display: flex
}
.box1>h2{
    font-size: 18px;
    line-height: 50px;
    color:#333;
    margin-left: 20px
}
.box{
    display: flex
}
</style>