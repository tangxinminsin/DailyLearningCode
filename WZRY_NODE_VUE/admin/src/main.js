import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import http from './http'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import './style.css';
import router from './router'

Vue.prototype.$http = http
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthorization() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
