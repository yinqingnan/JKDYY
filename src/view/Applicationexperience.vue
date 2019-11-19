<template>
<!-- 即将上线 -->
    <div>
        <div class="container">
                <div class="box">
                    <div class="btn" @click="btn">
                        <h2>申请体验</h2>
                    </div>


                    <div class="title">
                        <h1>全面升级，即将上线</h1>
                        <h2>3.0版本，全面升级，邀请你来体验</h2>
                        <h3>项目数据可视化 <span></span> 管理数据清晰化</h3>
                    </div>

                    <div class="module" v-if="show">
                        <div>
                            <img src="../assets/ima/experience_tijiao.png" alt="">
                        </div>
                        <h2>体验申请已经提交，‘运营君’稍后会联系您，请稍安勿躁。</h2>
                    </div>

                </div>
                
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            show:false,
            time:""
        }
    },methods:{
        btn(){
          this.time= setTimeout( ()=>{this.show=true},500)
           
        }
    },
     beforeDestroy() {
      clearInterval(this.timer);
    }
}
</script>


<style scoped>
    .container{
        width: 100%;
        position: fixed;
        height: 100%;
        background: #eeeeee;
        z-index: -1
    }
    .box{
        margin: 10px;
        height: 100%;
        background: url("../assets/ima/experience_bj.png") no-repeat 0 0 ;
        background-size: 100% 100%
    }
    .box> .btn{
        width: 150px;
        height: 150px;
        background: url("../assets/ima/experience_button.png")no-repeat 0 0 ;
        background-size: 100% 100%;
        position: absolute;
        bottom: 36px;
        right: 8%;
        cursor: pointer;

    }
    .btn>h2{
        font-size: 12px;
        line-height: 1;
        color: #fff;
        margin-top: 68px;
        text-align: center;
        font-weight: 500;
    }
    .title{
        width: 226px;
        height: 86px;
        position: absolute;
        bottom: 20%;
        left: 36%;
        /* margin-left: -113px */
        /* z-index: 100; */
    }
    .title>h1{
        font-size: 20px;
        font-weight: 500;
        color: #333;
        overflow: hidden;
        line-height: 1;
    }
    .title>h2{
        font-size: 14px;
        line-height: 1;
        color: #666;
        margin: 15px 0 25px 0;
    }
    .title>h3{
        font-size: 14px;
        line-height: 14px;
        color: #ea5e13;
        margin: 15px 0 25px 0;
    }
    .title>h3>span{
        background: #ea5e13;
        width: 2px;
        height: 10px;
        line-height: 14px;
        display: inline-block
    }
    .module{
        width: 380px;
        height: 170px;
        border: 2px solid #dde2e5;
        border-radius: 5px;
        /* margin-top: 140px */
        position: absolute;
        top: 30%;
        left: 33%;
        background: #fff;
        text-align: center;
        padding-top: 35px
    }
     .module>img{
         width: 50px;
         height: 50px;
         display: inline-block;
         /* margin-bottom: 24px; */
     }
     .module>h2{
         font-size: 14px;line-height: 1;
         color: #666;
         font-weight: 500;
         margin-top:24px;
     }
</style>>
    
