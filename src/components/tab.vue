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
       
                <ul v-if="isshow">
                    <li class="list" v-for="(item,index) in list1" :key="index" @click="liebiao(item.remindType)">
                        <h2>{{item.remindTitle}}</h2>
                        <h2>{{item.remindTime.split(" ")[0]}}</h2>
                    </li>
                </ul>
                <ul v-if="isshow1">
                    <li v-for="(item,index) in list2" :key="index" class="list">
                        <h2 :title="item.notice">{{item.notice}}</h2>
                        <h2>{{item.noticeDate.split(" ")[0]}}</h2>
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
                tabs: ["重要提醒", "系统公告"],
                list1:[],
                list2:[],
                num: 0,
                isshow:true,
                isshow1:false,
                id:""
           }
        
    },
    props:["xmid"],
    methods: {
        tab(index) {
            this.num = index;
            if(index==0){
                this.isshow=true
                this.isshow1=false
            }else{
                 this.isshow=false
                this.isshow1=true
            }
        },
        liebiao(item){
            // 判断type的类型，进行页面跳转
            if(item=="合同台账"){
                // console.log(1)
                 this.$router.push('/xmhttz?xmid='+this.id)

            }else if(item=="设施设备"){
                // console.log(2)
                 this.$router.push('/xmsbwx?xmid='+this.id)

            }
        }
    },
    watch:{
        xmid:{
            handler(newval){
                // console.log(newval)
                // 获取重要提醒
                this.id=newval
                this.axios.get("/api/importantReminder02?topcount=10&projectId="+newval).then((res)=>{
                    // console.log(res.data.data)
                    this.list1=res.data.data

                })
                // 获取系统公告
                this.axios.get("/api/projectNotice?topcount=2").then((res)=>{
                    // console.log(res.data.data)
                     this.list2=res.data.data
                // console.log(this.tabContents[1])


                })
            }
        },
        deep: true, //深度监测
        immediate: true //将立即以表达式的当前值触发回调
    }
    
}
</script>

<style  scoped>
.box{
    background: #fff;
}
.title{
    font-size:20px;
    display:flex;
    height: 55px;
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
.list{
    font-size: 14px; 
    max-width: 280px;
    line-height: 34px;
    white-space: nowrap;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: 0 20px;
    cursor: pointer;
    overflow: hidden;
    margin-top: 20px
 
}
.list>h2{
    font-size: 14px;
    text-decoration: underline;
    min-width: 170px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1
}
.list>h2:nth-of-type(2){
    text-decoration: none;
    text-indent: 5px;
}

</style>