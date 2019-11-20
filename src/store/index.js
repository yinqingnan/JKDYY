
// 引入和使用vuex
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);



const store = new Vuex.Store({
    state:{
        show0:true,
        show1:false,

        number:0
    },
    mutations:{
        // 修改显示权限
        display(state){
            state.show0=false
            state.show1=true
        },
        // 修改显示权限
        display1(state){
            state.show0=true
            state.show1=false
            location.reload(true)     //强制刷新页面将丢失的数据找回
        }
        

    },
    actions:{
        
    }
});
 
export default store;