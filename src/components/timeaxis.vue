<!--时间轴-->
<template>
    <div>
        <div class="TimeAxis">
            <h1>项目生命周期全纪录点</h1>
            <div>
                <span></span>
                <div>
                    <!-- <ul>
                        <li></li>
                        <li>项目立项</li>
                        <li>2019/01/01</li>
                    </ul>
                    <ul>
                        <li></li>
                        <li>示范区进场</li>
                        <li>2019/02/01</li>
                    </ul>
                    <ul>
                        <li></li>
                        <li>前期物业合同签订</li>
                        <li>2019/03/01</li>
                    </ul>
                    <ul>
                        <li></li>
                        <li>重大事件投诉</li>
                        <li>2019/04/01</li>
                    </ul>
                    <ul>
                        <li></li>
                        <li>首次集中交房</li>
                        <li>2019/05/01</li>
                    </ul> -->
                    <ul v-for="(item,index) in  list" :key="index" @mouseenter="onmouseenter(index)" @mouseleave="onmouseleave(index)">
                        <li ></li>
                        <li v-show="isshow" class="yc" ref="yc" :title="item.recordname">{{item.recordname}}</li>
                        <li v-show="isshow" class="yc" ref="yc1">{{item.recordTime.split(" ")[0]}}</li>
                    </ul>
                </div>
            </div>         
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[],
            isshow:true
        }
    },
    props:["xmid"],
    watch:{
        xmid:{
            handler(newval){
                // console.log(newval)
                this.axios.get("/api/projectEvent01?projectid="+newval).then((res)=>{
                    // console.log(res.data.data)
                    this.list=res.data.data
                })
            }
        },
    deep: true, //深度监测
    immediate: true //将立即以表达式的当前值触发回调
    },
    methods:{
        onmouseenter(index){
            // console.log(index)
              setTimeout(()=>{
                this.$refs.yc[index].style="display:block"
                this.$refs.yc1[index].style="display:block"
               },500)

        },onmouseleave(index){
           setTimeout(()=>{
                this.$refs.yc[index].style="display:none"
                this.$refs.yc1[index].style="display:none"
            },1000)
            // window.clearInterval(time)  

        }
    }
}
</script>


<style >

.yc{
    display: none;
    /* display: block */
    width: 100px;
    overflow: hidden;
}
.yc1{
    display: none
}
.TimeAxis{
    height: 130px
}
.TimeAxis>h1{
    font-size: 16px;
    line-height: 1;
    margin: 16px 0 16px 26px;
}

.TimeAxis>div{
    width: 80%;
    border: 1px solid #e0e0e0;
    margin: 26px 33px 14px 88px  ;
    position: relative;
    /* overflow: hidden; */
    /* min-width: 686px; */
}
.TimeAxis>div>span{
    display: inline-block;
    width: 0;
    height: 0;
    border: 15px solid;
    border-color: transparent   transparent transparent #a0a0a0 ;
    position: absolute;
    right: -32px;
    top: -15px;
}
.TimeAxis>div>div{
    display: flex;
    justify-content: space-between;
    position: absolute;

    width: 100%;


}

.TimeAxis>div>div>ul{

    width: 100px;
    min-width: 100px;

    position: relative;
    right: 30px;
}

.TimeAxis>div>div>ul>li:nth-of-type(1){
    border: 3px solid #688fe4;
    border-radius: 50%;
    width: 8px;
    height:  8px;
    position: absolute;
    top: -8px;
    left:50%;
    margin-left: -8px;
    background: #fff;
    cursor: pointer;


}
.TimeAxis>div>div>ul>li:nth-of-type(2){
    width: 100px;
    overflow: hidden;
    font-size: 12px;
    color: #333;
    margin-top: 9px;
    text-align: center;
    white-space:nowrap;
    margin-top: 20px;
    transition: all 1s
    
}
.TimeAxis>div>div>ul>li:nth-of-type(3){
    font-size: 11px;
    color: #333;
    text-align: center;
    white-space:nowrap;
    color: #999 ;
      width: 100px;
    overflow: hidden;
      transition: all 1s
}
</style>

