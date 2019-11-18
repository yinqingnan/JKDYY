<!--时间轴-->
<template>
    <div>
        <div class="TimeAxis">
            <h1>项目生命周期全纪录点</h1>
            <div>
                <span></span>
                <div>
                    <ul v-for="(item,index) in  list" :key="index"  >
                        <li class="ulul" >
                            <div v-show="isshow" class="yc" ref="yc" :title="item.recordname">
                                <span></span>
                                <h1>{{item.recordname}}</h1>
                                <h3>{{item.recordTime.split(" ")[0]}}</h3>
                            </div>
                        </li>
                     
                        <!-- <li v-show="isshow" class="yc" ref="yc1">{{item.recordTime.split(" ")[0]}}</li> -->
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
 
    }
}
</script>


<style >
.ulul:hover .yc {
    /* display: block; */
    opacity: 1;
}
.yc{
    transition: all 1s
}
.yc>span{

    display: block;
    position: absolute;
    border: 10px solid transparent;
    border-bottom: 10px solid #c9e4f0;
    top: -20px;
    left: 40%;
    margin-left: -10px

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

    width: 20px;
    min-width: 20px;
    position: relative;
    /* right: 30px; */
}

.TimeAxis>div>div>ul>li{
    border: 3px solid #688fe4;
    border-radius: 50%;
    width: 8px;
    height:  8px;
    position: relative;
    top: -8px;
    left:50%;
    margin-left: -8px;
    background: #fff;
    cursor: pointer;

}
.TimeAxis>div>div>ul>li>div{
    width: 136px;
    font-size: 12px;
    color: #333;
    white-space:nowrap;
    margin-top: 20px;
    text-align: center;
    position: absolute;
    left: -50px;
    border: 1px solid #a2cdd2;
    height: 60px;
    border-radius: 5px;
    background: #c9e4f0;
    /* display: none; */
    opacity: 0;
    
}
.yc{
}
.yc>h1{
    font-size: 14px;
    color:#333;
    font-weight: 600;
    margin-top: 22px;
    line-height: 1;
    font-size: 14px;
      overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;

}
.yc>h3{
    font-size: 14px;
    color:#666;
    margin-top: 4px;
    font-weight: 500;
    line-height: 1;
    color: #666;
    font: size 10px; 
    margin-bottom: 12px
    
}
</style>

