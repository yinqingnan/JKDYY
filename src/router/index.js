import Vue from 'vue'

//引入路由文件
import VueRouter from 'vue-router';
Vue.use(VueRouter)
//引入路由匹配成功后显示的组件
import Project from "../view/project.vue"      //公司项目详情
import Region from "../view/region.vue"      //公司项目详情
import Y2 from "../view/2.vue"      //上市公司数据
import City from '../view/City.vue'       //城市数据（旧）
import Indexmap from '../view/indexmap.vue'   //地图页面
import Regiontable from '../view/regiontable.vue'   //区域项目表格

// import Applicationexperience from "../view/Applicationexperience.vue"   //申请体验地图数据
import Dyyd from "../components/Table/xmydtab.vue"      //当月用电详情
import Dyys from "../components/Table/xmystab.vue"      //当月用水 详情
import ZSR from "../components/Table/ZSR.vue"       //综合收费率详情
const  router = new VueRouter({
    base: '/',
    mode: 'history',  //去掉url中的#
    routes:[
        // {path:"/",redirect:'indexmap'},//设置默认指向的路径
        {path:"/",redirect:'/region'},//设置默认指向的路径  
        {path:"/region",name:"Region",component:Region},      //区域公司页面   4.0  此路由必须携带数据  默认为金科物业重庆区域公司  // http://localhost:8080/project?name=金科物业重庆区域公司
        {path:"/project",name:"project",component:Project},      //项目页面    4.0  此路由必须携带数据  默认为金科物业重庆区域公司 和公司名称       http://localhost:8080/region?quid=250&xmid=1085
        {path:"/2",name:"Y2",component:Y2},                  //上市公司数据   
        {path:'/city',name:"City",component:City},            //城市数据详情页面   路由须携带参数指定城市名称   // http://localhost:8080/city?name=重庆
        {path:"/indexmap",name:"Indexmap",component:Indexmap},  //中国地图
        {path:"/regiontable",name:"Regiontable",component:Regiontable},     //区域公司项目表格 （在管项目 招标物业费 停车备案情况）
        // {path:"/Applicationexperience",name:"Applicationexperience",component:Applicationexperience},
        {path:"/dyyd",name:"dyyd",component:Dyyd},              //当月用电详情
        {path:"/dyys",name:"dyys",component:Dyys},              //当月用水 详情
        {path:"/zsr",name:"zsr",component:ZSR}             //综合收费率详情

    ]
})

export default router;