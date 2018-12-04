// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
// 全局引入_base.scss
import './public/scss/_base.scss'

Vue.config.productionTip = false
// 配合VueAxios使用Vue.use 全局配置 axios
Vue.use(VueAxios, axios) // this.axios 或者 this.$http
// Vue.prototype.$axios = axios  this.$axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

router.push('/goods')
