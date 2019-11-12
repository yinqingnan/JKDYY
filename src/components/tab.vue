<!--点击切换列表tbs-->

<template>
    <div>
        <div class="box">
            <ul class="title">
                <li
                    v-for="(item,index) in tabs" 
                    :class="{active:index == num}"
                    @click="tab(index)" 
                    :key="index">{{item}}
                </li>
            </ul>
            <div class="tabCon">
                <ul 
                v-for="(item,index) in tabContents"
                :key="index"
                v-show="index==num" 
                >
                    <li v-for="(tiems,index) in item"  :key="index" :class="index===item.length-1?'lastfood':'last'" >
                        <span>
                            {{ tiems.title}}
                        </span>
                        <span class="xhx">
                            {{tiems.msg}}

                        </span>
                        </li>
                </ul>
            </div>  
        </div>
        
    </div>
    
</template>>
      



 
<script>
export default {
       data() {
           return {
                tabs: ["系统公告", "提醒事项"],
                tabContents: [
                    [
                    {id:0,title:"公告:重大节点重启"},
                    {id:1,title:"2019年7月系统跟新说明"},                    
                    {id:2,title:"计划模块操作指引"},
                    {id:3,title:"十秒教你完成数据分析"},
                    {id:4,title:"他才是这次勒索案的后台。"},
                    {id:5,title:"上了妆穿着西服的演员在后台走来走去"},
                    {id:6,title:"按照家宴的传统做法，我们走到后台"},

                    ], 
                    [
                    {id:0,title:"未完事项11111111111111111",msg:"2019/10/16"},
                    {id:1,title:"未完事项222222222222222",msg:"2019/10/16"},                    
                    {id:2,title:"未完事项3333333333",msg:"2019/10/16"},
                    {id:3,title:"未完事项44444444444444444",msg:"2019/10/16"},
                    {id:4,title:"未完事项55555555555555555555555",msg:"2019/10/16"},
                    {id:5,title:"未完事项66666666666666666666666",msg:"2019/10/16"},
                    {id:6,title:"未完事项7777777777777777777777777777777777777",msg:"2019/10/16"},
                    ]
                ],
                num: 0
           }
       
    },
    props:[],
    methods: {
        tab(index) {
            this.num = index;
        }
    }
}
</script>

<style  scoped>
.box{
    min-width: 290px;
    background: #fff
    /* padding-left: 20px */
}
.title{
    font-size:20px;
    display:flex;
    height: 50px;
    /* justify-content: space-around; */
    border-bottom: 1px solid #f0f0f0
}
.title>li{
    line-height: 1;
    font-size: 16px;
    color: #333;
    margin-top:22px ;
    cursor: pointer;
}
.title>li:nth-of-type(1){
    margin-left: 20px
}
.title>li:nth-of-type(2){
    margin-left: 36px

}
.active{
    color: #49a4d9 !important ;
    border-bottom:2px solid #49a4d9

}  
.tabCon>ul{
    height: auto;
    padding-bottom: 20px
}
.tabCon>ul>li{
    font-size: 14px;
    max-width: 280px;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    cursor: pointer;
    margin-top: 20px
}
.tabCon>ul>li>span:nth-of-type(1){
    text-decoration: underline;
    max-width: 180px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;

}
.xhx{
    /* text-decoration:none !important; */
    text-decoration:none  ;
}
.lastfood{
    margin-bottom: 20px !important
}
</style>