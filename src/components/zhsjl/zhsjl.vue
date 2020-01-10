<template>
    <div>
        
       
        <div class="box">
            <div class="box1">
                <button @click="TO" class="fhsj">
                    <i class="el-icon-back"></i>返回
                </button>
        
            </div>
            <div class="box2">
                    <router-link :to="{path:'/zhsjl/xqhz',query:{xmid:xmid}}" exact>小区汇总表</router-link>
                    <router-link :to="{path:'/zhsjl/sfkhz',query:{xmid:xmid}}" exact>收费科汇总表</router-link>
                    <router-link :to="{path:'/zhsjl/khzymx',query:{xmid:xmid}}" exact>客户资源明细表</router-link>
            </div>
            
        </div>
        <router-view></router-view>
    </div>
</template>


<script>
export default {
    data(){
        return{
            xmid:""
        }
    },
     mounted(){

        this.xmid=this.$route.query.xmid
    },
    methods:{
        TO() {
            // 返回到项目公司
            // console.log(this.xmid)
           
            this.$router.go(-1)
        },
    }
}
</script>




<style scoped>
.box{
    padding-left: 10px;
    background: #eee

}
.box>div>a{
    text-decoration: none;
    color: #666;
    width: 120px;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    font-size: 16px;
    padding-bottom: 12px
}
.router-link-active{
    border-bottom:2px solid #49a4d9;
}
.box1>button{
    border: 1px solid #4ac48b!important;
    background: #4ac48b!important;
    color: #fff!important;
    border-radius: 5px;
    outline: none;
    width: 62px;
    line-height: 26px;
    cursor: pointer;
    height: 26px;
    margin-top: 15px
}
.box1>button:hover{
    border: 1px solid #3c8dbc;
    box-shadow: none;
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