<!--时间轴-->
<template>
    <div>
        <div class="TimeAxis">
            <h1>项目生命周期全纪录点</h1>
            <div>
                <span></span>
                <div>
                    <ul v-for="(item,index) in  list" :key="index"  @mouseover="itemmouseenter(index)" >
                        <li class="ulul" >
                            <div v-show="isshow" ref="yc" :title="item.recordname"  :class="{yc:index == num}">
                                <span></span>
                                <h1>{{item.recordname}}</h1>
                                <h3>{{item.recordTime.split(" ")[0]}}</h3>
                            </div>
                        </li>
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
            isshow:true,
            num:null
        }
    },
    props:["xmid"],
    watch:{
        xmid:{
            handler(newval){
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
        itemmouseenter(index){
            this.num=index
        }
    }

}
</script>


<style >

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
    height: 80px
}
.TimeAxis>h1{
    font-size: 16px;
    line-height: 1;
    margin: 16px 0 16px 26px;
    font-weight: 500
}

.TimeAxis>div{
    width: 93%;
    border: 1px dashed #e0e0e0;
    margin: 26px 33px 14px 88px  ;
    position: relative;
    left: -63px

}
.TimeAxis>div>span{
    display: inline-block;
    width: 0;
    height: 0;
    border: 10px solid;
    border-color: transparent   transparent transparent #a0a0a0 ;
    position: absolute;
    right: -21px;
    top: -11px;
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
    opacity: 0;
    /* z-index: -1 */
    
}
/* .ulul:hover .yc {
    opacity: 1;
    z-index: 1;
} */
.yc{
    opacity: 1 !important;
    /* z-index: 1 !important; */
}
.TimeAxis>div>div>ul>li{
    transition: all 0.5s
}
.TimeAxis>div>div>ul>li:hover{
    background: #688fe4
}
.yc{
    transition: all 1s
}
.TimeAxis>div>div>ul:nth-of-type(1){
    left: 20px
}
.TimeAxis>div>div>ul:last-child{
    right: 20px
}
.yc>h1{
    font-size: 12px;
    color:#333;
    font-weight: 500;
    margin-top: 16px;
    line-height: 1;
    font-size: 14px;
      overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;

}
.yc>h3{
    font-size: 12px;
    color:#999;
    margin-top: 4px;
    font-weight: 500;
    line-height: 1;
    color: #666;
    font-size: size 10px; 
    margin-bottom: 12px
    
}
</style>

