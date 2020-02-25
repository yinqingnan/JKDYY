//语法兼容IE
import '@babel/polyfill'


import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// 引人VueRouter
import VueRouter from 'vue-router'

// 解决路由重复点击报错的问题
// import Router from 'vue-router'
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
// 引入自定义的路由配置
import router from './router';
/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

// 清除默认样式
// import "normalize.css"


// 引入elementUI  
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


// 引入echarts
import echarts from "echarts"

Vue.prototype.echarts = echarts;

// 注入vuex
import store from '@/store'


// 引入全局变量
import global_ from "@/api/Global.vue"

Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

// 引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// axios.defaults.baseURL="http://222.180.200.126:9045"          //   上线后统一更换自用
axios.defaults.baseURL = "http://219.153.109.174:9045"            //  金科内部使用



// 滚动条优化
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// 为自定义滚动条全局注入自定义指令.
/**
 * @description 自动判断该更新PerfectScrollbar还是创建它
 * @param {Element} el - 必填。dom元素
 */
const el_scrollBar = el => {
    //在元素上加点私货，名字随便取，确保不会和已有属性重复即可，我取名叫做_ps_
    if (el._ps_ instanceof PerfectScrollbar) {
        el._ps_.update();
    } else {
        //el上挂一份属性
        el._ps_ = new PerfectScrollbar(el, {});
    }
};
Vue.directive("scrollBar", {
    inserted(el, binding, vnode) {
        const { arg } = binding;
        if (arg === "el-table") {
            el = el.querySelector(".el-table__body-wrapper");
            !el && console.warn("未发现className为el-table__body-wrapper的dom");

            // 启用x轴后不让原生滚动条出来作乱
            vnode.context.$nextTick(() => {
                el.classList.add("ps");
                el.addEventListener("ps-scroll-y", () =>
                    el.classList.add("ps")
                );
                el.addEventListener("ps-scroll-x", () =>
                    el.classList.add("ps")
                );
            });
        }
        const rules = ["fixed", "absolute", "relative"];
        if (!rules.includes(window.getComputedStyle(el, null).position)) {
            console.error(
                `perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join(
                    "、"
                )}`
            );
        }
        //el上挂一份属性
        el_scrollBar(el);
    },
    componentUpdated(el, binding, vnode, oldVnode) {
        const { arg } = binding;
        if (arg === "el-table") {
            el = el.querySelector(".el-table__body-wrapper");
            !el && console.warn("未发现className为el-table__body-wrapper的dom");
        }
        try {
            vnode.context.$nextTick(() => {
                el_scrollBar(el);
            });
        } catch (error) {
            console.error(error);
            el_scrollBar(el);
        }
    },
});
// 在需要使用的表格上添加即可：   v-scrollBar:el-table 











Vue.prototype.axios = axios         //将axios配置到Vue原型中
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

var vue = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
export default vue
