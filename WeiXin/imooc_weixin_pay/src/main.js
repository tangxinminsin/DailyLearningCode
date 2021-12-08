/**
 * @Author: tangxinmin
 * @Date: 2021-06-23 15:25:27
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-08-20 09:20:54
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index'
import VueCookie from 'vue-cookie'
import './assets/css/base.css'
import './assets/css/common.css'

Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.config.productionTip = false

axios.interceptors.request.use(function (request) {
  //loading、请求地址替换、修改
  return request;
});
// { code:0,data:'',message:'' }
axios.interceptors.response.use(function (response) {
  let res = response.data;
  if (res.code != 0) {
    alert(res.message);
  }
  return response;
}, function (error) {
  return Promise.reject(error);
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
