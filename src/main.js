import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// 引人VueRouter
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 解决路由重复点击报错的问题
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 引入自定义的路由配置
import router from './router';



// 清除默认样式
// import "normalize.css"


// 引入elementUI  
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 引入echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts;

// 注入vuex
import store from './store'

// 引入axios
import axios from 'axios'
import VueAxios  from 'vue-axios'

axios.defaults.baseURL="http://222.180.200.126:9045"          //默认地址   上线后统一更换自用
// axios.defaults.baseURL="http://219.153.109.174:9045"       //默认地址   金科内部使用





Vue.prototype.axios = axios         //将axios配置到Vue原型中
Vue.use(VueAxios, axios)


var vue=new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
export default vue
