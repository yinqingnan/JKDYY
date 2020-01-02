

// import Vue from 'vue'

//引入路由文件
import VueRouter from 'vue-router';
// Vue.use(VueRouter)
//引入路由匹配成功后显示的组件
import Project from "../view/project.vue"      //公司项目详情
import Region from "../view/region.vue"      //公司项目详情
import Y2 from "../view/2.vue"      //上市公司数据
import Listedcompany from "../view/Listedcompany.vue"       //上市公司子路由 首页
import Companylist from "../view/Companylist.vue"       //上市公司子路由    公司页面
import Acquisition  from '../components/Table/Acquisitiondetails.vue'       //收并购信息详情页

import Zbsjtj from "../view/zbsjtj.vue"     //总部数据统计

import City from '../view/City.vue'       //城市数据（旧）
import Indexmap from '../view/indexmap.vue'   //地图页面
import Regiontable from '../view/regiontable.vue'   //区域项目表格 （在管项目 招标物业费 停车备案情况）

import Dyyd from "../components/Table/xmydtab.vue"      //项目当月用电详情
import Dyys from "../components/Table/xmystab.vue"      //项目当月用水 详情
import ZSR from "../components/Table/ZSR.vue"       //区域公司总收入详情
import Xmzhsfl from "../components/Table/xmzhsfl.vue"       //区域公司总收入详情
import Xmhttz from '../components/Table/xmhttz.vue'         //项目公司合同台账详情表格
import Xmsbwx from '../components/Table/xmsbwx.vue'         //项目公司设备维修详情表格
import Zhsjl from "../components/zhsjl/zhsjl.vue"           //综合收缴率主页面
import Xqhz from "../components/zhsjl/xqhz.vue"                 //子页面 小区汇总表
import Sfkhz from "../components/zhsjl/sfkhz.vue"               //子页面 收费科汇总表
import Khzymx from "../components/zhsjl/khzymx.vue"             //子页面   客户资源明细表
import Qyzhsjl from '../components/Table/qyzhsjl'           //区域公司综合收缴率
import Xmnhzb from "../components/Xmnhzb"

import Qybsl from "../components/Table/qybsl.vue"
import Bswjl from "../components/bsl/bsl.vue"      //报事完结率
import Bshzb from "../components/bsl/bshzb.vue" //报事汇总表
import Flhzb from "../components/bsl/flhzb.vue" //报事汇总表


const  router = new VueRouter({
    base: '/',
    mode: 'history',  //去掉url中的#
    routes:[
        {path:"/",redirect:'/zbsjtj'},//设置默认指向的路径  
        {path:"/zbsjtj",name:Zbsjtj,component:Zbsjtj},
        {path:"/region",name:"Region",component:Region},      //区域公司页面   4.0  此路由必须携带数据  默认为金科物业重庆区域公司  // http://localhost:8080/project?name=金科物业重庆区域公司
        {path:"/project",name:"project",component:Project},      //项目页面    4.0  此路由必须携带数据  默认为金科物业重庆区域公司 和公司名称       http://localhost:8080/region?quid=250&xmid=1085
        {path:"/2",component:Y2,children:[             //上市公司数据 和子路由
            {path:"/",redirect:'/2/listedcompany'}, 
            {path:"/2/listedcompany",component:Listedcompany} ,     //上市公司数据页
            {path:"/2/companylist",component:Companylist},          //各公司详情页
            {path:"/2/acquisition",component:Acquisition },          // 收并购详情页
        ]},                  
        {path:'/city',name:"City",component:City},            //城市数据详情页面   路由须携带参数指定城市名称   // http://localhost:8080/city?name=重庆
        {path:"/indexmap",name:"Indexmap",component:Indexmap},  //中国地图
        {path:"/regiontable",name:"Regiontable",component:Regiontable},     //区域公司项目表格 （在管项目 招标物业费 停车备案情况）
        {path:"/qyzhsjl",name:"qyzhsjl",component:Qyzhsjl},              //区域公司综合收缴率
        {path:"/dyyd",name:"dyyd",component:Dyyd},              //当月用电详情表格
        {path:"/dyys",name:"dyys",component:Dyys},              //当月用水 详情表格
        {path:"/zsr",name:"zsr",component:ZSR},             //区域公司总收入详情表格
        {path:"/xmzhsfl",name:"xmzhsfl",component:Xmzhsfl},  //项目公司总收入详情表格
        {path:"/xmhttz",name:"xmhttz",component:Xmhttz} , //项目公司合同台账详情表格
        {path:"/xmsbwx",name:"xmsbwx",component:Xmsbwx},  //项目公司设备维修详情表格
        {path:"/qybsl",name:"qybsl",component:Qybsl},      //区域公司报事率 （品质服务信息）
        {path:"/zhsjl",component:Zhsjl,       //项目综合收缴率父级组件      
            children:[
                {path:"/",redirect:'/zhsjl/xqhz'},              
                {path:"/zhsjl/xqhz",component:Xqhz},            //小区汇总
                {path:"/zhsjl/sfkhz",component:Sfkhz},          //收费科汇总
                {path:"/zhsjl/khzymx",component:Khzymx},        //客户资源明细

            ]
        },
        {path:"/xmnhzb",name:"xmnhzb",component:Xmnhzb}, //项目能耗指标详情页
        {path:"/bswjl",component:Bswjl,       //项目报事完结率     
            children:[
                {path:"/",redirect:'/bswjl/bshzb'},              
                {path:"/bswjl/bshzb",component:Bshzb},               //报事汇总表
                {path:"/bswjl/flhzb",component:Flhzb},              //分类汇总表
              

            ]
        },

    ]
})

export default router;