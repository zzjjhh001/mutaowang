// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
//从node_moudle引入直接文件名
import 'assets/scss/index.scss'
import 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.cjs.js'
import 'swiper/swiper-bundle.esm.js'
import 'swiper/swiper.cjs.js'
import 'swiper/swiper-bundle.esm.browser.js'
import 'swiper/swiper.esm.js'
//stylesheet
import 'swiper/swiper.scss'
import 'swiper/swiper-vars.scss'
import 'swiper/swiper-bundle.css'
fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.use(VueLazyload,{
  preload:1,
  error:require('assets/img/error.png'),
  loading:require('assets/img/loading.gif'),
  attempt:1
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, 
  components: { App },
  template: '<App/>'
})
